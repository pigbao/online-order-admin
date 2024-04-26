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
    title: '订单号',
    key: 'orderNum'
  },
  {
    title: '订单状态',
    key: 'orderStatus',
    render(row) {
      return row.orderStatus
    }
  },
  // {
  //   title: '客户OpenID',
  //   key: 'openId',
  // },
  // {
  //   title: '客户昵称',
  //   key: 'customerNickname',
  // },
  // {
  //   title: '客户头像',
  //   key: 'customerAvatar',
  //   render(row) {
  //     return h(NImage, {
  //       src: row.customerAvatar,
  //       width: 40,
  //       height: 40,
  //       round: true,
  //     })
  //   },
  // },
  {
    title: '是否外送',
    key: 'isTakeout',
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
          default: () => [
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
            h(
              NButton,
              {
                strong: true,
                tertiary: true,
                size: 'small',
                type: 'primary',
                onClick: () => detail(row)
              },
              { default: () => '开始制作' }
            ),
          ]
        }
      )
    }
  }
])

async function changeStauts(id, isShelves) {
  const isShelvesLabel = isShelves == 2 ? '下架' : '上架'
  window.$dialog.warning({
    title: '提示',
    content: `确定要${isShelvesLabel}商品吗？`,
    positiveText: '确定',
    negativeText: '取消',
    onPositiveClick: async () => {
      try {
        const status = 1
        await apiStatus(id, status)
        window.$message.success(`修改成功成功`)
        getList()
      } catch (error) {
        console.error(error);
        window.$message.error(`${isShelvesLabel}成功`)
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
    list.value = [
      {
        orderNum: 547876484648,
        orderStatus: '待制作',
        isTakeout: "否",
        remark: "无",
        payPrice: "19.1",


      }
    ]
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
      <n-form-item label="订单编号" path="orderNum">
        <n-input v-model:value="queryForm.orderNum" placeholder="输入订单编号" />
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
    <n-data-table :columns="columns" :data="list" :bordered="false" striped />

  </n-card>
</template>
