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
  :root {
    --button-bg: #e8e8e8;
    --button-text: #000;
    --button-hover: #f5f5f5;
    --button-border-hover: #b5b5b5;

    --player-bg: #d9f2da;
    --player-border: #3a8f3a;
    --first-bg: #fff4d0;
    --first-border: #d4a72c;
    --first-glow: 0 0 14px rgba(212, 167, 44, 0.9);
  }

  /* ⭐ Dark mode variables */
  :global(html.dark) {
    --player-bg: #1f3320;
    --player-border: #fa3a4d;
    --first-bg: #3a2008;
    --first-border: #d4a72c;
    --first-glow: 0 0 14px rgba(212, 167, 44, 0.9);

    --button-bg: #2a2a2a;
    --button-text: #fff;
    --button-hover: #3a3a3a;
    --button-border-hover: #666;
  }
</style>

