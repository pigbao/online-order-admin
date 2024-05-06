<script setup>
import Breadcrumb from './Breadcrumb.vue'
import UserMenus from './UserMenus.vue'
import Full from './Full.vue'
import Load from './Load.vue'
</script>

<template>
  <n-layout-header>
    <div h-16 border-b-1 flex items-center justify-between px-4>
      <Breadcrumb></Breadcrumb>

      <div h-full flex>
        <Load @click="$emit('load')"></Load>
        <Full @click="$emit('full')" />
        <UserMenus></UserMenus>
      </div>
    </div>
  </n-layout-header>
</template>
