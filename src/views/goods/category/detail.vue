<script setup>
import { apiAdd, apiUpdate, apiDetail } from '@/api/goods/category'
import { useRoute } from 'vue-router';
const formRef = ref(null)
const form = ref({})

const { dictArray: isTakeoutDict } = useDict('isTakeout')
const { dictArray: isShowDict } = useDict('isShow')

const submitLoading = ref(false)
async function submit() {
  try {
    submitLoading.value = true
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

const isTakeout = computed({
  get() {
    if (!form.value.isTakeout) return []
    return form.value.isTakeout.split(',')
  },
  set(val) {
    if (!val) {
      form.value.isTakeout = ''
    } else {
      form.value.isTakeout = val.toString()
    }
  }

})

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

</script>

<template>
  <n-card h-full min-w-lg>
    <n-page-header title="返回" @back="back()">
      <div min-w-lg flex flex-col items-center pt-10>
        <div w-full max-w-2xl>
          <n-form ref="formRef" :model="form" size="large">
            <n-form-item path="categoryName" label="分类名称"
              :rule="[{ required: true, min: 2, max: 5, message: '请输入2到5位的分类名称', trigger: 'blur' }]">
              <n-input v-model:value="form.categoryName" />
            </n-form-item>
            <n-form-item path="sort" label="排序"
              :rule="[{ required: true, type: 'number', message: '请输入', trigger: 'blur' }]">
              <n-input-number :min="0" v-model:value="form.sort" style="width: 100%;" />
            </n-form-item>
            <n-form-item path="isTakeout" label="类型" :rule="[{ required: true, message: '请选择', trigger: 'change' }]">
              <n-checkbox-group v-model:value="isTakeout">
                <n-space item-style="display: flex;">
                  <n-checkbox :value="item.value" :label="item.label" :key="item.value" v-for="item in isTakeoutDict" />
                </n-space>
              </n-checkbox-group>
            </n-form-item>
          </n-form>
        </div>
        <div w-full max-w-2xl>
          <n-flex>
            <n-button type="primary" @click="submit" size="large" :loading="submitLoading">保存</n-button>
          </n-flex>
        </div>
      </div>
    </n-page-header>
  </n-card>
</template>
