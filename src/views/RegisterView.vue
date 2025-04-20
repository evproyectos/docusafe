<template>
    <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-green-300">
      <div class="bg-white p-8 rounded-2xl shadow-xl w-full max-w-sm">
        <h2 class="text-2xl font-bold text-center mb-6 text-green-700">Crear cuenta</h2>
  
        <form @submit.prevent="register" class="space-y-4">
          <input v-model="email" type="email" placeholder="Correo electrónico"
                 class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400" />
  
          <input v-model="password" type="password" placeholder="Contraseña"
                 class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400" />
  
          <div v-if="error" class="text-red-600 text-sm">{{ error }}</div>
          <div v-if="success" class="text-green-600 text-sm">✅ Registro exitoso, redirigiendo...</div>
  
          <button type="submit"
                  class="w-full bg-green-600 text-white font-semibold py-2 rounded-lg hover:bg-green-700 transition">
            Registrarse
          </button>
        </form>
  
        <p class="text-sm text-gray-600 mt-4 text-center">
          ¿Ya tienes una cuenta? <router-link to="/login" class="text-green-700 hover:underline">Inicia sesión</router-link>
        </p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import axios from 'axios'
  
  const email = ref('')
  const password = ref('')
  const error = ref('')
  const success = ref(false)
  const router = useRouter()
  
  const register = async () => {
    error.value = ''
    success.value = false
  
    if (!email.value || !password.value) {
      error.value = "Correo y contraseña son obligatorios"
      return
    }
  
    try {
      await axios.post('https://p6jo233fcj.execute-api.us-east-1.amazonaws.com/dev/register', {
        email: email.value,
        password: password.value
      })
      success.value = true
      setTimeout(() => {
        router.push('/login')
      }, 1500)
    } catch (e) {
      console.error("Error en registro:", e)
      error.value = e.response?.data?.error || "Error al registrar"
    }
  }
  </script>
  