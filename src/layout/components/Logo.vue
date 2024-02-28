<script setup>
defineProps({
  collapsed: {
    type: Boolean
  }
});

const title = ref(import.meta.env.VITE_APP_TITLE)
</script>

<template>
  <div flex :class="{ 'px-4': !collapsed }" transition-all cursor-pointer border-b-1 text-primary h-16>
    <n-icon :size="64">
      <div w-full h-full i-carbon-letter-ll text-5xl></div>
    </n-icon>
    <div flex flex-nowrap items-center text-xl overflow-hidden truncate v-show="!collapsed">
      {{ title }}
    </div>
  </div>
</template>
