<script setup>
import request from '@/utils/request'
let a = ref(1)
request.post('/user', {
  firstName: 'Fred',

})
  .then(function(response) {
    console.log(response);
  })
  .catch(function(error) {
    console.log(error);
  });
</script>

<template>
  <RouterView />
  <NButton @click="a++"> {{ a }}</NButton>
</template>

<style scoped></style>
