import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'

import LoginView from '../views/LoginView.vue'
import DashboardView from '../views/DashboardView.vue'
import UploadView from '../views/UploadView.vue'
import FileListView from '../views/FileListView.vue'
import NotFound from '../views/NotFound.vue'
import RegisterView from '../views/RegisterView.vue'

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: LoginView },
  { path: '/register', component: RegisterView },
  {
    path: '/dashboard',
    component: DashboardView,
    meta: { requiresAuth: true }
  },
  {
    path: '/upload',
    component: UploadView,
    meta: { requiresAuth: true }
  },
  {
    path: '/files',
    component: FileListView,
    meta: { requiresAuth: true }
  },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// ✅ Protección de rutas
router.beforeEach((to, from, next) => {
  const auth = useAuthStore()

  if (to.meta.requiresAuth && !auth.token) {
    next('/login')
  } else {
    next()
  }
})

export default router
