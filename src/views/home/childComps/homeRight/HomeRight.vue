<!--
 * @Description: 主页面(home)右侧
 * @Version:
 * @Autor: continue-hs
 * @Date: 2022-01-17 10:18:37
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2022-02-14 12:36:13
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
      :loading="showRankCardLoading"
      :data="rankingList"
      title="热门文章"
      :menu-list="['综合', '点赞', '评论']"
      :style="{marginTop: '16px'}"
      @click-menu-item="getArticlesLists"
    />
    <base-tag-card
      :loading="showTagCardLoading"
      title="热门标签"
      :tags="hotTags"
      :style="{marginTop: '16px'}"
    />
  </div>
</template>

<script>
import { defineComponent, reactive, ref } from 'vue';
import BaseBulletin from '@/components/common/baseBulletin/BaseBulletin.vue';
import HomeActivity from '@/views/home/childComps/homeRight/childComps/HomeActivity.vue';
import BaseRankCard from '@/components/common/baseRankCard/BaseRankCard.vue';
import BaseTagCard from '@/components/common/baseTagCard/BaseTagCard.vue';
import { getArticlesList, getTagsList } from '@/network/api/list';
import { useMessage } from 'naive-ui';

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
    activityData: {
      type: Array,
      default: () => [],
    },
    bulletinData: {
      type: Array,
      default: () => [],
    },
  },
  setup() {
    const msg = useMessage(); // naive-ui message
    const showRankCardLoading = ref(false); // rank-card 是否显示加载状态
    const showTagCardLoading = ref(false); // tag-card 是否显示加载状态

    // 热门文章
    const rankingList = reactive([]);
    // 初始化获取热门文章数据
    getArticlesLists(0);

    /**
     * @description: 获取热门文章
     * @param {number} index 0:综合，1:点赞，2:评论
     * @return {void}
     * @author: Z_Y_C
     */
    function getArticlesLists(index) {
      getArticlesList(index, {
        beforeRequest() {
          showRankCardLoading.value = true;
        },
        afterResopnse() {
          showRankCardLoading.value = false;
        },
      })
        .then((data) => {
          rankingList.splice(0, rankingList.length);
          for (let article of data.articles)
            rankingList.splice(rankingList.length, 0, {
              title: article.title,
              url: `/article/${article.id}`,
            });
        })
        .catch((error) => {
          console.log(error);
          msg.error('获取热门文章数据失败', { duration: 2000, closable: true });
        });
    }

    // 热门标签
    const hotTags = reactive([]);

    // 获取热门标签数据
    getTagsList({
      beforeRequest() {
        showTagCardLoading.value = true;
      },
      afterResopnse() {
        showTagCardLoading.value = false;
      },
    })
      .then((data) => {
        // console.log(data);
        for (let name of data.tags)
          hotTags.splice(hotTags.length, 0, {
            name,
            url: `/tag/${name}`,
          });
      })
      .catch((error) => {
        console.log(error);
        msg.error('获取热门标签数据失败', { duration: 2000, closable: true });
      });

    return {
      showRankCardLoading,
      showTagCardLoading,
      hotTags,
      rankingList,
      getArticlesLists,
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
