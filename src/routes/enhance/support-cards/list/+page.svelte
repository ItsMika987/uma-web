<script lang="ts">
    import { scoutedSupports } from "$lib/stores/game";
    import { goto } from "$app/navigation";

    function goBack() {
        goto("/enhance/support-cards");
    }

    const typeColors: Record<string, string> = {
        Speed: "#4aa3ff",
        Stamina: "#ff6b6b",
        Power: "#ff9f43",
        Guts: "#ff6b9d",
        Wit: "#a29bfe",
        Friend: "#55efc4",
    };
</script>

<div class="page">
    <div class="container">
        <h1 class="title">Support Card List</h1>

        <div class="grid">
            {#each $scoutedSupports as card}
                <div class="card rarity-{card.rarity}">
                    <div class="type-badge" style="background: {typeColors[card.type]}22; color: {typeColors[card.type]}; border-color: {typeColors[card.type]}44">{card.type}</div>
                    <div class="name">{card.name}</div>
                    <div class="character">{card.character}</div>
                    <div class="rarity-label" style="color: {card.rarity === 3 ? '#9B30FF' : card.rarity === 2 ? '#FFC700' : '#888'}">{card.rarity === 3 ? "SSR" : card.rarity === 2 ? "SR" : "R"}</div>
                </div>
            {/each}
        </div>


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
        max-width: 700px;
        margin: 0 auto;
        padding: 0 20px;
        box-sizing: border-box;
    }

    .title {
        font-size: 2rem;
        font-weight: 700;
        color: var(--text);
        margin: 0 0 24px;
        text-align: center;
    }

    .section-title {
        margin: 32px 0 12px;
        font-size: 1.2rem;
        font-weight: 700;
        color: var(--text);
        text-align: center;
    }

    .grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 12px;
    }

    .card {
        background: var(--box-bg);
        border-radius: 10px;
        padding: 12px 10px;
        color: var(--text);
        border: 2px solid #333;
        text-align: center;
        word-break: break-word;
    }

    .rarity-1 { border-color: #555; }
    .rarity-2 { border-color: #FFC700; }
    .rarity-3 { border-color: #9B30FF; }

    .locked {
        opacity: 0.35;
        filter: grayscale(100%);
    }

    .type-badge {
        display: inline-block;
        font-size: 0.7rem;
        padding: 2px 8px;
        border-radius: 999px;
        border: 1px solid #444;
        margin-bottom: 6px;
        background: #222;
    }

    .name {
        font-weight: 600;
        font-size: 0.85rem;
        line-height: 1.3;
        margin-bottom: 3px;
    }

    .character {
        font-size: 0.75rem;
        opacity: 0.6;
        margin-bottom: 4px;
    }

    .rarity-label {
        font-size: 0.8rem;
        font-weight: 700;
        letter-spacing: 0.05em;
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
