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
    title: '图片',
    key: 'avatar'
  },
  {
    title: '排序',
    key: 'username'
  },
  {
    title: '商品名称',
    key: 'phone'
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
