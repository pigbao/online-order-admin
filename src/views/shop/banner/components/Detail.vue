<script setup>
import { apiAdd, apiDetail, apiUpdate } from '@/api/shop/banner'
import { apiAll } from '@/api/goods/list'
const emits = defineEmits(['reload'])
defineExpose({
  open,
  close
})

const formRef = ref(null)
const form = ref({
  sort: 0
})

const show = ref(false)


function open(id) {
  show.value = true
  if (id) {
    getDetail(id)
  }
}

function close() {
  form.value = { sort: 0 }
  show.value = false
  emits('reload')
}

async function getDetail(id) {
  try {
    const res = await apiDetail(id)
    form.value = res
  } catch (error) {
    console.error(error);
  }
}
const submitLoading = ref(false)
async function submit() {
  try {
    submitLoading.value = true
    await formRef.value.validate()
    if (!form.value.id) {
      await apiAdd(form.value)
    } else {
      await apiUpdate(form.value)
    }
    window.$message.success('新增成功')
    close()
  } catch (error) {
    console.error(error);
  } finally {
    submitLoading.value = false
  }
}

const goods = ref([])
async function getGoods() {
  try {
    const res = await apiAll()
    goods.value = res
  } catch (error) {
    console.error(error);
  }
}

getGoods()


</script>

<template>
  <n-modal v-model:show="show">
    <div w-lg>
      <n-card title="轮播图">
        <n-form ref="formRef" :model="form">
          <n-form-item path="url" label="图片">
            <UploadImage v-model:value="form.url"></UploadImage>
          </n-form-item>
          <n-form-item path="sort" label="排序"
            :rule="[{ required: true, type: 'number', message: '请输入', trigger: 'blur' }]">
            <n-input-number :min="0" v-model:value="form.sort" style="width: 100%;" />
          </n-form-item>
          <n-form-item path="goodsId" label="商品">
            <n-select v-model:value="form.goodsId" :options="goods" label-field="goodsName" value-field="id" />
          </n-form-item>
        </n-form>
        <template #action>
          <n-space justify="end">
            <n-button @click="close">取消</n-button>
            <n-button type="primary" @click="submit" :loading="submitLoading">确认</n-button>
          </n-space>
        </template>
      </n-card>
    </div>
  </n-modal>
</template>
