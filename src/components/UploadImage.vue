<script setup>

const uploadUrl = `/api/upload`
// const fileList = computed(() => {
//   if (model.value === '' || model.value === undefined || model.value === null) {
//     return []
//   } else {
//     return [
//       {
//         url: model.value
//       }
//     ]
//   }
// })
const fileList = ref([])

const model = defineModel('value')

const userStore = useUserStore()
const headers = computed(() => {
  return {
    token: userStore.token
  }
})

function finish({ event }) {
  const response = event.target.response
  if (response) {
    const data = JSON.parse(response).data
    model.value = import.meta.env.VITE_APP_BASE_URL + data.url
  }
  console.log('fileList :>> ', fileList.value);

}

watchEffect(() => {
  if (model.value === '' || model.value === undefined || model.value === null) {
    fileList.value = []
  } else {
    if (fileList.value.length > 0) {
      fileList.value[0].url = model.value
    } else {
      fileList.value = [
        {
          url: model.value,
          status: 'finished',
        }
      ]
    }
  }
})

function remove() {
  model.value = undefined
}



</script>

<template>
  <div>
    <n-upload :action="uploadUrl" :headers="headers" v-model:file-list="fileList" list-type="image-card" :max="1"
      @finish="finish" @remove="remove">
      <slot>
        点击上传
      </slot>
    </n-upload>
  </div>
</template>
