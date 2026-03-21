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
  export let showResults;
  export let startRace;
  export let restartRace;
  export let gotoMenu;
  export let medal;
  export let makeTrack;

  // ⭐ Correct ordinal suffixes (1st, 2nd, 3rd, 4th...)
  function ordinal(n: number): string {
    const s = ["th", "st", "nd", "rd"];
    const v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
  }
</script>


<div class="layout">
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
      <!-- ⭐ Player highlighted on the racecourse -->
      <div class="racer-block {r.isPlayer ? 'race-highlight' : ''}">
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

      <!-- ⭐ Correct placement banner -->
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
      <button on:click={gotoMenu}>Return to Home</button>
    </div>
  </div>
{/if}

<style>
  .layout {
    display: flex;
    justify-content: center;
    gap: 30px;
    margin-top: 40px;
    font-family: monospace;
    background: var(--bg);
    color: var(--text);
    width: 100%;
    max-width: 100%;
  }

  .leaderboard-box,
  .race-box {
    padding: 20px;
    border-radius: 12px;
    background: var(--box-bg);
    color: var(--text);
    border: 2px solid var(--box-border);
    text-align: center;
  }

  .leaderboard-box {
    width: 260px;
    max-height: 600px;
    overflow-y: auto;
  }

  .race-box {
    width: 600px;
    max-height: 600px;
    overflow-y: auto;
  }

  .racer-block {
    margin-bottom: 12px;
    padding: 4px;
    border-radius: 6px;
    text-align: center;
  }

  /* ⭐ Player highlight ON the racecourse */
  .race-highlight {
    background: var(--player-bg);
    border: 2px solid var(--player-border);
    border-radius: 6px;
    padding: 4px;
  }

  .line {
    white-space: pre;
    font-size: 16px;
    margin: 0;
    padding: 0;
    line-height: 1.3;
    text-align: center;
  }

  /* ⭐ Player highlight (leaderboard + results) */
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

  /* ⭐ Placement banner */
  .placement-banner {
    margin-top: -10px;
    margin-bottom: 14px;
    font-size: 20px;
    font-weight: bold;
    color: var(--text);
  }

  .start-btn {
    margin-top: 20px;
    width: 100%;
    padding: 10px 0;
    font-size: 16px;
    background: var(--button-bg);
    color: var(--button-text);
    border: 1px solid var(--box-border);
    border-radius: 8px;
    cursor: pointer;
    transition: background 0.15s, border-color 0.15s, transform 0.1s;
  }

  .start-btn:hover {
    background: #f5f5f5;
    border-color: #b5b5b5;
    color: black;
    transform: scale(1.03);
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
    padding: 20px 28px;
    border-radius: 12px;
    background: var(--box-bg);
    color: var(--text);
    border: 2px solid var(--box-border);
    text-align: center;
    width: 340px;
  }

  .results-box button {
    padding: 10px 28px;
    font-size: 16px;
    background: var(--button-bg);
    color: var(--button-text);
    border: 1px solid var(--box-border);
    border-radius: 10px;
    cursor: pointer;
    transition: background 0.15s, border-color 0.15s, transform 0.1s;
  }

  .results-box button:hover {
    background: #f5f5f5;
    border-color: #b5b5b5;
    color: black;
    transform: scale(1.03);
  }

  .results-box button + button {
    margin-top: 10px;
  }

  @media (max-width: 900px) {
    .layout {
      flex-direction: column;
      align-items: center;
      gap: 20px;
      margin-top: 20px;
    }

    .leaderboard-box,
    .race-box {
      width: 100% !important;
      max-width: none !important;
      max-height: none;
    }

    .line {
      font-size: 12px !important;
    }
  }
</style>
