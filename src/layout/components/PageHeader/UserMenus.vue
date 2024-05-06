<script setup>
import Basic from './Basic.vue'
// import avatar from '@/assets/images/avatar1.gif'
import { NIcon, useDialog } from 'naive-ui';

function renderIcon(icon) {
  return () => {
    return h(NIcon, null, {
      default: () => h('div', { class: icon, style: 'width: 16px;height:16px' })
    })
  }
}

const options = ref([
  {
    type: 'divider',
    key: 'd1'
  },
  {
    label: '退出登录',
    key: 'logout',
    icon: renderIcon('i-carbon-logout')
  },
])

function handleSelect(key) {
  actions[key]()
}


const dialog = useDialog()
const userStore = useUserStore()
const router = useRouter()

const actions = {
  logout() {
    dialog.info({
      title: '提示',
      content: '是否确定要退出系统？',
      positiveText: '确定',
      negativeText: '取消',
      positiveButtonProps: { type: 'primary' },
      onPositiveClick: () => {
        userStore.logout()
      },
      onNegativeClick: () => {
        // message.error('取消')
      }
    })
  },
  userCenter() {
    router.push({
      path: '/user/index'
    })
  }
}
const userInfo = computed(() => {
  return userStore.userInfo
})

</script>

<template>
  <n-dropdown trigger="click" :options="options" :show-arrow="true" @select="handleSelect">
    <Basic>
      <div flex gap-2 items-center px-2>
        <n-avatar round size="medium" :src="userInfo?.avatar">
        </n-avatar>
        <div text-6>{{ userInfo?.username }}</div>
      </div>
    </Basic>
  </n-dropdown>
</template>
