<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Emitir Factura
        </h2>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="handleCreateInvoice">
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="patientId" class="sr-only">ID del Paciente</label>
            <input id="patientId" name="patientId" type="text" required
                   class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                   placeholder="ID del Paciente" v-model="patientId">
          </div>
          <div>
            <label for="amount" class="sr-only">Monto</label>
            <input id="amount" name="amount" type="number" step="0.01" required
                   class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                   placeholder="Monto" v-model="amount">
          </div>
          <div>
            <label for="description" class="sr-only">Descripción</label>
            <textarea id="description" name="description" rows="3"
                      class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="Descripción (opcional)" v-model="description"></textarea>
          </div>
        </div>

        <div>
          <button type="submit"
                  class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Emitir Factura
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
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import useDoctorPanel from '~/composables/useDoctorPanel';
import useAuth from '~/composables/useAuth';

definePageMeta({
  middleware: 'auth',
  roles: ['doctor', 'admin'] // Roles permitidos para esta página
});

const patientId = ref('');
const amount = ref(0);
const description = ref('');
const router = useRouter();
const { createInvoice } = useDoctorPanel();
const { getCurrentUser } = useAuth();

const handleCreateInvoice = async () => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser || (currentUser.role !== 'doctor' && currentUser.role !== 'admin')) {
      alert('Acceso denegado. Solo los doctores pueden emitir facturas.');
      router.push('/login');
      return;
    }

    const invoiceData = {
      patient_id: patientId.value,
      amount: parseFloat(amount.value),
      description: description.value,
      date: new Date().toISOString().split('T')[0],
      issued_by: currentUser.$id,
      issued_by_name: currentUser.name || currentUser.email,
      status: 'pending', // o 'paid', 'due', etc.
    };
    await createInvoice(invoiceData);
    alert('Factura emitida exitosamente.');
    router.push('/doctor');
  } catch (error) {
    console.error('Error al emitir factura:', error);
    alert(`Error al emitir factura: ${error.message}`);
  }
};
</script>