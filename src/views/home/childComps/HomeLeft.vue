<!--
 * @Description:
 * @Version:
 * @Autor: continue-hs
 * @Date: 2022-01-17 10:18:16
 * @LastEditors: Z_Y_C
 * @LastEditTime: 2022-02-13 00:24:06
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
      default: 2,
    },
  },
  components: {
    ArticleItem,
    BaseSelectHead,
  },
  setup(_, content) {
    function changeList(index) {
      console.log(index);
      content.emit('changeList', index);
    }

    function changeTime(index) {
      console.log(index);
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
