// src/lib/stores/game.ts
import { writable, type Writable, get, derived } from "svelte/store";
import type { Uma } from "$lib/data/characters";
import { characters } from "$lib/data/characters";

// 🐎 Owned Uma IDs (your roster) — auto-loaded from localStorage
const DEFAULT_ROSTER = ["vodka", "daiwa_scarlet", "haru_urara", "sakura_bakushin_o", "gold_ship"];

function loadRoster(): string[] {
    if (typeof localStorage === "undefined") return DEFAULT_ROSTER;
    try {
        const saved = localStorage.getItem("uma_roster");
        return saved ? JSON.parse(saved) : DEFAULT_ROSTER;
    } catch { return DEFAULT_ROSTER; }
}

export const roster: Writable<string[]> = writable<string[]>(loadRoster());

// Auto-save roster on every change
roster.subscribe((val) => {
    if (typeof localStorage !== "undefined") {
        localStorage.setItem("uma_roster", JSON.stringify(val));
    }
});

// 🧠 Derived: scouted & unscouted lists
export const scoutedTrainees = derived(roster, ($roster) =>
    characters
        .filter((c) => $roster.includes(c.id))
        .sort((a, b) => b.rarity - a.rarity || a.name.localeCompare(b.name))
);

export const unscoutedTrainees = derived(roster, ($roster) =>
    characters
        .filter((c) => !$roster.includes(c.id))
        .sort((a, b) => b.rarity - a.rarity || a.name.localeCompare(b.name))
);

// 🔁 Utility: shuffle array
function shuffle<T>(arr: T[]): T[] {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

// 🎟 Scout a specific Uma (dupes do nothing)
export function scoutUma(id: string) {
    roster.update((current) => {
        if (current.includes(id)) return current; // dupe → ignore
        return [...current, id];                  // new → add
    });
}

// 🎲 Pity counters — persisted to localStorage
function loadPity(): { pullCount: number; pullSinceTwo: number } {
    if (typeof localStorage === "undefined") return { pullCount: 0, pullSinceTwo: 0 };
    try {
        const saved = localStorage.getItem("uma_pity");
        return saved ? JSON.parse(saved) : { pullCount: 0, pullSinceTwo: 0 };
    } catch { return { pullCount: 0, pullSinceTwo: 0 }; }
}

function savePity() {
    if (typeof localStorage !== "undefined") {
        localStorage.setItem("uma_pity", JSON.stringify({ pullCount, pullSinceTwo }));
    }
}

const _pity = loadPity();
let pullCount = _pity.pullCount;       // total pulls since last ★★★
let pullSinceTwo = _pity.pullSinceTwo; // pulls since last ★★

export function randomScout(): Uma {
    pullCount++;
    pullSinceTwo++;

    let rarity: number;

    if (pullCount >= 25) {
        // Guaranteed ★★★ every 25 pulls
        rarity = 3;
        pullCount = 0;
        pullSinceTwo = 0;
    } else if (pullSinceTwo >= 2 && pullSinceTwo <= 5) {
        // ★★ guaranteed somewhere in the 2-5 pull window (random within window)
        const rollForTwo = Math.random() < 1 / (6 - pullSinceTwo);
        rarity = rollForTwo ? 2 : 1;
        if (rarity === 2) pullSinceTwo = 0;
    } else if (pullSinceTwo > 5) {
        // Force ★★ if we've gone past 5 without one
        rarity = 2;
        pullSinceTwo = 0;
    } else {
        rarity = 1;
    }

    const pool = characters.filter((c) => c.rarity === rarity);
    const fallback = characters.filter((c) => c.rarity === 1);
    const source = pool.length > 0 ? pool : fallback;
    const pick = source[Math.floor(Math.random() * source.length)];
    scoutUma(pick.id);
    savePity();
    return pick;
}

// 🏇 Build race roster based on your rule
export function buildRaceRoster(playerName: string): string[] {
    const owned = get(roster) as string[];

    // Convert owned IDs to names
    const idToName = Object.fromEntries(characters.map(c => [c.id, c.name]));
    const nameToId = Object.fromEntries(characters.map(c => [c.name, c.id]));

    const playerId = nameToId[playerName];
    const otherNames = owned
        .filter((id: string) => id !== playerId)
        .map((id: string) => idToName[id])
        .filter(Boolean);

    // 5–18 owned → player + all others
    if (owned.length >= 5 && owned.length <= 18) {
        return [playerName, ...otherNames];
    }

    // 19+ owned → player + 17 random others
    if (owned.length >= 19) {
        const shuffled = shuffle(otherNames);
        return [playerName, ...shuffled.slice(0, 17)];
    }

    // Fallback (less than 5 owned)
    return [playerName];
}

// 💾 Save system
// 🔐 Encryption helpers (AES-GCM via Web Crypto API)
const ENC_KEY = "uma-web-save-key-v1-itsmika987!!"; // 32 chars = 256-bit

async function getKey(): Promise<CryptoKey> {
    const keyBytes = new TextEncoder().encode(ENC_KEY);
    return crypto.subtle.importKey("raw", keyBytes, { name: "AES-GCM" }, false, ["encrypt", "decrypt"]);
}

async function encrypt(text: string): Promise<string> {
    const key = await getKey();
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const encoded = new TextEncoder().encode(text);
    const cipher = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, encoded);
    const combined = new Uint8Array(iv.byteLength + cipher.byteLength);
    combined.set(iv, 0);
    combined.set(new Uint8Array(cipher), iv.byteLength);
    return btoa(String.fromCharCode(...combined));
}

async function decrypt(b64: string): Promise<string> {
    const key = await getKey();
    const combined = Uint8Array.from(atob(b64), c => c.charCodeAt(0));
    const iv = combined.slice(0, 12);
    const cipher = combined.slice(12);
    const plain = await crypto.subtle.decrypt({ name: "AES-GCM", iv }, key, cipher);
    return new TextDecoder().decode(plain);
}

export async function exportSave(): Promise<string> {
    const raw = JSON.stringify({
        version: 1,
        roster: get(roster),
        pity: { pullCount, pullSinceTwo }
    });
    return encrypt(raw);
}

export async function importSave(data: string): Promise<{ ok: boolean; error?: string }> {
    try {
        const json = await decrypt(data.trim());
        const parsed = JSON.parse(json);
        if (!parsed.roster || !Array.isArray(parsed.roster)) throw new Error("Invalid save data");
        roster.set(parsed.roster);
        if (parsed.pity) {
            pullCount = parsed.pity.pullCount ?? 0;
            pullSinceTwo = parsed.pity.pullSinceTwo ?? 0;
            savePity();
        }
        return { ok: true };
    } catch {
        return { ok: false, error: "Invalid or corrupted save file." };
    }
}

export function resetSave() {
    roster.set(DEFAULT_ROSTER);
    pullCount = 0;
    pullSinceTwo = 0;
    savePity();
}
