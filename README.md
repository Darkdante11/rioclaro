# Proyecto Integrador AI-901: Asistente e Integración IA para Distribuidora Río Claro

Este proyecto implementa una solución completa de inteligencia artificial para **Distribuidora Río Claro** utilizando **Microsoft Foundry**, **Node.js Express** y **Azure App Service**, estructurado con agentes de **GitHub Copilot** y alineado a los principios de **IA Responsable**.

## 🏗️ Arquitectura de la Solución
- **Frontend:** Interfaz web liviana (HTML5/CSS3/JS Vanilla) adaptada para dispositivos móviles (bodega) y desktop.
- **Backend:** Node.js 24 LTS con Express 5.
- **SDK de IA:** `@azure/ai-projects` 2.x para conectar con los agentes de Microsoft Foundry (`gpt-5-mini`).
- **Autenticación & Seguridad:** `DefaultAzureCredential` de `@azure/identity` con Identidades Administradas de Entra ID y Microsoft Key Vault.

---

## 📋 Archivos y Estructura del Proyecto

```text
chatbot-foundry-rioclaro/
├── .github/
│   ├── copilot-instructions.md
│   ├── instructions/
│   │   ├── backend.instructions.md
│   │   └── frontend.instructions.md
│   └── agents/
│       ├── arquitecto.agent.md
│       ├── constructor.agent.md
│       └── desplegador.agent.md
├── public/
│   ├── index.html
│   ├── app.js
│   └── styles.css
├── scripts/
│   └── create-agent.js
├── .env.example
├── .gitignore
├── package.json
├── server.js
└── README.md
```

---

## 🚀 Paso a Paso para Desplegar desde Cero

### 1. Requisitos Previos (Windows / PowerShell 7)
Asegúrate de contar con Node.js 24 LTS, Azure CLI y Git:
```powershell
winget install OpenJS.NodeJS.LTS -e
winget install Microsoft.AzureCLI -e
winget install Git.Git -e
```

### 2. Configurar Microsoft Foundry
1. Inicia sesión en [ai.azure.com](https://ai.azure.com).
2. Crea un nuevo proyecto en Microsoft Foundry.
3. Despliega el modelo `gpt-5-mini` con el nombre de despliegue `gpt-5-mini`.
4. Copia el Endpoint del Proyecto (`https://<recurso>.services.ai.azure.com/api/projects/<proyecto>`).

### 3. Configuración Local
1. Clona o extrae este repositorio en tu equipo.
2. Copia `.env.example` a `.env` y asigna tus variables:
   ```powershell
   Copy-Item .env.example .env
   notepad .env
   ```
3. Inicia sesión en Azure CLI e instala las dependencias:
   ```powershell
   az login
   npm install
   ```
4. Registra/actualiza el agente en Microsoft Foundry:
   ```powershell
   npm run create-agent
   ```
5. Prueba el entorno local en `http://localhost:3000`:
   ```powershell
   npm run dev
   ```

---

## ☁️ Despliegue en Azure App Service

Ejecuta las instrucciones del agente desplegador en PowerShell:

```powershell
# Definir variables
$RG = "rg-rioclaro-ai901"
$LOCATION = "eastus2"
$APP = "rioclaro-asistente-$(Get-Random -Maximum 99999)"
$FOUNDRY_RG = "<grupo-recurso-foundry>"
$FOUNDRY_NAME = "<nombre-recurso-foundry>"
$ENDPOINT = "https://<recurso>.services.ai.azure.com/api/projects/<proyecto>"

# 1. Crear grupo de recursos y App Service (Linux Node 24)
az group create --name $RG --location $LOCATION
az webapp up --name $APP --resource-group $RG --location $LOCATION --runtime "NODE:24-lts" --sku B1

# 2. Configurar variables de entorno (App Settings)
az webapp config appsettings set -g $RG -n $APP --settings FOUNDRY_PROJECT_ENDPOINT=$ENDPOINT FOUNDRY_AGENT_NAME=asistente-rioclaro

# 3. Identidad administrada y asignación de rol "Foundry User"
$PRINCIPAL_ID = az webapp identity assign -g $RG -n $APP --query principalId -o tsv
$FOUNDRY_ID = az cognitiveservices account show -g $FOUNDRY_RG -n $FOUNDRY_NAME --query id -o tsv
az role assignment create --assignee-object-id $PRINCIPAL_ID --assignee-principal-type ServicePrincipal --role "53ca6127-db72-4b80-b1b0-d745d6d5456d" --scope $FOUNDRY_ID

# 4. Reiniciar App Service y verificar
az webapp restart -g $RG -n $APP
Invoke-RestMethod "https://$APP.azurewebsites.net/health"
```

---

## 🛡️ Principios de IA Responsable Aplicados (AZ-901)
- **Equidad:** Información estandarizada y centralizada para las 5 sucursales (Guadalajara, Zapopan, León, Querétaro y Aguascalientes).
- **Confiabilidad y Seguridad:** Validación en facturación dudosa marcando casos para revisión humana por Laura.
- **Privacidad y Seguridad:** Autenticación Entra ID sin claves API embebidas, resguardando nóminas y datos confidenciales.
- **Inclusión:** Interfaz web ligera adaptada a pantallas móviles de bodega para Toño.
- **Transparencia:** Notificación explícita al usuario sobre la interacción con IA y citas documentales.
- **Rendición de Cuentas:** Aprobación humana mandatoria previa a cualquier transacción o pago.
