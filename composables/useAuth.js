import { getAppwrite } from '~/lib/appwrite';
import { Client, Account, ID, Databases, Query } from 'appwrite';

export default function useAuth() {
  const config = useRuntimeConfig();
  const { account, databases } = getAppwrite(config);

  const databaseId = config.public.appwriteDatabaseId; // Asumiendo que tienes esto en tu config
  const usersCollectionId = '686eeb17000d5f03c93b'; // ID de la colección 'users'

  const register = async (email, password, name, role) => {
    try {
      const user = await account.create(ID.unique(), email, password, name);
      
      // Crear un documento en la colección 'users' con el rol y otros atributos
      await databases.createDocument(
        databaseId,
        usersCollectionId,
        user.$id, // Usar el ID del usuario de Appwrite Account como ID del documento
        {
          email: email,
          full_name: name,
          role: role,
          // Puedes añadir más atributos aquí si los pasas al registro
        }
      );
      console.log('Usuario registrado y documento de usuario creado:', user);
      return user;
    } catch (error) {
      console.error('Error al registrar usuario o crear documento de usuario:', error);
      throw error;
    }
  };

  const login = async (email, password) => {
    try {
      const session = await account.createEmailPasswordSession(email, password);
      console.log('Sesión iniciada:', session);
      return session;
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await account.deleteSession('current');
      console.log('Sesión cerrada');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      throw error;
    }
  };

  const getCurrentUser = async () => {

    try {
      const appwriteUser = await account.getSession('current'); // Obtener usuario de Appwrite Account
      console.log('2sesionLogConsole' ,appwriteUser);
      // Buscar el documento de usuario en la colección 'users' para obtener el rol
      const response = await databases.listDocuments(
        databaseId,
        usersCollectionId,
        [Query.equal('$id', appwriteUser.userId)] // Buscar por el ID del usuario de Appwrite Account
      );
      console.log('userDocResponse', appwriteUser.userId);
      if (response.documents.length > 0) {
        const userDoc = response.documents[0];
        // Combinar la información del usuario de Appwrite Account con el documento de la colección 'users'
        console.log('userCompleteObject', { ...appwriteUser, ...userDoc })
        return { ...appwriteUser, ...userDoc };
      } else {
        console.warn('Documento de usuario no encontrado en la colección "users".');
        return appwriteUser; // Devolver solo la información de Appwrite Account si no se encuentra el documento
      }
    } catch (error) {
      // Manejar el error "missing scope (account)" de forma más silenciosa
      if (error.code === 401 && error.message.includes('missing scope (account)')) {
        console.log('No hay sesión activa o permisos insuficientes para acceder a la cuenta. 1');
      } else {
        console.error('Error al obtener usuario actual:', error);
      }
      return null;
    }
  };

  return {
    register,
    login,
    logout,
    getCurrentUser,
  };
}