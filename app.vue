<template>
  <AppNavbar />
  <NuxtPage />
</template>

<script setup>
import { onBeforeMount } from 'vue';
import useAuth from '~/composables/useAuth';

const { getCurrentUser } = useAuth();
const user = useState('user', () => null); // Estado global para el usuario
const userReady = useState('userReady', () => false);


onBeforeMount(async () => {
  try {
    const currentUser = await getCurrentUser();
    user.value = currentUser;
    userReady.value = true;
  } catch (error) {
    console.error('Error al cargar el usuario al inicio de la app:', error);
    user.value = null;
  }
});
</script>
