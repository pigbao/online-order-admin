import { isWhite } from './whiteList';

export function createGuard(router) {
  router.beforeEach(async (to, form, next) => {
    try {
      useTitle(`${import.meta.env.VITE_APP_TITLE} -----`);
      window.$loadingBar?.start();
      const userStore = useUserStore();
      const isLogin = Boolean(userStore.token);
      if (to.path !== '/login' && !userStore.userInfo) {
        await userStore.getUserInfo();
      }

      const actions = [
        {
          // 已登录状态 前往登录页，重定向到首页
          flag: isLogin && to.path === '/login',
          action() {
            next({ path: '/' });
          },
        },
        {
          // 白名单不需要登录 直接进入
          flag: isWhite(to.path),
          action() {
            next();
          },
        },
        {
          // 未登录状态，前往需要登录状态页面，重定向到登录页
          flag: !isLogin && !isWhite(to.path),
          action() {
            const redirect = to.fullPath;
            next({ path: '/login', query: { redirect } });
          },
        },
        {
          // 已登录状态，是超级管理员直接进入
          flag: isLogin && userStore?.userInfo?.role == 1,
          action() {
            next();
          },
        },
        {
          // 已登录状态，无需校验权限页面直接进入
          flag: isLogin && (!to?.meta?.auth),
          action() {
            next();
          },
        },
        {
          // 已登录状态，无权限 重定向到404页面
          flag: isLogin && !userStore?.userInfo?.menus?.includes(to.name),
          action() {
            next({ path: '/error/404' });
          },
        },
        {
          // 已登录状态，并且有权限 直接进入
          flag: isLogin && userStore?.userInfo?.menus?.includes(to.name),
          action() {
            next();
          },
        },

      ];
      actions.some(item => {
        const { flag, action } = item;
        if (flag) {
          action();
        }
        return flag;
      });
    } catch (error) {
      console.log(error);
      next({ path: '/login' });
    }
    // next();
  });

  router.afterEach(to => {
    useTitle(`${import.meta.env.VITE_APP_TITLE} - ${to?.meta?.title}`);
    window.$loadingBar?.finish();
  });
}
