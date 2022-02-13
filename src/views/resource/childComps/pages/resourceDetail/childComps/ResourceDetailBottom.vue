<!--
 * @Description: 资源详细信息页面bottom
 * @Version:
 * @Autor: Z_Y_C
 * @Date: 2022-01-24 22:56:49
 * @LastEditors: Z_Y_C
 * @LastEditTime: 2022-02-13 22:46:19
-->
<template>
  <div class="resource-detail-bottom">
    <div class="title">相似资源</div>
    <div class="content">
      <resource-body :resource-data="data" />
      <base-content-loading
        v-show="!data.length"
        :style="{padding: '16px 0'}"
      />
    </div>
  </div>
</template>
<script>
import { defineComponent } from 'vue';
import ResourceBody from '@/views/resource/childComps/pages/resourceHome/childComps/resourceLeft/ResourceBody.vue';
import BaseContentLoading from '@/components/content/baseContentLoading/BaseContentLoading.vue';
/**
 * @description: 资源详细信息页面bottom
 * @param {Array} data 显示数据 `默认为[]`
 * @author: Z_Y_C
 */

export default defineComponent({
  name: 'resourcDdetailBottom',
  components: {
    ResourceBody,
    BaseContentLoading,
  },
  props: {
    data: {
      type: Array,
      default: () => [],
    },
  },
});
</script>

<style lang="scss" scoped>
.resource-detail-bottom {
  width: 100%;
  border-radius: $border-radius-0;
  box-shadow: $shadow-0;
  background-color: $grey-0;
  padding-bottom: 4px;
  margin-bottom: 6px;

  .title {
    font-size: 16px;
    color: $grey-11;
    padding-top: 16px;
    padding-left: 30px;
    padding-bottom: 16px;
    border-bottom: 1px solid $grey-1;
  }

  .content {
    margin: 0 30px;
  }
}
</style>
