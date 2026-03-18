<script lang="ts">
  import { selectedUma } from "$lib/umaStore";
  import { goto } from "$app/navigation";

  let interval: ReturnType<typeof setInterval> | null = null;
  let playerUma: string | null = null;

  selectedUma.subscribe(v => playerUma = v);

  type Racer = {
    id: number;
    name: string;
    number: number;
    progress: number;
    isPlayer: boolean;
  };

  const names = [
    "Special Week", "Silence Suzuka", "Tokai Teio",
    "Mejiro McQueen", "Gold Ship", "Vodka",
    "Daiwa Scarlet", "Rice Shower", "Hishi Amazon",
    "Kitasan Black", "Satono Diamond", "Nice Nature",
    "Biwa Hayahide", "T.M. Opera O", "Air Groove",
    "Agnes Tachyon", "Symboli Rudolf", "Narita Brian"
  ];

  function shuffle<T>(arr: T[]): T[] {
    return [...arr].sort(() => Math.random() - 0.5);
  }

  let racers: Racer[] = [];
  let leaderboard: Racer[] = [];
  let finishOrder: Racer[] = [];

  let showResults = false;

  function makeTrack(p: number): string {
    const total = 50;
    const pos = Math.floor((p / 100) * total);
    return `[${"-".repeat(pos)}(.)${"-".repeat(total - pos)}]`;
  }

  function medal(i: number): string {
    if (i === 0) return "🥇";
    if (i === 1) return "🥈";
    if (i === 2) return "🥉";
    return "";
  }

  function startRace() {
    if (!playerUma) {
      alert("Please select an Uma first!");
      return;
    }

    if (interval) stopRace();

    leaderboard = [];
    finishOrder = [];
    showResults = false;

    const uniqueNumbers = shuffle([...Array(18)].map((_, i) => i + 1));

    racers = shuffle(
      names.map((name, i) => ({
        id: i + 1,
        name,
        number: uniqueNumbers[i],
        progress: 0,
        isPlayer: name === playerUma
      }))
    );

    interval = setInterval(() => {
      let allDone = true;

      racers.forEach(r => {
        if (r.progress < 100) {
          r.progress = Math.min(r.progress + (Math.random() * 2 + 1), 100);
          if (r.progress < 100) allDone = false;
        }

        if (r.progress >= 100 && !finishOrder.includes(r)) {
          finishOrder.push(r);
        }
      });

      racers = [...racers];

      leaderboard = [
        ...finishOrder,
        ...racers
          .filter(r => !finishOrder.includes(r))
          .sort((a, b) => b.progress - a.progress)
      ];

      if (allDone) stopRace();
    }, 80);
  }

  function stopRace() {
    clearInterval(interval!);
    interval = null;

    leaderboard = [...finishOrder];
    showResults = true;
  }

  function restartRace() {
    showResults = false;
    startRace();
  }
</script>

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
  border: 2px solid #444;
  padding: 20px;
  border-radius: 12px;
  background: #f8f8f8;
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
  background: white;
  border: 1px solid #cfcfcf;
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
  background: rgba(0,0,0,0.55);
  display: flex;
  justify-content: center;
  align-items: center;
}

.results-box {
  background: white;
  padding: 30px 40px;
  border-radius: 12px;
  border: 2px solid #444;
  text-align: center;
  width: 450px;
}

.results-box button {
  padding: 14px 40px;
  font-size: 20px;
  background: white;
  border: 1px solid #cfcfcf;
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

</style>

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
      <button on:click={() => goto("/menu")}>Return to Menu</button>
    </div>
  </div>
{/if}
