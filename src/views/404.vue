<script setup>

</script>

<template>
  <n-card h-full>
    <div h-full flex justify-center pt-30>
      <n-result status="404" title="404 资源不存在" description="生活总归带点荒谬">
        <template #footer>
          <router-link to="/">
            <n-button type="primary">回到首页</n-button>
          </router-link>
        </template>
      </n-result>
    </div>
  </n-card>

</template>
