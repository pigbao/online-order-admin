<script setup>
import { NButton, NSpace, NImage } from 'naive-ui'
import { apiQuery, apiDel } from '@/api/shop/banner'
import Detail from './components/Detail.vue'

const queryForm = ref({
  username: undefined,
  phone: undefined,
  pageNum: 1,
  pageSize: 10
})

const columns = ref([
  {
    title: '图片',
    key: 'url',
    render(row) {
      return h(NImage, {
        src: row.url,
        width: '50',
      })
    },
  },
  {
    title: '排序',
    key: 'sort'
  },
  {
    title: '跳转商品',
    key: 'goodsId',
    render(row) {
      return h(NButton, {
        strong: true,
        tertiary: true,
        size: 'small',
        type: 'primary',
        disabled: !row.goodsId,
        onClick: () => handleGoods(row.goodsId)
      }, { default: () => '查看商品' })
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

function handleDel({ id }) {
  window.$dialog.warning({
    title: '提示',
    content: `确定要删除轮播图吗？`,
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

const router = useRouter()

function handleGoods(goodsId) {
  router.push({
    path: `/goods/list/detail/${goodsId}`
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
