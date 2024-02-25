import { createRouter, createWebHistory } from 'vue-router';
import { createGuard } from './guard';
import Layout from '@/layout/index.vue';
// 默认挂载路由
export const constantRoutes = [
  {
    path: '/',
    name: '',
    meta: {
      title: 'Root',
      hide: true,
    },
    redirect: '/home/index',
  },
  {
    path: '/home',
    name: 'Home',
    component: Layout,
    meta: {
      title: '首页',
      icon: 'i-carbon-home',
    },
    redirect: '/home/index',
    children: [
      {
        path: '/home/index',
        name: 'Home',
        component: () => import('@/views/index.vue'),
      },
    ],
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/views/AboutView.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/404.vue'),
  },
];

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: constantRoutes,
});

export function setupRouter(app) {
  app.use(router);
  createGuard(router);
}
