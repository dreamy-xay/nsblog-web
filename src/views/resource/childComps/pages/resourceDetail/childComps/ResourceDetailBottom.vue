<!--
 * @Description: 资源详细信息页面bottom
 * @Version:
 * @Autor: Z_Y_C
 * @Date: 2022-01-24 22:56:49
 * @LastEditors: Z_Y_C
 * @LastEditTime: 2022-01-25 20:38:38
-->
<template>
  <div class="resource-detail-bottom">
    <div class="title">相似资源</div>
    <resource-body :body-style="{padding: '0 30px' }" />
  </div>
</template>
<script>
import { defineComponent } from 'vue';
import ResourceBody from '@/views/resource/childComps/resourceLeft/ResourceBody.vue';

/**
 * @description: 资源详细信息页面bottom
 * @author: Z_Y_C
 */

export default defineComponent({
  name: 'resourcDdetailBottom',
  components: {
    ResourceBody,
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
}
</style>
