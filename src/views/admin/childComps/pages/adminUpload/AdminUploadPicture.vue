<!--
 * @Description: 本地图库
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2022-04-06 14:57:24
 * @LastEditors: Z_Y_C
 * @LastEditTime: 2022-07-01 21:06:27
-->
<template>
  <admin-view class="admin-upload-picture">
    <img v-prefix
      src="/admin/pages/adminUploadPicture.png"
      alt=""
    >
  </admin-view>
</template>

<script>
import { defineComponent } from 'vue';
import AdminView from '@/views/admin/childComps/AdminView.vue';

/**
 * @description: 本地图库
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'adminUploadPicture',
  components: {
    AdminView,
  },
});
</script>

<style lang="scss" scoped>
.admin-upload-picture {
  user-select: none;
  -webkit-user-drag: none;

  img {
    width: 100%;
  }
}
</style>
