<!--
 * @Description:资源页面
 * @Version:
 * @Autor: Z_Y_C
 * @Date: 2022-01-21 23:15:38
 * @LastEditors: Z_Y_C
 * @LastEditTime: 2022-01-24 00:27:45
-->
<template>
  <base-view
    :background="true"
    :top-bar="true"
    :top-bar-scroll="true"
    :footer="true"
    bind-class="resource"
  >
    <div class="resource-center">
      <div class="left">
        <resource-left />
      </div>
      <div class="right">
        <base-rank-card
          title="下载排行"
          :data="rankinglist"
        />
      </div>
    </div>
  </base-view>
</template>
<script>
import { defineComponent, reactive } from 'vue';
import BaseView from '@/components/content/baseView/BaseView.vue';
import BaseRankCard from '@/components/common/baseRankCard/BaseRankCard.vue';
import ResourceLeft from '@/views/resource/childComps/ResourceLeft.vue';

/**
 * @description:资源页面
 * @author: Z_Y_C
 */

export default defineComponent({
  name: 'Resource',
  components: {
    BaseView,
    BaseRankCard,
    ResourceLeft,
  },
  setup() {
    const rankinglist = reactive([
      {
        title: 'react有tab页，如何实现未选中的tab页隐藏但不销毁在JavaScript中一组数据如何进行关联呢',
      },
      {
        title: '在JavaScript中一组数据如何进行关联呢',
      },
      {
        title: '在JavaScript中一组数据如何进行关联呢',
      },
      {
        title: '在JavaScript中一组数据如何进行关联呢',
      },

      {
        title: '在JavaScript中一组数据如何进行关联呢',
      },
      {
        title: 'react有tab页，如何实现未选中的tab页隐藏但不销毁',
      },
      {
        title: 'react有tab页，如何实现未选中的tab页隐藏但不销毁',
      },
      {
        title: '如何给一个html字符串添加锚点',
      },
      {
        title: '如何给一个html字符串添加锚点',
      },
      {
        title: '如何给一个html字符串添加锚点',
      },
      {
        title: 'react有tab页，如何实现未选中的tab页隐藏但不销毁',
      },
      {
        title: '在JavaScript中一组数据如何进行关联呢',
      },
    ]);
    return {
      rankinglist,
    };
  },
});
</script>

<style lang="scss" scoped>
:deep(.resource) {
  @include flex(center, center, column);

  .resource-center {
    width: 1000px;
    margin-top: 16px;
    margin-bottom: 6px;
    @include flex(initial, space-between);

    .left {
      width: 700px;
    }

    .right {
      width: 284px;
    }
  }
}
</style>
