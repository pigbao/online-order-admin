import { useUserStore } from '../stores/user';

const instance = axios.create({
  baseURL: '/api',
  timeout: 5000,
});
// 添加请求拦截器
instance.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    const {token} = useUserStore()
    if (token) {
      config.headers.Authorization = token
    }
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
instance.interceptors.response.use(
  function (response) {
    const res = response.data;

    if (res.code === 500) {
      window.$message.error(res.msg); // 对响应错误做点什么
      console.log('error :>> ', res);
      return Promise.reject(res);
    }
    if (res.code === 401) {
      // 登录状态已过期
      console.log(401);
      window.$dialog.warning({
        title: '提示',
        content: res.msg,
        positiveText: '确定',
        onPositiveClick: () => {
          console.log('error :>> ', res);
          const { logout } = useUserStore();
          logout();
        },
      }); // 对响应错误做点什么
    }
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return res.data;
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    if (error?.response?.data?.code === 401) {
      // 登录状态已过期
      window.$dialog.warning({
        title: '提示',
        content: error?.response?.data?.msg,
        positiveText: '确定',
        onPositiveClick: () => {
          const { logout } = useUserStore();
          logout();
        },
      }); // 对响应错误做点什么
    }else{
      window.$message.error(error.message); // 对响应错误做点什么
      console.log('error :>> ', error);
    }
    return Promise.reject(error);
  }
);
export default instance;
