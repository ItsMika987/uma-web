<script lang="ts">
    import { randomScout, roster, randomSupportScout, supportRoster } from "$lib/stores/game";
    import type { Uma } from "$lib/data/characters";
    import type { SupportCard } from "$lib/data/supportCards";
    import { get } from "svelte/store";
    import { goto } from "$app/navigation";

    let mode: 'trainee' | 'support' = 'trainee';

    // Trainee results
    let lastSingle: { uma: Uma; isNew: boolean } | null = null;
    let lastTen: { uma: Uma; isNew: boolean }[] = [];

    // Support results
    let lastSingleSupport: { card: SupportCard; isNew: boolean } | null = null;
    let lastTenSupport: { card: SupportCard; isNew: boolean }[] = [];

    const typeColors: Record<string, string> = {
        Speed: "#4aa3ff", Stamina: "#ff6b6b", Power: "#ff9f43",
        Guts: "#ff6b9d", Wit: "#a29bfe", Friend: "#55efc4",
    };

    function setMode(m: 'trainee' | 'support') {
        mode = m;
        lastSingle = null; lastTen = [];
        lastSingleSupport = null; lastTenSupport = [];
    }

    function doSingle() {
        lastTen = []; lastTenSupport = [];
        if (mode === 'trainee') {
            const before = new Set(get(roster));
            const result = randomScout();
            lastSingle = { uma: result, isNew: !before.has(result.id) };
            lastSingleSupport = null;
        } else {
            const before = new Set(get(supportRoster));
            const result = randomSupportScout();
            lastSingleSupport = { card: result, isNew: !before.has(result.id) };
            lastSingle = null;
        }
    }

    function doTenPull() {
        lastSingle = null; lastSingleSupport = null;
        lastTen = []; lastTenSupport = [];
        if (mode === 'trainee') {
            for (let i = 0; i < 10; i++) {
                const before = new Set(get(roster));
                const result = randomScout();
                lastTen.push({ uma: result, isNew: !before.has(result.id) });
            }
        } else {
            for (let i = 0; i < 10; i++) {
                const before = new Set(get(supportRoster));
                const result = randomSupportScout();
                lastTenSupport.push({ card: result, isNew: !before.has(result.id) });
            }
        }
    }

    function goBack() { goto("/home"); }
</script>

<div class="page">
    <div class="container">

        <h1 class="title">Scout</h1>

        <!-- Toggle -->
        <div class="toggle-row">
            <button class="toggle-btn {mode === 'trainee' ? 'active' : ''}" on:click={() => setMode('trainee')}>Trainee</button>
            <button class="toggle-btn {mode === 'support' ? 'active' : ''}" on:click={() => setMode('support')}>Support</button>
        </div>

        <!-- Pull buttons -->
        <div class="btn-row">
            <button class="scout-btn" on:click={doSingle}>Single Pull</button>
            <button class="scout-btn" on:click={doTenPull}>10× Pull</button>
        </div>

        <!-- Trainee single result -->
        {#if lastSingle}
            <div class="result-card rarity-{lastSingle.uma.rarity}">
                <div class="name-row">
                    <div class="name">{lastSingle.uma.name}</div>
                    {#if lastSingle.isNew}<span class="new-badge">NEW!</span>{/if}
                </div>
                <div class="stars">{"★".repeat(lastSingle.uma.rarity)}</div>
            </div>
        {/if}

        <!-- Trainee 10x results -->
        {#if lastTen.length > 0}
            <div class="ten-results">
                {#each lastTen as entry}
                    <div class="result-card rarity-{entry.uma.rarity}">
                        <div class="name-row">
                            <div class="name">{entry.uma.name}</div>
                            {#if entry.isNew}<span class="new-badge">NEW!</span>{/if}
                        </div>
                        <div class="stars">{"★".repeat(entry.uma.rarity)}</div>
                    </div>
                {/each}
            </div>
        {/if}

        <!-- Support single result -->
        {#if lastSingleSupport}
            <div class="result-card" style="border-color: {lastSingleSupport.card.rarity === 3 ? '#9B30FF' : lastSingleSupport.card.rarity === 2 ? '#FFC700' : '#555'}">
                <div class="type-badge" style="background: {typeColors[lastSingleSupport.card.type]}22; color: {typeColors[lastSingleSupport.card.type]}; border-color: {typeColors[lastSingleSupport.card.type]}44">{lastSingleSupport.card.type}</div>
                <div class="name-row">
                    <div class="name">{lastSingleSupport.card.name}</div>
                    {#if lastSingleSupport.isNew}<span class="new-badge">NEW!</span>{/if}
                </div>
                <div class="character">{lastSingleSupport.card.character}</div>
                <div class="rarity-label" style="color: {lastSingleSupport.card.rarity === 3 ? '#9B30FF' : lastSingleSupport.card.rarity === 2 ? '#FFC700' : '#888'}">{lastSingleSupport.card.rarity === 3 ? 'SSR' : lastSingleSupport.card.rarity === 2 ? 'SR' : 'R'}</div>
            </div>
        {/if}

        <!-- Support 10x results -->
        {#if lastTenSupport.length > 0}
            <div class="ten-results">
                {#each lastTenSupport as entry}
                    <div class="result-card" style="border-color: {entry.card.rarity === 3 ? '#9B30FF' : entry.card.rarity === 2 ? '#FFC700' : '#555'}">
                        <div class="type-badge" style="background: {typeColors[entry.card.type]}22; color: {typeColors[entry.card.type]}; border-color: {typeColors[entry.card.type]}44">{entry.card.type}</div>
                        <div class="name-row">
                            <div class="name">{entry.card.name}</div>
                            {#if entry.isNew}<span class="new-badge">NEW!</span>{/if}
                        </div>
                        <div class="character">{entry.card.character}</div>
                        <div class="rarity-label" style="color: {entry.card.rarity === 3 ? '#9B30FF' : entry.card.rarity === 2 ? '#FFC700' : '#888'}">{entry.card.rarity === 3 ? 'SSR' : entry.card.rarity === 2 ? 'SR' : 'R'}</div>
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
        min-height: 100vh;
        padding: 20px 0 40px;
        box-sizing: border-box;
    }

    .container {
        width: 100%;
        max-width: 480px;
        margin: 0 auto;
        padding: 0 20px;
        text-align: center;
        box-sizing: border-box;
    }

    .title {
        font-size: 2rem;
        font-weight: 700;
        color: white;
        margin: 0 0 20px;
    }

    .toggle-row {
        display: flex;
        gap: 0;
        justify-content: center;
        margin-bottom: 20px;
        border: 1px solid var(--box-border);
        border-radius: 10px;
        overflow: hidden;
    }

    .toggle-btn {
        flex: 1;
        padding: 10px 0;
        font-size: 1rem;
        font-weight: 600;
        font-family: monospace;
        cursor: pointer;
        border: none;
        background: var(--button-bg);
        color: var(--button-text);
        transition: background 0.15s, color 0.15s;
    }

    .toggle-btn.active {
        background: #fafafa;
        color: black;
    }

    .toggle-btn:first-child { border-right: 1px solid var(--box-border); }

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
        font-family: monospace;
        cursor: pointer;
        transition: 0.15s ease;
        flex: 1;
    }

    .scout-btn:hover {
        background: var(--button-hover);
        transform: scale(1.03);
    }

    .result-card {
        margin-top: 20px;
        background: var(--box-bg);
        border-radius: 12px;
        padding: 20px;
        border: 2px solid #555;
        color: var(--text);
        text-align: center;
    }

    .rarity-1 { border-color: #555; }
    .rarity-2 { border-color: #FFC700; }
    .rarity-3 { border-color: #9B30FF; }

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

    .rarity-label {
        font-size: 0.95rem;
        font-weight: 700;
        letter-spacing: 0.05em;
        margin-top: 4px;
    }

    .stars {
        color: gold;
        font-size: 1.1rem;
        margin-top: 4px;
    }

    .new-badge {
        background: #ff4081;
        color: white;
        padding: 2px 6px;
        border-radius: 6px;
        font-size: 0.8rem;
        font-weight: 700;
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
