import { defineStore } from 'pinia';
import { apiUser } from '../api/user';

export const useUserStore = defineStore('user', () => {
  const router = useRouter();
  const token = useStorage('TOKEN');

  const userInfo = ref({})

  function setToken(tokenStr) {
    token.value = tokenStr;
  }

  function logout() {
    token.value = null;
    userInfo.value = {}
    console.log('router :>> ', router);
    if (router) {
      router.push('/login');
    }
  }

  async function getUserInfo() {
    try {
      if (userInfo.value) {
        return userInfo.value
      }
      const res = await apiUser();
      console.log('res :>> ', res);
      userInfo.value = res
      return userInfo.value;
    } catch (error) {
      console.error(error);
    }
  }

  function getRoles(){
    return userInfo.value?.roles
  }

  return { token,getRoles, setToken, logout, getUserInfo };
});
