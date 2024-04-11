<script setup>
import { NInput } from 'naive-ui';

const model = defineModel({
  default: []
})


const tableData = computed(() => {
  return model.value.map(item => {
    const spData = JSON.parse(item.spData)
    let spObj = {}
    spData.forEach(data => {
      spObj[data.title] = data.value
    })
    return { ...item, ...spObj }
  })
})

const columns = computed(() => {
  const defaultColumns = [
    {
      title: '原价',
      key: 'originalPrice',
      render: (row) => {
        return h(NInput, { value: row.originalPrice, onInput: (val) => { row.originalPrice = val } })
      }
    },
    {
      title: '现价',
      key: 'price'
    },
    {
      title: '库存',
      key: 'stock'
    }]
  const spData = model.value.map(item => {
    return JSON.parse(item.spData)
  })
  console.log('spData :>> ', spData);
  const spColumns = spData.reduce((acc, cur) => {
    cur.forEach(item => {
      if (!acc.includes(item.title)) {
        acc.push(item.title)
      }
    })
    return acc
  }, []).map(item => {
    return {
      title: item,
      key: item
    }
  })
  console.log('spColumns :>> ', spColumns);
  return [...spColumns, ...defaultColumns,]
})

const specs = ref([{ title: '颜色', data: ['红色', '蓝色'] }])


function handleUpdateSpecs() {
  // 初始化结果数组
  const combinations = [];

  // 如果规格数组为空，直接返回空数组
  if (specs.value.length === 0) {
    return combinations;
  }
  // 递归函数，用于生成组合
  function generate(index, currentCombination) {
    // 如果已经遍历完所有规格，将当前组合添加到结果数组中
    if (index === specs.value.length) {
      combinations.push(currentCombination);
      return;
    }

    // 获取当前规格的选项
    const currentSpecOptions = specs.value[index].data;

    // 遍历当前规格的每个选项
    currentSpecOptions.forEach(option => {
      // 创建当前选项的对象表示
      const optionObj = { title: specs.value[index].title, value: option };

      // 递归调用，处理下一个规格
      generate(index + 1, currentCombination.concat(optionObj));
    });
  }

  // 从第一个规格开始生成组合
  generate(0, []);

  model.value = combinations.map(item => {
    return {
      originalPrice: 0,
      price: 0,
      stock: 0,
      spData: JSON.stringify(item)
    }
  })
  console.log('model.value :>> ', model.value);
}
</script>

<template>
  <n-flex>
    <n-card>
      <div flex flex-col gap-2>
        <div flex flex-col gap-2 v-for="(item, index) in specs">
          <div flex justify-between items-end>
            <div>规格名称</div>
            <n-button dashed type="error" size="small" @click="specs.splice(index, 1)"> 删除</n-button>
          </div>
          <n-input v-model:value="item.title" placeholder="规格名称" />
          <div>规格值</div>
          <n-dynamic-tags v-model:value="item.data" />
        </div>
        <n-button block dashed @click="specs.push({ title: undefined, data: [] })"> 添加规格</n-button>
      </div>

    </n-card>
    <n-card title="商品规格信息">
      <template #header-extra>
        <n-button type="primary" size="small" @click="handleUpdateSpecs"> 更新规格</n-button>
      </template>
      <n-data-table :columns="columns" :data="tableData" :bordered="false" striped />
    </n-card>
  </n-flex>
</template>
