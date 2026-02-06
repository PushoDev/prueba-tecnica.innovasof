# Prueba Técnica Desarrollador React JS - Innovasoft S.A.

## 📋 Contexto y Objetivo

Este proyecto tiene como objetivo diseñar y desarrollar un aplicativo web (SPA) para la gestión y mantenimiento de clientes. La solución aborda un problema clásico de CRUD (Crear, Leer, Actualizar, Eliminar) con una interfaz moderna y ejecutiva.

### 🎯 Necesidad del Negocio
La institución requiere un sistema que permita:
1.  **Registrar** nuevos clientes.
2.  **Listar** clientes existentes con filtros.
3.  **Ver Detalle** de un cliente.
4.  **Actualizar** información del cliente.
5.  **Eliminar** registros.
6.  **Consultar** información.

---

## 🛠 Lineamientos Técnicos

### General
*   **Editor**: Visual Studio Code.
*   **Validaciones**: Manejo estricto de tipos de datos y validaciones de formularios.

### Frontend (Stack Tecnológico)
*   **Framework**: **React JS** (Preferencia v17/v18).
*   **Lenguaje**: JavaScript (ES6+).
*   **Estilo de Componentes**: Componentes Funcionales y **React Hooks** (`useEffect`, `useState`, `useReducer`, `useContext`).
*   **Gestión de Estado**: **Context API** (Obligatorio).
*   **Consumo de API**: **Axios** (Async/Await, Promesas).
*   **Navegación**: **React Router Dom**.
*   **UI Framework**: **Material UI** (Estilo ejecutivo, responsive).
*   **Plantilla**: `create-react-app`.

---

## 🎨 Marco de Diseño

*   Basado en **Material Design** de Google.
*   Uso de componentes de **Material UI**.
*   Diseño **Responsive**.
*   Esquema de colores estilo **Ejecutivo**.

---

## 🔌 API y Endpoints

**Base URL**: `https://pruebareactjs.test-class.com/Api/`
**Swagger**: [Ver Documentación API](https://pruebareactjs.test-class.com/Api/swagger/index.html)

### Autenticación
*   **Login**: `POST /api/Authenticate/login`
    *   *Body*: `{ username, password }`
    *   *Nota*: Implementar "Recuérdame".
*   **Registro**: `POST /api/Authenticate/register`
    *   *Body*: `{ username, email, password }`
    *   *Validación*: Password > 8 chars, < 20, mayúscula, minúscula, número.

### Clientes
*   **Listar**: `POST /api/Cliente/Listado` (Requiere Bearer Token)
    *   *Body*: `{ identificacion, nombre, usuarioId }`
*   **Obtener**: `GET /api/Cliente/Obtener/{IdCliente}`
*   **Crear**: `POST /api/Cliente/Crear`
    *   *Body*: Datos del cliente + imagen (Base64) + interesFK.
*   **Actualizar**: `POST /api/Cliente/Actualizar`
*   **Eliminar**: `DELETE /api/Cliente/Eliminar/{IdCliente}`

### Maestros
*   **Intereses**: `GET /api/Intereses/Listado`

---

## 🚀 Instalación y Ejecución

1.  **Clonar el repositorio** (o navegar a la carpeta del proyecto).
2.  **Instalar dependencias**:
    ```bash
    npm install
    ```
3.  **Ejecutar el servidor de desarrollo**:
    ```bash
    npm start
    ```
    La aplicación estará disponible en [http://localhost:3000](http://localhost:3000).

---

## 📁 Estructura del Proyecto (Propuesta)

```text
/src
  /components     # Componentes reutilizables (Botones, Inputs, Layouts)
  /context        # AuthContext, ClientContext
  /hooks          # Custom Hooks
  /pages          # Vistas (Login, Home, ClientList, ClientForm)
  /services       # Configuración de Axios y llamadas API
  /utils          # Helpers y validaciones
  App.js          # Configuración de Rutas
  index.js        # Punto de entrada
```

## 📝 Notas Importantes
*   Se debe manejar una **Pagina de Error 404** para rutas no existentes.
*   Feedback al usuario mediante **Snackbars** (Material UI) para éxito o error en transacciones.
*   Imágenes de clientes manejadas en **Base64**.
