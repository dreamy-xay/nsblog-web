<!--
 * @Description:资源页面
 * @Version:
 * @Autor: Z_Y_C
 * @Date: 2022-01-21 23:15:38
 * @LastEditors: Z_Y_C
 * @LastEditTime: 2022-01-26 20:37:47
-->
<template>
  <div class="resource-home">
    <div class="resource-home-center">
      <div class="left">
        <resource-left />
        <div
          class="button"
          role="button"
        >加载更多...</div>

      </div>
      <div class="right">
        <base-rank-card
          title="下载排行"
          :data="rankinglist"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent, reactive } from 'vue';
import BaseRankCard from '@/components/common/baseRankCard/BaseRankCard.vue';
import ResourceLeft from '@/views/resource/childComps/pages/resourceHome/childComps/resourceLeft/ResourceLeft.vue';

/**
 * @description:资源页面
 * @author: Z_Y_C
 */

export default defineComponent({
  name: 'resourceHome',
  components: {
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
.resource-home {
  @include flex(center, center, column);

  .resource-home-center {
    width: 1000px;
    margin-top: 16px;
    margin-bottom: 6px;
    @include flex(initial, space-between);

    .left {
      width: 700px;
      @include flex(center, initial, column);

      .button {
        @include flex(center, center);
        height: 32px;
        margin-top: 10px;
        width: 300px;
        border-radius: $border-radius-0;
        box-shadow: $shadow-0;
        background-color: $grey-0;

        transition: 0.25s;

        &:hover {
          background: $grey-1;
        }
      }
    }

    .right {
      width: 284px;
    }
  }
}
</style>
