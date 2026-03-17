<script>
  import { goto } from "$app/navigation";

  function startGame() {
    goto("/select");
  }

  function goBack() {
    goto("/");
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
    font-size: 42px;
    margin-bottom: 40px;
  }

  .menu-buttons {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
  }

  .menu-btn,
  .soon-btn {
    padding: 14px 40px;
    font-size: 20px;
    border-radius: 10px;
    cursor: pointer;
    width: 260px; 
    transition: background 0.15s, border-color 0.15s, transform 0.1s;
  }

  .menu-btn {
    background: white;
    border: 1px solid #cfcfcf;
  }

  .menu-btn:hover {
    background: #f5f5f5;
    border-color: #b5b5b5;
    transform: scale(1.03);
  }

  .soon-btn {
    background: rgb(16, 8, 8);
    border: 2px solid rgb(16, 8, 8);
  }

  .soon-btn:hover {
    background: #f5f5f5;
    border-color: #b5b5b5;
    color: black;
    transform: scale(1.03);
  }

  .bottom-row {
    margin-top: 150px;
    display: flex;
    justify-content: center;
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
  </div>
</div>
