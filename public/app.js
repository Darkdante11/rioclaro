const form = document.getElementById("chat-form");
const input = document.getElementById("input");
const sendBtn = document.getElementById("send");
const messages = document.getElementById("messages");
let conversationId = null;

function addMessage(text, who) {
  const div = document.createElement("div");
  div.className = `msg ${who}`;
  div.textContent = text; // Evita vulnerabilidades XSS
  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
  return div;
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const text = input.value.trim();
  if (!text) return;

  addMessage(text, "user");
  input.value = "";
  sendBtn.disabled = true;
  const typing = addMessage("Consultando...", "bot typing");

  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text, conversation_id: conversationId }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.detail || "Error en la respuesta del servidor");

    conversationId = data.conversation_id;
    typing.remove();
    addMessage(data.reply, "bot");
  } catch (err) {
    typing.remove();
    addMessage(`Ups: ${err.message}`, "bot error");
  } finally {
    sendBtn.disabled = false;
    input.focus();
  }
});
