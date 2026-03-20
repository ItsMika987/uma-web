import { writable } from "svelte/store";

export const roster = writable<string[]>([
    "vodka",
    "daiwa_scarlet",
    "haru_urara",
    "sakura_bakushin_o",
    "gold_ship"
]);
