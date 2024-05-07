<script setup>
import { NImage } from 'naive-ui'
import { apiDetail, apiStatus } from '@/api/order/list'
const formRef = ref(null)
const form = ref({
})


const submitLoading = ref(false)
async function submit() {
  try {
    submitLoading.value = true
    console.log('form.value :>> ', form.value);
    await formRef.value.validate()
    if (form.value.id) {
      await apiUpdate(form.value)
    } else {
      await apiAdd(form.value)
    }
    window.$message.success('保存成功')
    back()
  } catch (error) {
    console.error(error);
  } finally {
    submitLoading.value = false
  }
}

const router = useRouter()
function back() {
  router.back()
}
const route = useRoute()
onMounted(() => {
  if (route.params.id) {
    getDetail()
  }
})
async function getDetail() {
  try {
    const res = await apiDetail(route.params.id)
    form.value = res
  } catch (error) {
    console.error(error);
  }
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
        src: row.goodsImg,
        width: '50',
      })
    }
  },
  {
    title: '商品价格',
    key: 'goodsPrice',
    render(row) {
      return row.goodsPrice / 100
    }

  },
  {
    title: '数量',
    key: 'count',
  },
  {
    title: '规格',
    key: 'goodsSpec',
    render(row) {
      return JSON.parse(row.goodsSpec).map(item => item.value).toString(',')
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
        getDetail()
      } catch (error) {
        console.error(error);
        window.$message.error(`${changeStatusLabel(orderStatus)}失败`)
      }
    },
    onNegativeClick: () => {
      getDetail()
    }
  })
}

const { dictVL: orderStatusDictVL } = useDict('orderStatus')
const { dictVL: isTakeoutDictVL } = useDict('isTakeout')
const { dictVL: sexDictVL } = useDict('sex')
</script>

<template>
  <n-card h-full min-w-lg>
    <n-page-header title="返回" @back="back()">

      <div flex gap-8 flex-col>
        <n-descriptions label-placement="top" bordered :column="6" title="基本信息">
          <n-descriptions-item label="订单编号">
            {{ form.orderNum }}
          </n-descriptions-item>
          <n-descriptions-item label="订单状态">
            {{ orderStatusDictVL[form.orderStatus] }}
          </n-descriptions-item>
          <n-descriptions-item label="是否外送">
            {{ isTakeoutDictVL[form.isTakeout] }}
          </n-descriptions-item>
          <n-descriptions-item label="备注">
            {{ form.remark }}
          </n-descriptions-item>
          <n-descriptions-item label="取餐码">
            {{ form.isTakeout == 2 ? form.code : '自取' }}
          </n-descriptions-item>
          <n-descriptions-item label="实付金额">
            ￥{{ form.payPrice / 100 }}
          </n-descriptions-item>
        </n-descriptions>
        <n-descriptions label-placement="top" bordered :column="4" title="配送信息" v-if="form.isTakeout == 2">
          <n-descriptions-item label="配送地址">
            {{ form.address }}
          </n-descriptions-item>
          <n-descriptions-item label="联系人">
            {{ form.customerName }}
          </n-descriptions-item>
          <n-descriptions-item label="电话">
            {{ form.customerPhone }}
          </n-descriptions-item>
          <n-descriptions-item label="性别">
            {{ sexDictVL[form.gender] }}
          </n-descriptions-item>
        </n-descriptions>
        <n-card title="商品明细">
          <n-data-table :columns="columns" :data="form.goods" :bordered="false" striped />

        </n-card>
        <n-flex v-if="[2, 3, 5].includes(form.orderStatus)">
          <n-button type="primary" @click="changeStatus(form)" size="large" :loading="submitLoading">
            {{ changeStatusLabel(form.orderStatus) }}
          </n-button>
        </n-flex>
      </div>
    </n-page-header>
  </n-card>
</template>
