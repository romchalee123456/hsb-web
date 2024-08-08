// router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/assets/stores/auth';
import Login from '@/views/pages/auth/Login.vue';
import AppLayout from '@/layout/AppLayout.vue';

const routes = [
    {
        path: '/',
        component: AppLayout,
        children: [
            {
                path: '/',
                name: 'dashboard',
                component: () => import('@/views/Dashboard.vue')
            },
            {
                path: '/addUser',
                name: 'addUser',
                component: () => import('@/views/pages/AddUser.vue')
            }
        ]
  },
  { path: '/login', name: 'Login', component: Login },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  if (to.name !== 'Login' && !authStore.isAuthenticated) {
    next({ name: 'Login' });
  } else {
    next();
  }
});

export default router;
