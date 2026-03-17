<script>
  import { goto } from "$app/navigation";

  function start() {
    goto("/menu");
  }
</script>

<style>
  :global(html),
  :global(body) {
    height: 100%;
    margin: 0;
    padding: 0;
    overflow: hidden;
    font-family: monospace;
    background: #fafafa;
  }

  .wrapper {
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
  }

  h1 {
    font-size: 48px;
    margin: 0;
  }

  h2 {
    font-size: 18px;
    margin: 8px 0 40px 0;
    opacity: 0.7;
  }

  .start-btn {
    padding: 14px 40px;
    font-size: 20px;
    background: white;
    border: 1px solid #cfcfcf;
    border-radius: 10px;
    cursor: pointer;
    transition: background 0.15s, border-color 0.15s, transform 0.1s;
  }

  .start-btn:hover {
    background: #f5f5f5;
    border-color: #b5b5b5;
    transform: scale(1.03);
  }

  .footer {
    position: absolute;
    bottom: 20px;
    text-align: center;
    opacity: 0.6;
    font-size: 14px;
    line-height: 1.3;
  }
</style>

<div class="wrapper">
  <h1>Uma-Web</h1>
  <h2>a reconstruction of "Umamusume: Pretty Derby" for the web</h2>

  <button class="start-btn" on:click={start}>Start</button>

  <div class="footer">
    v0.0.1<br>npm
    made by @ItsMika987 on X
  </div>
</div>
