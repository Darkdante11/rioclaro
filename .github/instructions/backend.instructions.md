name: 'Backend Express'
description: 'Usar al crear o modificar el backend Node.js que llama a Microsoft Foundry.'
applyTo: 'server.js,scripts/**/*'

# Reglas del backend
- Crea el AIProjectClient y el cliente de OpenAI una sola vez al iniciar.
- Referencia al agente en cada responses.create con { body: { agent: { name: AGENT_NAME, type: "agent_reference" } } }.
- Usa async/await y envuelve las llamadas al SDK en try/catch respondiendo 502 genérico ante fallos.
- Resuelve rutas de archivos con import.meta.dirname.
