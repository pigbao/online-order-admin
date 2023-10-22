<script setup>
let a = ref(1)
axios.post('/user', {
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
  <RouterView />
  <NButton @click="a++"> {{ a }}</NButton>
</template>

<style scoped></style>
