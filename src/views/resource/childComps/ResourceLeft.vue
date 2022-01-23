<!--
 * @Description:资源页面左边
 * @Version:
 * @Autor: Z_Y_C
 * @Date: 2022-01-22 12:12:35
 * @LastEditors: Z_Y_C
 * @LastEditTime: 2022-01-23 15:59:25
-->
<template>
  <div class="resource-left">
    <div class="resource-left-top"></div>
  </div>
</template>
<script>
import { defineComponent } from 'vue';

/**
 * @description:资源页面左边
 * @author: Z_Y_C
 */

export default defineComponent({
  name: 'resourceLeft',
  props: {},
  setup(props) {
    return {};
  },
});
</script>

<style lang="scss" scoped>
.resource-left {
  width: calc(100% - 40px);
  border-radius: $border-radius-0;
  box-shadow: $shadow-0;
  background-color: $grey-0;
  padding: 16px 20px;
}
</style>
