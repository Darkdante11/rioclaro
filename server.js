// Backend Express para Distribuidora Río Claro con Microsoft Foundry
import path from "node:path";
import express from "express";
import { AIProjectClient } from "@azure/ai-projects";
import { DefaultAzureCredential } from "@azure/identity";

const ENDPOINT = process.env.FOUNDRY_PROJECT_ENDPOINT;
const AGENT_NAME = process.env.FOUNDRY_AGENT_NAME ?? "asistente-rioclaro";
const PORT = process.env.PORT ?? 3000;

if (!ENDPOINT) {
  console.error("Falta FOUNDRY_PROJECT_ENDPOINT (.env en local, App Settings en Azure)");
  process.exit(1);
}

const project = new AIProjectClient(ENDPOINT, new DefaultAzureCredential());
const openai = project.getOpenAIClient();
const agentRef = { body: { agent_reference: { name: AGENT_NAME, type: "agent_reference" } } };

const app = express();
app.use(express.json({ limit: "16kb" }));
app.use(express.static(path.join(import.meta.dirname, "public")));

app.get("/health", (_req, res) => res.json({ status: "ok" }));

app.post("/api/chat", async (req, res) => {
  const { message, conversation_id: conversationIdIn } = req.body ?? {};

  if (typeof message !== "string" || !message.trim() || message.length > 2000) {
    return res.status(422).json({ detail: "El mensaje debe tener entre 1 y 2000 caracteres." });
  }

  try {
    const conversationId = conversationIdIn || (await openai.conversations.create()).id;
    const response = await openai.responses.create(
      { conversation: conversationId, input: message },
      agentRef
    );

    res.json({ reply: response.output_text, conversation_id: conversationId });
  } catch (err) {
    console.error("Error al llamar a Foundry:", err.message);
    res.status(502).json({ detail: "El asistente de Río Claro no está disponible en este momento." });
  }
});

app.listen(PORT, () => console.log(`Asistente Río Claro escuchando en http://localhost:${PORT}`));