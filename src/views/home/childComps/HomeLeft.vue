<!--
 * @Description: home左侧
 * @Version:
 * @Autor: continue-hs
 * @Date: 2022-01-17 10:18:16
 * @LastEditors: Z_Y_C
 * @LastEditTime: 2022-02-13 14:11:30
-->
<template>
  <div class="home-left">
    <div class="home-left-top">
      <base-select-head
        :selectTag="listIndex"
        :selectTime="timeIndex"
        :type="false"
        @changeTag="changeList"
        @changeSelect="changeTime"
        :style="{width : '100%'}"
      />
    </div>
    <div class="home-left-middle">
      <article-item
        :articleItem=" allArticles"
        @change-like="changeLike($event)"
      />
    </div>
  </div>

</template>

<script>
import { defineComponent } from 'vue';
import ArticleItem from '@/views/tag/childComps/ArticleItem.vue';
import BaseSelectHead from '@/components/common/baseSelectHead/BaseSelectHead.vue';

/**
 * @description: home左侧
 * @param {Array} allArticles 显示内容 `默认为 []`
 * @param {number} listIndex 选择 0:'综合', 1:'最新', 2:'热门'标签 `默认为 0`
 * @param {number} timeIndex 选择 0:'时间不限', 1:'最近一天', 2:'最近一周', 3:'最近三月'时间筛选 `默认为 0`
 * @event changeList 改变listIndex
 * @event changeTime 改变timeIndex
 * @author: Z_Y_C
 */
export default defineComponent({
  name: 'homeLeft',
  props: {
    allArticles: {
      type: Array,
      default: () => [],
    },
    listIndex: {
      type: Number,
      default: 0,
    },
    timeIndex: {
      type: Number,
      default: 0,
    },
  },
  components: {
    ArticleItem,
    BaseSelectHead,
  },
  setup(_, content) {
    /**
     * @description: 修改 listIndex
     * @param {Object} index 返回index
     * @return {void}
     * @author: Z_Y_C
     */
    function changeList(index) {
      content.emit('changeList', index);
    }

    /**
     * @description: 修改 timeIndex
     * @param {Object} index 返回index
     * @return {void}
     * @author: Z_Y_C
     */

    function changeTime(index) {
      content.emit('changeTime', index);
    }
    return { changeTime, changeList };
  },
});
</script>

<style lang="scss" scoped>
.home-left {
  width: 700px;
  background: $grey-0;
  border-radius: $border-radius-0;
  box-shadow: $shadow-0;

  .home-left-top {
    height: 46px;
    @include flex(center);
  }
  .home-left-middle {
    margin-bottom: 12px;
  }
}
</style>
