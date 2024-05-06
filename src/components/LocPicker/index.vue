<script setup>
const address = defineModel('address')
const location = defineModel('location')
const active = ref(false)
function handleOpen() {
  window.addEventListener('message', handleChoose, false);
  active.value = true
}


function handleChoose(event) {
  // 接收位置信息，用户选择确认位置点后选点组件会触发该事件，回传用户的位置信息
  var loc = event.data;
  if (loc && loc.module == 'locationPicker') {
    //防止其他应用也会向该页面post信息，需判断module是否为'locationPicker'
    address.value = loc.poiaddress + loc.poiname
    location.value = loc.latlng.lat + ',' + loc.latlng.lng
  }
  handleClose()
}

function handleClose() {
  active.value = false
  window.removeEventListener('message', handleChoose, false);
}

</script>

<template>
  <div w-full>
    <n-input-group>
      <n-input :style="{ width: '100%' }" :value="address" />
      <n-button type="primary" ghost @click="handleOpen">
        选择地址
      </n-button>
    </n-input-group>
    <n-drawer v-model:show="active" :width="502" placement="right" @afterLeave="handleClose">
      <n-drawer-content title="选择地址">
        <iframe id="mapPage" width="100%" height="100%" frameborder=0
          src="https://apis.map.qq.com/tools/locpicker?search=0&type=1&key=F2EBZ-FOECI-KUOG3-UFRWT-IHBUT-FCFAA&referer=点餐">
        </iframe>
      </n-drawer-content>
    </n-drawer>
  </div>
</template>
