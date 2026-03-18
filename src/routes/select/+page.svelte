<script lang="ts">
  import { selectedUma } from "$lib/umaStore";
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";

  let currentSelection: string | null = null;

  onMount(() => {
    selectedUma.update(v => v); // fixes mobile Race button not working
  });

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

<!-- svelte-ignore css_unused_selector -->
<!-- svelte-ignore css_unused_selector -->
<style>
  :global(html),
  :global(body) {
    margin: 0;
    padding: 0;
    font-family: monospace;
    background: #fafafa;
    overflow-x: hidden;
    overflow-y: auto;
  }

  .wrapper {
    min-height: 100vh;
    padding: 1.5rem;
    text-align: center;
    box-sizing: border-box;
  }

  h1 {
    font-size: clamp(2rem, 5vw, 3rem);
    margin-bottom: 1.5rem;
  }

  .columns {
    display: flex;
    justify-content: center;
    gap: 40px;
    margin-bottom: 2rem;
  }

  @media (max-width: 900px) {
    .columns {
      flex-direction: column;
      align-items: center;
      gap: 20px;
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
    width: 260px;
    background: white;
    border: 1px solid #cfcfcf;
    transition: 0.15s;
  }

  @media (max-width: 900px) {
    .uma-btn {
      width: 90vw;
      max-width: 260px;
    }
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
    <slot />
  </div>

  <div class="bottom-row">
    <button class="action-btn" on:click={goBack}>Back</button>
    <button class="action-btn {currentSelection ? '' : 'disabled'}" on:click={startRace}>Race</button>
  </div>
</div>
