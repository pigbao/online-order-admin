<script setup>
import * as echarts from 'echarts';
import colors from '@/theme/color.js';
import { apiStatisticBy7Days } from '@/api/index'

const el = ref(null)

function loadEcharts(date, count, price) {
  const myChart = echarts.init(el.value)
  const option = {
    title: {
      text: '7日销售额统计'
    },
    tooltip: {},
    xAxis: {
      data: date
      // data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {},
    series: [{
      name: '销量',
      type: 'bar',
      data: count,
      itemStyle: {
        color: colors['color-primary-500']
      },
    },
    {
      name: '销售额',
      type: 'bar',
      data: price,
      itemStyle: {
        color: colors['color-info-500']
      },
    }]
  }
  myChart.setOption(option)
}

async function getList() {
  const res = await apiStatisticBy7Days()
  let date = []
  let count = []
  let price = []
  for (let i = 0; i < res.length; i++) {
    res[i].date = res[i].date.substring(5, 10)
    date.push(res[i].date)
    count.push(res[i].count)
    price.push((res[i].price / 100))
  }
  loadEcharts(date, count, price)
  console.log(res)
}

onMounted(() => {
  getList()
})
</script>

<template>
  <div ref="el" w-full h-xl>
  </div>
</template>
