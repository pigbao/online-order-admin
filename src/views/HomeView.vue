<script setup>
import TheWelcome from '../components/TheWelcome.vue'
import request from '@/utils/request'
import { useUserStore } from '@/stores/user'
request.post('/user', {
  firstName: 'Fred',
  lastName: 'Flintstone'
})
  .then(function(response) {
    console.log(response);
  })
  .catch(function(error) {
    console.log(error);
  });
const userStore = useUserStore()
console.log('userStore.token :>> ', userStore.token);
</script>

<template>
  <main>
    {{ userStore.token }}
    <TheWelcome />
  </main>
</template>
