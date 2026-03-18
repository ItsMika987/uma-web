import { writable } from "svelte/store";

const saved = typeof localStorage !== "undefined"
  ? localStorage.getItem("darkMode") === "true"
  : false;

export const darkMode = writable(saved);

darkMode.subscribe(v => {
  if (typeof localStorage !== "undefined") {
    localStorage.setItem("darkMode", v ? "true" : "false");
  }
});

