<script setup>
import { NButton, NSpace, NEllipsis } from 'naive-ui'
import { apiQuery, apiStatus } from '@/api/order/list'
import dayjs from 'dayjs'
import { h } from 'vue';
const queryForm = ref({
  orderNum: undefined,
  orderStatus: undefined,
  pageNum: 1,
  pageSize: 10
})

const pageInfo = computed(() => {

  return {
    pageNum: 1,
    pageSize: 10,
    itemCount: total.value,
    onChange: (page) => {
      console.log('page :>> ', page);
      queryForm.value.pageNum = page
      getList()
    },
  }
})

function search() {
  queryForm.value.pageNum = 1
  getList()
}

function reset() {
  queryForm.value.orderNum = null
  queryForm.value.orderStatus = null
  getList()
}

const columns = ref([
  {
    title: '订单号',
    key: 'orderNum'
  },
  {
    title: '订单状态',
    key: 'orderStatus',
    render(row) {
      return orderStatusDict.value[row.orderStatus]
    }
  },
  {
    title: '是否外送',
    key: 'isTakeout',
    render(row) {
      return isTakeoutDict.value[row.isTakeout]
    }

  },
  {
    title: '订单备注',
    key: 'remark',
    render(row) {
      return h(NEllipsis, {
        tooltipProps: {
          content: row.remark,
        },
      }, { default: () => row.remark })
    },
  },
  {
    title: '支付金额',
    key: 'payPrice',
    render(row) {
      return row.payPrice / 100
    }
  },
  {
    title: '下单时间',
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
          default: () => {
            const buttons = [
              h(
                NButton,
                {
                  strong: true,
                  tertiary: true,
                  size: 'small',
                  type: 'primary',
                  onClick: () => detail(row)
                },
                { default: () => '详情' }
              ),
            ]

            if ([2, 3, 5].includes(row.orderStatus)) {
              buttons.push(h(
                NButton,
                {
                  strong: true,
                  tertiary: true,
                  size: 'small',
                  type: 'primary',
                  onClick: () => changeStatus(row)
                },
                { default: () => changeStatusLabel(row.orderStatus) }
              ),)
            }
            return buttons
          }
        }
      )
    }
  }
])

function changeStatusLabel(status) {
  return status == 2 ? '出餐' : '完成'
}

async function changeStatus({ id, orderStatus, isTakeout }) {
  window.$dialog.warning({
    title: '提示',
    content: `确认${changeStatusLabel(orderStatus)}吗？`,
    positiveText: '确定',
    negativeText: '取消',
    onPositiveClick: async () => {
      try {
        let status = 4
        if (orderStatus == 2 && isTakeout == 1) {
          status = 3
        } else if (orderStatus == 2 && isTakeout == 2) {
          status = 5
        } else if (orderStatus == 3 || orderStatus == 5) {
          status = 4
        }
        await apiStatus(id, status)
        window.$message.success(`修改成功`)
        getList()
      } catch (error) {
        console.error(error);
        window.$message.error(`${changeStatusLabel(orderStatus)}失败`)
      }
    },
    onNegativeClick: () => {
      getList()
    }
  })
}

const list = ref([])
const total = ref(0)

async function getList() {
  try {
    const res = await apiQuery(queryForm.value)
    list.value = res.list
    total.value = res.total
  } catch (error) {
    console.error(error);
  }
}

getList()

const router = useRouter()


function detail({ id }) {
  router.push({
    path: `/order/detail/${id}`
  })
}

const { dictVL: orderStatusDict } = useDict('orderStatus')
const { dictArray: orderStatusOptions } = useDict('orderStatus')
const { dictVL: isTakeoutDict } = useDict('isTakeout')
</script>

<template>
  <n-card h-full>
    <n-form ref="formRef" inline label-placement="left" :model="queryForm">
      <n-form-item label="订单编号" path="orderNum">
        <n-input v-model:value="queryForm.orderNum" placeholder="输入订单编号" />
      </n-form-item>
      <n-form-item label="订单状态" path="orderNum">
        <n-select v-model:value="queryForm.orderStatus" placeholder="订单状态" :options="orderStatusOptions"
          style="width: 200px;"></n-select>
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
    <n-data-table remote :columns="columns" :data="list" :bordered="false" striped :pagination="pageInfo" />

  </n-card>
</template>
