<script setup>

const form = ref({})

</script>

<template>
  <div>
    <n-form ref="formRef" :model="form">
      <n-form-item path="username" label="用户名" :rule="[{ required: true, message: '请输入', trigger: 'blur' }]">
        <n-input v-model:value="form.username" />
      </n-form-item>
      <n-form-item path="phone" label="联系方式" :rule="[{ required: true, message: '请输入', trigger: 'blur' }]">
        <n-input v-model:value="form.phone" />
      </n-form-item>
      <n-form-item path="avatar" label="头像">
        <n-input v-model:value="form.avatar" />
      </n-form-item>
    </n-form>
  </div>
</template>
