<script setup>
let a = ref(1)
</script>

<template>
  <RouterView />

  <NButton @click="a++"> {{ a }}</NButton>
</template>

<style scoped></style>
