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
  // 店铺管理
  {
    path: '/shop',
    name: 'Shop',
    component: Layout,
    meta: {
      title: '店铺管理',
      hide: false
    },
    redirect: '/shop/basic',
    children: [
      {
        path: '/shop/basic',
        name: 'ShopBasic',
        component: () => import('@/views/shop/basic/index.vue'),
        meta: {
          hide: false,
          title: '店铺信息'
        }
      },
      {
        path: '/shop/banner',
        name: 'ShopBanner',
        component: () => import('@/views/shop/banner/index.vue'),
        meta: {
          hide: false,
          title: '轮播图'
        }
      },
    ],
  },
  {
    path: '/goods',
    name: 'Goods',
    component: Layout,
    meta: {
      title: '商品管理',
      hide: false
    },
    redirect: '/goods/list',
    children: [
      {
        path: '/goods/category',
        name: 'GoodsCategory',
        component: () => import('@/views/goods/category/index.vue'),
        meta: {
          hide: false,
          title: '商品分类'
        }
      },
      {
        path: '/goods/category/add',
        name: 'GoodsCategoryAdd',
        component: () => import('@/views/goods/category/detail.vue'),
        meta: {
          hide: true,
          title: '添加分类'
        }
      },
      {
        path: '/goods/category/edit/:id',
        name: 'GoodsCategoryEdit',
        component: () => import('@/views/goods/category/detail.vue'),
        meta: {
          hide: true,
          title: '添加分类'
        }
      },
      {
        path: '/goods/list',
        name: 'GoodsList',
        component: () => import('@/views/goods/list/index.vue'),
        meta: {
          hide: false,
          title: '商品列表'
        }
      },
      // 添加商品
      {
        path: '/goods/list/add',
        name: 'GoodsListAdd',
        component: () => import('@/views/goods/list/detail.vue'),
        meta: {
          hide: true,
          title: '添加商品'
        }
      },
      // 编辑商品
      {
        path: '/goods/list/edit/:id',
        name: 'GoodsListEdit',
        component: () => import('@/views/goods/list/detail.vue'),
        meta: {
          hide: true,
          title: '编辑商品'
        }
      },

    ]
  },
  // 订单管理
  {
    path: '/order',
    name: 'Order',
    component: Layout,
    meta: {
      title: '订单管理',
      hide: false
    },
    redirect: '/order/list',
    children: [
      {
        path: '/order/list',
        name: 'OrderList',
        component: () => import('@/views/order/list/index.vue'),
        meta: {
          hide: false,
          title: '订单列表'
        }
      },
      {
        path: '/order/detail/:id',
        name: 'OrderDetail',
        component: () => import('@/views/order/list/detail.vue'),
        meta: {
          hide: true,
          title: '订单详情'
        }
      },
    ]
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
        path: '/user/roles',
        name: 'UserRoles',
        component: () => import('@/views/user/roles/index.vue'),
        meta: {
          hide: false,
          title: '角色管理'
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
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    redirect: '/error/404',
    meta: {
      title: '404',
      hide: true
    },
  }
];

export const asyncRoutes = [
  // {
  //   path: '/user',
  //   name: 'User',
  //   component: Layout,
  //   meta: {
  //     title: '用户管理',
  //     hide: false
  //   },
  //   redirect: '/user/list',
  //   children: [
  //     {
  //       path: '/user/list',
  //       name: 'UserList',
  //       component: () => import('@/views/user/list/index.vue'),
  //       meta: {
  //         hide: false,
  //         title: '用户列表'
  //       }
  //     },
  //     {
  //       path: '/user/roles',
  //       name: 'UserRoles',
  //       component: () => import('@/views/user/roles/index.vue'),
  //       meta: {
  //         hide: false,
  //         title: '角色管理'
  //       }
  //     },
  //     {
  //       path: '/user/me',
  //       name: 'UserMe',
  //       component: () => import('@/views/user/me/index.vue'),
  //       meta: {
  //         hide: true,
  //         title: '个人中心'
  //       }
  //     },
  //   ],
  // },

]

export const notFoundRoute = {
  path: '/:pathMatch(.*)*',
  name: 'NotFound',
  redirect: '/error/404',
  meta: {
    title: '404',
    hide: true
  },
}

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: constantRoutes,
});

export function setupRouter(app) {
  app.use(router);
  createGuard(router);
}
