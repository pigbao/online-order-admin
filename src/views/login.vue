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
  <div flex w-full h-full>
    <!--左边颜色块-->
    <div class="w-1/2" h-full bg-primary></div>

    <!--右边表单块-->
    <div class="w-1/2" flex h-full justify-center items-center>
      <!--控制表单大小-->

      <div w-83>
        <!--登录标题-->
        <div text-3xl mb-8>登录</div>
        <!--标签置左属性 label-placement="left"-->
        <n-form ref="formRef" :model="formValue" :rules="rules" size="large" label-placement="left">
          <n-form-item path="user">
            <n-input v-model:value="formValue.user" placeholder="输入用户名" />
          </n-form-item>
          <n-form-item path="password">
            <n-input type="password" v-model:value="formValue.password" placeholder="输入密码" />
          </n-form-item>
        </n-form>
        <n-button type="primary" block @click="login">登录</n-button>
      </div>
    </div>

  </div>
</template>
