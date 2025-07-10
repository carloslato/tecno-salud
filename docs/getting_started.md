# Guía de Inicio Rápido para la Aplicación de la Clínica

Esta guía te ayudará a poner en marcha y empezar a usar la aplicación web de la clínica desarrollada con Nuxt 3, TailwindCSS y Appwrite.

## 1. Configuración Inicial

Asegúrate de tener las dependencias instaladas. Si no lo has hecho, ejecuta:

```bash
npm install
```

## 2. Variables de Entorno

La aplicación utiliza variables de entorno para conectarse a tu instancia de Appwrite. Estas variables ya están configuradas en `nuxt.config.ts` y se obtienen de `process.env`. Asegúrate de que tu archivo `.env` (o la configuración de tu entorno de despliegue) contenga las siguientes variables:

-   `NUXT_PUBLIC_APPWRITE_PROJECT_ID`: El ID de tu proyecto Appwrite.
-   `NUXT_PUBLIC_APPWRITE_ENDPOINT`: El endpoint de tu API de Appwrite (ej. `https://cloud.appwrite.io/v1`).

**Nota:** El `appwrite.json` proporcionado contiene el `projectId` y `endpoint` que puedes usar.

## 3. IDs de Base de Datos y Colecciones

Los composables de la aplicación (`useAppointments.js`, `useMedicalRecords.js`, `useDoctorPanel.js`, `useAdminPanel.js`) han sido actualizados con los IDs de la base de datos y las colecciones según el `appwrite.json` proporcionado.

-   **`databaseId`**: `685380e9000e5925c637` (nombre: `data`)
-   **Colecciones**:
    -   `users`: `686eeb17000d5f03c93b`
    -   `appointments`: `686eeb2b0001cb367c34`
    -   `medical_records`: `686eeb3800065f11e647`
    -   `documents`: `686eeb4600239359c96c`
    -   `invoices`: `686eebb2003a85d617cf`
    -   `notifications`: `686eebe2001d1b5f26d8`

**Importante:** Para la subida de documentos en el panel del doctor, el `documentsBucketId` en `composables/useDoctorPanel.js` aún es un placeholder (`YOUR_DOCUMENTS_BUCKET_ID`). Debes reemplazarlo con el ID de tu bucket de almacenamiento de Appwrite para documentos.

## 4. Ejecutar la Aplicación

Para iniciar la aplicación en modo desarrollo, ejecuta:

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:3000` (o el puerto que Nuxt configure).

## 5. Uso Básico de la Aplicación

### Registro de Usuarios

Puedes registrar nuevos usuarios (pacientes o doctores) a través de la página de registro:

-   **URL:** `/register`
-   **Roles:** Puedes seleccionar `patient` o `doctor` durante el registro.

**Nota:** Actualmente, la asignación del rol `admin` no se realiza a través del formulario de registro. Los usuarios con rol `admin` deben ser creados o modificados directamente en tu consola de Appwrite, asignándoles la etiqueta `admin` en sus propiedades.

### Inicio de Sesión

Una vez registrado, puedes iniciar sesión en la página de login:

-   **URL:** `/login`

### Navegación y Roles

-   **Página Principal (`/`):** Requiere autenticación. Si no estás logueado, serás redirigido a `/login`.
-   **Panel del Paciente:**
    -   **Mis Citas:** `/appointments` (requiere autenticación)
    -   **Agendar Nueva Cita:** `/appointments/new` (requiere autenticación)
    -   **Historial Clínico:** `/medical-records` (requiere autenticación)
    -   **Documentos Médicos:** `/medical-records/documents` (requiere autenticación)
-   **Panel del Doctor:**
    -   **Panel Principal:** `/doctor` (requiere autenticación y rol `doctor`)
    -   **Crear/Editar Historia Médica:** `/doctor/medical-records/create` (requiere autenticación y rol `doctor`)
    -   **Subir Documentos de Exámenes:** `/doctor/documents/upload` (requiere autenticación y rol `doctor`)
    -   **Emitir Factura:** `/doctor/invoices/create` (requiere autenticación y rol `doctor`)
-   **Panel de Administración:**
    -   **Panel Principal:** `/admin` (requiere autenticación y rol `admin`)

### Creación de Usuarios con Roles Específicos (Appwrite Console)

Para probar las funcionalidades de doctor y administrador, necesitarás crear usuarios con los roles correspondientes en tu consola de Appwrite:

1.  **Accede a tu Consola Appwrite:** Inicia sesión en tu proyecto.
2.  **Ve a "Auth" -> "Users".**
3.  **Crea un nuevo usuario** o edita uno existente.
4.  En la sección de "Labels" (Etiquetas), añade las etiquetas `doctor` o `admin` según el rol que desees asignar. Estas etiquetas son utilizadas por los middlewares de la aplicación para controlar el acceso a las rutas.

## 6. Próximos Pasos / Mejoras Potenciales

-   Implementar la gestión de usuarios, citas y facturas completa en el panel de administración (CRUD).
-   Mejorar la interfaz de usuario y la experiencia del usuario.
-   Añadir validaciones de formulario más robustas.
-   Implementar la subida real de archivos a Appwrite Storage en `useDoctorPanel.js` (reemplazando el placeholder del bucket ID).
-   Manejo de errores más detallado y mensajes al usuario.
-   Implementar la funcionalidad de "editar" en el panel del doctor para historias médicas.
-   Integrar el servicio de `notifications` de Appwrite.