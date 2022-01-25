<!--
 * @Description:资源详细信息页面
 * @Version:
 * @Autor: Z_Y_C
 * @Date: 2022-01-24 15:52:14
 * @LastEditors: Z_Y_C
 * @LastEditTime: 2022-01-25 23:12:43
-->
<template>
  <div class="resource-detail">
    <resource-detail-top></resource-detail-top>
    <resource-detail-bottom></resource-detail-bottom>
  </div>
</template>
<script>
import { defineComponent } from 'vue';
import ResourceDetailTop from '@/views/resource/childComps/pages/resourceDetail/childComps/ResourceDetailTop.vue';
import ResourceDetailBottom from '@/views/resource/childComps/pages/resourceDetail/childComps/ResourceDetailBottom.vue';

/**
 * @description:资源详细信息页面
 * @author: Z_Y_C
 */

export default defineComponent({
  name: 'resourceDetail',
  components: {
    ResourceDetailTop,
    ResourceDetailBottom,
  },
});
</script>

<style lang="scss" scoped>
.resource-detail {
  width: 1000px;
}
</style>
