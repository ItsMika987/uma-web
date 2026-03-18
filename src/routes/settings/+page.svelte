<script lang="ts">
  import { darkMode } from "$lib/stores/theme";
  import { goto } from "$app/navigation";
</script>

<div class="settings-box">
  <h2>Settings</h2>

  <div class="setting-row">
    <label for="dark-toggle">Dark Mode</label>
    <input id="dark-toggle" type="checkbox" bind:checked={$darkMode} />
  </div>

  <button class="back-btn" on:click={() => goto('/menu')}>
    Back to Menu
  </button>
</div>

<style>
  .settings-box {
    max-width: 420px;
    margin: 40px auto;
    padding: 20px;
    border: 2px solid #444;
    border-radius: 12px;
    background: #fff;
  }

  h2 {
    text-align: center;
    margin-bottom: 20px;
  }

  .setting-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 0;
    font-size: 18px;
  }

  input[type="checkbox"] {
    transform: scale(1.4);
  }

  .back-btn {
    width: 100%;
    margin-top: 20px;
    padding: 12px;
    border-radius: 10px;
    border: 1px solid #ccc;
    background: #f5f5f5;
    font-size: 16px;
  }
</style>
