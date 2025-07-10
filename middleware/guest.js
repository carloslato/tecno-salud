export default defineNuxtRouteMiddleware(async (to, from) => {
  const user = useState('user'); // Obtener el estado global del usuario

  // Si el usuario no está cargado en el estado global, intentar cargarlo
  if (!user.value) {
    const { getCurrentUser } = useAuth();
    user.value = await getCurrentUser();
  }

  if (user.value) {
    // Si el usuario está autenticado, redirigir a la página principal
    return navigateTo('/');
  }
});