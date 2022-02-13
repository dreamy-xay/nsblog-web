<!--
 * @Description: 主页面(home)右侧
 * @Version:
 * @Autor: continue-hs
 * @Date: 2022-01-17 10:18:37
 * @LastEditors: Z_Y_C
 * @LastEditTime: 2022-02-13 15:15:51
-->
<template>
  <div class="home-right">
    <base-bulletin
      :bulletin-data="bulletinData"
      :type="true"
    />
    <home-activity
      :activity-data="activityData"
      :style="{marginTop:activityData.length ? '16px' : ''}"
    />
    <base-rank-card
      :data="rankingList"
      title="热门文章"
      :menu-list="['综合', '点赞', '评论']"
      :style="{marginTop: '16px'}"
      @click-menu-item="rankCardClickMenuItem"
    />
    <base-tag-card
      title="热门标签"
      :tags="hotTags"
      :style="{marginTop: '16px'}"
    />
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import BaseBulletin from '@/components/common/baseBulletin/BaseBulletin.vue';
import HomeActivity from '@/views/home/childComps/homeRight/childComps/HomeActivity.vue';
import BaseRankCard from '@/components/common/baseRankCard/BaseRankCard.vue';
import BaseTagCard from '@/components/common/baseTagCard/BaseTagCard.vue';

/**
 * @description: 主页面(home)右侧
 * @param {Array} rankingList 热门文章 `默认为 []`
 * @param {Array} hotTags 热门标签 `默认为 []`
 * @param {Array} activityData 活动 `默认为 []`
 * @param {Array} bulletinData 公告牌 `默认为 []`
 * @event clickMenuItem 切换热门文章标签
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'homeRight',
  components: {
    BaseBulletin,
    HomeActivity,
    BaseRankCard,
    BaseTagCard,
  },
  props: {
    rankingList: {
      type: Array,
      default: () => [],
    },
    hotTags: {
      type: Array,
      default: () => [],
    },
    activityData: {
      type: Array,
      default: () => [],
    },
    bulletinData: {
      type: Array,
      default: () => [],
    },
  },
  setup(_, content) {
    /**
     * @description: 排行卡卡片中点击菜单
     * @param {number} index 点击的菜单索引 `必传参数`
     * @param {string} item 点击菜单菜单项名 `必传参数`
     * @return {void}
     * @author: dreamy-xay
     */
    function rankCardClickMenuItem(index, item) {
      content.emit('clickMenuItem', index);
    }

    return {
      rankCardClickMenuItem,
    };
  },
});
</script>

<style lang="scss" scoped>
.home-right {
  width: 284px;
  @include flex(center, center, column);
}
</style>
