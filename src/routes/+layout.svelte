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
  :global(body) {
    --bg: #ffffff;
    --text: #000000;
    --box-bg: #f5f5f5;
    --box-border: #cccccc;
    --button-bg: #eaeaea;
    --button-text: #000000;
  }

  :global(body.dark) {
    --bg: #121212;
    --text: #e5e5e5;
    --box-bg: #1e1e1e;
    --box-border: #333333;
    --button-bg: #2a2a2a;
    --button-text: #ffffff;
  }
</style>

