import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '@/views/DashboardView.vue'
import LoginView from '@/views/LoginView.vue'
import { authGuard } from './guard'

const routes = [
  {
    path: '/login',
    component: LoginView,
    beforeEnter: () => {
      const token = localStorage.getItem('token')
      if (token) return '/'
    },
  },
  {
    path: '/',
    component: DashboardView,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(authGuard)

export default router
