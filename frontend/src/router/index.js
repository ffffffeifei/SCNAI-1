import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
    meta: { requiresGuest: true }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('@/views/Dashboard.vue'),
  },
  {
    path: '/recognition',
    name: 'Recognition',
    component: () => import('@/views/Recognition.vue'),
  },
  {
    path: '/visualization/:recordId?',
    name: 'Visualization',
    component: () => import('@/views/Visualization.vue'),
  },
  {
    path: '/chat',
    name: 'Chat',
    component: () => import('@/views/Chat.vue'),
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('@/views/Profile.vue'),
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/About.vue'),
  },
  {
    path: '/history',
    name: 'History',
    component: () => import('@/views/History.vue'),
  },
  {
    path: '/atlas',
    name: 'Atlas',
    component: () => import('@/views/Atlas.vue'),
  },
  {
    path: '/plant/:id',
    name: 'PlantDetail',
    component: () => import('@/views/PlantDetail.vue'),
  },

  // 3个角色首页（已移除专家）
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('@/views/admin/index.vue'),
  },
  {
    path: '/farmer',
    name: 'Farmer',
    component: () => import('@/views/farmer/index.vue'),
  },
  {
    path: '/user',
    name: 'User',
    component: () => import('@/views/user/index.vue'),
  },
  {
    path: '/usermanage',
    name: 'Usermanage',
    component: () => import('@/views/Usermanage.vue'),
  },
  {
    path: '/device',
    name: 'device',
    component: () => import('@/views/Device.vue'),
  },
  {
    path: '/data',
    name: 'Data',
    component: () => import('@/views/Data.vue'),
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router