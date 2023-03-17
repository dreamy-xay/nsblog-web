<!--
 * @Description: 流程图
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2022-04-06 14:57:24
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2023-03-17 19:24:53
-->
<template>
  <admin-view class="admin-tools-flow-chart" :style="{height: `calc(100vh - ${pageHeight + 2}px)`}">
    <base-iframe
      name="adminToolsFlowChart"
      src="https://www.iodraw.com/diagram/"
    />
  </admin-view>
</template>

<script>
import { defineComponent, inject } from 'vue';
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
    const pageHeight = inject('pageHeight') // 子页面可可视范围的高度

    function iframeLoaded(event) {
      console.log(event);
    }

    return {
      pageHeight,
      iframeLoaded,
    };
  },
});
</script>

<style lang="scss" scoped>
.admin-tools-flow-chart {
  overflow: hidden;
  width: calc(100% + 30px);
  left: -14px;
  top: -14px;
}
</style>
