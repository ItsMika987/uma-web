<script lang="ts">
  import favicon from '$lib/assets/favicon.svg';
  import { darkMode } from '$lib/stores/theme';

  // ⭐ Apply dark mode class to <html> manually
  $: {
    if (typeof document !== 'undefined') {
      document.documentElement.classList.toggle('dark', $darkMode);
    }
  }
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

<slot />

<style>
  /* ⭐ Light mode variables */
  :global(html) {
    --bg: #ffffff;
    --text: #000000;
    --box-bg: #f5f5f5;
    --box-border: #cccccc;
    --button-bg: #eaeaea;
    --button-text: #000000;
    --selected-bg: #ECFFDC;
    --selected-border: #90EE90;
    --player-bg: #ECFFDC;
    --player-border: #90EE90;
    --first-bg: #fff7d1;
    --first-border: #ffcc4d;
    --first-glow: 0 0 12px rgba(255, 204, 77, 0.7);
  }

  /* ⭐ Dark mode variables */
  :global(html.dark) {
    --bg: #121212;
    --text: #e5e5e5;
    --box-bg: #1e1e1e;
    --box-border: #333333;
    --button-bg: #2a2a2a;
    --button-text: #ffffff;
    --selected-bg: #1f3320;
    --selected-border: #3fa34d;
    --player-bg: #1f3320;
    --player-border: #3fa34d;
    --first-bg: #3a3008;
    --first-border: #d4a72c;
    --first-glow: 0 0 14px rgba(212, 167, 44, 0.9);
  }

  /* ⭐ Apply background + text color to HTML (works for both modes) */
  :global(html) {
    background: var(--bg);
    color: var(--text);
    margin: 0;
    padding: 0;
    font-family: monospace;
  }
</style>

