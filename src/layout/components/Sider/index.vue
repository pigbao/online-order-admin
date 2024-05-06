<script setup>
import Logo from '../Logo.vue'
const userStore = useUserStore()
const collapsed = ref(false)

const activeKey = computed(() => {
  return route.path
})
const route = useRoute()
const router = useRouter()
const menuOptions = ref([])
// router是全局路由对象

// watch(
//   () => userStore.userInfo.menus,
//   (newValue) => {
//     console.log('newValue :>> ', newValue);
//     menuOptions.value = useMenus(router.getRoutes(), 'menu', userStore.userInfo.menus)
//     console.log('menuOptions.value :>> ', menuOptions.value);
//   }, {
//   deep: true
// }
// )


const menuRef = ref()
onMounted(() => {
  nextTick(async () => {
    menuRef.value?.showOption(activeKey.value)
    const { menus } = await userStore.getUserInfo()
    menuOptions.value = useMenus(router.options.routes, 'menu', menus)
  })
})
</script>

<template>
  <n-layout-sider :bordered="true" collapse-mode="width" :collapsed-width="64" :width="240" :collapsed="collapsed"
    show-trigger @collapse="collapsed = true" @expand="collapsed = false" style="background-color: #f7f7fa;">

    <Logo :collapsed="collapsed"></Logo>
    <n-menu :value="activeKey" :collapsed="collapsed" :collapsed-width="64" :collapsed-icon-size="22"
      :options="menuOptions" ref="menuRef" />

  </n-layout-sider>
</template>
