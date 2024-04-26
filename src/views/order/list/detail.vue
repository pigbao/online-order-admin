<script setup>
// import { apiAdd, apiUpdate, apiDetail } from '@/api/goods/list'
// import { apiQuery as apiQueryCategory } from '@/api/goods/category'
// import Spec from './components/Spec.vue'
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
const specsRef = ref(null)
async function getDetail() {
  try {
    const res = await apiDetail(route.params.id)
    form.value = res
    specsRef.value.loadSpecs(res.specs)
  } catch (error) {
    console.error(error);
  }
}

const allCategory = ref([])
async function getCategory() {
  try {
    const res = await apiQueryCategory()
    allCategory.value = res
  } catch (error) {
    console.error(error);
  }
}

getCategory()


</script>

<template>
  <n-card h-full min-w-lg>
    <div flex gap-8 flex-col>
      <n-descriptions label-placement="top" bordered :column="6" title="基本信息">
        <n-descriptions-item label="订单编号">
          534864846846485846
        </n-descriptions-item>
        <n-descriptions-item label="订单状态">
          已完成
        </n-descriptions-item>
        <n-descriptions-item label="是否外送">
          自取
        </n-descriptions-item>
        <n-descriptions-item label="备注">
          苹果
        </n-descriptions-item>
        <n-descriptions-item label="取餐码">
          35167
        </n-descriptions-item>
        <n-descriptions-item label="实付金额">
          ￥100
        </n-descriptions-item>
      </n-descriptions>
      <n-descriptions label-placement="top" bordered :column="4" title="配送信息">
        <n-descriptions-item label="配送地址">
          534864846846485846
        </n-descriptions-item>
        <n-descriptions-item label="联系人">
          已完成
        </n-descriptions-item>
        <n-descriptions-item label="电话">
          自取
        </n-descriptions-item>
        <n-descriptions-item label="性别">
          苹果
        </n-descriptions-item>
      </n-descriptions>
      <n-card title="商品明细">
        <n-data-table :columns="columns" :data="list" :bordered="false" striped />

      </n-card>
    </div>
  </n-card>
</template>
