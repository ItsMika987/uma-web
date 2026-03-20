<script lang="ts">
  import { scoutedTrainees } from "$lib/stores/game";
  import { selectedUma } from "$lib/umaStore";
  import { goto } from "$app/navigation";

  let currentSelection: string | null = null;

  function selectUma(name: string) {
    currentSelection = name;
    selectedUma.set(name);
  }

  function startRace() {
    if (currentSelection) goto("/race");
  }

  function goBack() {
    goto("/home");
  }
</script>

<div class="wrapper">
  <h1>Select Your Uma</h1>

  {#if $scoutedTrainees.length === 0}
    <p class="empty">You haven't scouted any Umamusume yet!<br>Head to Scout first.</p>
  {:else}
    <div class="grid">
      {#each $scoutedTrainees as uma}
        <button
          class="uma-btn rarity-{uma.rarity} {currentSelection === uma.name ? 'selected' : ''}"
          on:click={() => selectUma(uma.name)}
        >
          <span class="name">{uma.name}</span>
          <span class="stars">{"★".repeat(uma.rarity)}</span>
        </button>
      {/each}
    </div>
  {/if}

  <div class="bottom-row">
    <button class="action-btn" on:click={goBack}>Home</button>
    <button class="action-btn {!currentSelection ? 'disabled' : ''}" on:click={startRace}>Race</button>
  </div>
</div>

<style>
  .wrapper {
    min-height: 100vh;
    padding: 1.5rem;
    text-align: center;
    box-sizing: border-box;
    color: var(--text);
  }

  h1 {
    font-size: clamp(2rem, 5vw, 3rem);
    margin-bottom: 1.5rem;
    color: var(--text);
  }

  .empty {
    color: var(--text);
    opacity: 0.5;
    margin: 3rem auto;
    line-height: 1.8;
    font-size: 1.1rem;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 12px;
    max-width: 900px;
    margin: 0 auto 2rem;
  }

  .uma-btn {
    padding: 0.9rem 1rem;
    border-radius: 12px;
    cursor: pointer;
    background: var(--button-bg);
    color: var(--button-text);
    border: 2px solid var(--box-border);
    transition: 0.15s;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
  }

  .uma-btn:hover {
    background: var(--button-hover);
    border-color: var(--button-border-hover);
    transform: scale(1.03);
  }

  .rarity-2 { border-color: #FFC700; }
  .rarity-3 { border-color: #9B30FF; }

  .selected {
    background: var(--selected-bg);
    border-color: var(--selected-border);
    transform: scale(1.03);
  }

  .name {
    font-size: clamp(0.9rem, 3vw, 1.1rem);
    font-weight: 600;
  }

  .stars {
    font-size: 0.9rem;
    color: gold;
  }

  .bottom-row {
    display: flex;
    justify-content: center;
    gap: 20px;
    flex-wrap: wrap;
    margin-top: 1rem;
  }

  .action-btn {
    padding: 0.9rem 2rem;
    font-size: clamp(1rem, 4vw, 1.2rem);
    border-radius: 12px;
    background: var(--button-bg);
    color: var(--button-text);
    border: 1px solid var(--box-border);
    cursor: pointer;
    transition: 0.15s;
  }

  .action-btn:hover {
    background: var(--button-hover);
    border-color: var(--button-border-hover);
    transform: scale(1.03);
  }

  .disabled {
    opacity: 0.4;
    pointer-events: none;
  }
</style>
