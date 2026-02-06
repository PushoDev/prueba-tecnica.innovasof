# Prueba Técnica Desarrollador React JS - Innovasoft S.A.

## 📋 Contexto y Objetivo

Este proyecto tiene como objetivo diseñar y desarrollar un aplicativo web (SPA) para la gestión y mantenimiento de clientes. La solución aborda un problema clásico de CRUD (Crear, Leer, Actualizar, Eliminar) con una interfaz moderna y ejecutiva, integrando funcionalidades de carga de imágenes y un sistema de notificaciones premium.

---

## 🛠 Soluciones Técnicas Implementadas

Para esta prueba técnica, se han tomado decisiones arquitectónicas y de diseño orientadas a la robustez, escalabilidad y experiencia de usuario:

### 1. Arquitectura y Organización de Código

- **Separación de Responsabilidades**: Se implementó una estructura basada en servicios para el consumo de la API, aislando la lógica de negocio de la capa de presentación.
- **Componentización Especializada**: Se optó por separar los flujos de **Creación** (`ClientCreatePage`) y **Edición** (`ClientEditPage`). Esto permite manejar de forma aislada los modelos de datos `ClienteCrear` y `ClienteActualizar`, evitando colisiones de lógica y facilitando el mantenimiento.

### 2. Conciliación de API y Modelos de Datos (Bridge Pattern)

- **Mapeo de DTOs**: Se desarrolló una capa de transformación para reconciliar las diferencias entre los objetos de lectura (`DetalleCliente_DTO`) y los comandos de escritura. Por ejemplo, mapeando `telefonoCelular` del backend al campo `celular` requerido para el envío.
- **Validación de Tipos Estricta**: Control preciso de tipos de datos, como el campo `sexo` (enviado como un solo carácter 'M', 'F', 'O' según requerimiento del backend) y manejo de imágenes en formato **Base64**.

### 3. Interfaz de Usuario Premium (UI/UX)

- **Material UI v5 (Grid v2)**: Se utilizó el sistema de grillas moderno de MUI con la propiedad `size` para un layout plano y altamente responsivo, optimizando la visualización en 3 columnas para PC y adaptabilidad total para móviles.
- **Sistema de Notificaciones (Feedback)**:
  - **Snackbars**: Notificaciones efímeras para confirmar el éxito de las operaciones (Crear, Actualizar, Eliminar).
  - **MUI Dialogs**: Diálogos de confirmación personalizados para acciones críticas, reemplazando los `alert` nativos del navegador por una estética más integrada.
- **Branding Personalizado**: Integración de identidad visual en el Login y personalización de metadatos (favicon, description) para un acabado profesional.

---

## 🚀 Instalación y Ejecución

1.  **Instalar dependencias**:
    ```bash
    npm install
    ```
2.  **Ejecutar el servidor de desarrollo**:
    ```bash
    npm start
    ```
    La aplicación estará disponible en [http://localhost:3000](http://localhost:3000) (o 3001 si el puerto está ocupado).

---

## 🔌 Stack Tecnológico

- **Frontend**: React JS.
- **Gestión de Estado**: Context API (AuthContext).
- **Consumo de API**: Axios con Interceptores para manejo de Tokens Bearer.
- **Navegación**: React Router Dom v6.
- **UI Framework**: Material UI.
- **Utilidades**: Validadores personalizados para Base64 y fechas.

---

## 📁 Estructura del Proyecto

```text
/src
  /components     # Componentes compartidos (Layout, PrivateRoute, etc.)
  /context        # AuthContext para seguridad y estado global
  /pages          # Páginas especializadas (Eis: ClientCreatePage, ClientEditPage)
  /services       # Cliente API (Axios) y servicios de dominio
  /utils          # Lógica auxiliar y transformadores de datos
  App.js          # Configuración de rutas escalable
```
