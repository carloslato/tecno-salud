import { Client, Account, Databases, Storage } from "appwrite";

function getAppwrite(config) {
  const client = new Client()
    .setEndpoint(config.public.appwriteEndpoint)
    .setProject(config.public.appwriteProjectId);

  // No es necesario setSession o setKey aquí para el SDK de cliente.
  // La sesión se maneja automáticamente por el SDK después del login.

  const account = new Account(client);
  const databases = new Databases(client);
  const storage = new Storage(client); // Añadir Storage

  return { client, account, databases, storage }; // Devolver storage
}

export { getAppwrite };