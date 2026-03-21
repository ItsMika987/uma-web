<script lang="ts">
  import { afterNavigate } from '$app/navigation';
  import favicon from '$lib/assets/favicon.svg';
  import { darkMode } from '$lib/stores/theme';

  afterNavigate(() => {
    requestAnimationFrame(() => {
      window.scrollTo(0, 0);
    });
  });

  // Apply dark mode to <html>
  $: {
    if (typeof document !== 'undefined') {
      document.documentElement.classList.toggle('dark', $darkMode);
    }
  }
</script>

<svelte:head>
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <link rel="icon" href={favicon} />
</svelte:head>

<!-- ⭐ No wrappers. No scroll containers. Let the browser handle it. -->
<slot />

<style>
  /* Light mode */
  :global(html) {
    --bg: #ffffff;
    --text: #000000;

    --box-bg: #f5f5f5;
    --box-border: #cccccc;

    --button-bg: #eaeaea;
    --button-text: #000000;
    --button-hover: #f5f5f5;
    --button-border-hover: #b5b5b5;

    --selected-bg: #ECFFDC;
    --selected-border: #90EE90;

    --player-bg: #ECFFDC;
    --player-border: #90EE90;

    --first-bg: #fff7d1;
    --first-border: #ffcc4d;
    --first-glow: 0 0 12px rgba(255, 204, 77, 0.7);

    background: var(--bg);
    color: var(--text);
    margin: 0;
    padding: 0;
    font-family: monospace;
    -webkit-text-size-adjust: 100%;
    min-height: 100%;
  }

  :global(body) {
    min-height: 100vh;
  }

  /* Dark mode */
  :global(html.dark) {
    --bg: #121212;
    --text: #e5e5e5;

    --box-bg: #1e1e1e;
    --box-border: #333333;

    --button-bg: #2a2a2a;
    --button-text: #ffffff;
    --button-hover: #3a3a3a;
    --button-border-hover: #666;

    --selected-bg: #1f3320;
    --selected-border: #3fa34d;

    --player-bg: #1f3320;
    --player-border: #3fa34d;

    --first-bg: #3a3008;
    --first-border: #d4a72c;
    --first-glow: 0 0 14px rgba(212, 167, 44, 0.9);
  }
</style>
