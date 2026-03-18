<script lang="ts">
  export let racers;
  export let leaderboard;
  export let finishOrder;
  export let showResults;
  export let startRace;
  export let restartRace;
  export let gotoMenu;
  export let medal;
  export let makeTrack;
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

      {#each finishOrder as r, i}
        <p class="{r.isPlayer ? 'player' : ''}">
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
  }

  .leaderboard-box,
  .race-box {
    width: 100%;
    border: 2px solid #444;
    padding: 12px;
    border-radius: 12px;
    background: #ffffff;
    box-shadow: 0 2px 6px rgba(0,0,0,0.08);
  }

.leaderboard-box,
.race-box {
  max-width: 50%;
  overflow: hidden;
}


strong {
  font-size: 14px;
}

.leaderboard-box div,
.race-box .line {
  font-size: 11px;
}


  .racer-block {
    margin-bottom: 6px;
  }

  .line {
    white-space: pre;
    font-family: monospace;
  }

  .player {
    background: #ECFFDC;
    border: 2px solid #90EE90;
    padding: 4px;
    border-radius: 6px;
  }

  .start-btn {
    margin-top: 12px;
    width: 100%;
    padding: 10px;
    font-size: 15px;
    border-radius: 10px;
    border: 1px solid #ccc;
    background: #f5f5f5;
  }

  /* Results overlay */
  .results-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.45);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .results-box {
    width: 90%;
    max-width: 360px;
    background: white;
    padding: 18px;
    border-radius: 14px;
    text-align: center;
  }

  .results-box p {
    font-size: 14px;
    margin: 4px 0;
  }

  .results-box button {
    width: 100%;
    padding: 10px;
    margin-top: 10px;
    border-radius: 10px;
    border: 1px solid #ccc;
    background: #f5f5f5;
  }
</style>

