import { defineStore } from 'pinia';
import { apiUser } from '../api/user';
export const useUserStore = defineStore('user', () => {
  const token = useStorage('TOKEN');

  function setToken(tokenStr) {
    token.value = tokenStr;
  }

  function logout() {
    token.value = null
    const router = useRouter()
    if (router) {
      router.push('/login')
    }
  }

  async function getUserInfo() {
    try {
      const userInfo = await apiUser()
      console.log('userInfo :>> ', userInfo);
      return userInfo
    } catch (error) {
      console.error(error);
    }
  }

  return { token, setToken, logout, getUserInfo };
});
