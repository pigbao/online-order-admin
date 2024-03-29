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
    },
    redirect: '/home/index',
    children: [
      {
        path: '/home/index',
        name: 'HomeIndex',
        component: () => import('@/views/index.vue'),
      },
    ],
  },
  {
    path: '/user',
    name: 'User',
    component: Layout,
    meta: {
      title: '用户管理',
      hide: false
    },
    redirect: '/user/list',
    children: [
      {
        path: '/user/list',
        name: 'UserList',
        component: () => import('@/views/user/list/index.vue'),
        meta: {
          hide: false,
          title: '用户列表'
        }
      },
      {
        path: '/user/me',
        name: 'UserMe',
        component: () => import('@/views/user/me/index.vue'),
        meta: {
          hide: true,
          title: '个人中心'
        }
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: Layout,
    component: () => import('@/views/login.vue'),
    meta: {
      title: '登录',
      hide: true
    },
  },
  {
    path: '/error',
    name: 'error',
    component: Layout,
    meta: {
      title: 'error',
      hide: true
    },
    redirect: '/error/404',
    children: [
      {
        path: '/error/404',
        name: '404',
        component: () => import('@/views/404.vue'),
        meta: {
          title: '404',
          hide: true
        },
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    redirect: '/error/404',
    meta: {
      title: '404',
      hide: true
    },
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
