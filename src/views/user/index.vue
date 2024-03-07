<script setup>
const queryForm = ref({
  pageSize: 10
})

function search() {

}

const columns = ref([
  {
    title: 'Name',
    key: 'name'
  },
  {
    title: 'Age',
    key: 'age'
  },
  {
    title: 'Address',
    key: 'address'
  }
])

const list = ref([])

</script>

<template>
  <n-card h-full>
    <n-form ref="formRef" inline label-placement="left" :model="queryForm">
      <n-form-item label="姓名" path="name">
        <n-input v-model:value="queryForm.name" placeholder="输入姓名" />
      </n-form-item>
      <n-form-item label="年龄" path="age">
        <n-input v-model:value="queryForm.age" placeholder="输入年龄" />
      </n-form-item>
      <n-form-item label="电话号码" path="phone">
        <n-input v-model:value="queryForm.phone" placeholder="电话号码" />
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
