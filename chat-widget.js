const styles = `
    .n8n-chat-widget {
        --chat--color-primary: #FF8C42;
        --chat--color-secondary: #FF6B35;
        --chat--color-accent: #FFA366;
        --chat--color-background: #FAFAFA;
        --chat--color-font: #2C2C2C;
        font-family: 'Inter', 'Geist Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
    }

    .n8n-chat-widget .chat-container {
        position: fixed;
        bottom: 24px;
        right: 24px;
        z-index: 1000;
        display: none;
        width: 400px;
        height: 600px;
        background: linear-gradient(145deg, #FFFFFF 0%, #FFF8F3 100%);
        border-radius: 24px;
        box-shadow: 0 25px 50px rgba(255, 107, 53, 0.15), 0 10px 30px rgba(0, 0, 0, 0.08);
        border: 1px solid rgba(255, 140, 66, 0.12);
        overflow: hidden;
        font-family: inherit;
        backdrop-filter: blur(20px);
    }

    .n8n-chat-widget .chat-container.position-left {
        right: auto;
        left: 24px;
    }

    .n8n-chat-widget .chat-container.open {
        display: flex;
        flex-direction: column;
        animation: slideUp 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    @keyframes slideUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .n8n-chat-widget .brand-header {
        padding: 24px 24px 20px;
        display: flex;
        align-items: center;
        gap: 14px;
        border-bottom: 1px solid rgba(255, 140, 66, 0.1);
        position: relative;
        background: linear-gradient(135deg, rgba(255, 140, 66, 0.08) 0%, rgba(255, 107, 53, 0.04) 100%);
        backdrop-filter: blur(10px);
    }

    .n8n-chat-widget .close-button {
        position: absolute;
        right: 20px;
        top: 50%;
        transform: translateY(-50%);
        background: rgba(255, 140, 66, 0.08);
        border: none;
        color: var(--chat--color-secondary);
        cursor: pointer;
        padding: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        font-size: 20px;
        opacity: 0.7;
        border-radius: 12px;
        width: 36px;
        height: 36px;
    }

    .n8n-chat-widget .close-button:hover {
        opacity: 1;
        background: rgba(255, 140, 66, 0.15);
        transform: translateY(-50%) rotate(90deg);
    }

    .n8n-chat-widget .brand-header img {
        width: 36px;
        height: 36px;
        border-radius: 12px;
        object-fit: contain;
        box-shadow: 0 4px 12px rgba(255, 140, 66, 0.2);
    }

    .n8n-chat-widget .brand-header span {
        font-size: 17px;
        font-weight: 600;
        letter-spacing: -0.01em;
        color: var(--chat--color-font);
        background: linear-gradient(135deg, #FF8C42 0%, #FF6B35 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }

    .n8n-chat-widget .new-conversation {
        position: absolute;
        top: 52%;
        left: 50%;
        transform: translate(-50%, -50%);
        padding: 24px;
        text-align: center;
        width: 100%;
        max-width: 320px;
    }

    .n8n-chat-widget .welcome-text {
        font-size: 24px;
        font-weight: 700;
        background: linear-gradient(135deg, #FF8C42 0%, #FF6B35 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        margin-bottom: 20px;
        line-height: 1.3;
        letter-spacing: -0.02em;
    }

    .n8n-chat-widget .new-chat-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        width: 100%;
        padding: 16px 28px;
        background: linear-gradient(135deg, #FF8C42 0%, #FF6B35 100%);
        color: white;
        border: none;
        border-radius: 16px;
        cursor: pointer;
        font-size: 15px;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        font-weight: 600;
        font-family: inherit;
        margin-bottom: 12px;
        box-shadow: 0 12px 28px rgba(255, 107, 53, 0.35), 0 4px 12px rgba(255, 140, 66, 0.2);
        letter-spacing: 0.01em;
    }

    .n8n-chat-widget .new-chat-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 16px 36px rgba(255, 107, 53, 0.45), 0 6px 16px rgba(255, 140, 66, 0.3);
    }

    .n8n-chat-widget .new-chat-btn:active {
        transform: translateY(0px);
    }

    .n8n-chat-widget .message-icon {
        width: 20px;
        height: 20px;
    }

    .n8n-chat-widget .response-text {
        font-size: 13px;
        color: var(--chat--color-font);
        opacity: 0.6;
        margin: 0;
        font-weight: 400;
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
        padding: 20px;
        background: linear-gradient(180deg, #FFFAF6 0%, #FFFFFF 100%);
        display: flex;
        flex-direction: column;
        gap: 4px;
    }

    .n8n-chat-widget .chat-messages::-webkit-scrollbar {
        width: 6px;
    }

    .n8n-chat-widget .chat-messages::-webkit-scrollbar-track {
        background: transparent;
    }

    .n8n-chat-widget .chat-messages::-webkit-scrollbar-thumb {
        background: rgba(255, 140, 66, 0.3);
        border-radius: 10px;
    }

    .n8n-chat-widget .chat-messages::-webkit-scrollbar-thumb:hover {
        background: rgba(255, 140, 66, 0.5);
    }

    .n8n-chat-widget .chat-message {
        padding: 14px 18px;
        margin: 4px 0;
        border-radius: 18px;
        max-width: 80%;
        word-wrap: break-word;
        font-size: 14px;
        line-height: 1.6;
        animation: fadeIn 0.3s ease;
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .n8n-chat-widget .chat-message.user {
        background: linear-gradient(135deg, #FF8C42 0%, #FF6B35 100%);
        color: #FFFFFF;
        align-self: flex-end;
        box-shadow: 0 8px 24px rgba(255, 107, 53, 0.3);
        border: none;
        border-bottom-right-radius: 6px;
        font-weight: 500;
    }

    .n8n-chat-widget .chat-message.bot {
        background: #FFFFFF;
        border: 1px solid rgba(255, 140, 66, 0.15);
        color: var(--chat--color-font);
        align-self: flex-start;
        box-shadow: 0 4px 16px rgba(255, 140, 66, 0.08);
        white-space: normal;
        border-bottom-left-radius: 6px;
    }

    .n8n-chat-widget .chat-input {
        padding: 16px 20px 20px;
        background: linear-gradient(180deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 248, 243, 0.98) 100%);
        border-top: 1px solid rgba(255, 140, 66, 0.1);
        display: flex;
        gap: 10px;
        align-items: flex-end;
        backdrop-filter: blur(10px);
    }

    .n8n-chat-widget .chat-input textarea {
        flex: 1;
        padding: 14px 18px;
        border: 2px solid rgba(255, 140, 66, 0.15);
        border-radius: 16px;
        background: #FFFFFF;
        color: var(--chat--color-font);
        resize: none;
        font-family: inherit;
        font-size: 14px;
        line-height: 1.5;
        transition: all 0.3s ease;
        max-height: 120px;
    }

    .n8n-chat-widget .chat-input textarea:focus {
        outline: none;
        border-color: rgba(255, 140, 66, 0.4);
        box-shadow: 0 0 0 3px rgba(255, 140, 66, 0.1);
    }

    .n8n-chat-widget .chat-input textarea::placeholder {
        color: var(--chat--color-font);
        opacity: 0.5;
    }

    .n8n-chat-widget .chat-input button {
        background: linear-gradient(135deg, #FF8C42 0%, #FF6B35 100%);
        color: white;
        border: none;
        border-radius: 14px;
        padding: 12px 22px;
        cursor: pointer;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        font-family: inherit;
        font-weight: 600;
        font-size: 14px;
        box-shadow: 0 8px 20px rgba(255, 107, 53, 0.3);
        min-height: 48px;
    }

    .n8n-chat-widget .chat-input button:hover {
        transform: translateY(-2px);
        box-shadow: 0 12px 28px rgba(255, 107, 53, 0.4);
    }

    .n8n-chat-widget .chat-input button:active {
        transform: translateY(0px);
    }

    .n8n-chat-widget .chat-toggle {
        position: fixed;
        bottom: 24px;
        right: 24px;
        width: 64px;
        height: 64px;
        border-radius: 50%;
        background: linear-gradient(135deg, #FF8C42 0%, #FF6B35 100%);
        color: white;
        border: none;
        cursor: pointer;
        box-shadow: 0 16px 36px rgba(255, 107, 53, 0.4), 0 8px 16px rgba(255, 140, 66, 0.3);
        z-index: 999;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .n8n-chat-widget .chat-toggle.position-left {
        right: auto;
        left: 24px;
    }

    .n8n-chat-widget .chat-toggle:hover {
        transform: translateY(-3px) scale(1.05);
        box-shadow: 0 20px 45px rgba(255, 107, 53, 0.5), 0 10px 20px rgba(255, 140, 66, 0.4);
    }

    .n8n-chat-widget .chat-toggle:active {
        transform: translateY(-1px) scale(1.02);
    }

    .n8n-chat-widget .chat-toggle svg {
        width: 28px;
        height: 28px;
        fill: currentColor;
    }
`;