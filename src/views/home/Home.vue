<!--
 * @Description: 博客主页
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-06-09 08:19:13
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-09-27 18:11:24
-->

<template>
  <base-view
    :background="true"
    :top-bar="true"
    bind-class="message"
  >
    <base-image
      class="image"
      src="https://i.loli.net/2021/09/27/O6xYnDcUyLrog2s.jpg"
      :style="{height: '400px'}"
      :loading="1"
    />
  </base-view>
</template>

<script>
import { defineComponent } from 'vue';
import BaseView from '@/components/content/baseView/BaseView.vue';
import BaseImage from '@/components/content/baseImage/BaseImage.vue';

/**
 * @description: 博客主页
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'Home',
  components: {
    BaseView,
    BaseImage,
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
