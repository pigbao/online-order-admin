<script setup>
import { apiAdd, apiUpdate, apiDetail } from '@/api/goods/list'
import { apiQuery as apiQueryCategory } from '@/api/goods/category'
import Spec from './components/Spec.vue'
const formRef = ref(null)
const form = ref({
})

const isDetail = ref(false)


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
  console.log('route :>> ', route);

  if (route.params.id) {
    getDetail()
  }

  if (route.path.includes('detail')) {
    isDetail.value = true
  } else {
    isDetail.value = false

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
    <n-page-header title="返回" @back="back()">
      <div w-full>
        <n-form ref="formRef" :model="form" size="large">
          <n-form-item path="goodsName" label="商品名称" :rule="[{ required: true, message: '请输入商品名称', trigger: 'blur' }]">
            <n-input v-model:value="form.goodsName" />
          </n-form-item>
          <n-form-item path="categoryId" label="商品分类"
            :rule="[{ required: true, type: 'number', message: '请选择商品分类', trigger: 'change' }]">
            <n-select v-model:value="form.categoryId" :options="allCategory" label-field="categoryName"
              value-field="id" />
          </n-form-item>
          <n-form-item path="img" label="商品图片" :rule="[{ required: true, message: '请选择商品图片', trigger: 'change' }]">
            <UploadImage v-model:value="form.img"></UploadImage>
          </n-form-item>
          <n-form-item path="specs" label="规格信息">
            <Spec v-model="form.specs" ref="specsRef"></Spec>
          </n-form-item>

          <n-form-item path="intro" label="商品介绍" :rule="[{ required: true, message: '请输入', trigger: 'blur' }]">
            <n-input v-model:value="form.intro" type="textarea" placeholder="商品介绍" />
          </n-form-item>
        </n-form>
      </div>
      <div w-full max-w-2xl v-if="!isDetail">
        <n-flex>
          <n-button type="primary" @click="submit" size="large" :loading="submitLoading">保存</n-button>
        </n-flex>
      </div>
    </n-page-header>
  </n-card>
</template>
