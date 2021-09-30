<!--
 * @Description: 博客主页
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-06-09 08:19:13
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-09-30 16:01:04
-->

<template>
  <base-view
    :background="true"
    :top-bar="true"
    bind-class="message"
  >
    <div style="width: 100%; height: 200px;">
      <base-image
        src=""
        :loading="2"
        :loading-scale="0.5"
      ></base-image>
    </div>
    <div
      style="width: 100%; height: 500px; background: #222222; margin-bottom: 100px;"
      ref="circle"
    ></div>
  </base-view>
</template>

<script>
import { defineComponent, onMounted, ref } from 'vue';
import BaseView from '@/components/content/baseView/BaseView.vue';
import BaseImage from '@/components/content/baseImage/BaseImage.vue';
import styles from '@/assets/style/define.scss';
import { colorHexToDec } from '@/util/util';
import circleMagic from '@/util/animation/circleMagic';

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
    const circle = ref(null);
    onMounted(() => {
      circleMagic(circle.value, { scrollElement: document.body });
    });

    return {
      styles,
      circle,
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
