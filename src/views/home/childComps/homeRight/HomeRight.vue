<!--
 * @Description: 主页面(home)右侧
 * @Version:
 * @Autor: continue-hs
 * @Date: 2022-01-17 10:18:37
 * @LastEditors: Z_Y_C
 * @LastEditTime: 2022-02-12 20:44:41
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
import { getNotices } from '@/network/api/notices';
import { getArticlesList, getTagsList } from '@/network/api/list';
import { useMessage } from 'naive-ui';

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
    const msg = useMessage(); // naive-ui
    // 热门文章
    const rankingList = reactive([]);

    // 热门标签
    const hotTags = reactive([]);

    const activityData = reactive([]);
    const bulletinData = reactive([]);

    // 获取公告牌数据
    getNotices()
      .then((data) => {
        // 0为网站通知，1为网站活动
        for (let i = 0; i < data.notices.length; i++) {
          if (data.notices[i].type == 0) {
            let arr = { text: null, href: null };
            arr.text = data.notices[i].content;
            arr.href = data.notices[i].link;
            bulletinData.splice(bulletinData.length, 0, arr);
          } else {
            let arr = { image: null, href: null };
            arr.image = data.notices[i].content;
            arr.href = data.notices[i].link;
            activityData.splice(activityData.length, 0, arr);
          }
        }
      })
      .catch((error) => {
        console.log(error);
        msg.error('获取公告牌失败', { duration: 2000, closable: true });
      });

    // 获取热门文章数据
    getArticlesList(0)
      .then((data) => {
        for (let i = 0; i < data.articles.length; i++) {
          let arr = {
            title: null,
            url: 'article/',
          };
          arr.title = data.articles[i].title;
          arr.url += data.articles[i].id;
          rankingList.splice(rankingList.length, 0, arr);
        }
      })
      .catch((error) => {
        console.log(error);
        msg.error('获取热门文章数据失败', { duration: 2000, closable: true });
      });

    // 获取热门标签数据
    getTagsList()
      .then((data) => {
        console.log(data);
        for (let i = 0; i < data.tags.length; i++) {
          let arr = {
            name: null,
            url: `tag/`,
          };
          arr.name = data.tags[i];
          arr.url += data.tags[i];
          hotTags.splice(hotTags.length, 0, arr);
        }
      })
      .catch((error) => {
        console.log(error);
        msg.error('获取热门标签数据失败', { duration: 2000, closable: true });
      });

    /**
     * @description: 排行卡卡片中点击菜单
     * @param {number} index 点击的菜单索引 `必传参数`
     * @param {string} item 点击菜单菜单项名 `必传参数`
     * @return {void}
     * @author: dreamy-xay
     */
    function rankCardClickMenuItem(index, item) {
      getArticlesList(index)
        .then((data) => {
          rankingList.splice(0, rankingList.length);
          for (let i = 0; i < data.articles.length; i++) {
            let arr = {
              title: null,
              url: 'article/',
            };
            arr.title = data.articles[i].title;
            arr.url += data.articles[i].id;
            rankingList.splice(rankingList.length, 0, arr);
          }
        })
        .catch((error) => {
          console.log(error);
          msg.error('获取热门文章数据失败', { duration: 2000, closable: true });
        });
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
