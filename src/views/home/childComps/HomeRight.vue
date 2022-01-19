<!--
 * @Description:
 * @Version:
 * @Autor: continue-hs
 * @Date: 2022-01-17 10:18:37
 * @LastEditors: continue-hs
 * @LastEditTime: 2022-01-19 12:18:42
-->
<template>
  <div class="home-right">
    <base-ranking-list
      :rankinglist="rankinglist"
      :Lefttext="Lefttext"
      :showTopright=false
      :rightList="rightList"
    ></base-ranking-list>
    <base-hot-tag
      :hotTags="hottags"
      :text="hottext"
    ></base-hot-tag>
  </div>
</template>

<script>
import { defineComponent, reactive } from 'vue';
import BaseHotTag from '@/components/common/baseHotTag/BaseHotTag.vue';
import BaseRankingList from '@/components/common/baseRankingList/BaseRankingList.vue';
import { mapGetters, mapState } from '@/util/store';
import getArticles from '@/network/api/articles';

export default defineComponent({
  name: 'homeRight',
  components: {
    BaseHotTag,
    BaseRankingList,
  },
  setup() {
    const Lefttext = '热门排行榜';
    const hottext = '热门标签';
    const rightList = reactive([
      {
        name: '综合',
      },
      {
        name: '点赞',
      },
      {
        name: '评论',
      },
    ]);
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
    const hottags = reactive([
      {
        name: 'Java',
      },
      {
        name: 'Python',
      },
      {
        name: 'C#',
      },
      {
        name: 'Cpp',
      },
      {
        name: 'Vscode',
      },
    ]);
    const { tokenInfo } = mapState('global', ['tokenInfo']); // 获取tokenInfo
    const username = tokenInfo.value.username; // 登录用户名

    // getArticles(username,'','',0,7,0,1)
    // .then((data) => {

    // })
    return { Lefttext, hottext, rightList, rankinglist, hottags };
  },
});
</script>

<style lang="scss" scoped>
.home-right {
  width: 384px;
}
</style>
