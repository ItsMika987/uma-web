<script lang="ts">
    import { randomSupportScout, supportRoster } from "$lib/stores/game";
    import type { SupportCard } from "$lib/data/supportCards";
    import { get } from "svelte/store";
    import { goto } from "$app/navigation";

    let lastSingle: { card: SupportCard; isNew: boolean } | null = null;
    let lastTen: { card: SupportCard; isNew: boolean }[] = [];

    const typeColors: Record<string, string> = {
        Speed: "#4aa3ff",
        Stamina: "#ff6b6b",
        Power: "#ff9f43",
        Guts: "#ff6b9d",
        Wit: "#a29bfe",
        Friend: "#55efc4",
    };

    function doSingle() {
        lastTen = [];
        const before = new Set(get(supportRoster));
        const result = randomSupportScout();
        lastSingle = { card: result, isNew: !before.has(result.id) };
    }

    function doTenPull() {
        lastSingle = null;
        lastTen = [];
        for (let i = 0; i < 10; i++) {
            const before = new Set(get(supportRoster));
            const result = randomSupportScout();
            lastTen.push({ card: result, isNew: !before.has(result.id) });
        }
    }

    function goBack() {
        goto("/home");
    }
</script>

<div class="page scrollable">
    <div class="container">
        <h1 class="title">Support Scout</h1>

        <div class="btn-row">
            <button class="scout-btn" on:click={doSingle}>Single Pull</button>
            <button class="scout-btn" on:click={doTenPull}>10× Pull</button>
        </div>

        {#if lastSingle}
            <div class="result-card rarity-{lastSingle.card.rarity}" style="border-color: {lastSingle.card.rarity === 3 ? '#9B30FF' : lastSingle.card.rarity === 2 ? '#FFC700' : '#555'}">
                <div class="type-badge" style="background: {typeColors[lastSingle.card.type]}22; color: {typeColors[lastSingle.card.type]}; border-color: {typeColors[lastSingle.card.type]}44">{lastSingle.card.type}</div>
                <div class="name-row">
                    <div class="name">{lastSingle.card.name}</div>
                    {#if lastSingle.isNew}<span class="new-badge">NEW!</span>{/if}
                </div>
                <div class="character">{lastSingle.card.character}</div>
                <div class="rarity-label" style="color: {lastSingle.card.rarity === 3 ? '#9B30FF' : lastSingle.card.rarity === 2 ? '#FFC700' : '#888'}">{lastSingle.card.rarity === 3 ? "SSR" : lastSingle.card.rarity === 2 ? "SR" : "R"}</div>
            </div>
        {/if}

        {#if lastTen.length > 0}
            <div class="ten-results">
                {#each lastTen as entry}
                    <div class="result-card" style="border-color: {entry.card.rarity === 3 ? '#9B30FF' : entry.card.rarity === 2 ? '#FFC700' : '#555'}">
                        <div class="type-badge" style="background: {typeColors[entry.card.type]}22; color: {typeColors[entry.card.type]}; border-color: {typeColors[entry.card.type]}44">{entry.card.type}</div>
                        <div class="name-row">
                            <div class="name">{entry.card.name}</div>
                            {#if entry.isNew}<span class="new-badge">NEW!</span>{/if}
                        </div>
                        <div class="character">{entry.card.character}</div>
                        <div class="rarity-label" style="color: {entry.card.rarity === 3 ? '#9B30FF' : entry.card.rarity === 2 ? '#FFC700' : '#888'}">{entry.card.rarity === 3 ? "SSR" : entry.card.rarity === 2 ? "SR" : "R"}</div>
                    </div>
                {/each}
            </div>
        {/if}

        <button class="soon-btn small" on:click={goBack}>Back</button>
    </div>
</div>

<style>
    .page {
        width: 100%;
        padding: 20px 0 40px;
        box-sizing: border-box;
    }

    .container {
        width: 100%;
        max-width: 480px;
        margin: 0 auto;
        padding: 0 20px;
        box-sizing: border-box;
        text-align: center;
    }

    .title {
        font-size: 2rem;
        font-weight: 700;
        color: white;
        margin: 0 0 20px;
    }

    .btn-row {
        display: flex;
        gap: 12px;
        justify-content: center;
        margin-bottom: 20px;
    }

    .scout-btn {
        background: var(--button-bg);
        color: var(--button-text);
        border: none;
        padding: 14px 20px;
        border-radius: 10px;
        font-size: 1.1rem;
        font-weight: 600;
        cursor: pointer;
        transition: 0.15s ease;
        flex: 1;
        font-family: monospace;
    }

    .scout-btn:hover {
        background: var(--button-hover);
        transform: scale(1.03);
    }

    .result-card {
        margin-top: 20px;
        background: #111;
        border-radius: 12px;
        padding: 20px;
        border: 2px solid #333;
        color: white;
        text-align: center;
    }

    .type-badge {
        display: inline-block;
        font-size: 0.75rem;
        padding: 2px 10px;
        border-radius: 999px;
        border: 1px solid #444;
        margin-bottom: 8px;
    }

    .name-row {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 8px;
    }

    .name {
        font-size: 1.2rem;
        font-weight: 700;
    }

    .character {
        font-size: 0.85rem;
        opacity: 0.6;
        margin: 4px 0;
    }

    .new-badge {
        background: #ff4081;
        color: white;
        padding: 2px 6px;
        border-radius: 6px;
        font-size: 0.8rem;
        font-weight: 700;
    }

    .rarity-label {
        font-size: 0.95rem;
        font-weight: 700;
        letter-spacing: 0.05em;
        margin-top: 4px;
    }

    .ten-results {
        display: flex;
        flex-direction: column;
        gap: 12px;
        margin-top: 10px;
    }

    .soon-btn {
        padding: 1rem 2rem;
        font-size: clamp(1rem, 4vw, 1.2rem);
        border-radius: 12px;
        cursor: pointer;
        width: 100%;
        transition: background 0.15s, border-color 0.15s, transform 0.1s;
        touch-action: manipulation;
        border: 1px solid var(--box-border);
        background: var(--button-bg);
        color: var(--button-text);
        font-family: monospace;
    }

    .soon-btn:active { transform: scale(0.96); }
    .soon-btn:hover {
        background: var(--button-hover);
        border-color: var(--button-border-hover);
        transform: scale(1.03);
    }

    .soon-btn.small {
        width: fit-content;
        padding: 10px 18px;
        margin: 28px auto 0 auto;
        display: block;
    }
</style>
