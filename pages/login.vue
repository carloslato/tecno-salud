<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div v-if="loading" class="text-center text-gray-600">Cargando...</div>
    <div v-else class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Iniciar Sesión
        </h2>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="handleLogin">
        <input type="hidden" name="remember" value="true">
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="email-address" class="sr-only">Correo electrónico</label>
            <input id="email-address" name="email" type="email" autocomplete="email" required
                   class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                   placeholder="Correo electrónico" v-model="email">
          </div>
          <div>
            <label for="password" class="sr-only">Contraseña</label>
            <input id="password" name="password" type="password" autocomplete="current-password" required
                   class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                   placeholder="Contraseña" v-model="password">
          </div>
        </div>

        <div>
          <button type="submit"
                  class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Iniciar Sesión
          </button>
        </div>
      </form>
      <p class="mt-2 text-center text-sm text-gray-600">
        ¿No tienes una cuenta?
        <NuxtLink to="/register" class="font-medium text-indigo-600 hover:text-indigo-500">
          Regístrate aquí
        </NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import useAuth from '~/composables/useAuth';

definePageMeta({
  middleware: 'guest'
});

const email = ref('');
const password = ref('');
const router = useRouter();
const { login, getCurrentUser } = useAuth();
const loading = ref(true); // Estado de carga

onMounted(async () => {
  // Verificar si el usuario ya está logueado. El middleware 'guest' ya hace la redirección,
  // pero esto asegura que el formulario no se muestre si la redirección es inminente.
  const user = await getCurrentUser();
  if (user) {
    // Si el usuario está logueado, no necesitamos mostrar el formulario, el middleware redirigirá.
    // Mantener loading en true para que no se muestre el formulario.
  } else {
    loading.value = false; // Si no está logueado, mostrar el formulario.
  }
});

const handleLogin = async () => {
  try {
    await login(email.value, password.value);
    const user = await getCurrentUser(); // Obtener el usuario con su rol
    alert('Inicio de sesión exitoso.');

    if (user && user.role) {
      switch (user.role) {
        case 'patient':
          router.push('/appointments');
          break;
        case 'doctor':
          router.push('/doctor');
          break;
        case 'admin':
          router.push('/admin');
          break;
        default:
          router.push('/'); // Redirección por defecto si el rol no está definido
      }
    } else {
      router.push('/'); // Redirigir a la página principal si no se puede determinar el rol
    }
  } catch (error) {
    alert(`Error al iniciar sesión: ${error.message}`);
  }
};
</script>