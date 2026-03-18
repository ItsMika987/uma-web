<script lang="ts">
  import { selectedUma } from "$lib/umaStore";
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";

  import RacePC from "$lib/ui/RacePC.svelte";
  import RaceMobile from "$lib/ui/RaceMobile.svelte";

  // -----------------------------
  // FIX 1 — Hydrate store BEFORE rendering (Samsung Internet fix)
  // -----------------------------
  selectedUma.update(v => v);

  // -----------------------------
  // TYPES
  // -----------------------------
  type Racer = {
    id: number;
    name: string;
    number: number;
    progress: number;
    isPlayer: boolean;
  };

  // -----------------------------
  // FIX 2 — Reliable mobile detection (Samsung Internet + Chrome)
  // -----------------------------
  let isMobile: boolean =
    typeof window !== "undefined"
      ? window.matchMedia("(max-width: 900px)").matches
      : false;

  onMount(() => {
    const check = () => {
      isMobile = window.matchMedia("(max-width: 900px)").matches;
    };

    check();
    window.addEventListener("resize", check);
  });

  // -----------------------------
  // STATE
  // -----------------------------
  let interval: ReturnType<typeof setInterval> | null = null;
  let playerUma: string | null = null;

  let racers: Racer[] = [];
  let leaderboard: Racer[] = [];
  let finishOrder: Racer[] = [];
  let showResults: boolean = false;

  selectedUma.subscribe((v: string | null) => {
    playerUma = v;
  });

  // -----------------------------
  // DATA
  // -----------------------------
  const names: string[] = [
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

  // -----------------------------
  // HELPERS
  // -----------------------------
  function makeTrack(p: number): string {
    const total = isMobile ? 18 : 50;
    const pos = Math.floor((p / 100) * total);
    return `[${"-".repeat(pos)}(.)${"-".repeat(total - pos)}]`;
  }

  function medal(i: number): string {
    return ["🥇", "🥈", "🥉"][i] || "";
  }

  // -----------------------------
  // RACE LOGIC
  // -----------------------------
  function startRace(): void {
    if (!playerUma) return;

    if (interval) clearInterval(interval);

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

      racers.forEach((r: Racer) => {
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

      if (allDone) {
        clearInterval(interval!);
        interval = null;
        showResults = true;
      }
    }, 80);
  }

  function restartRace(): void {
    showResults = false;
    startRace();
  }

  function gotoMenu(): void {
    goto("/menu");
  }
</script>

{#if isMobile}
  <RaceMobile
    {racers} {leaderboard} {finishOrder} {showResults}
    {startRace} {restartRace} {gotoMenu}
    {medal} {makeTrack}
  />
{:else}
  <RacePC
    {racers} {leaderboard} {finishOrder} {showResults}
    {startRace} {restartRace} {gotoMenu}
    {medal} {makeTrack}
  />
{/if}
