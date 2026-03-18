<script lang="ts">
  import favicon from '$lib/assets/favicon.svg';
  import { darkMode } from '$lib/stores/theme';
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

<svelte:body class:dark={$darkMode} />

<slot />

<style>
  :global(body.dark) {
    background: #121212;
    color: #e5e5e5;
  }

  :global(body.dark .box),
  :global(body.dark .leaderboard-box),
  :global(body.dark .race-box),
  :global(body.dark .results-box),
  :global(body.dark .settings-box) {
    background: #1e1e1e !important;
    border-color: #333 !important;
  }

  :global(body.dark button) {
    background: #2a2a2a !important;
    color: #fff !important;
    border-color: #444 !important;
  }
</style>
