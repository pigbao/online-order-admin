import { isWhite } from './whiteList';

export function createGuard(router) {
  router.beforeEach(async (to, form, next) => {
    try {
      useTitle(`${import.meta.env.VITE_APP_TITLE} -----`);
      window.$loadingBar?.start();
      const { token, getUserInfo,userInfo } = useUserStore();
      const isLogin = Boolean(token);

      if (to.path !== '/login') {
        await getUserInfo();
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
            actionNext();
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
          // 已登录状态，并且有权限 直接进入
          flag: isLogin && userInfo?.value?.role,
          action() {
            actionNext();
          },
        },
        {
          // 已登录状态，无权限信息获取用户权限信息并挂载动态路由
          flag: isLogin,
          async action() {
            // await getUserInfo()
            next()
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

      function actionNext() {
        next();
      }
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
