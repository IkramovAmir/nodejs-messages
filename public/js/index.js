const input = document.getElementById("msgInput");
const messageList = document.getElementById("messageList");
const sendBtn = document.getElementById("sendBtn");
const msgId = document.querySelector(".js-msg-id");
const myMsgBtn = document.querySelector(".js-my-msg")

sendBtn.addEventListener("click", sendMessage);
input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        sendMessage();
    }
});

async function sendMessage() {
    const text = input.value.trim();

    if (!text) return;

    await fetch("/api/messages", {
        method: 'POST',
        headers: {"Content-type": "application/json"},
        body: JSON.stringify({message: text})
    });

    input.value = "";
}

async function fetchMessages() {
    let res = await fetch("/api/messages");
    let data = await res.json();

    messageList.innerHTML = "";

    data.forEach(msg => {
        const div = document.createElement("div");
        div.className = "message";
        div.textContent = msg.message;
        messageList.appendChild(div);
    });

    messageList.scrollTop = messageList.scrollHeight;
}

setInterval(fetchMessages, 2000);
fetchMessages();

myMsgBtn.addEventListener("click", (evt) => {
    if (isNaN(Number(msgId))) {
        return alert("Enter number");
    };
});