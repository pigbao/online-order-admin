<script setup>
import { apiLogin } from '@/api/login'
const formValue = ref({
  username: "",
  password: "",

})
const rules = ref({
  username: {
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
  formRef.value?.validate(async (errors) => {
    if (!errors) {
      const res = await apiLogin(formValue.value)
      console.log('res :>> ', res);
    } else {
      console.log(errors);
      window.$message.error("失败");
    }
  })
}
</script>

<template>
  <div flex w-full h-full bg-primary justify-center items-center>

    <div class="w-6/7 h-5/6 " rounded-2xl bg-slate-50 flex justify-center items-center>
      <!--左边颜色块-->
      <div class="w-1/2 " h-full rounded-s-2xl bg-primary-800>
        <IconLogin w-full h-full></IconLogin>
      </div>
      <!--右边表单块-->
      <div class="w-1/2 " flex justify-center items-center>
        <!--控制表单大小-->
        <div w-90>
          <!--登录标题-->
          <div text-3xl mb-8>登录</div>
          <!--标签置左属性 label-placement="left"-->
          <n-form ref="formRef" :model="formValue" :rules="rules" size="large" label-placement="left">
            <n-form-item path="user">
              <n-input round v-model:value="formValue.username" placeholder="请输入用户名">
                <template #prefix>
                  <div i-carbon-user text-xl></div>
                </template>
              </n-input>
            </n-form-item>
            <n-form-item path="password">
              <n-input round show-password-on="click" type="password" v-model:value="formValue.password"
                placeholder="请输入密码">
                <template #prefix>
                  <div i-carbon-locked text-xl></div>
                </template>
              </n-input>
            </n-form-item>
            <n-form-item>
              <n-checkbox size="large" label="记住我" />
            </n-form-item>
          </n-form>
          <n-button round type="primary" block @click="login" size="large">登录</n-button>
        </div>
      </div>
    </div>
  </div>
</template>
