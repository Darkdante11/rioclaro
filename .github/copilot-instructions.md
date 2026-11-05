# Instrucciones del Proyecto: Chatbot Foundry Río Claro en App Service

## Qué es este proyecto
Página web de una sola vista con un chatbot para Distribuidora Río Claro. El frontend (HTML/CSS/JS sin frameworks) llama a un backend Node.js con Express, y el backend conversa con un agente de Microsoft Foundry. Se despliega en Azure App Service (Linux, Node 24 LTS).

## Entorno de desarrollo
- Windows 11 con PowerShell 7. Todos los comandos de terminal deben ser de PowerShell (variables $VAR, continuación de línea con backtick `).
- Node.js 24 LTS y npm. Nada de TypeScript ni bundlers.

## Stack y versiones
- Express 5, ES Modules ("type": "module"), async/await.
- SDK de Foundry: `@azure/ai-projects` 2.x (API "Foundry projects (new)").
- Autenticación: `DefaultAzureCredential` de `@azure/identity`.
- Variables de entorno en local con `node --env-file-if-exists=.env`.

## Arquitectura
- `server.js`: sirve `public/`, expone `POST /api/chat` y `GET /health`.
- El navegador NUNCA habla directo con Foundry. Solo el backend.
- Conversación multi-turno: `openai.conversations.create()` y `openai.responses.create({ conversation, input, agentRef })`.
- El `conversation_id` viaja entre frontend y backend en el JSON.
- El servidor escucha en `process.env.PORT`.

## Seguridad e IA Responsable
- Nunca escribir llaves o tokens en el código; usar Managed Identity en Azure.
- Validar entrada (1 a 2000 caracteres) -> HTTP 422 si falla.
- Tratar facturas dudosas enviándolas a revisión humana.
- Mantener la privacidad de nóminas y precios sensibles restringiendo los datos del prompt.
