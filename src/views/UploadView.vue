<template>
  <div class="p-6 max-w-2xl mx-auto">
    <h1 class="text-2xl font-bold mb-6 text-gray-700">Subir nuevo archivo</h1>

    <div class="bg-white shadow-lg rounded-xl p-6 space-y-4">
      <input type="file" @change="handleFileChange"
             class="w-full border rounded p-2 file:bg-blue-600 file:text-white file:rounded file:px-4 file:py-2" />

      <div v-if="error" class="text-red-600 text-sm">{{ error }}</div>
      <div v-if="success" class="text-green-600 text-sm">✅ Archivo subido correctamente</div>

      <button :disabled="loading"
              @click="uploadFile"
              class="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition disabled:opacity-50">
        {{ loading ? "Subiendo..." : "Subir archivo" }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useAuthStore } from '../stores/auth'

const file = ref(null)
const error = ref('')
const success = ref(false)
const loading = ref(false)
const auth = useAuthStore()

const allowedExtensions = ['.pdf', '.png', '.jpg', '.jpeg', '.docx', '.txt']
const maxSizeMB = 10

const handleFileChange = (e) => {
  file.value = e.target.files[0]
  error.value = ''
  success.value = false
}

const uploadFile = async () => {
  if (!file.value) {
    error.value = "Selecciona un archivo para subir"
    return
  }

  const ext = file.value.name.slice(file.value.name.lastIndexOf('.')).toLowerCase()
  if (!allowedExtensions.includes(ext)) {
    error.value = `Tipo de archivo no permitido. Solo se permite: ${allowedExtensions.join(', ')}`
    return
  }

  if (file.value.size > maxSizeMB * 1024 * 1024) {
    error.value = `Archivo demasiado grande. El límite es ${maxSizeMB} MB.`
    return
  }

  loading.value = true
  error.value = ''
  success.value = false

  const reader = new FileReader()
  reader.onload = async () => {
    try {
      const base64 = reader.result.split(',')[1]

      await axios.post('https://p6jo233fcj.execute-api.us-east-1.amazonaws.com/dev/upload', {
        fileName: file.value.name,
        fileContent: base64
      }, {
        headers: {
          Authorization: `Bearer ${auth.token}`
        }
      })

      success.value = true
      file.value = null
    } catch (e) {
      console.error("Upload error:", e)
      error.value = e.response?.data?.error || "Error al subir el archivo"
    } finally {
      loading.value = false
    }
  }

  reader.readAsDataURL(file.value)
}
</script>
