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
  gap: 20px;
  padding: 1rem;
}


  .leaderboard-box,
  .race-box {
    width: 100%;
    border: 2px solid #444;
    padding: 15px;
    border-radius: 12px;
    background: #f8f8f8;
  }

.line {
  font-size: 12px;
}


  .player {
    background: #ECFFDC;
    border: 2px solid #90EE90;
  }
</style>

<p style="color:red">MOBILE UI</p>
