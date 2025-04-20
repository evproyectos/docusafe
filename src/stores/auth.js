import { defineStore } from 'pinia'
import axios from 'axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || ''
  }),

  actions: {
    async login(email, password) {
      const response = await axios.post('https://p6jo233fcj.execute-api.us-east-1.amazonaws.com/dev/login', {
        email,
        password
      })

      const token = response.data.token
      this.token = token
      localStorage.setItem('token', token)
    },

    logout() {
      this.token = ''
      localStorage.removeItem('token')
    }
  }
})
