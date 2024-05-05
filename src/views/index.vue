<script setup>
import { apiOrderStatistic, apiOrderList } from '@/api/index'
import { apiStatus } from '@/api/order/list'
const statistic = ref({})

async function getStatistic() {
  try {
    const res = await apiOrderStatistic()
    statistic.value = res
  } catch (error) {
    console.error(error);
  }
}
getStatistic()

const orderList = ref([])

// 备餐中订单列表
const readyOrderList = computed(() => {
  return orderList.value.filter(item => item.orderStatus == 2)
})

// 待取餐订单
const readyTakeOrderList = computed(() => {
  return orderList.value.filter(item => item.orderStatus == 3)
})

// 配送中订单
const readyDeliveryOrderList = computed(() => {
  return orderList.value.filter(item => item.orderStatus == 4)
})

async function getOrderList() {
  try {
    const res = await apiOrderList()
    orderList.value = res
  } catch (error) {
    console.error(error);
  }
}
getOrderList()


async function changeStatus({ id, orderStatus, isTakeout }) {
  window.$dialog.warning({
    title: '提示',
    content: `确认${orderStatus == 2 ? '出餐' : '完成'}吗？`,
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
        window.$message.success(`操作成功`)
        getOrderList()
      } catch (error) {
        console.error(error);
        window.$message.error(`操作失败`)
      }
    },
    onNegativeClick: () => {
      getOrderList()
    }
  })
}

function formatSpData(spData) {
  const dataObj = JSON.parse(spData)
  const dataArr = dataObj.map(item => item.value)
  return dataArr.toString()
}

</script>

<template>
  <div flex flex-col gap-4>
    <n-grid x-gap="12" :cols="4">
      <n-gi span="3">
        <n-flex>
          <n-card title="备餐中订单">
            <n-list hoverable>
              <n-list-item v-for="order in readyOrderList" :key="order.id">
                <n-thing title="商品明细" :description="order.remark">
                  <div flex gap-4 v-for="goods in order.goods" :key="goods.id">
                    <div>
                      {{ goods.goodsName }}
                    </div>
                    <div>
                      {{ formatSpData(goods.goodsSpec) }}
                    </div>
                    <div>
                      X{{ goods.count }}
                    </div>
                  </div>
                </n-thing>
                <template #suffix>
                  <n-button type="primary" strong @click="changeStatus(order)">出餐</n-button>
                </template>
              </n-list-item>
            </n-list>
          </n-card>
          <n-card title="待取餐订单">
            <n-list hoverable>
              <n-list-item v-for="order in readyTakeOrderList" :key="order.id">
                <n-thing title="商品明细" :description="order.remark">
                  <div flex gap-4 v-for="goods in order.goods" :key="goods.id">
                    <div>
                      {{ goods.goodsName }}
                    </div>
                    <div>
                      {{ formatSpData(goods.goodsSpec) }}
                    </div>
                    <div>
                      X{{ goods.count }}
                    </div>
                  </div>
                </n-thing>
                <template #suffix>
                  <n-button type="primary" strong @click="changeStatus(order)">完成</n-button>
                </template>
              </n-list-item>
            </n-list>
          </n-card>
          <n-card title="配送中订单">
            <n-list hoverable>
              <n-list-item v-for="order in readyDeliveryOrderList" :key="order.id">
                <n-thing title="商品明细" :description="order.remark">
                  <div flex gap-4 v-for="goods in order.goods" :key="goods.id">
                    <div>
                      {{ goods.goodsName }}
                    </div>
                    <div>
                      {{ formatSpData(goods.goodsSpec) }}
                    </div>
                    <div>
                      X{{ goods.count }}
                    </div>
                  </div>
                </n-thing>
                <template #suffix>
                  <n-button type="primary" strong @click="changeStatus(order)">完成</n-button>
                </template>
              </n-list-item>
            </n-list>
          </n-card>
        </n-flex>
      </n-gi>
      <n-gi>
        <div flex flex-col gap-4>
          <n-card>
            <n-statistic label="今日订单总数" :value="statistic.todayCount || 0">
              <template #prefix>
                <n-icon>
                  <IconStatisticOrderCount></IconStatisticOrderCount>
                </n-icon>
              </template>
            </n-statistic>
          </n-card>
          <n-card>
            <n-statistic label="今日销售额" :value="(statistic.todayPrice / 100) || 0">
              <template #prefix>
                <n-icon>
                  <IconStatisticCount></IconStatisticCount>
                </n-icon>
              </template>
            </n-statistic>
          </n-card>
          <n-card>
            <n-statistic label="昨日销售额" :value="(statistic.yesterdayPrice / 100) || 0">
              <template #prefix>
                <n-icon>
                  <IconStatisticCount></IconStatisticCount>
                </n-icon>
              </template>
            </n-statistic>
          </n-card>
        </div>

      </n-gi>
    </n-grid>
    <n-card>
      <EchartsLine></EchartsLine>
    </n-card>
  </div>
</template>
