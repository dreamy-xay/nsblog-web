<!--
 * @Description: 主页面(home)右侧
 * @Version:
 * @Autor: continue-hs
 * @Date: 2022-01-17 10:18:37
<<<<<<< HEAD
 * @LastEditors: Z_Y_C
 * @LastEditTime: 2022-01-27 20:05:29
=======
 * @LastEditors: Ban
 * @LastEditTime: 2022-01-27 19:24:06
>>>>>>> 1deab3dfa28f133899a36781804793bc86b1fe7b
-->
<template>
  <div class="home-right">
    <base-bulletin
      :bulletin-data="bulletinData"
      :type="true"
    />
    <home-activity
      :activity-data="activityData"
      :style="{marginTop: '16px'}"
    />
    <base-rank-card
      :data="rankingList"
      title="热门文章"
      :menu-list="['综合', '点赞', '评论']"
      :style="{marginTop: '16px'}"
      @clickMenuItem="rankCardClickMenuItem"
    />
    <base-tag-card
      title="热门标签"
      :tags="hotTags"
      :style="{marginTop: '16px'}"
    />
  </div>
</template>

<script>
import { defineComponent, reactive } from 'vue';
import BaseBulletin from '@/components/common/baseBulletin/BaseBulletin.vue';
import HomeActivity from '@/views/home/childComps/homeRight/childComps/HomeActivity.vue';
import BaseRankCard from '@/components/common/baseRankCard/BaseRankCard.vue';
import BaseTagCard from '@/components/common/baseTagCard/BaseTagCard.vue';

/**
 * @description: 主页面(home)右侧
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
  setup() {
    const rankingList = reactive([
      {
        title: 'react有tab页，如何实现未选中的tab页隐藏但不销毁在JavaScript中一组数据如何进行关联呢',
        url: '#',
      },
      {
        title: '在JavaScript中一组数据如何进行关联呢',
        url: '#',
      },
      {
        title: '在JavaScript中一组数据如何进行关联呢',
        url: '#',
      },
      {
        title: '在JavaScript中一组数据如何进行关联呢',
        url: '#',
      },
      {
        title: 'react有tab页，如何实现未选中的tab页隐藏但不销毁',
        url: '#',
      },
      {
        title: '如何给一个html字符串添加锚点',
        url: '#',
      },
    ]);

    // 热门标签
    const hotTags = reactive([
      {
        name: 'Java',
        url: `/tag/Java`,
      },
      {
        name: 'Python',
        url: `/tag/Python`,
      },
      {
        name: 'Csharp',
        url: `/tag/Csharp`,
      },
      {
        name: 'Cpp',
        url: `/tag/Cpp`,
      },
      {
        name: 'Vscode',
        url: `/tag/Vscode`,
      },
      {
        name: '自然科学',
        url: `/tag/自然科学`,
      },
      {
        name: '人工智能',
        url: `/tag/人工智能`,
      },
    ]);

    const activityData = reactive([{ image: 'https://s3.bmp.ovh/imgs/2021/09/7fc65c1d3e881ea5.jpg', href: '#' }]);
    const bulletinData = reactive([
      { text: '123', href: '#' },
      { text: '123', href: '#' },
    ]);

    /**
     * @description: 排行卡卡片中点击菜单
     * @param {number} index 点击的菜单索引 `必传参数`
     * @param {string} item 点击菜单菜单项名 `必传参数`
     * @return {void}
     * @author: dreamy-xay
     */
    function rankCardClickMenuItem(index, item) {
      // console.log(index, item);
      // 模拟
      const data = rankingList[rankingList.length - 1];
      rankingList.splice(rankingList.length - 1, 1);
      rankingList.splice(0, 0, data);
    }

    return {
      rankingList,
      hotTags,
      activityData,
      bulletinData,
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
