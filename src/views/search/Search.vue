<!--
 * @Description: 搜索主页
 * @Version:
 * @Autor: Ban
 * @Date: 2022-01-14 16:49:45
 * @LastEditors: Ban
 * @LastEditTime: 2022-01-15 13:41:28
-->
<template>
  <base-view
    :background="true"
    :top-bar="true"
    :top-bar-scroll="true"
    :bindClass="'search'"
  >
    <div class="search-topbar">
      2222
      <div class="search-topbar-inner">
        111111111
      </div>
    </div>

  </base-view>
</template>

<script>
import BaseView from '@/components/content/baseView/BaseView.vue';
import { defineComponent, reactive } from 'vue';
/**
 * @description: 搜索主页
 * @author: Ban
 */
export default defineComponent({
  name: 'Search',
  components: {
    BaseView,
  },
  setup() {
    const topbarInner = reactive([
      {
        name: '综合',
      },
      {
        name: '文章',
      },
      {
        name: '问答',
      },
      {
        name: '学习小组',
      },
      {
        name: '资源',
      },
      {
        name: '标签',
      },
      {
        name: '用户',
      },
    ]);
    return {
      topbarInner,
    };
  },
});
</script>

<style lang='scss' scoped>
.seach-topbar {
  width: 100%;
  height: 44px;
  @include flex(center, center);
  background-color: $grey-0;
  border-top: 1px solid $grey-3;
  box-shadow: 0 1.5px 3px rgba(0, 0, 0, 0.08);
  .seach-topbar-inner {
    height: 44px;
    background: $grey-0;
  }
}
.search {
  height: 100%;
  width: 100%;
  overflow: hidden;
}
</style>
