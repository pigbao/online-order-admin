<script setup>
import { useMessage, useLoadingBar, useDialog, useNotification, useModal } from 'naive-ui'
import { defineComponent } from 'vue'
function registerNaiveTools() {
  window.$loadingBar = useLoadingBar();
  window.$dialog = useDialog();
  window.$message = useMessage();
  window.$notification = useNotification();
  window.$modal = useModal();
}
// content
const NaiveProviderContent = defineComponent({
  setup() {
    registerNaiveTools();
  },
  render() {
    return h('div');
  }
})
</script>

<template>
  <n-loading-bar-provider>
    <n-modal-provider>
      <n-dialog-provider>
        <n-notification-provider>
          <n-message-provider>
            <slot></slot>
            <NaiveProviderContent></NaiveProviderContent>
          </n-message-provider>
        </n-notification-provider>
      </n-dialog-provider>
    </n-modal-provider>
  </n-loading-bar-provider>
</template>