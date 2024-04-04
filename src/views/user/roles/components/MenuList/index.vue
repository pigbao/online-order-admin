<script setup>
import { asyncRoutes } from '@/router/index'
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
  data.value = loadData(asyncRoutes)
  console.log('data.value :>> ', data.value);
})

function loadData(asyncRoutes) {
  return asyncRoutes.map(item => {
    item.label = item.meta.title
    if (item.children) {
      item.children = loadData(item.children)
    }
    return item
  })
}


async function handleSave() {
  try {
    await apiUpdate({
      id: props.role.id,
      menus: checkedKeys.value.toString(),
      roleName: roleName.value
    })
    window.$message.success('保存成功')
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
      <n-tree block-line :data v-model:checked-keys="checkedKeys" expand-on-click checkable key-field="name"
        label-field="label" children-field="children" />
    </n-flex>
  </n-card>

</template>
