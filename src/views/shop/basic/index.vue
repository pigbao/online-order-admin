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
    <div w-full max-w-xl>
      <n-form ref="formRef" :model="form" size="large">
        <n-form-item path="shopName" label="店铺名称" :rule="[{ required: true, message: '请输入店铺名称', trigger: 'blur' }]">
          <n-input v-model:value="form.shopName" />
        </n-form-item>
        <n-form-item path="startOpeningHours" label="开始营业时间"
          :rule="[{ required: true, message: '请选择开始营业时间', trigger: 'change' }]">
          <n-time-picker v-model:value="form.startOpeningHours" style="width: 100%;" />
        </n-form-item>
        <n-form-item path="endOpeningHours" label="结束营业时间"
          :rule="[{ required: true, message: '请选择结束营业时间', trigger: 'change' }]">
          <n-time-picker v-model:value="form.endOpeningHours" style="width: 100%;" />
        </n-form-item>
        <n-form-item path="phone" label="商家电话" :rule="[{ required: true, message: '请选择商品图片', trigger: 'change' }]">
          <n-input v-model:value="form.phone" />
        </n-form-item>
        <n-form-item path="address" label="店铺地址" :rule="[{ required: true, message: '请选择商品图片', trigger: 'change' }]">
          <n-input v-model:value="form.address" type="textarea" placeholder="商品介绍" />
        </n-form-item>
      </n-form>
    </div>
    <div w-full max-w-2xl>
      <n-flex>
        <n-button type="primary" @click="submit" size="large" :loading="submitLoading">保存</n-button>
      </n-flex>
    </div>
  </n-card>
</template>
