const styles = `
    .n8n-chat-widget {
        --chat--color-primary: var(--n8n-chat-primary-color, #F38F42);
        --chat--color-secondary: var(--n8n-chat-secondary-color, #D76B1F);
        --chat--color-background: var(--n8n-chat-background-color, #FFFFFF);
        --chat--color-font: var(--n8n-chat-font-color, #1F2933);
        font-family: 'Geist Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    }

    .n8n-chat-widget .chat-container {
        position: fixed;
        bottom: 24px;
        right: 24px;
        z-index: 1000;
        display: none;
        width: 380px;
        height: 560px;
        background: var(--chat--color-background);
        border-radius: 18px;
        box-shadow: 0 18px 45px rgba(0, 0, 0, 0.18);
        border: 1px solid rgba(0, 0, 0, 0.05);
        overflow: hidden;
        font-family: inherit;
    }

    .n8n-chat-widget .chat-container.position-left {
        right: auto;
        left: 24px;
    }

    .n8n-chat-widget .chat-container.open {
        display: flex;
        flex-direction: column;
    }

    .n8n-chat-widget .brand-header {
        padding: 18px 20px;
        display: flex;
        align-items: center;
        gap: 12px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.04);
        position: relative;
        background: linear-gradient(135deg, rgba(243, 143, 66, 0.12), rgba(215, 107, 31, 0.06));
        backdrop-filter: blur(18px);
    }

    .n8n-chat-widget .close-button {
        position: absolute;
        right: 18px;
        top: 50%;
        transform: translateY(-50%);
        background: transparent;
        border: none;
        color: var(--chat--color-font);
        cursor: pointer;
        padding: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: opacity 0.2s, transform 0.15s;
        font-size: 18px;
        opacity: 0.55;
    }

    .n8n-chat-widget .close-button:hover {
        opacity: 0.9;
        transform: translateY(-50%) scale(1.02);
    }

    .n8n-chat-widget .brand-header img {
        width: 32px;
        height: 32px;
        border-radius: 10px;
        object-fit: contain;
    }

    .n8n-chat-widget .brand-header span {
        font-size: 16px;
        font-weight: 600;
        letter-spacing: 0.02em;
        color: var(--chat--color-font);
    }

    .n8n-chat-widget .new-conversation {
        position: absolute;
        top: 52%;
        left: 50%;
        transform: translate(-50%, -50%);
        padding: 20px;
        text-align: center;
        width: 100%;
        max-width: 300px;
    }

    .n8n-chat-widget .welcome-text {
        font-size: 22px;
        font-weight: 600;
        color: var(--chat--color-font);
        margin-bottom: 18px;
        line-height: 1.3;
    }

    .n8n-chat-widget .new-chat-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        width: 100%;
        padding: 14px 22px;
        background: linear-gradient(135deg, var(--chat--color-primary) 0%, var(--chat--color-secondary) 100%);
        color: white;
        border: none;
        border-radius: 999px;
        cursor: pointer;
        font-size: 15px;
        transition: transform 0.22s ease, box-shadow 0.22s ease;
        font-weight: 500;
        font-family: inherit;
        margin-bottom: 10px;
        box-shadow: 0 10px 25px rgba(243, 143, 66, 0.35);
    }

    .n8n-chat-widget .new-chat-btn:hover {
        transform: translateY(-1px);
        box-shadow: 0 14px 32px rgba(243, 143, 66, 0.45);
    }

    .n8n-chat-widget .message-icon {
        width: 18px;
        height: 18px;
    }

    .n8n-chat-widget .response-text {
        font-size: 13px;
        color: var(--chat--color-font);
        opacity: 0.7;
        margin: 0;
    }

    .n8n-chat-widget .chat-interface {
        display: none;
        flex-direction: column;
        height: 100%;
    }

    .n8n-chat-widget .chat-interface.active {
        display: flex;
    }

    .n8n-chat-widget .chat-messages {
        flex: 1;
        overflow-y: auto;
        padding: 18px 18px 16px;
        background: radial-gradient(circle at top left, #FFF5EC 0, #FFFFFF 50%);
        display: flex;
        flex-direction: column;
    }

    .n8n-chat-widget .chat-message {
        padding: 11px 14px;
        margin: 6px 0;
        border-radius: 14px;
        max-width: 82%;
        word-wrap: break-word;
        font-size: 14px;
        line-height: 1.5;
    }

    .n8n-chat-widget .chat-message.user {
        background: linear-gradient(135deg, #F38F42 0%, #D76B1F 100%);
        color: #FFFFFF;
        align-self: flex-end;
        box-shadow: 0 8px 22px rgba(215, 107, 31, 0.45);
        border: none;
        border-bottom-right-radius: 4px;
    }

    .n8n-chat-widget .chat-message.bot {
        background: #FFFFFF;
        border: 1px solid rgba(243, 143, 66, 0.25);
        color: var(--chat--color-font);
        align-self: flex-start;
        box-shadow: 0 6px 18px rgba(0, 0, 0, 0.03);
        white-space: normal;
        border-bottom-left-radius: 4px;
    }

    .n8n-chat-widget .chat-input {
        padding: 12px 14px;
        background: rgba(255, 255, 255, 0.98);
        border-top: 1px solid rgba(0, 0, 0, 0.04);
        display: flex;
        gap: 8px;
        align-items: center;
    }

    .n8n-chat-widget .chat-input textarea {
        flex: 1;
        padding: 10px 12px;
        border: 1px solid rgba(0, 0, 0, 0.08);
        border-radius: 999px;
        background: #F9FAFB;
        color: var(--chat--color-font);
        resize: none;
        font-family: inherit;
        font-size: 13px;
        line-height: 1.4;
    }

    .n8n-chat-widget .chat-input textarea::placeholder {
        color: var(--chat--color-font);
        opacity: 0.55;
    }

    .n8n-chat-widget .chat-input button {
        background: linear-gradient(135deg, var(--chat--color-primary) 0%, var(--chat--color-secondary) 100%);
        color: white;
        border: none;
        border-radius: 999px;
        padding: 8px 18px;
        cursor: pointer;
        transition: transform 0.18s ease, box-shadow 0.18s ease;
        font-family: inherit;
        font-weight: 500;
        font-size: 13px;
        box-shadow: 0 8px 20px rgba(243, 143, 66, 0.35);
    }

    .n8n-chat-widget .chat-input button:hover {
        transform: translateY(-1px);
        box-shadow: 0 12px 26px rgba(243, 143, 66, 0.45);
    }

    .n8n-chat-widget .chat-toggle {
        position: fixed;
        bottom: 24px;
        right: 24px;
        width: 58px;
        height: 58px;
        border-radius: 999px;
        background: linear-gradient(135deg, var(--chat--color-primary) 0%, var(--chat--color-secondary) 100%);
        color: white;
        border: none;
        cursor: pointer;
        box-shadow: 0 14px 30px rgba(243, 143, 66, 0.55);
        z-index: 999;
        transition: transform 0.22s ease, box-shadow 0.22s ease;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .n8n-chat-widget .chat-toggle.position-left {
        right: auto;
        left: 24px;
    }

    .n8n-chat-widget .chat-toggle:hover {
        transform: translateY(-1px) scale(1.02);
        box-shadow: 0 18px 40px rgba(243, 143, 66, 0.65);
    }

    .n8n-chat-widget .chat-toggle svg {
        width: 24px;
        height: 24px;
        fill: currentColor;
    }
`;
