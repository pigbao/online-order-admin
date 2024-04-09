<script setup>
import { NButton, NSpace } from 'naive-ui'
import { apiQuery, apiDel } from '@/api/goods/category'
import dayjs from 'dayjs'
const queryForm = ref({
  categoryName: undefined,
})

function search() {
  getList()
}

function reset() {
  queryForm.value.categoryName = null
  getList()
}

const columns = ref([
  {
    title: '分类名称',
    key: 'categoryName'
  },
  {
    title: '类型',
    key: 'isTakeout'
  },
  {
    title: '排序',
    key: 'sort'
  },
  {
    title: '是否显示',
    key: 'isShow',
    render(row) {
      return isShowDict.value[row.isShow]
    }
  },
  {
    title: '创建者',
    key: 'createUserName'
  },
  {
    title: '创建时间',
    key: 'createTime',
    render(row) {
      return dayjs(row.createTime).format('YYYY-MM-DD HH:mm:ss')
    }
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
                onClick: () => edit(row)
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
                onClick: () => del(row)
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

const router = useRouter()
// 新增
function add() {
  router.push({
    name: 'GoodsCategoryAdd'
  })
}

function edit({ id }) {
  router.push({
    path: `/goods/category/edit/${id}`
  })
}

function del({ id, categoryName }) {
  window.$dialog.warning({
    title: '提示',
    content: `确定要删除 [${categoryName}] 吗？`,
    positiveText: '确定',
    negativeText: '取消',
    onPositiveClick: async () => {
      try {
        await apiDel(id)
        window.$message.success('删除成功')
        getList()
      } catch (error) {
        console.error(error);
      }
    }
  })
}

const { dictVL: isShowDict } = useDict('isShow')
</script>

<template>
  <n-card h-full>
    <n-form ref="formRef" inline label-placement="left" :model="queryForm">
      <n-form-item label="分类名称" path="categoryName">
        <n-input v-model:value="queryForm.categoryName" placeholder="输入分类名称" />
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
    <n-data-table :columns="columns" :data="list" :bordered="false" striped />

  </n-card>
</template>
