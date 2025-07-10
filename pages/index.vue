<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
    <h1 class="text-4xl font-extrabold text-gray-900 mb-6">
      {{ user ? `Bienvenido, ${user.full_name || user.email}!` : 'Bienvenido a la App de la Clínica' }}
    </h1>
    <p class="text-lg text-gray-700 mb-8">
      <template v-if="user">
        Tu rol es: <span class="font-semibold">{{ user.role }}</span>. Utiliza el menú de navegación para acceder a las funcionalidades disponibles.
      </template>
      <template v-else>
        Por favor, <NuxtLink to="/login" class="font-medium text-indigo-600 hover:text-indigo-500">inicia sesión</NuxtLink> o <NuxtLink to="/register" class="font-medium text-indigo-600 hover:text-indigo-500">regístrate</NuxtLink> para acceder a todas las funcionalidades.
      </template>
    </p>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import useAuth from '~/composables/useAuth';

definePageMeta({
  middleware: 'auth'
});

const user = useState('user'); // Obtener el estado global del usuario
</script>