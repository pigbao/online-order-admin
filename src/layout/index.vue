<script setup>
import Sider from './components/Sider/index.vue'
import PageHeader from './components/PageHeader/index.vue'
const appMain = ref(null)
const { toggle } = useFullscreen(appMain)

const loadShow = ref(true)
function load() {
  loadShow.value = false
  setTimeout(() => {
    loadShow.value = true
  }, 300)
}
</script>

<template>
  <div ref="appMain">
    <n-layout has-sider position="absolute">
      <Sider></Sider>
      <n-layout>
        <div h-full flex flex-col>
          <PageHeader @full="toggle" @load="load"></PageHeader>
          <div w-full flex-1 p-6 bg-gray:5>
            <router-view v-slot="{ Component, route }">
              <transition name="fade" mode="out-in" :appear="true">
                <component :is="Component" :key="route.fullPath" v-if="loadShow" />
              </transition>
            </router-view>
          </div>
        </div>
      </n-layout>
    </n-layout>
  </div>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
