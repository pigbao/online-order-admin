<script setup>
import { apiUpdate, apiDetail } from '@/api/shop/basic'
import dayjs from 'dayjs';
// import Spec from './components/Spec.vue'


const formRef = ref(null) // 表单实例
const form = ref({
}) // 表单数据
const submitLoading = ref(false) // 提交loading
/**
 * 提交表单
 */
async function submit() {
  try {
    submitLoading.value = true // 开启loading
    await formRef.value.validate() // 验证表单
    await apiUpdate(form.value) // 提交表单
    window.$message.success('保存成功') // 提示保存成功
    getDetail() // 获取详情
  } catch (error) {
    // 错误处理
    console.error(error);
  } finally {
    submitLoading.value = false // 关闭loading
  }
}

onMounted(() => {
  getDetail()
})
async function getDetail() {
  try {
    const res = await apiDetail()
    form.value = res
  } catch (error) {
    console.error(error);
  }
}

const startOpeningHours = computed({
  get() {
    const res = dayjs(`2024-01-01 ${form.value?.startOpeningHours}`).valueOf()
    return res || 0
  },
  set(val) {
    form.value.startOpeningHours = dayjs(val).format('HH:mm:ss')
  }
})

const endOpeningHours = computed({
  get() {
    const res = dayjs(`2024-01-01 ${form.value?.endOpeningHours}`).valueOf()

    return res || 0
  },
  set(val) {
    form.value.endOpeningHours = dayjs(val).format('HH:mm:ss')
  }
})

</script>

<template>
  <n-card h-full min-w-lg>
    <div w-full max-w-xl>
      <n-form ref="formRef" :model="form" size="large">
        <n-form-item path="shopName" label="店铺名称" :rule="[{ required: true, message: '请输入店铺名称', trigger: 'blur' }]">
          <n-input v-model:value="form.shopName" />
        </n-form-item>
        <n-form-item path="startOpeningHours" label="开始营业时间"
          :rule="[{ required: true, message: '请选择商品图片', trigger: 'change' }]">
          <n-time-picker v-model:value="startOpeningHours" style="width: 100%;" />
        </n-form-item>
        <n-form-item path="endOpeningHours" label="结束营业时间"
          :rule="[{ required: true, message: '请选择商品图片', trigger: 'change' }]">
          <n-time-picker v-model:value="endOpeningHours" style="width: 100%;" />
        </n-form-item>
        <n-form-item path="phone" label="商家电话" :rule="[{ required: true, message: '请选择商品图片', trigger: 'change' }]">
          <n-input v-model:value="form.phone" />
        </n-form-item>
        <n-form-item path="address" label="店铺地址" :rule="[{ required: true, message: '请选择商品图片', trigger: 'change' }]">
          <LocPicker v-model:address="form.address" v-model:location="form.location" placeholder="店铺地址">
          </LocPicker>
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
