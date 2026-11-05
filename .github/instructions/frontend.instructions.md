name: 'Frontend del chat'
description: 'Usar al crear o modificar la interfaz web del chatbot.'
applyTo: 'public/**/*'

# Reglas del frontend
- Solo HTML, CSS y JavaScript vanilla (ES2020+).
- Inserta el texto del bot con `textContent`, nunca con `innerHTML` (evita XSS).
- Guarda el `conversation_id` en una variable de JS.
- Deshabilita el botón de enviar mientras espera respuesta y muestra "Escribiendo...".
- Diseño responsivo para pantallas de celular en bodega (360px+).
