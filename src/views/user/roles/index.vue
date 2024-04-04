<script setup>
import RoleList from './components/RoleList/index.vue'
import MenuList from './components/MenuList/index.vue'
import { apiQuery } from '@/api/role';
const roles = ref([])
async function getList() {
  try {
    const res = await apiQuery()
    roles.value = res
    roleId.value = roles.value[0].id
  } catch (error) {
    console.error(error);
  }
}
getList()

const roleId = ref()
const role = computed(() => {
  return roles.value.find(item => item.id === roleId.value)
})
</script>

<template>
  <div h-full>
    <n-grid x-gap="12" :cols="4" h-full>
      <n-gi h-full span="1">
        <RoleList :roles v-model="roleId"></RoleList>
      </n-gi>
      <n-gi h-full span="3">
        <MenuList :role @load="getList"></MenuList>

      </n-gi>
    </n-grid>

  </div>

</template>
