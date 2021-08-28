<!--
 * @Description: 博客主页
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-06-09 08:19:13
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-08-28 17:49:47
-->

<template>
  <div class="home">
    <base-top-bar v-model="show" />
    <button @click="show = true">cropper image</button>
    <base-avatar-cropper
      v-model="show"
      @uploaded="handleUploaded"
      upload-url="/files/upload"
    />
    <img
      v-if="userAvatar"
      :src="userAvatar"
    >
  </div>
</template>

<script>
import { defineComponent, ref, watch } from 'vue';
import BaseTopBar from '@/components/content/baseTopBar/BaseTopBar.vue';
import BaseAvatarCropper from '@/components/content/baseAvatarCropper/BaseAvatarCropper.vue';

/**
 * @description: 博客主页
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'Home',
  components: {
    BaseTopBar,
    BaseAvatarCropper,
  },
  setup() {
    const show = ref(false);
    const userAvatar = ref('');

    function handleUploaded(resp) {
      userAvatar.value = resp.relative_url;
    }

    return {
      show,
      userAvatar,
      handleUploaded,
    };
  },
});
</script>

<style lang="scss" scoped>
.home {
  height: 100%;
  width: 100%;
  overflow: hidden;
  background-color: #fff;
}
</style>
