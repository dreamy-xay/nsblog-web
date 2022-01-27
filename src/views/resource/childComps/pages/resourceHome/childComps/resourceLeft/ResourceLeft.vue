
<!--
 * @Description:资源页面左边
 * @Version:
 * @Autor: Z_Y_C
 * @Date: 2022-01-22 12:12:35
 * @LastEditors: Z_Y_C
 * @LastEditTime: 2022-01-27 16:30:05
-->
<template>
  <div class="resource-left">
    <base-select-head
      :select-tag="selectTag"
      :select-time="selectTime"
      @change-tag="changeTag($event)"
      @change-select="changeSelect($event)"
    />
    <resource-body :resource-data="resourceData"></resource-body>
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
    selectTag: {
      type: Number,
      default: 0,
    },
    selectTime: {
      type: Number,
      default: 0,
    },
  },
  setup(props, context) {
    /**
     * @description: 选择标签
     * @param {Object} e e.index标签下标
     * @return {Void}
     * @author: Z_Y_C
     */
    function changeTag(e) {
      context.emit('update:selectTag', e.index);
    }

    /**
     * @description: 选择时间下拉框
     * @param {Object} e e.index标签下标
     * @return {Void}
     * @author: Z_Y_C
     */
    function changeSelect(e) {
      context.emit('update:selectTime', e.index);
    }
    return { changeTag, changeSelect };
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
