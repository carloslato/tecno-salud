<template>
  <div class="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-4xl mx-auto">
      <h2 class="text-3xl font-extrabold text-gray-900 mb-6">Panel de Administración</h2>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Estadísticas Básicas -->
        <div class="bg-white shadow overflow-hidden rounded-lg p-6">
          <h3 class="text-xl font-semibold text-gray-900 mb-4">Estadísticas</h3>
          <p class="text-gray-700">Total de Usuarios: {{ usersCount }}</p>
          <p class="text-gray-700">Total de Citas: {{ appointmentsCount }}</p>
        </div>

        <!-- Gestión de Usuarios -->
        <div class="bg-white shadow overflow-hidden rounded-lg p-6">
          <h3 class="text-xl font-semibold text-gray-900 mb-4">Gestión de Usuarios</h3>
          <ul class="space-y-2">
            <li v-for="user in users" :key="user.$id" class="flex justify-between items-center">
              <span>{{ user.full_name || user.email }} ({{ user.role || 'N/A' }})</span>
              <div>
                <button @click="editUser(user)" class="text-blue-600 hover:text-blue-900 text-sm mr-2">Editar</button>
                <button @click="deleteUser(user.$id)" class="text-red-600 hover:text-red-900 text-sm">Eliminar</button>
              </div>
            </li>
          </ul>
          <button @click="fetchUsers" class="mt-4 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700">
            Recargar Usuarios
          </button>
        </div>

        <!-- Gestión de Citas -->
        <div class="bg-white shadow overflow-hidden rounded-lg p-6">
          <h3 class="text-xl font-semibold text-gray-900 mb-4">Gestión de Citas</h3>
          <ul class="space-y-2">
            <li v-for="appointment in appointments" :key="appointment.$id" class="border-b pb-2">
              <p class="text-gray-900">Paciente: {{ appointment.patientName }}</p>
              <p class="text-sm text-gray-500">Doctor: {{ appointment.doctorName }}</p>
              <p class="text-sm text-gray-500">Fecha: {{ new Date(appointment.date).toLocaleDateString() }}</p>
              <p class="text-sm text-gray-500">Estado: {{ appointment.status }}</p>
            </li>
          </ul>
          <button @click="fetchAllAppointments" class="mt-4 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700">
            Recargar Citas
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import useAdminPanel from '~/composables/useAdminPanel';
import useAuth from '~/composables/useAuth';

definePageMeta({
  middleware: 'auth',
  roles: ['admin'] // Roles permitidos para esta página
});

const users = ref([]);
const appointments = ref([]);
const usersCount = ref(0);
const appointmentsCount = ref(0);

const { listUsers, deleteUser: adminDeleteUser, listAllAppointments, getUsersCount, getAppointmentsCount } = useAdminPanel();
const { getCurrentUser } = useAuth();

const fetchUsers = async () => {
  try {
    const fetchedUsers = await listUsers();
    users.value = fetchedUsers;
  } catch (error) {
    console.error('Error al cargar usuarios:', error);
    alert('Error al cargar usuarios.');
  }
};

const fetchAllAppointments = async () => {
  try {
    const fetchedAppointments = await listAllAppointments();
    appointments.value = fetchedAppointments;
  } catch (error) {
    console.error('Error al cargar todas las citas:', error);
    alert('Error al cargar todas las citas.');
  }
};

const fetchCounts = async () => {
  try {
    usersCount.value = await getUsersCount();
    appointmentsCount.value = await getAppointmentsCount();
  } catch (error) {
    console.error('Error al cargar conteos:', error);
  }
};

const editUser = (user) => {
  alert(`Funcionalidad de edición de usuario para ${user.name || user.email} no implementada.`);
  // Aquí se podría redirigir a una página de edición de usuario
};

const deleteUser = async (userId) => {
  if (confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
    try {
      await adminDeleteUser(userId);
      alert('Usuario eliminado exitosamente.');
      fetchUsers(); // Recargar la lista de usuarios
      fetchCounts(); // Actualizar conteo
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
      alert('Error al eliminar usuario.');
    }
  }
};

onMounted(async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser || currentUser.role !== 'admin') { // Verificar el rol del usuario
    alert('Acceso denegado. Solo los administradores pueden acceder a este panel.');
    navigateTo('/'); // Redirigir si no es admin
    return;
  }
  fetchUsers();
  fetchAllAppointments();
  fetchCounts();
});
</script>