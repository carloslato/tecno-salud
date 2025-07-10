<template>
  <nav class="bg-gray-800 p-4">
    <div class="container mx-auto flex justify-between items-center">
      <NuxtLink to="/" class="text-white text-2xl font-bold">Tecno Salud</NuxtLink>
      <div class="space-x-4">
        <template v-if="user">
          <NuxtLink v-if="user.role === 'patient' || user.role === 'admin'" to="/appointments" class="text-gray-300 hover:text-white">Mis Citas</NuxtLink>
          <NuxtLink v-if="user.role === 'patient' || user.role === 'admin'" to="/medical-records" class="text-gray-300 hover:text-white">Mi Historial</NuxtLink>
          <NuxtLink v-if="user.role === 'doctor' || user.role === 'admin'" to="/doctor" class="text-gray-300 hover:text-white">Panel Doctor</NuxtLink>
          <NuxtLink v-if="user.role === 'admin'" to="/admin" class="text-gray-300 hover:text-white">Panel Admin</NuxtLink>
          <button @click="handleLogout" class="text-gray-300 hover:text-white">Cerrar Sesión</button>
        </template>
        <template v-else>
          <NuxtLink to="/login" class="text-gray-300 hover:text-white">Iniciar Sesión</NuxtLink>
          <NuxtLink to="/register" class="text-gray-300 hover:text-white">Registrarse</NuxtLink>
        </template>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useRouter } from 'vue-router';
import useAuth from '~/composables/useAuth';

const user = useState('user');
const { logout } = useAuth();
const router = useRouter();

const handleLogout = async () => {
  try {
    await logout();
    user.value = null; // Limpiar el estado global del usuario
    router.push('/login');
  } catch (error) {
    console.error('Error al cerrar sesión:', error);
    alert('Error al cerrar sesión.');
  }
};
</script>