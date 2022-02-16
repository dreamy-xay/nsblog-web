<!--
 * @Description: 资源页面
 * @Version:
 * @Autor: Z_Y_C
 * @Date: 2022-01-21 23:15:38
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2022-02-16 15:27:19
-->
<template>
  <base-view
    :background="true"
    :top-bar="true"
    :back-top="true"
    :top-bar-scroll="true"
    :footer="true"
    bind-class="resource"
  >
    <router-view />
  </base-view>
</template>
<script>
import { defineComponent } from 'vue';
import BaseView from '@/components/content/baseView/BaseView.vue';

/**
 * @description:资源页面
 * @author: Z_Y_C
 */

export default defineComponent({
  name: 'Resource',
  components: {
    BaseView,
  },
  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
:deep(.resource) {
  @include flex(center, center, column);
}
</style>
