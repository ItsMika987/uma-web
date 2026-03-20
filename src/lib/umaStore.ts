import { writable } from "svelte/store";

export const selectedUma = writable<string | null>(null);

export const raceProgress = writable<number>(0);
export const raceRunning = writable<boolean>(false);
export const raceWinner = writable<string | null>(null);

export function startRace(uma: string) {
  selectedUma.set(uma);
  raceProgress.set(0);
  raceWinner.set(null);
  raceRunning.set(true);
}
