<script lang="ts">
    import { randomScout, roster } from "$lib/stores/game";
    import type { Uma } from "$lib/data/characters";
    import { get } from "svelte/store";
    import { goto } from "$app/navigation";

    let lastSingle: { uma: Uma; isNew: boolean } | null = null;
    let lastTen: { uma: Uma; isNew: boolean }[] = [];

    function doSingle() {
        lastTen = [];
        const before = new Set(get(roster));
        const result = randomScout();
        const isNew = !before.has(result.id);
        lastSingle = { uma: result, isNew };
    }

    function doTenPull() {
        lastSingle = null;
        lastTen = [];
        for (let i = 0; i < 10; i++) {
            const before = new Set(get(roster));
            const result = randomScout();
            const isNew = !before.has(result.id);
            lastTen.push({ uma: result, isNew });
        }
    }

    function goBack() {
        goto("/home");
    }
</script>

<!-- ⭐ Correct layout: ONE page wrapper -->
<div class="page scrollable" data-scroll>
    <div class="container">

        <h1 class="title">Scout</h1>

        <!-- ⭐ Buttons -->
        <div class="btn-row">
            <button class="scout-btn" on:click={doSingle}>Single Pull</button>
            <button class="scout-btn" on:click={doTenPull}>10× Pull</button>
        </div>

        <!-- ⭐ Single Result -->
        {#if lastSingle}
            <div class="result-card rarity-{lastSingle.uma.rarity}">
                <div class="name-row">
                    <div class="name">{lastSingle.uma.name}</div>
                    {#if lastSingle.isNew}
                        <span class="new-badge">NEW!</span>
                    {/if}
                </div>
                <div class="stars">{"★".repeat(lastSingle.uma.rarity)}</div>
            </div>
        {/if}

        <!-- ⭐ 10× Results -->
        {#if lastTen.length > 0}
            <div class="ten-results">
                {#each lastTen as entry}
                    <div class="result-card rarity-{entry.uma.rarity}">
                        <div class="name-row">
                            <div class="name">{entry.uma.name}</div>
                            {#if entry.isNew}
                                <span class="new-badge">NEW!</span>
                            {/if}
                        </div>
                        <div class="stars">{"★".repeat(entry.uma.rarity)}</div>
                    </div>
                {/each}
            </div>
        {/if}

        <!-- ⭐ Back button INSIDE the scroll container -->
        <button class="soon-btn small" on:click={goBack}>Back</button>

    </div>
</div>

<style>
    .scrollable {
        overflow-y: visible;
    }

    .page {
        display: flex;
        justify-content: center;
        align-items: flex-start;
        width: 100%;
        min-height: 100vh;
    }

.container {
  width: 100%;
  max-width: 480px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
}

    .title {
        font-size: 2rem;
        font-weight: 700;
        color: white;
        margin-bottom: 20px;
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
    }

    .scout-btn:hover {
        background: #f5f5f5;
        border-color: #b5b5b5;
        color: black;
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

    .rarity-1 { border-color: #555; }
    .rarity-2 { border-color: #FFC700; }
    .rarity-3 { border-color: #9B30FF; }

    .name-row {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 8px;
    }

    .new-badge {
        background: #ff4081;
        color: white;
        padding: 2px 6px;
        border-radius: 6px;
        font-size: 0.8rem;
        font-weight: 700;
    }

    .name {
        font-size: 1.3rem;
        font-weight: 700;
        margin-bottom: 6px;
    }

    .stars {
        color: gold;
        font-size: 1.1rem;
    }

    .ten-results {
        display: flex;
        flex-direction: column;
        gap: 16px;
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
    }

    .soon-btn:active {
        transform: scale(0.96);
    }

    .soon-btn {
        background: var(--button-bg);
        color: var(--button-text);
    }

    .soon-btn:hover {
        background: #f5f5f5;
        border-color: #b5b5b5;
        color: black;
        transform: scale(1.03);
    }

    .soon-btn.small {
        width: fit-content;
        padding: 10px 18px;
        margin: 20px auto 0 auto;
        display: block;
    }
</style>

