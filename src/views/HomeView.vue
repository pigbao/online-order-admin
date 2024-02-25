<script setup>
import TheWelcome from '../components/TheWelcome.vue'
import request from '@/utils/request'
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
</script>

<template>
  <main>
    <TheWelcome />
  </main>
</template>
