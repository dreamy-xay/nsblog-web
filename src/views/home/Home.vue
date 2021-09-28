<!--
 * @Description: 博客主页
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-06-09 08:19:13
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-09-28 19:16:32
-->

<template>
  <base-view
    :background="true"
    :top-bar="true"
    bind-class="message"
  >
    <div style="width: 100%; height: 288px;">
      <base-image
        src=""
        :loading="0"
        :loading-scale="0.5"
      ></base-image>
    </div>
  </base-view>
</template>

<script>
import { defineComponent } from 'vue';
import BaseView from '@/components/content/baseView/BaseView.vue';
import BaseImage from '@/components/content/baseImage/BaseImage.vue';
import styles from '@/assets/style/define.scss';
import { colorHexToDec } from '@/util/util';

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
  setup() {
    return {
      styles,
      colorHexToDec,
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
