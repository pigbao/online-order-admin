<script setup>
import { constantRoutes } from '@/router/index'
import { apiUpdate } from '@/api/role';

const data = ref([]);

const props = defineProps({
  role: {
    type: Object,
    default: () => { }
  }
})

const emits = defineEmits(['load'])
const checkedKeys = ref([])
const roleName = ref('')

watch(() => props.role, (newVal) => {
  if (newVal === "" || newVal === undefined || newVal === null) {
    roleName.value = ""
    checkedKeys.value = []
  } else {
    checkedKeys.value = newVal?.menus.split(",")
    roleName.value = newVal.name
  }
}, { immediate: true, deep: true })

onMounted(() => {
  data.value = loadData(constantRoutes)
  console.log('data.value :>> ', data.value);
})

function loadData(constantRoutes) {
  const res = []
  constantRoutes.forEach(item => {
    if (item?.meta?.auth) {
      let route = { ...item }
      route.label = item?.meta?.title
      if (item.children) {
        route.children = loadData(item.children)
      }
      res.push(route)
    }
  });

  return res
}

async function handleSave() {
  try {
    await apiUpdate({
      id: props.role.id,
      menus: checkedKeys.value.toString(),
      roleName: roleName.value
    })
    window.$message.success('保存成功')
    location.reload();
    emits("load")
  } catch (error) {
    console.error(error);
  }
}
</script>

<template>
  <n-card h-full title="菜单">
    <template #header-extra>
      <n-button type="primary" @click="handleSave"> 保存 </n-button>
    </template>
    <n-flex vertical>
      <n-tree block-line :data v-model:checked-keys="checkedKeys" expand-on-click checkable key-field="name" cascade
        label-field="label" children-field="children" />
    </n-flex>
  </n-card>

</template>
