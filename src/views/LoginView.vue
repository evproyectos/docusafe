<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300">
    <div class="bg-white p-8 rounded-2xl shadow-xl w-full max-w-sm">
      <h2 class="text-2xl font-bold text-center mb-6 text-blue-700">Iniciar sesión</h2>
      <form @submit.prevent="login" class="space-y-4">
        <input v-model="email" type="text" placeholder="Correo electrónico"
               class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
        <input v-model="password" type="password" placeholder="Contraseña"
               class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
        <button type="submit"
                class="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition">
          Entrar
        </button>
      </form>
      <p class="text-sm text-gray-600 mt-4 text-center">
        ¿No tienes cuenta? <router-link to="/register" class="text-blue-700 hover:underline">Regístrate</router-link>
      </p>

    </div>
  </div>
</template>


<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const email = ref('')
const password = ref('')
const router = useRouter()
const auth = useAuthStore()

const login = async () => {
  try {
    await auth.login(email.value, password.value)
    router.push('/dashboard')
  } catch (e) {
    alert('Login failed')
  }
}
</script>
