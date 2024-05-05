<script setup>
import { apiAdd } from '@/api/role';
const props = defineProps({
  roles: {
    type: Array,
    default: () => [],
  },
});

const model = defineModel()

const formRef = ref(null);
const form = ref({});
const submitLoading = ref(false);

async function handleAdd() {
  try {
    submitLoading.value = true;
    await formRef.value.validate();
    await apiAdd(form.value);
    window.$message.success('新增成功');
    close();
  } catch (error) {
    console.error(error);
  } finally {
    submitLoading.value = false;
  }
}
const filterRoles = computed(() => {
  return props.roles.filter((role) => role.id !== 1);
});
</script>

<template>
  <n-card h-full>
    <n-form ref="formRef" :show-label="false" :model="form">
      <n-form-item path="roleName" :rule="[
      {
        required: true,
        min: 2,
        message: '请输入至少2位的角色名称',
        trigger: 'blur',
      },
    ]">
        <n-input-group>
          <n-input v-model:value="form.roleName" placeholder="请输入角色名称" />
          <n-button type="primary" ghost @click="handleAdd"> 新增 </n-button>
        </n-input-group>
      </n-form-item>
    </n-form>

    <n-flex vertical size="large">
      <n-button :type="model === role.id ? 'primary' : 'default'" block secondary v-for="role in filterRoles"
        @click="model = role.id">
        {{ role.roleName }}
      </n-button>
    </n-flex>
  </n-card>
</template>
