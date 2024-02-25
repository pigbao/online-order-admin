import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', () => {
  const token = useStorage('TOKEN');

  function setToken(tokenStr) {
    token.value = tokenStr;
  }

  return { token, setToken };
});
