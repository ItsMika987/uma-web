<script>
  import { goto } from "$app/navigation";

  function startGame() {
    goto("/select");
  }

  function goBack() {
    goto("/");
  }

  function settings() {
    goto("/settings");
  }
</script>

<style>
  :global(html),
  :global(body) {
    height: 100%;
    margin: 0;
    padding: 0;
    font-family: monospace;
    background: var(--bg);
    overflow-x: hidden;
  }

  .wrapper {
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 1.5rem;
    box-sizing: border-box;
  }

  h1 {
    font-size: clamp(2rem, 6vw, 3rem);
    margin-bottom: 2.5rem;
    color: var(--text);
  }

  .menu-buttons {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 14px;
    width: 100%;
    max-width: 320px;
  }

  .menu-btn,
  .soon-btn {
    padding: 1rem 2rem;
    font-size: clamp(1rem, 4vw, 1.2rem);
    border-radius: 12px;
    cursor: pointer;
    width: 100%;
    transition: background 0.15s, border-color 0.15s, transform 0.1s;
    touch-action: manipulation;
    border: 1px solid var(--box-border);
  }

  .menu-btn {
    background: var(--button-bg);
    color: var(--button-text);
  }

  .menu-btn:hover {
    background: #f5f5f5;
    border-color: #b5b5b5;
    transform: scale(1.03);
  }

  .menu-btn:active {
    transform: scale(0.96);
  }

  .soon-btn {
    background: var(--button-bg);
    color: var(--button-text);
  }

  .soon-btn:hover {
    background: #f5f5f5;
    border-color: #b5b5b5;
    color: black;
    transform: scale(1.03);
  }

  .bottom-row {
    margin-top: clamp(3rem, 12vw, 6rem);
    width: 100%;
    max-width: 320px;
    display: flex;
    justify-content: center;
    gap: 10px;
  }
</style>

<div class="wrapper">
  <h1>Main Menu</h1>

  <div class="menu-buttons">
    <button class="soon-btn">Scout - soon</button>
    <button class="menu-btn" on:click={startGame}>Race</button>
    <button class="soon-btn">Story - soon</button>
    <button class="soon-btn">Enhance - soon</button>
  </div>

  <div class="bottom-row">
    <button class="menu-btn" on:click={goBack}>Title Screen</button>
    <button class="menu-btn" on:click={settings}>Settings</button>
  </div>
</div>
