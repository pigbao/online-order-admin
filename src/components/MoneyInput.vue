<script setup>

const model = defineModel('value')

const value = computed({
  get() {
    return (model.value || 0) / 100
  },
  set(val) {
    model.value = (val || 0) * 100
  }
})



</script>

<template>
  <n-input-number v-model:value="value" clearable :min="0" :max="9999999999" />
</template>
