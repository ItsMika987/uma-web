<script lang="ts">
  import { darkMode } from '$lib/stores/theme';
  import { goto } from '$app/navigation';

</script>

<div class="settings-wrapper">
  <div class="settings-container">
    <h1>Secrets</h1>
    <p class="hint">All the uma funnies that are randomly made OwO.</p>
    
    <div class="divider"></div>

    <button class="action-btn" on:click={() => goto('/secrets/free-money')}>Free Money</button>

    <div class="divider"></div>

    <button class="action-btn" on:click={() => goto('/')}>Back</button>
  </div>
</div>

<style>
  .settings-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    padding: 20px;
    box-sizing: border-box;
  }

  .settings-container {
    width: 100%;
    max-width: 400px;
    padding: 24px;
    background: var(--box-bg);
    border: 2px solid var(--box-border);
    border-radius: 12px;
    text-align: center;
  }

  h1 {
    margin: 0 0 20px;
    font-size: 22px;
    color: var(--text);
  }

  .hint {
    font-size: 13px;
    opacity: 0.6;
    margin: 0 0 14px;
    color: var(--text);
    line-height: 1.5;
  }

  .divider {
    border-top: 1px solid var(--box-border);
    margin: 20px 0;
  }

  .action-btn {
    width: 100%;
    padding: 12px 0;
    font-size: 16px;
    background: var(--button-bg);
    color: var(--button-text);
    border: 1px solid var(--box-border);
    border-radius: 10px;
    cursor: pointer;
    transition: background 0.15s, border-color 0.15s, transform 0.1s;
    margin-bottom: 10px;
    font-family: monospace;
  }

  .action-btn:hover {
    background: var(--button-hover);
    border-color: var(--button-border-hover);
    transform: scale(1.02);
  }

</style>
