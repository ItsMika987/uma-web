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
.layout {
  display: flex;
  justify-content: center;
  gap: 30px;
  margin-top: 40px;
  font-family: monospace;
}

.leaderboard-box,
.race-box {
  padding: 20px;
  border-radius: 12px;
  background: var(--box-bg);
  color: var(--text);
  border-color: var(--box-border);
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

.line {
  white-space: pre;
  font-size: 16px;
  margin: 0;
  padding: 0;
  line-height: 1.3;
  text-align: center;
}

.player {
  background: #ECFFDC;
  border: 2px solid #90EE90;
}

.start-btn {
  margin-top: 20px;
  width: 100%;
  padding: 10px 0;
  font-size: 16px;
  background: var(--button-bg);
  color: var(--button-text);
  border-color: var(--box-border);
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.15s, border-color 0.15s;
}

.start-btn:hover {
  background: #f5f5f5;
  border-color: #b5b5b5;
  transform: scale(1.03);
}

/* ⭐ RESULTS POPUP */
.results-overlay {
  position: fixed;
  inset: 0;
  background: var(--bg);
  display: flex;
  justify-content: center;
  align-items: center;
}

.results-box {
  padding: 30px 40px;
  border-radius: 12px;
  background: var(--box-bg);
  color: var(--text);
  border-color: var(--box-border);
  text-align: center;
  width: 450px;
}

.results-box button {
  padding: 14px 40px;
  font-size: 20px;
  background: var(--button-bg);
  color: var(--button-text);
  border-color: var(--box-border);
  border-radius: 10px;
  cursor: pointer;
  transition: background 0.15s, border-color 0.15s, transform 0.1s;
}

.results-box button:hover {
  background: #f5f5f5;
  border-color: #b5b5b5;
  transform: scale(1.03);
}

.results-box p.player {
  padding: 6px;
  border-radius: 6px;
}

.results-box button + button {
  margin-top: 10px;
}

/* MOBILE FIXES — PC UNAFFECTED */
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
