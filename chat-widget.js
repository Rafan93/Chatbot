(function () {
    const config = window.ChatWidgetConfig;

    // ------------------------
    // Crear botó flotant
    // ------------------------
    const btn = document.createElement("div");
    btn.id = "chat-open-btn";
    btn.innerHTML = `
        <img src="${config.branding.logo}" alt="chatbot-icon">
    `;
    document.body.appendChild(btn);

    // ------------------------
    // Crear contenidor del xat
    // ------------------------
    const widget = document.createElement("div");
    widget.id = "chat-widget";
    widget.innerHTML = `
        <div id="chat-header">
            <img src="${config.branding.logo}" id="chat-header-logo">
            <div class="header-texts">
                <div id="chat-title">${config.branding.name}</div>
                <div id="chat-subtitle">${config.branding.responseTimeText}</div>
            </div>
            <div id="chat-close">×</div>
        </div>

        <div id="chat-messages"></div>

        <div id="chat-input-area">
            <textarea id="chat-input" placeholder="Escribe tu mensaje..."></textarea>
            <button id="chat-send">➤</button>
        </div>
    `;
    document.body.appendChild(widget);

    // ------------------------
    // Estils elegants i formals
    // ------------------------
    const styles = `
        #chat-open-btn {
            position: fixed;
            bottom: 24px;
            right: 24px;
            width: 62px;
            height: 62px;
            background: ${config.style.primaryColor};
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            box-shadow: 0 6px 22px rgba(0,0,0,0.18);
            transition: 0.2s;
        }
        #chat-open-btn:hover { transform: scale(1.05); }

        #chat-open-btn img {
            width: 34px;
            height: 34px;
            border-radius: 50%;
        }

        #chat-widget {
            position: fixed;
            bottom: 105px;
            right: 24px;
            width: 360px;
            height: 520px;
            background: #ffffff;
            border-radius: 14px;
            border: 1px solid #d7d7d7;
            box-shadow: 0 8px 28px rgba(0,0,0,0.18);
            display: flex;
            flex-direction: column;
            overflow: hidden;
            opacity: 0;
            transform: translateY(30px);
            pointer-events: none;
            transition: 0.25s;
            font-family: "Inter", sans-serif;
        }

        #chat-widget.open {
            opacity: 1;
            transform: translateY(0);
            pointer-events: auto;
        }

        /* HEADER */
        #chat-header {
            background: #000000;
            color: ${config.style.primaryColor};
            padding: 12px;
            display: flex;
            align-items: center;
            border-bottom: 2px solid ${config.style.primaryColor};
        }

        #chat-header-logo {
            width: 36px;
            height: 36px;
            border-radius: 50%;
            margin-right: 10px;
        }

        .header-texts {
            flex: 1;
            display: flex;
            flex-direction: column;
        }

        #chat-title {
            font-size: 16px;
            font-weight: 600;
            color: ${config.style.primaryColor};
        }

        #chat-subtitle {
            font-size: 12px;
            opacity: 0.8;
            color: #ffffff;
        }

        #chat-close {
            cursor: pointer;
            font-size: 22px;
            padding: 0 6px;
            color: white;
        }

        /* MENSATGES */
        #chat-messages {
            flex: 1;
            padding: 14px;
            overflow-y: auto;
            background: #fafafa;
        }

        .msg {
            max-width: 80%;
            padding: 10px 14px;
            margin-bottom: 12px;
            font-size: 14px;
            border-radius: 12px;
            line-height: 1.35;
        }

        .msg.user {
            margin-left: auto;
            background: ${config.style.primaryColor};
            color: white;
        }

        .msg.bot {
            background: #eaeaea;
            color: #222;
        }

        /* INPUT */
        #chat-input-area {
            display: flex;
            padding: 12px;
            border-top: 1px solid #dcdcdc;
            background: #ffffff;
            gap: 8px;
        }

        #chat-input {
            flex: 1;
            resize: none;
            height: 42px;
            border-radius: 10px;
            border: 1px solid #cfcfcf;
            padding: 8px 10px;
            outline: none;
            font-size: 14px;
            transition: 0.2s;
        }

        #chat-input:focus {
            border-color: ${config.style.primaryColor};
        }

        #chat-send {
            width: 55px;
            border: none;
            background: ${config.style.primaryColor};
            color: white;
            border-radius: 10px;
            font-size: 18px;
            cursor: pointer;
            transition: 0.2s;
        }

        #chat-send:hover {
            background: #e78e22;
        }
    `;

    const styleTag = document.createElement("style");
    styleTag.innerHTML = styles;
    document.head.appendChild(styleTag);

    // ------------------------
    // Funcions del chat
    // ------------------------
    const messages = document.getElementById("chat-messages");
    const textarea = document.getElementById("chat-input");
    const sendBtn = document.getElementById("chat-send");

    function addMessage(text, type) {
        const div = document.createElement("div");
        div.className = "msg " + type;
        div.textContent = text;
        messages.appendChild(div);
        messages.scrollTop = messages.scrollHeight;
    }

    async function sendMessage(msg) {
        addMessage(msg, "user");

        const body = {
            message: msg,
            route: config.webhook.route
        };

        const res = await fetch(config.webhook.url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });

        const data = await res.json();
        addMessage(data.reply, "bot");
    }

    sendBtn.addEventListener("click", () => {
        const text = textarea.value.trim();
        if (!text) return;
        sendMessage(text);
        textarea.value = "";
    });

    textarea.addEventListener("keypress", e => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            const text = textarea.value.trim();
            if (!text) return;
            sendMessage(text);
            textarea.value = "";
        }
    });

    // ------------------------
    // Obrir / tancar
    // ------------------------
    btn.onclick = () => widget.classList.add("open");
    document.getElementById("chat-close").onclick = () => widget.classList.remove("open");

    // ------------------------
    // Missatge de benvinguda
    // ------------------------
    setTimeout(() => {
        addMessage(config.branding.welcomeText, "bot");
    }, 800);
})();
