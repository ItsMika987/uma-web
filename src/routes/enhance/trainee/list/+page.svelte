<script lang="ts">
    import { scoutedTrainees, unscoutedTrainees } from "$lib/stores/game";
    import { goto } from "$app/navigation";

    function goBack() {
        goto("/enhance/trainee");
    }
</script>

<div class="page">
    <div class="container">

        <h1 class="title">Trainee Umamusume</h1>

        <h2 class="section-title">Scouted</h2>
        <div class="grid">
            {#each $scoutedTrainees as uma}
                <div class="card rarity-{uma.rarity}">
                    <div class="name">{uma.name}</div>
                    <div class="stars">{"★".repeat(uma.rarity)}</div>
                </div>
            {/each}
        </div>

        <h2 class="section-title">Unscouted</h2>
        <div class="grid">
            {#each $unscoutedTrainees as uma}
                <div class="card locked">
                    <div class="name">{uma.name}</div>
                    <div class="stars">{"★".repeat(uma.rarity)}</div>
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
        max-width: 640px;
        margin: 0 auto;
        padding: 0 20px;
        box-sizing: border-box;
    }

    .title {
        font-size: 2rem;
        font-weight: 700;
        color: white;
        margin: 0 0 24px;
        text-align: center;
    }

    .section-title {
        margin: 32px 0 12px;
        font-size: 1.2rem;
        font-weight: 700;
        color: white;
        text-align: center;
    }

    .grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 16px;
    }

    .card {
        background: #111;
        border-radius: 10px;
        padding: 14px 10px;
        color: white;
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

    .name {
        font-weight: 600;
        margin-bottom: 6px;
        font-size: 0.95rem;
        line-height: 1.3;
    }

    .stars {
        color: gold;
        font-size: 1.1rem;
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

    .soon-btn:active {
        transform: scale(0.96);
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
        margin: 28px auto 0 auto;
        display: block;
    }
</style>
