<script setup>

// const model = defineModel('value')
const props = defineProps({
  money: {
    type: Number,
    default: 0
  }
})

const emits = defineEmits(['update:money', 'updateMoney'])

const value = computed({
  get() {
    return (props.money || 0) / 100
  },
  set(val) {
    let v = (val || 0) * 100
    emits('update:money', v)
    emits('updateMoney', v)
  }
})



</script>

<template>
  <n-input-number v-model:value="value" clearable :min="0" :max="9999999999" />
</template>
