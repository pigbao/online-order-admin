<script setup>
import Detail from './components/Detail.vue'

const queryForm = ref({
  pageNum: 1,
  pageSize: 10
})

function search() {

}

function reset() {
  queryForm.value = {
    pageNum: 1,
    pageSize: 10
  }
}

const columns = ref([
  {
    title: '头像',
    key: 'avatar'
  },
  {
    title: '用户名',
    key: 'username'
  },
  {
    title: '联系方式',
    key: 'phone'
  },
  {
    title: '角色',
    key: 'roles'
  },
  {
    title: '创建者',
    key: 'createUserName'
  },
  {
    title: '创建时间',
    key: 'createTime'
  },
])

const list = ref([])

function add() {
  const modalInst = window.$modal.create({
    title: '新增用户',
    content: () => {
      return h(Detail)
    },
    preset: 'dialog',
    showIcon: false
  })
  // modalInst.destroy()

}

</script>

<template>
  <n-card h-full>
    <n-form ref="formRef" inline label-placement="left" :model="queryForm">
      <n-form-item label="用户名" path="name">
        <n-input v-model:value="queryForm.name" placeholder="输入用户名" />
      </n-form-item>
      <n-form-item label="联系方式" path="phone">
        <n-input v-model:value="queryForm.phone" placeholder="输入联系方式" />
      </n-form-item>
      <n-form-item>
        <n-space>
          <n-button type="primary" attr-type="button" @click="search">
            搜索
          </n-button>
          <n-button attr-type="button" @click="reset">
            重置
          </n-button>
        </n-space>
      </n-form-item>
    </n-form>
    <div flex justify-end gap-4 mb-4>
      <n-button type="primary" attr-type="button" @click="add">
        新增
      </n-button>
    </div>
    <n-data-table :columns="columns" :data="list" :bordered="false" striped
      :pagination="{ pageSize: queryForm.pageSize }" />
  </n-card>
</template>
