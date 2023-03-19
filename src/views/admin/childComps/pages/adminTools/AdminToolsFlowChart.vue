<!--
 * @Description: 流程图
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2022-04-06 14:57:24
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2023-03-19 15:20:59
-->
<template>
  <admin-view
    class="admin-tools-flow-chart"
    :loading="loading"
    :style="{height: `calc(100vh - ${pageHeadHeight + 1}px)`}"
  >
    <base-iframe
      name="adminToolsFlowChart"
      src="https://www.iodraw.com/diagram/"
      @load="loading = false"
    />
  </admin-view>
</template>

<script>
import { defineComponent, inject, ref } from 'vue';
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
    const pageHeadHeight = inject('pageHeadHeight'); // 子页面头部可视范围的高度
    const loading = ref(true); // 是否显示加载动画

    return {
      pageHeadHeight,
      loading,
    };
  },
});
</script>

<style lang="scss" scoped>
.admin-tools-flow-chart {
  overflow: hidden;
  width: 100%;
  background-color: $grey-0;
  margin: 1px 0 0 0;
}
</style>
