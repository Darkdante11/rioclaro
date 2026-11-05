// Registro y configuración del agente de IA para Río Claro
import { AIProjectClient } from "@azure/ai-projects";
import { DefaultAzureCredential } from "@azure/identity";

const ENDPOINT = process.env.FOUNDRY_PROJECT_ENDPOINT;
const AGENT_NAME = process.env.FOUNDRY_AGENT_NAME ?? "asistente-rioclaro";
const MODEL = process.env.FOUNDRY_MODEL_DEPLOYMENT ?? "gpt-5-mini";

const INSTRUCTIONS = `Eres el asistente virtual oficial de Distribuidora Río Claro.
Respondes en español de forma amable, clara y directa a clientes y empleados.
Reglas clave de operación:
1. Responde preguntas sobre catálogo de productos, precios y políticas de devolución de las 5 sucursales (Guadalajara, Zapopan, León, Querétaro, Aguascalientes).
2. Si un usuario consulta sobre facturas dudosas o borrosas, infórmale que el caso ha sido marcado para revisión humana por Laura (Cuentas por Pagar).
3. No inventes precios, existencias ni datos confidenciales (como salarios o datos personales).
4. Cita siempre la fuente o política oficial al responder.`;

if (!ENDPOINT) {
  console.error("Error: FOUNDRY_PROJECT_ENDPOINT no está configurado.");
  process.exit(1);
}

const project = new AIProjectClient(ENDPOINT, new DefaultAzureCredential());
const agent = await project.agents.createVersion(AGENT_NAME, {
  kind: "prompt",
  model: MODEL,
  instructions: INSTRUCTIONS,
});

console.log(`Agente configurado exitosamente: ${agent.name} (Versión ${agent.version})`);
