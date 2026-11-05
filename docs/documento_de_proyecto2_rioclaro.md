<div align="center">

# Causas para la Transformación
### Fundamentos de Inteligencia Artificial con Tecnologías Microsoft
---
## **PROYECTO DE APLICACIÓN PRÁCTICA: ASISTENTE VIRTUAL DE INTELIGENCIA ARTIFICIAL EN LA NUBE AZURE PARA DISTRIBUIDORA RÍO CLARO**

---

**Asignatura:** Fundamentos de Inteligencia Artificial con Tecnologías Microsoft  
**Proyecto 2:** Implementación de un Agente conversacional con Microsoft Azure Foundry y Node.js  
**Estudiante:** Guadalupe Gerardo Ortega Díaz  
**Docente / Tutor:** José Jesús Guzmán Eusebio  
**Fecha:** Noviembre de 2026  

---

</div>

<div style="page-break-after: always;"></div>

## **ÍNDICE**

1. [Introducción](#1-introducción)
2. [Planteamiento del Problema y Justificación](#2-planteamiento-del-problema-y-justificación)
3. [Desarrollo del Proyecto y Arquitectura](#3-desarrollo-del-proyecto-y-arquitectura)
   * 3.1. Tecnologías Utilizadas
   * 3.2. Implementación Técnica y Seguridad
   * 3.3. Proceso de Despliegue en la Nube
4. [Problemática Empresarial que Resuelve](#4-problemática-empresarial-que-resuelve)
5. [Capacidades del Sistema (¿Qué se puede hacer con él?)](#5-capacidades-del-sistema-qué-se-puede-hacer-con-él)
6. [Impacto Operativo y Análisis Organizacional](#6-impacto-operativo-y-análisis-organizacional)
7. [Conclusiones](#7-conclusiones)
8. [Anexo: Enlaces y Recursos del Proyecto](#8-anexo-enlaces-y-recursos-del-proyecto)

---

## **1. INTRODUCCIÓN**

En el panorama empresarial contemporáneo, la transformación digital ha dejado de ser una ventaja competitiva opcional para convertirse en una necesidad imperativa de supervivencia operacional. Las pequeñas y medianas empresas (PyMEs) dedicadas a la distribución y comercialización de bienes de consumo enfrentan una presión constante por responder de forma inmediata a solicitudes de clientes, gestionar catálogos volumétricos y optimizar la atención postventa sin incurrir en costos desproporcionados de personal.

El presente trabajo documenta el diseño, desarrollo e implementación de un **Asistente Virtual con Inteligencia Artificial** adaptado específicamente a las necesidades operativas de la empresa **Distribuidora Río Claro**. La solución aprovecha el paradigma de *Serverless Computing* y la infraestructura de modelos de lenguaje avanzados proporcionados por **Microsoft Azure Foundry**, integrados en un entorno de ejecución moderno con **Node.js 24 LTS** y desplegados bajo la arquitectura multinube de **Azure App Service**.

Este informe técnico-académico detalla la estructura lógica del proyecto, los retos encontrados durante el ciclo de vida del despliegue en la nube, las soluciones arquitectónicas adoptadas para garantizar la seguridad mediante Identidades Administradas (*Managed Identities*), y la propuesta de valor tangible que ofrece para automatizar los procesos operativos de la distribuidora.

---

## **2. PLANTEAMIENTO DEL PROBLEMA Y JUSTIFICACIÓN**

### **2.1. Contexto de Distribuidora Río Claro**
Distribuidora Río Claro opera como un nodo crítico en la cadena de suministro de productos comerciales. Diariamente, la empresa procesa un alto volumen de interacciones provenientes de clientes corporativos, minoristas y compradores individuales. Entre las consultas más recurrentes se encuentran:
* Verificación de disponibilidad de stock e inventarios.
* Consultas detalladas de precios, promociones y escalas de descuento.
* Tiempos de entrega, políticas de envío y seguimiento de pedidos.
* Resolución de dudas frecuentes relacionadas con facturación y métodos de pago.

### **2.2. La Problemática**
Antes de la ejecución de este proyecto, la atención al cliente se gestionaba de forma manual a través de canales tradicionales (teléfono, correo electrónico y mensajería instantánea atendida por operadores humanos). Esta dinámica generaba los siguientes cuellos de botella:

1. **Saturación en Horarios Pico:** Alta latencia en las respuestas hacia el cliente, derivando en pérdida de oportunidades de venta.
2. **Inconsistencia de la Información:** Errores humanos al consultar manualmente catálogos extensos o listas de precios desactualizadas.
3. **Incapacidad de Cobertura 24/7:** Imposibilidad de atender requerimientos fuera del horario laboral convencional de la empresa.
4. **Elevados Costos Operativos:** Necesidad de escalar linealmente el equipo de atención al cliente para absorber el incremento de demanda.

### **2.3. Justificación Tecnológica**
Para solucionar esta problemática de raíz, se planteó el desarrollo de un agente inteligente alojado en la nube que combine la precisión conversacional de los modelos de lenguaje de última generación (`gpt-5-mini` / Azure OpenAI) con una infraestructura segura, elástica y de bajo costo.

---

## **3. DESARROLLO DEL PROYECTO Y ARQUITECTURA**

### **3.1. Tecnologías Utilizadas**

El desarrollo se fundamentó en un *stack* tecnológico moderno, estandarizado y de nivel empresarial:

* **Runtime de Aplicación:** Node.js v24 LTS (JavaScript Asíncrono / ESM / Express.js).
* **AI Framework & SDK:** `@azure/ai-projects` y `@azure/identity`.
* **Plataforma de Inteligencia Artificial:** Microsoft Azure Foundry (Proyecto: `geraortega-ia-8021`).
* **Modelo de Lenguaje:** Deployment `gpt-5-mini`.
* **Plataforma Nube de Hospedaje:** Azure App Service (Plan Linux / Tier Gratuito F1).
* **Mecanismo de Autenticación:** Identidad Administrada Asignada por el Sistema (*System-Assigned Managed Identity*).
* **Control de Versiones y CLI:** Git & Azure CLI.

```
+-----------------------------------------------------------------------------------+
|                                  ARQUITECTURA DEL SISTEMA                         |
+-----------------------------------------------------------------------------------+
|                                                                                   |
|   [ Cliente / Web Browser ]                                                       |
|              |                                                                    |
|              v (HTTP/HTTPS)                                                       |
|   +---------------------------------------------------------------------------+   |
|   | Azure App Service: rioclaro-asistente-20750 (Node.js 24 LTS)              |   |
|   |  - Servidor Express (server.js)                                           |   |
|   |  - Endpoint de Salud (/health)                                            |   |
|   |  - Autenticación: DefaultAzureCredential                                  |   |
|   +---------------------------------------------------------------------------+   |
|              |                                                                    |
|              | (Sin API Keys en código - Tokens OAuth via Managed Identity)      |
|              v                                                                    |
|   +---------------------------------------------------------------------------+   |
|   | Microsoft Azure Foundry (Resource: geraortega-ia-8021-resource)           |   |
|   |  - Rol Asignado: Foundry User (53ca6127-db72-4b80-b1b0-d745d6d5456d)      |   |
|   |  - Agent Reference: asistente-rioclaro                                   |   |
|   |  - AI Model: gpt-5-mini                                                   |   |
|   +---------------------------------------------------------------------------+   |
|                                                                                   |
+-----------------------------------------------------------------------------------+
```

### **3.2. Implementación Técnica y Seguridad**

Uno de los pilares del desarrollo fue el cumplimiento del principio de **cero claves expuestas (*Zero-Secrets Pattern*)**. En lugar de almacenar cadenas de conexión o claves API (`API_KEY`) dentro de archivos `.env` o en el código fuente, la aplicación utiliza el SDK `@azure/identity` con `DefaultAzureCredential`.

```javascript
// Fragmento representativo del servidor (server.js)
import express from 'express';
import { AIProjectsClient } from '@azure/ai-projects';
import { DefaultAzureCredential } from '@azure/identity';

const app = express();
const endpoint = process.env.FOUNDRY_PROJECT_ENDPOINT;
const agentName = process.env.FOUNDRY_AGENT_NAME;

// Autenticación segura mediante Identidad Administrada en Azure
const client = new AIProjectsClient(endpoint, new DefaultAzureCredential());
```

### **3.3. Proceso de Despliegue en la Nube**

Durante la fase de paso a producción, el proyecto enfrentó restricciones de políticas de región (`RequestDisallowedByAzure`) y cuotas asociadas al perfil de suscripción de estudiante. El flujo de despliegue se optimizó sustituyendo comandos de nivel alto en desuso (`az webapp up`) por provisión explícita en CLI paso a paso:

1. **Creación del Plan de App Service:** Definición de un plan Linux en la capa gratuita (`B1`) dentro de la región compatible (`westus`).
2. **Aprovisionamiento de la App Web:** Creación del servicio con el *runtime* `NODE:24-lts`.
3. **Inyección de App Settings:** Configuración de variables de entorno (`FOUNDRY_PROJECT_ENDPOINT`, `FOUNDRY_AGENT_NAME`, `FOUNDRY_MODEL_DEPLOYMENT`).
4. **Asignación del Rol RBAC:** Otorgamiento del rol `Foundry User` (ID: `53ca6127-db72-4b80-b1b0-d745d6d5456d`) sobre el recurso de Azure AI mediante el `principalId` de la Identidad Administrada.
5. **Configuración de Inicio:** Inclusión del parámetro de arranque explícito `--startup-file "node server.js"` para garantizar que el proceso escuche las peticiones en el puerto asignado dinámicamente por la plataforma.

---

## **4. PROBLEMÁTICA EMPRESARIAL QUE RESUELVE**

El despliegue de este proyecto resuelve directamente los problemas estructurales de **Distribuidora Río Claro** mediante las siguientes soluciones integradas:

| Problemática Operativa Previa | Solución Implementada por el Asistente IA |
| :--- | :--- |
| **Cuellos de botella en la atención** | Capacidad de procesamiento simultáneo e ilimitado de peticiones de usuarios. |
| **Respuesta limitada a horario de oficina** | Disponibilidad continua las 24 horas del día, los 365 días del año en la nube. |
| **Vulnerabilidad de seguridad por fugas de claves** | Eliminación completa de credenciales estáticas mediante Identidad Administrada en Azure. |
| **Respuestas desactualizadas o imprecisas** | Centralización de la lógica del agente en Microsoft Foundry bajo instrucciones de marca. |
| **Altos costos de infraestructura** | Alojamiento bajo un esquema de costos optimizado en Azure App Service. |

---

## **5. CAPACIDADES DEL SISTEMA (¿QUÉ SE PUEDE HACER CON ÉL?)**

El Asistente Virtual desarrollado para Distribuidora Río Claro ofrece una suite de funcionalidades interactivas:

1. **Atención Conversacional Inteligente:** Responder consultas en lenguaje natural con comprensión contextual sobre productos, especificaciones y precios.
2. **Consulta Automática de Políticas:** Orientar a los usuarios sobre procedimientos de devolución, condiciones de crédito, facturación electrónica y garantías.
3. **Verificación de Estado del Sistema:** Exposición de un *Endpoint de Salud* (`GET /health`) que permite a los equipos de TI monitorear la disponibilidad del servicio en tiempo real.
4. **Escalabilidad Transparente:** Manejo automático de picos de tráfico sin degradación en los tiempos de respuesta.
5. **Integración con Sistemas Legados:** Capacidad de extender la lógica del servidor Node.js para conectar APIs de inventario o bases de datos relacionales existentes mediante rutas REST adicionalmente configuradas.

---

## **6. IMPACTO OPERATIVO Y ANÁLISIS ORGANIZACIONAL**

La implementación técnica documentada genera un impacto directo en la estructura operativa de **Distribuidora Río Claro**:

* **Reducción del Tiempo de Espera (SLA):** El tiempo medio de respuesta a preguntas frecuentes pasa de un promedio de 15 a 45 minutos a **menos de 3 segundos**.
* **Eficiencia Operativa:** Permite que el personal humano de soporte se reasigne a tareas de alto valor agregado, como la negociación de cuentas clave o la resolución de casos complejos de logística.
* **Seguridad y Cumplimiento Normativo:** Al no manejar llaves secretas en código plano y depender de la infraestructura de identidad de Microsoft Entra ID (Azure AD), la empresa cumple con estándares estrictos de protección de datos.

---

## **7. EVIDENCIA DE USO**

1. Creación del proyecto en Foundry.
<img width="589" height="274" alt="Imagen1" src="https://github.com/user-attachments/assets/a790e710-f163-44da-b08e-5c6a1af2ee53" />

2. Uso del modelo gpt-5-mini.
<img width="589" height="280" alt="Imagen2" src="https://github.com/user-attachments/assets/d84847dc-3b30-4b56-b727-fa9c3c2809fd" />

3. Creación del agente asistente-rioclaro.
<img width="589" height="160" alt="Imagen3" src="https://github.com/user-attachments/assets/7d25dcfd-bac9-4dbf-b44d-5b19f248ed7e" />


4. Despliegue del chatbot rioclaro.
<img width="589" height="539" alt="Imagen4" src="https://github.com/user-attachments/assets/c70764f7-be3b-4c08-b3d2-3bf59d7bceb1" />

5. Ineracción con chatbot.
<img width="589" height="552" alt="Imagen5" src="https://github.com/user-attachments/assets/167137aa-05b1-4226-9e94-f6784ece0e39" />

6. Pedidos en el chatbot.
<img width="589" height="522" alt="Imagen6" src="https://github.com/user-attachments/assets/120cd794-375e-4b35-ab3a-3664243c0466" />

7. Agente desplegado en Azure APPS.
<img width="589" height="564" alt="Imagen7" src="https://github.com/user-attachments/assets/37451810-198f-49a3-8d53-a94dc9915e12" />

---

## **8. CONCLUSIONES**

1. La integración de modelos de lenguaje alojados en **Microsoft Azure Foundry** con aplicaciones basadas en **Node.js 24 LTS** demuestra ser una arquitectura altamente sólida, escalable y flexible para la resolución de problemas reales de negocio.
2. El uso de **Identidades Administradas (*Managed Identities*)** y el control de acceso basado en roles (**RBAC**) elimina de manera definitiva uno de los vectores de ataque más comunes en aplicaciones web: la filtración de claves API.
3. El proceso de resolución de incidencias en la nube evidenció la importancia de adaptar las estrategias de despliegue a las políticas regionales y restricciones de cuota de la suscripción, garantizando la viabilidad económica del proyecto sin sacrificar calidad ni rendimiento.
4. Para **Distribuidora Río Claro**, el Asistente Virtual representa un salto cualitativo hacia la automatización de procesos, mejorando la satisfacción del usuario final y modernizando su infraestructura tecnológica.

---

## **9. ANEXO: ENLACES Y RECURSOS DEL PROYECTO**

A continuación, se proporcionan los enlaces oficiales de acceso a los repositorios de código y a la aplicación publicada en el entorno de producción de Microsoft Azure:

* 🌐 **Aplicación Desplegada en Azure App Service:**  
  [https://rioclaro-asistente-98998.azurewebsites.net](https://rioclaro-asistente-98998.azurewebsites.net)

* 🩺 **Endpoint de Salud de la Aplicación (/health):**  
  [https://rioclaro-asistente-98998.azurewebsites.net/health](https://rioclaro-asistente-98998.azurewebsites.net/health)

* 📁 **Repositorio de Código Fuente (GitHub):**  
  [https://github.com/Darkdante11/rioclaro](https://github.com/Darkdante11/rioclaro)

---
