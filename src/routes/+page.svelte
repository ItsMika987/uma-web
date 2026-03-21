<script>
  import { goto } from "$app/navigation";

  function start() {
    goto("/home");
  }
</script>

<style>
  :global(html),
  :global(body) {
    margin: 0;
    padding: 0;
    font-family: monospace;
    background: var(--bg);
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
    font-size: clamp(2rem, 6vw, 3.5rem);
    margin: 0;
    color: var(--text);
  }

  h2 {
    font-size: clamp(0.9rem, 3.5vw, 1.2rem);
    margin: 8px 0 40px 0;
    opacity: 0.7;
    max-width: 500px;
    color: var(--text);
  }

  .start-btn {
    padding: 1rem 2.5rem;
    font-size: clamp(1rem, 4vw, 1.3rem);
    background: var(--button-bg);
    color: var(--button-text);
    border-radius: 12px;
    cursor: pointer;
    transition: background 0.15s, border-color 0.15s, transform 0.1s;
    touch-action: manipulation; 
  }

  .start-btn:hover {
    background: #f5f5f5;
    border-color: #b5b5b5;
    color: black;
    transform: scale(1.03);
  }
  .start-btn:active {
    transform: scale(0.96);
  }

  .footer {
    position: absolute;
    bottom: 20px;
    text-align: center;
    opacity: 0.6;
    font-size: clamp(0.7rem, 2.5vw, 0.9rem);
    line-height: 1.3;
    padding: 0 1rem;
  }
</style>

<div class="wrapper">
  <h1>Uma-Web</h1>
  <h2>a reconstruction of "Umamusume: Pretty Derby" for the web</h2>

  <button class="start-btn" on:click={start}>Start</button>

  <div class="footer">
    v0.0.5<br>
    made by @ItsMika987 on X
  </div>
</div>
