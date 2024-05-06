<script setup>
import { apiAdd,apiDetail } from '@/api/user'
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

async function getDetail(id){
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
  }finally{
    submitLoading.value = false
  }
}

const roles = ref([])
async function getRoles(){
  try {
    const res = await apiAllRoles()
    roles.value = res
  }catch (error) {
    console.error(error);
  }
}

getRoles()


</script>

<template>
  <n-modal v-model:show="show">
    <div w-lg>
      <n-card title="用户">
        <n-form ref="formRef" :model="form">
          <n-form-item path="username" label="用户名"
            :rule="[{ required: true, min: 2, message: '请输入至少2位的用户名', trigger: 'blur' }]">
            <n-input v-model:value="form.username" />
          </n-form-item>
          <n-form-item path="password" label="密码"
            :rule="[{ required: true, min: 6, message: '请输入长度至少6位的密码', trigger: 'blur' }]">
            <n-input v-model:value="form.password" type="password" show-password-on="mousedown" />
          </n-form-item>
          <n-form-item path="phone" label="联系方式" :rule="[{ required: true, message: '请输入', trigger: 'blur' }]">
            <n-input v-model:value="form.phone" />
          </n-form-item>
          <n-form-item path="role" label="角色" :rule="[{ required: true, message: '请选择', trigger: 'change' }]">
            <n-select v-model:value="form.role" :options="roles" 
              label-field="roleName"
              value-field="id"/>
          </n-form-item>
          <n-form-item path="avatar" label="头像">
            <UploadImage v-model:value="form.avatar"></UploadImage>
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
