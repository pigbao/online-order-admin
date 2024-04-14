<script setup>
import { apiAdd, apiDetail } from '@/api/user'
import { apiAllRoles } from '@/api/role'

defineExpose({
  open,
  close
})

const formRef = ref(null)
const form = ref({})

const show = ref(false)


function open(id) {
  show.value = true
  if (id) {
    getDetail(id)
  }
}

function close() {
  form.value = {}
  show.value = false
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
    await apiAdd(form.value)
    window.$message.success('新增成功')
    close()
  } catch (error) {
    console.error(error);
  } finally {
    submitLoading.value = false
  }
}

const roles = ref([])
async function getRoles() {
  try {
    const res = await apiAllRoles()
    roles.value = res
  } catch (error) {
    console.error(error);
  }
}

getRoles()


</script>

<template>
  <n-modal v-model:show="show">
    <div w-lg>
      <n-card title="轮播图">
        <n-form ref="formRef" :model="form">
          <n-form-item path="url" label="图片">
            <UploadImage v-model:value="form.url"></UploadImage>
          </n-form-item>
          <n-form-item path="sort" label="排序" :rule="[{ required: true, message: '请输入', trigger: 'blur' }]">
            <n-input-number :min="0" v-model:value="form.sort" style="width: 100%;" />
          </n-form-item>
          <n-form-item path="goodsId" label="商品" :rule="[{ required: true, message: '请选择', trigger: 'change' }]">
            <n-select v-model:value="form.goodsId" :options="roles" label-field="roleName" value-field="id" />
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
