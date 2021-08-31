<!--
 * @Description: 博客主页
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-06-09 08:19:13
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-08-31 12:15:42
-->

<template>
  <base-view
    :background="true"
    :top-bar="true"
    bind-class="message"
  >
    <v-md-editor
      v-model="text"
      height="400px"
    ></v-md-editor>
  </base-view>
</template>

<script>
import { defineComponent, ref } from 'vue';
import BaseView from '@/components/content/baseView/BaseView.vue';

/**
 * @description: 博客主页
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'Home',
  components: {
    BaseView,
  },
  setup() {
    const text = ref('');

    return {
      text,
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
