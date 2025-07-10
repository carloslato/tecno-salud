
Desarrolla una aplicación web para una clínica usando **Nuxt 3**, **TailwindCSS** y **Appwrite**, ya las dependencias estan instaladas y la base de la app esta lista. El diseño ya está resuelto (TailwindCSS preinstalado) y Appwrite ya está documentado en el archivo `appwrite_database.md`. Solo concéntrate en la **lógica funcional y conexión con la base de datos**.

---

### 📦 Appwrite

Ya están creadas las siguientes colecciones con sus atributos (ver `appwrite.json`):

* `users`: pacientes, doctores, administradores
* `appointments`: citas médicas
* `medical_records`: historias clínicas
* `documents`: exámenes y archivos médicos
* `invoices`: facturación
* `notifications`: avisos automáticos

---

### ⚙️ Variables de entorno disponibles

Estas están en `process.env` como públicas:

* `NUXT_PUBLIC_APPWRITE_PROJECT_ID`
* `NUXT_PUBLIC_APPWRITE_ENDPOINT`

Usa el SDK oficial de Appwrite (client-side) que ya esta instalado y cualquier helper necesario.

---

### 🎯 Funcionalidades mínimas por pantalla

#### 👤 Registro/Login (usando Appwrite Auth)

* Registro como paciente o doctor (con rol)
* Login por email/contraseña

#### 🗓️ Citas (para pacientes)

* Ver agenda disponible
* Agendar nueva cita
* Ver y cancelar citas agendadas

#### 📄 Historial médico (para pacientes)

* Ver historial clínico personal
* Ver resultados y documentos médicos

#### 👨‍⚕️ Panel del doctor

* Ver citas próximas
* Crear/editar historia médica (ligada a la cita)
* Subir documentos de exámenes
* Emitir factura (crear documento en `invoices`)

#### ⚙️ Panel admin

* Gestión de usuarios, citas y estadísticas básicas

---

### 🖌 Diseño

* Solo usar TailwindCSS (ya está configurado)
* No usar UI libraries (como Vuetify, Bootstrap, etc.)
* Estilo limpio y funcional, sin adornos

---

### 🔒 Seguridad

* Manejo de sesión con Appwrite
* Mostrar contenido según el rol del usuario (`patient`, `doctor`, `admin`)
* Proteger rutas con middleware en Nuxt

---

### 📁 Organización del código

* Usa `composables/` para lógica Appwrite (auth, DB)
* Usa `pages/` y `layouts/` para cada sección
* Mantén componentes desacoplados y reutilizables

---

Empieza por la autenticación y luego implementa las pantallas una por una. Usa la documentación de `appwrite.md` para consultar los atributos y nombres exactos.

---

