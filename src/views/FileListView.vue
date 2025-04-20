<template>
  <div class="p-6 max-w-6xl mx-auto">
    <h1 class="text-2xl font-bold mb-6 text-gray-700">Mis archivos</h1>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      <div v-for="file in files" :key="file.fileName" class="bg-white shadow rounded-xl p-4 flex flex-col items-center">
        <!-- 🖼 Preview -->
        <div class="w-full h-40 flex items-center justify-center bg-gray-100 rounded-md mb-4 overflow-hidden">
          <img
            v-if="file.previewUrl"
            :src="file.previewUrl"
            alt="preview"
            class="object-cover max-h-full max-w-full"
          />
          <div v-else class="text-4xl text-gray-500">📄</div>

          <div v-else class="text-4xl text-gray-500">
            📄
          </div>
        </div>

        <p class="text-sm text-center text-gray-700 font-medium mb-2 truncate w-full">{{ file.fileName }}</p>

        <div class="flex justify-between gap-2 w-full">
          <button @click="downloadFile(file.fileName)" class="flex-1 bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 text-sm">Descargar</button>
          <button @click="deleteFile(file.fileName)" class="flex-1 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 text-sm">Eliminar</button>
        </div>
      </div>
    </div>
  </div>
  <div v-if="files.length === 0" class="flex flex-col items-center justify-center mt-20 text-gray-600">
  <lottie-player
    src="https://assets7.lottiefiles.com/private_files/lf30_jmgekfqg.json"
    background="transparent"
    speed="1"
    style="width: 250px; height: 250px;"
    loop
    autoplay>
  </lottie-player>

  <p class="text-lg font-semibold mt-4">No tienes archivos todavía</p>
  <p class="text-sm text-gray-500">¡Sube tu primer archivo para comenzar!</p>
  <router-link to="/upload"
               class="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
    Subir archivo
  </router-link>
</div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useAuthStore } from '../stores/auth'

const files = ref([])
const auth = useAuthStore()

const fetchFiles = async () => {
  const res = await axios.get('https://p6jo233fcj.execute-api.us-east-1.amazonaws.com/dev/documents', {
    headers: {
      Authorization: `Bearer ${auth.token}`
    }
  })

  // Enriquecer con preview solo si es imagen
  const enriched = await Promise.all(res.data.map(async (file) => {
    const isImage = /\.(jpg|jpeg|png|gif)$/i.test(file.fileName)

    if (isImage) {
      try {
        const previewRes = await axios.get('https://p6jo233fcj.execute-api.us-east-1.amazonaws.com/dev/preview', {
          headers: {
            Authorization: `Bearer ${auth.token}`
          },
          params: {
            fileName: file.fileName
          }
        })
        return {
          ...file,
          previewUrl: previewRes.data.url
        }
      } catch {
        return { ...file, previewUrl: null }
      }
    } else {
      return { ...file, previewUrl: null }
    }
  }))

  files.value = enriched
}

const deleteFile = async (filename) => {
  await axios.delete(`https://p6jo233fcj.execute-api.us-east-1.amazonaws.com/dev/delete`, {
    headers: {
      Authorization: `Bearer ${auth.token}`
    },
    data: { fileName: filename }
  })
  fetchFiles()
}

const downloadFile = async (filename) => {
  try {
    const res = await axios.get('https://p6jo233fcj.execute-api.us-east-1.amazonaws.com/dev/download', {
      headers: {
        Authorization: `Bearer ${auth.token}`
      },
      params: { fileName: filename }
    })

    // Abre la URL prefirmada directamente
    window.open(res.data.url, '_blank')
  } catch (e) {
    console.error("Error al obtener la URL de descarga:", e)
    alert("No se pudo descargar el archivo")
  }
}

const isImage = (filename) => {
  return /\.(jpg|jpeg|png|gif)$/i.test(filename)
}

const getPreviewUrl = async (filename) => {
  try {
    const res = await axios.get('https://p6jo233fcj.execute-api.us-east-1.amazonaws.com/dev/preview', {
      headers: { Authorization: `Bearer ${auth.token}` },
      params: { fileName: filename }
    })
    return res.data.url
  } catch (e) {
    return null
  }
}


onMounted(fetchFiles)
</script>
