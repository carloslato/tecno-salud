<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Crear/Editar Historia Médica
        </h2>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="handleSaveMedicalRecord">
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="patientId" class="sr-only">ID del Paciente</label>
            <input id="patientId" name="patientId" type="text" required
                   class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                   placeholder="ID del Paciente" v-model="patientId">
          </div>
          <div>
            <label for="date" class="sr-only">Fecha</label>
            <input id="date" name="date" type="date" required
                   class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                   v-model="date">
          </div>
          <div>
            <label for="diagnosis" class="sr-only">Diagnóstico</label>
            <textarea id="diagnosis" name="diagnosis" rows="3" required
                      class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="Diagnóstico" v-model="diagnosis"></textarea>
          </div>
          <div>
            <label for="treatment" class="sr-only">Tratamiento</label>
            <textarea id="treatment" name="treatment" rows="3" required
                      class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="Tratamiento" v-model="treatment"></textarea>
          </div>
        </div>

        <div>
          <button type="submit"
                  class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Guardar Historia Médica
          </button>
        </div>
      </form>
      <p class="mt-2 text-center text-sm text-gray-600">
        <NuxtLink to="/doctor" class="font-medium text-indigo-600 hover:text-indigo-500">
          Volver al Panel del Doctor
        </NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import useMedicalRecords from '~/composables/useMedicalRecords';
import useAuth from '~/composables/useAuth';

definePageMeta({
  middleware: 'auth',
  roles: ['doctor', 'admin'] // Roles permitidos para esta página
});

const route = useRoute();
const router = useRouter();
const patientId = ref(route.query.patientId || '');
const date = ref(new Date().toISOString().split('T')[0]);
const diagnosis = ref('');
const treatment = ref('');

const { createMedicalRecord } = useMedicalRecords();
const { getCurrentUser } = useAuth();

onMounted(async () => {
  // Aquí podrías cargar una historia médica existente si se pasa un ID de historia médica
  // Por simplicidad, solo pre-llenamos el patientId si viene de la URL
});

const handleSaveMedicalRecord = async () => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser || (currentUser.role !== 'doctor' && currentUser.role !== 'admin')) {
      alert('Acceso denegado. Solo los doctores pueden crear historias médicas.');
      router.push('/login');
      return;
    }

    const recordData = {
      patient_id: patientId.value,
      created_at: date.value, // Usar created_at en lugar de date
      diagnosis: diagnosis.value,
      treatment: treatment.value,
      doctor_id: currentUser.$id,
      // doctor_name: currentUser.full_name || currentUser.email, // Si se añade al esquema
    };
    await createMedicalRecord(recordData);
    alert('Historia médica guardada exitosamente.');
    router.push('/doctor');
  } catch (error) {
    console.error('Error al guardar historia médica:', error);
    alert(`Error al guardar historia médica: ${error.message}`);
  }
};
</script>