<script setup>
import { apiLogin } from '@/api/login'
const formValue = ref({
  user: "",
  password: "",

})
const rules = ref({
  user: {
    required: true,
    message: "请输入用户名",
    trigger: "blur",

  },
  password: {
    required: true,
    message: "请输入密码",
    trigger: "blur",

  },
})
const formRef = ref()
function login() {
  formRef.value?.validate((errors) => {
    if (!errors) {
      apiLogin(formValue.value)
    } else {
      console.log(errors);
      window.$message.error("失败");
    }
  })
}
</script>

<template>
  <div flex w-full h-full justify-center items-center>
    <div w-72>
      <n-form ref="formRef" :model="formValue" :rules="rules" size="large">
        <n-form-item label="用户名" path="user">
          <n-input v-model:value="formValue.user" placeholder="输入用户名" />
        </n-form-item>
        <n-form-item label="密码" path="password">
          <n-input type="password" v-model:value="formValue.password" placeholder="输入密码" />
        </n-form-item>
      </n-form>
      <n-button type="primary" block @click="login">登录</n-button>
    </div>
  </div>
</template>
