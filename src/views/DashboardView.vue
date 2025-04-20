<template>
  <div class="min-h-screen bg-gray-100 p-6">
    <div class="max-w-4xl mx-auto">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-3xl font-bold text-gray-700">Bienvenido a DocuSafe</h1>
        <button @click="logout"
                class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition">
          Cerrar sesión
        </button>

      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <router-link to="/upload" class="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
          <div class="flex flex-col items-center justify-center h-full">
            <svg class="w-12 h-12 text-blue-500 mb-4" fill="none" stroke="currentColor"
                 stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round"
                    d="M4 16v1a2 2 0 002 2h3m10-2a2 2 0 002-2v-1m-6-6l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            <span class="text-lg font-semibold text-gray-700">Subir Archivos</span>
          </div>
        </router-link>

        <router-link to="/files" class="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
          <div class="flex flex-col items-center justify-center h-full">
            <svg class="w-12 h-12 text-green-500 mb-4" fill="none" stroke="currentColor"
                 stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round"
                    d="M9 17v-2a2 2 0 012-2h2a2 2 0 012 2v2m2 0a2 2 0 002-2V7a2 2 0 00-2-2h-5.586A2 2 0 0110 4.414L8.414 6H6a2 2 0 00-2 2v7a2 2 0 002 2h2m0 0v2" />
            </svg>
            <span class="text-lg font-semibold text-gray-700">Mis Archivos</span>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()

const logout = () => {
  auth.logout()
  router.push('/login')
}

</script>
