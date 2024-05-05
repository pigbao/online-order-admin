<script setup>
import { NButton, NSpace, NImage, NSwitch, NEllipsis } from 'naive-ui'
import { apiQuery, apiDel, apiShelves } from '@/api/goods/list'
import dayjs from 'dayjs'
import { h } from 'vue';
const queryForm = ref({
  goodsName: undefined,
})

function search() {
  getList()
}

function reset() {
  queryForm.value.goodsName = null
  getList()
}

const columns = ref([
  {
    title: '商品名称',
    key: 'goodsName'
  },
  {
    title: '商品图片',
    key: 'goodsImg',
    render(row) {
      return h(NImage, {
        src: row.img,
        width: '50',
      })
    }
  },
  {
    title: '是否上架',
    key: 'isShelves',
    render(row) {
      return h(NSwitch, {
        value: row.isShelves,
        onUpdateValue: (value) => {
          row.isShelves = value
          changeShelves(row.id, value)
        },
        checkedValue: 1,
        uncheckedValue: 2,
      })
    }
  },
  {
    title: '商品描述',
    key: 'intro',
    render(row) {
      return h(NEllipsis, { style: "max-width: 120px" }, () => row.intro)
    },

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

async function changeShelves(id, isShelves) {
  const isShelvesLabel = isShelves == 2 ? '下架' : '上架'
  window.$dialog.warning({
    title: '提示',
    content: `确定要${isShelvesLabel}商品吗？`,
    positiveText: '确定',
    negativeText: '取消',
    onPositiveClick: async () => {
      try {
        await apiShelves(id, isShelves)
        window.$message.success(`${isShelvesLabel}成功`)
        getList()
      } catch (error) {
        console.error(error);
        window.$message.error(`${isShelvesLabel}失败`)
      }
    },
    onNegativeClick: () => {
      getList()
    }
  })
}

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
    name: 'GoodsListAdd'
  })
}

function edit({ id }) {
  router.push({
    path: `/goods/list/edit/${id}`
  })
}

function del({ id, goodsName }) {
  window.$dialog.warning({
    title: '提示',
    content: `确定要删除 [${goodsName}] 吗？`,
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
      <n-form-item label="商品名称" path="goodsName">
        <n-input v-model:value="queryForm.goodsName" placeholder="输入商品名称" />
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
