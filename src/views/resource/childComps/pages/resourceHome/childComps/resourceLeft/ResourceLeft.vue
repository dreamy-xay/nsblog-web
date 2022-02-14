
<!--
 * @Description:资源页面左边
 * @Version:
 * @Autor: Z_Y_C
 * @Date: 2022-01-22 12:12:35
 * @LastEditors: Z_Y_C
 * @LastEditTime: 2022-02-14 13:15:05
-->
<template>
  <div class="resource-left">
    <base-select-head
      :select-tag="selectTag"
      :select-time="selectTime"
      @change-tag="changeTag($event)"
      @change-select="changeSelect($event)"
    />
    <div class="contont">
      <resource-body :resource-data="resourceData" />
      <base-content-loading
        v-show="showContentLoading"
        :style="{padding: '16px 0 12px 0'}"
      />
    </div>
  </div>
</template>
<script>
import { defineComponent } from 'vue';
import BaseSelectHead from '@/components/common/baseSelectHead/BaseSelectHead.vue';
import ResourceBody from '@/views/resource/childComps/pages/resourceHome/childComps/resourceLeft/ResourceBody.vue';
import BaseContentLoading from '@/components/content/baseContentLoading/BaseContentLoading.vue';

/**
 * @description:资源页面左边
 * @param {Array} resourceData 显示数据 `默认为 []`
 * @param {Number} selectTag  选择 0:'综合', 1:'最新', 2:'热门'标签 `默认为 0`
 * @param {Number} selectTime 选择 0:'时间不限', 1:'最近一天', 2:'最近一周', 3:'最近三月'时间筛选 `默认为 0`
 * @param {Boolean} showContentLoading 是否显示加载内容过渡 `必传参数`
 * @author: Z_Y_C
 */

export default defineComponent({
  name: 'resourceLeft',
  components: {
    BaseSelectHead,
    ResourceBody,
    BaseContentLoading,
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
    showContentLoading: {
      type: Boolean,
      required: true,
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
      context.emit('changeTag', e.index);
    }

    /**
     * @description: 选择时间下拉框
     * @param {Object} e e.index标签下标
     * @return {Void}
     * @author: Z_Y_C
     */
    function changeSelect(e) {
      context.emit('changeTime', e.index);
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

  .contont {
    margin: 0 20px;
  }
}
</style>
