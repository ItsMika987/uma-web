<script lang="ts">
  import { darkMode } from '$lib/stores/theme';
  import { exportSave, importSave, resetSave } from '$lib/stores/game';
  import { goto } from '$app/navigation';

  let message = '';
  let messageType: 'success' | 'error' | '' = '';

  async function handleExport() {
    const data = await exportSave();
    const blob = new Blob([data], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'uma-web-save.uma';
    a.click();
    URL.revokeObjectURL(url);
    showMessage('Save exported!', 'success');
  }

  function handleImportFile(e: Event) {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (ev) => {
      const result = await importSave(ev.target?.result as string);
      if (result.ok) showMessage('Save loaded successfully!', 'success');
      else showMessage(`Error: ${result.error}`, 'error');
    };
    reader.readAsText(file);
  }

  function handleReset() {
    if (confirm('Reset all progress? This cannot be undone.')) {
      resetSave();
      showMessage('Save reset to default.', 'success');
    }
  }

  function showMessage(msg: string, type: 'success' | 'error') {
    message = msg;
    messageType = type;
    setTimeout(() => { message = ''; messageType = ''; }, 3000);
  }
</script>

<div class="settings-wrapper">
  <div class="settings-container">
    <h1>Settings</h1>

    <h2>Themes</h2>
    <div class="toggle-row">
      <span class="toggle-label">{$darkMode ? 'Dark Mode' : 'Light Mode'}</span>
      <button
        class="toggle-pill {$darkMode ? 'on' : ''}"
        on:click={() => darkMode.update(v => !v)}
        aria-label="Toggle dark mode"
      >
        <span class="toggle-thumb"></span>
      </button>
    </div>

    <div class="divider"></div>

    <h2>Save Data</h2>
    <p class="hint">Progress auto-saves to your browser. Use export/import to back up or transfer saves.</p>

    <button class="action-btn" on:click={handleExport}>Export Save</button>

    <div class="import-section">
      <label class="file-label">
        Load from file
        <input type="file" accept=".uma" on:change={handleImportFile} />
      </label>

    </div>

    <button class="action-btn danger" on:click={handleReset}>Reset Save</button>

    {#if message}
      <p class="message {messageType}">{message}</p>
    {/if}

    <div class="divider"></div>

    <button class="action-btn" on:click={() => goto('/home')}>Back</button>
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

  h2 {
    margin: 0 0 8px;
    font-size: 16px;
    color: var(--text);
    text-align: left;
  }

  .hint {
    font-size: 13px;
    opacity: 0.6;
    margin: 0 0 14px;
    color: var(--text);
    line-height: 1.5;
  }

  .toggle-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    padding: 10px 0;
  }

  .toggle-label {
    color: var(--text);
    font-size: 16px;
    font-family: monospace;
  }

  .toggle-pill {
    width: 52px;
    height: 28px;
    border-radius: 999px;
    border: 1px solid var(--box-border);
    background: var(--button-bg);
    cursor: pointer;
    padding: 0;
    position: relative;
    transition: background 0.2s, border-color 0.2s;
    flex-shrink: 0;
  }

  .toggle-pill.on {
    background: #3fa34d;
    border-color: #3fa34d;
  }

  .toggle-thumb {
    position: absolute;
    top: 3px;
    left: 3px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: white;
    transition: transform 0.2s;
    display: block;
  }

  .toggle-pill.on .toggle-thumb {
    transform: translateX(24px);
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

  .action-btn.danger {
    border-color: #c0392b;
    color: #c0392b;
  }

  .action-btn.danger:hover {
    background: #c0392b;
    color: white;
  }

  .import-section {
    margin-bottom: 10px;
  }

  .file-label {
    display: block;
    width: 100%;
    padding: 12px 0;
    font-size: 16px;
    background: var(--button-bg);
    color: var(--button-text);
    border: 1px solid var(--box-border);
    border-radius: 10px;
    cursor: pointer;
    transition: background 0.15s;
    margin-bottom: 10px;
    box-sizing: border-box;
    font-family: monospace;
  }

  .file-label input {
    display: none;
  }

  .file-label:hover {
    background: var(--button-hover);
  }


  .message {
    padding: 10px;
    border-radius: 8px;
    font-size: 14px;
    margin-top: 4px;
  }

  .message.success {
    background: var(--selected-bg);
    border: 1px solid var(--selected-border);
    color: var(--text);
  }

  .message.error {
    background: #3a0a0a;
    border: 1px solid #c0392b;
    color: #ff6b6b;
  }
</style>
