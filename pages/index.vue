<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
    <h1 class="text-4xl font-extrabold text-gray-900 mb-6">Bienvenido a la App de la Clínica</h1>
    <p class="text-lg text-gray-700 mb-8">Esta es la página principal. Contenido protegido.</p>
    <button @click="handleLogout"
            class="px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
      Cerrar Sesión
    </button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import useAuth from '~/composables/useAuth';

definePageMeta({
  middleware: 'auth'
});

const router = useRouter();
const { logout } = useAuth();

const handleLogout = async () => {
  try {
    await logout();
    alert('Sesión cerrada exitosamente.');
    router.push('/login');
  } catch (error) {
    alert(`Error al cerrar sesión: ${error.message}`);
  }
};
</script>