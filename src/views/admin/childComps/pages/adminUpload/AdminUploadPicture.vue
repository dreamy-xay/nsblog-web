<!--
 * @Description: 本地图库
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2022-04-06 14:57:24
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2022-04-06 15:16:39
-->
<template>
  <div class="admin-upload-picture">
    <img
      src="/admin/pages/adminUploadPicture.png"
      alt=""
    >
  </div>
</template>

<script>
import { defineComponent } from 'vue';

/**
 * @description: 本地图库
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'adminUploadPicture',
});
</script>

<style lang="scss" scoped>
.admin-upload-picture {
  width: 100%;

  img {
    width: 100%;
  }
}
</style>
