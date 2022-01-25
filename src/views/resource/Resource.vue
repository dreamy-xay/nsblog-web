<!--
 * @Description:资源页面
 * @Version:
 * @Autor: Z_Y_C
 * @Date: 2022-01-21 23:15:38
 * @LastEditors: Z_Y_C
 * @LastEditTime: 2022-01-25 23:13:45
-->
<template>
  <base-view
    :background="true"
    :top-bar="true"
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
.resource {
  width: 1000px;
}
</style>
