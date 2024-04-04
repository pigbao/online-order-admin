<script setup>
import { NButton, NSpace } from 'naive-ui'
import { apiQuery } from '@/api/user'
import Detail from './components/Detail.vue'

const queryForm = ref({
  username: undefined,
  phone: undefined,
  pageNum: 1,
  pageSize: 10
})

function search() {
  queryForm.value.pageNum = 1
  getList()
}

function reset() {
  queryForm.value.username = null
  queryForm.value.phone = null
  getList()
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
  {
    title: '操作',
    key: 'actions',
    render(row) {
      return h(
        NSpace,
        {},
        {
          default: () => [
            h(
              NButton,
              {
                strong: true,
                tertiary: true,
                size: 'small',
                type: 'primary',
                onClick: () => handleEdit(row)
              },
              { default: () => '编辑' }
            ),
            h(
              NButton,
              {
                strong: true,
                tertiary: true,
                size: 'small',
                type: 'error',
                onClick: () => handleDel(row)
              },
              { default: () => '删除' }
            ),
          ]
        }
      )
    }
  }
])

const list = ref([])

async function getList() {
  try {
    const res = await apiQuery(queryForm.value)
    list.value = res
  } catch (error) {
    console.error(error);
  }
}

getList()


const DetailRef = ref(null)
// 新增
function add() {
  nextTick(() => {
    DetailRef.value.open()
  })
}

function handleEdit({ id }) {
  nextTick(() => {
    DetailRef.value.open(id)
  })
}

</script>

<template>
  <n-card h-full>
    <n-form ref="formRef" inline label-placement="left" :model="queryForm">
      <n-form-item label="用户名" path="username">
        <n-input v-model:value="queryForm.username" placeholder="输入用户名" />
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

    <Detail ref="DetailRef" @reload="getList"></Detail>
  </n-card>
</template>
