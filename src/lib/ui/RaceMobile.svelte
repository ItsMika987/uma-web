<script lang="ts">
  type Racer = {
    id: number;
    name: string;
    number: number;
    progress: number;
    isPlayer: boolean;
  };

  export let racers: Racer[];
  export let leaderboard: Racer[];
  export let finishOrder: Racer[];
  export let showResults: boolean;
  export let startRace: () => void;
  export let restartRace: () => void;
  export let gotoMenu: () => void;
  export let medal: (i: number) => string;
  export let makeTrack: (p: number) => string;

  // ⭐ Correct ordinal suffixes (1st, 2nd, 3rd, 4th...)
  function ordinal(n: number): string {
    const s = ["th", "st", "nd", "rd"];
    const v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
  }
</script>

<div class="mobile-layout">
  <div class="leaderboard-box">
    <strong>Leaderboard</strong>
    <br><br>

    {#each leaderboard as r, i}
      <div class="{r.isPlayer ? 'player' : ''}">
        {medal(i)} {i + 1}. [{r.number}] {r.name}
      </div>
    {/each}

    <button class="start-btn" on:click={startRace}>Start Race</button>
  </div>

  <div class="race-box">
    <strong>Race</strong>
    <br><br>

    {#each racers as r}
      <div class="racer-block {r.isPlayer ? 'player' : ''}">
        <div class="line">[{r.number}] {r.name}</div>
        <div class="line">{makeTrack(r.progress)}</div>
      </div>
    {/each}
  </div>
</div>

{#if showResults}
  <div class="results-overlay">
    <div class="results-box">
      <h2>Results</h2>

      <!-- ⭐ Placement banner -->
      {#if finishOrder.length > 0}
        <h3 class="placement-banner">
          You finished {ordinal(finishOrder.findIndex(r => r.isPlayer) + 1)}!
        </h3>
      {/if}

      {#each finishOrder as r, i}
        <p class="
          {r.isPlayer ? 'player' : ''}
          {i === 0 && r.isPlayer ? 'first-place' : ''}
        ">
          {medal(i)} {i + 1}. [{r.number}] {r.name}
        </p>
      {/each}

      <button on:click={restartRace}>Race Again</button>
      <button on:click={gotoMenu}>Return to Menu</button>
    </div>
  </div>
{/if}

<style>
  .mobile-layout {
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 12px;
    background: var(--bg);
    color: var(--text);
  }

  .leaderboard-box,
  .race-box {
    width: 90%;
    padding: 12px;
    border-radius: 12px;
    background: var(--box-bg);
    color: var(--text);
    border: 2px solid var(--box-border);
  }

  .line {
    white-space: pre;
    font-family: monospace;
  }

  .player {
    background: var(--player-bg);
    border: 2px solid var(--player-border);
    padding: 4px;
    border-radius: 6px;
  }

  /* ⭐ Gold glow for 1st place */
  .first-place {
    background: var(--first-bg);
    border: 2px solid var(--first-border);
    box-shadow: var(--first-glow);
    padding: 6px;
    border-radius: 6px;
  }

  .placement-banner {
    margin-top: -10px;
    margin-bottom: 14px;
    font-size: 18px;
    font-weight: bold;
    color: var(--text);
  }

  .results-overlay {
    position: fixed;
    inset: 0;
    background: var(--bg);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .results-box {
    width: 80%;
    max-width: 360px;
    background: var(--box-bg);
    color: var(--text);
    border: 2px solid var(--box-border);
    padding: 18px;
    border-radius: 14px;
    text-align: center;
  }

  .results-box button {
  width: 100%;
  padding: 12px 0;
  font-size: 18px;
  border-radius: 10px;
  margin-top: 12px;
}

.start-btn {
  width: 100%;
  padding: 12px 0;
  font-size: 18px;
  border-radius: 10px;
}

</style>
