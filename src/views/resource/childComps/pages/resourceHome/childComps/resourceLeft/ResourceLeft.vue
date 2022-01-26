
<!--
 * @Description:资源页面左边
 * @Version:
 * @Autor: Z_Y_C
 * @Date: 2022-01-22 12:12:35
 * @LastEditors: Z_Y_C
 * @LastEditTime: 2022-01-25 23:05:42
-->
<template>
  <div class="resource-left">
    <base-select-head />
    <resource-body></resource-body>
  </div>
</template>
<script>
import { defineComponent } from 'vue';
import BaseSelectHead from '@/components/common/baseSelectHead/BaseSelectHead.vue';
import ResourceBody from '@/views/resource/childComps/pages/resourceHome/childComps/resourceLeft/ResourceBody.vue';

/**
 * @description:资源页面左边
 * @author: Z_Y_C
 */

export default defineComponent({
  name: 'resourceLeft',
  components: {
    BaseSelectHead,
    ResourceBody,
  },
  props: {
    resourceData: {
      type: Array,
      defaule: () => [],
    },
  },
  setup(props) {
    return {};
  },
});
</script>

<style lang="scss" scoped>
.resource-left {
  width: 100%;
  border-radius: $border-radius-0;
  box-shadow: $shadow-0;
  background-color: $grey-0;
  padding-bottom: 4px;
}
</style>
