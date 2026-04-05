<script lang="ts">
    import { goto } from "$app/navigation";

    let cardNumber = "";
    let expiry = "";
    let security = "";

    function formatCard(e: Event) {
        const input = e.target as HTMLInputElement;
        let val = input.value.replace(/[^0-9]/g, "").slice(0, 16);
        cardNumber = val.replace(/(.{4})/g, "$1-").replace(/-$/, "");
    }

    function formatExpiry(e: Event) {
        const input = e.target as HTMLInputElement;
        let val = input.value.replace(/[^0-9]/g, "").slice(0, 4);
        if (val.length >= 3) {
            expiry = val.slice(0, 2) + "/" + val.slice(2);
        } else {
            expiry = val;
        }
    }

    function formatSecurity(e: Event) {
        const input = e.target as HTMLInputElement;
        security = input.value.replace(/[^0-9]/g, "").slice(0, 3);
    }
</script>

<div class="page">
    <div class="popup">
        <div class="body">
            <div class="left">
                <img src="/rice-shower.gif" alt="Rice Shower" class="gif" />
            </div>

            <div class="right">
                <p class="message">H-hi there...<br>Do you th-think I could have your<br>credit card information, p-please?</p>

                <div class="fields">
                    <!-- svelte-ignore a11y_label_has_associated_control -->
                    <label>Card number:</label>
                    <input type="text" value={cardNumber} on:input={formatCard} maxlength="19" placeholder="•••• •••• •••• ••••" />
                    <!-- svelte-ignore a11y_label_has_associated_control -->
                    <label>Expiry date:</label>
                    <input type="text" value={expiry} on:input={formatExpiry} maxlength="5" placeholder="MM/YY" />
                    <!-- svelte-ignore a11y_label_has_associated_control -->
                    <label>Security code:</label>
                    <input type="text" value={security} on:input={formatSecurity} maxlength="3" placeholder="•••" />
                </div>

                <button class="submit-btn" on:click={() => goto("/settings")}>Th-thanks</button>
            </div>
        </div>
    </div>
</div>

<style>
    .page {
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px;
        box-sizing: border-box;
    }

    .popup {
        width: 100%;
        max-width: 520px;
        background: var(--box-bg);
        border: 2px solid var(--box-border);
        border-radius: 12px;
        overflow: hidden;
        font-family: monospace;
    }

    .body {
        display: flex;
    }

    .left {
        flex-shrink: 0;
        width: 180px;
        overflow: hidden;
    }

    .gif {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
    }

    .right {
        flex: 1;
        padding: 14px 16px;
        display: flex;
        flex-direction: column;
        gap: 10px;
        justify-content: center;
    }

    .message {
        font-size: 12px;
        color: var(--text);
        line-height: 1.5;
        margin: 0 0 2px;
        text-align: center;
    }

    .fields {
        display: grid;
        grid-template-columns: auto 1fr;
        gap: 6px 10px;
        align-items: center;
    }

    label {
        font-size: 12px;
        color: var(--text);
        white-space: nowrap;
        text-align: right;
    }

    input {
        width: 100%;
        padding: 5px 8px;
        font-size: 12px;
        font-family: monospace;
        border: 1.5px solid #555;
        border-radius: 6px;
        background: transparent;
        color: var(--text);
        box-sizing: border-box;
    }

    input:focus {
        outline: none;
        border-color: #4aa3ff;
    }

    .submit-btn {
        align-self: center;
        margin-top: 2px;
        padding: 7px 20px;
        font-size: 13px;
        font-family: monospace;
        border-radius: 8px;
        border: 1px solid var(--box-border);
        background: var(--button-bg);
        color: var(--button-text);
        cursor: pointer;
        transition: background 0.15s, transform 0.1s;
    }

    .submit-btn:hover {
        background: var(--button-hover);
        transform: scale(1.02);
    }

    .submit-btn:active {
        transform: scale(0.97);
    }
    @media (max-width: 500px) {
        .body {
            flex-direction: column;
        }

        .left {
            width: 100%;
            height: 200px;
        }

        .gif {
            object-position: center top;
        }

        .right {
            padding: 12px;
        }

        .fields {
            grid-template-columns: 1fr;
        }

        label {
            text-align: left;
            font-size: 11px;
        }

        input {
            width: 100%;
        }

        .submit-btn {
            width: 100%;
        }
    }
</style>
