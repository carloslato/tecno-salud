export default defineNuxtRouteMiddleware(async (to, from) => {
  const user = useState('user'); // Obtener el estado global del usuario
  const userReady = useState('userReady', () => false);

  if (!user.value && userReady.value) {
    // Si el usuario no está autenticado, redirigir a la página de login
    return navigateTo('/login');
  }
  // Verificar roles si la ruta tiene meta.roles definidos
  const requiredRoles = to.meta.roles;
  if (requiredRoles && requiredRoles.length > 0 && userReady.value) {
    if (!user.value.role || !requiredRoles.includes(user.value.role)) {
      // Si el usuario no tiene el rol requerido, redirigir a la página principal
      // o a una página de acceso denegado.
      // Por ahora, redirigimos a la página principal con un mensaje.
      console.warn(`Acceso denegado para el rol '${user.value.role}' en la ruta '${to.path}'. Roles requeridos: ${requiredRoles.join(', ')}`);
      return navigateTo('/'); // Redirigir a la página principal
    }
  }
});