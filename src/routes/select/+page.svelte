<script lang="ts">
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
    goto("/menu");
  }
</script>

<style>
  :global(html),
  :global(body) {
    margin: 0;
    padding: 0;
    font-family: monospace;
    background: #fafafa;
    overflow-x: hidden;
  }

  .wrapper {
    min-height: 100vh;
    padding: 1.5rem;
    text-align: center;
    box-sizing: border-box;
  }

  h1 {
    font-size: clamp(1.8rem, 5vw, 3rem);
    margin-bottom: 1.5rem;
  }

  /* Desktop: 3 columns */
  .columns {
    display: flex;
    justify-content: center;
    gap: 40px;
    margin-bottom: 2rem;
  }

  /* Mobile: stack into 1 column */
  @media (max-width: 900px) {
    .columns {
      flex-direction: column;
      gap: 20px;
      align-items: center;
    }
  }

  .col {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .uma-btn {
    padding: 0.9rem 1.5rem;
    font-size: clamp(1rem, 4vw, 1.2rem);
    border-radius: 12px;
    cursor: pointer;
    width: clamp(220px, 70vw, 260px);
    background: white;
    border: 1px solid #cfcfcf;
    transition: 0.15s;
  }

  .uma-btn:hover {
    background: #f5f5f5;
    transform: scale(1.03);
  }

  .selected {
    background: #ECFFDC;
    border: 1px solid #90EE90;
    transform: scale(1.03);
  }

  .bottom-row {
    display: flex;
    justify-content: center;
    gap: 20px;
    flex-wrap: wrap;
  }

  .action-btn {
    padding: 0.9rem 2rem;
    font-size: clamp(1rem, 4vw, 1.2rem);
    border-radius: 12px;
    background: white;
    border: 1px solid #cfcfcf;
    cursor: pointer;
    transition: 0.15s;
  }

  .action-btn:hover {
    background: #f5f5f5;
    transform: scale(1.03);
  }

  .disabled {
    opacity: 0.4;
    pointer-events: none;
  }
</style>

<div class="wrapper">
  <h1>Select Your Uma</h1>

  <div class="columns">
    <div class="col">
      <button class="uma-btn {currentSelection === 'Special Week' ? 'selected' : ''}" on:click={() => selectUma('Special Week')}>Special Week</button>
      <button class="uma-btn {currentSelection === 'Mejiro McQueen' ? 'selected' : ''}" on:click={() => selectUma('Mejiro McQueen')}>Mejiro McQueen</button>
      <button class="uma-btn {currentSelection === 'Daiwa Scarlet' ? 'selected' : ''}" on:click={() => selectUma('Daiwa Scarlet')}>Daiwa Scarlet</button>
      <button class="uma-btn {currentSelection === 'Kitasan Black' ? 'selected' : ''}" on:click={() => selectUma('Kitasan Black')}>Kitasan Black</button>
      <button class="uma-btn {currentSelection === 'Biwa Hayahide' ? 'selected' : ''}" on:click={() => selectUma('Biwa Hayahide')}>Biwa Hayahide</button>
      <button class="uma-btn {currentSelection === 'Agnes Tachyon' ? 'selected' : ''}" on:click={() => selectUma('Agnes Tachyon')}>Agnes Tachyon</button>
    </div>

    <div class="col">
      <button class="uma-btn {currentSelection === 'Silence Suzuka' ? 'selected' : ''}" on:click={() => selectUma('Silence Suzuka')}>Silence Suzuka</button>
      <button class="uma-btn {currentSelection === 'Gold Ship' ? 'selected' : ''}" on:click={() => selectUma('Gold Ship')}>Gold Ship</button>
      <button class="uma-btn {currentSelection === 'Rice Shower' ? 'selected' : ''}" on:click={() => selectUma('Rice Shower')}>Rice Shower</button>
      <button class="uma-btn {currentSelection === 'Satono Diamond' ? 'selected' : ''}" on:click={() => selectUma('Satono Diamond')}>Satono Diamond</button>
      <button class="uma-btn {currentSelection === 'T.M. Opera O' ? 'selected' : ''}" on:click={() => selectUma('T.M. Opera O')}>T.M. Opera O</button>
      <button class="uma-btn {currentSelection === 'Symboli Rudolf' ? 'selected' : ''}" on:click={() => selectUma('Symboli Rudolf')}>Symboli Rudolf</button>
    </div>

    <div class="col">
      <button class="uma-btn {currentSelection === 'Tokai Teio' ? 'selected' : ''}" on:click={() => selectUma('Tokai Teio')}>Tokai Teio</button>
      <button class="uma-btn {currentSelection === 'Vodka' ? 'selected' : ''}" on:click={() => selectUma('Vodka')}>Vodka</button>
      <button class="uma-btn {currentSelection === 'Hishi Amazon' ? 'selected' : ''}" on:click={() => selectUma('Hishi Amazon')}>Hishi Amazon</button>
      <button class="uma-btn {currentSelection === 'Nice Nature' ? 'selected' : ''}" on:click={() => selectUma('Nice Nature')}>Nice Nature</button>
      <button class="uma-btn {currentSelection === 'Air Groove' ? 'selected' : ''}" on:click={() => selectUma('Air Groove')}>Air Groove</button>
      <button class="uma-btn {currentSelection === 'Narita Brian' ? 'selected' : ''}" on:click={() => selectUma('Narita Brian')}>Narita Brian</button>
    </div>
  </div>

  <div class="bottom-row">
    <button class="action-btn" on:click={goBack}>Back</button>
    <button class="action-btn {currentSelection ? '' : 'disabled'}" on:click={startRace}>Race</button>
  </div>
</div>

c