<!--
 * @Description: 流程图
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2022-04-06 14:57:24
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2023-03-15 17:44:07
-->
<template>
  <admin-view class="admin-tools-flow-chart">
    <base-iframe
      name="adminToolsFlowChart"
      src="https://www.iodraw.com/diagram/"
    />
  </admin-view>
</template>

<script>
import { defineComponent } from 'vue';
import AdminView from '@/views/admin/childComps/AdminView.vue';
import BaseIframe from '@/components/content/baseIframe/BaseIframe.vue';

/**
 * @description: 流程图
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'adminToolsFlowChart',
  components: {
    AdminView,
    BaseIframe,
  },
  setup() {
    function iframeLoaded(event) {
      console.log(event);
    }

    return {
      iframeLoaded,
    };
  },
});
</script>

<style lang="scss" scoped>
.admin-tools-flow-chart {
  height: calc(100vh - 142px);
  background-color: $grey-0;
  border-radius: $border-radius-1;
  overflow: hidden;
}
</style>
