<!--
 * @Description: 学习小组页面
 * @Version:
 * @Autor: xiao
 * @Date: 2022-01-21 19:42:59
 * @LastEditors: xiao
 * @LastEditTime: 2022-01-24 01:34:49
-->
<template>
  <base-view
    :background="true"
    :top-bar="true"
    :top-bar-scroll="true"
    bind-class="group"
  >
    <template #top-bar-bottom>
      <base-topic-bar
        :details="true"
        :firstItem="全部"
        @selectTopic="selectTopic"
        @selectTag="selectTag"
      />
    </template>

    <div class="group-container">
      <search-page-studygroup class="group-search" />
      <div class="group-right">
        <div class="group-create">
          <div
            class="create-button"
            role="button"
            @click="createGroup"
          >
            <i class="iconfont blog-chuangjianxiaozu"></i>
            创建学习小组
          </div>
        </div>
        <base-bulletin :bulletin-data="bulletinData" />
        <base-rank-card
          :data="rankingList"
          title="活跃排行榜"
          @clickMenuItem="rankCardClickMenuItem"
        />
      </div>
    </div>

    <group-popover v-model:modelValue="isShow" />
  </base-view>
</template>

<script>
import { defineComponent, ref, reactive } from 'vue';
import BaseView from '@/components/content/baseView/BaseView.vue';
import BaseTopicBar from '@/components/common/baseTopicBar/BaseTopicBar.vue';
import SearchPageStudygroup from '@/views/search/childComps/pages/SearchPageStudygroup';
import GroupPopover from '@/views/group/childComps/GroupPopover.vue';
import BaseBulletin from '@/components/common/baseBulletin/BaseBulletin';
import BaseRankCard from '@/components/common/baseRankCard/BaseRankCard';

/**
 * @description: 学习小组页面
 * @author: xiao
 */

export default defineComponent({
  name: 'group',
  components: {
    BaseView,
    BaseTopicBar,
    SearchPageStudygroup,
    GroupPopover,
    BaseBulletin,
    BaseRankCard,
  },

  setup() {
    const isShow = ref(false); //是否显示创建小组页面
    const topicSelect = ref(''); //选择的专题
    const tagSelect = ref(''); //选择的标签
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
        title: '奇想宇宙',
        url: '#',
      },
      {
        title: '资源分享',
        url: '#',
      },
      {
        title: '新人大本营',
        url: '#',
      },
      {
        title: 'vue-cli3 打包加了时间戳，【偶尔】浏览器还是会有缓存，该如何杜绝？',
        url: '#',
      },
    ]);
    const bulletinData = reactive([
      { text: '需要精通Java大佬救命', href: '#' },
      { text: '需要大佬一位', href: '#' },
      { text: '需要一些资源，请进组分享给大家...', href: '#' },
    ]);

    /**
     * @description: 点击创建学习小组
     * @return {*}
     * @author: xiao
     */
    function createGroup() {
      isShow.value = !isShow.value;
    }

    /**
     * @description: 选择了专题
     * @param {string} topic 专题名
     * @return {void}
     * @author: xiao
     */
    function selectTopic(topic) {
      topicSelect.value = topic;
      console.log(`select Topic: ${topic}`);
    }

    /**
     * @description: 选择了标签
     * @param {string} topic 专题名
     * @return {void}
     * @author: dreamy-xay
     */
    function selectTag(tag) {
      tagSelect.value = tag;
      console.log(`select Tag: ${tag}`);
    }

    return {
      createGroup,
      isShow,
      rankingList,
      bulletinData,
      selectTopic,
      selectTag,
    };
  },
});
</script>

<style lang="scss" scoped>
.group {
  .group-container {
    @include flex();
    margin: 16px 0px 16px 75px;

    .group-search {
      margin-right: 16px;
    }

    .group-right {
      @include flex(center, flex-start, column);
      .group-create {
        width: 284px;
        height: 72px;
        background: $grey-0;
        border-radius: $border-radius-0;
        box-shadow: $shadow-0;
        margin-bottom: 14px;
        @include flex(center, center);

        .create-button {
          @include flex(center, center);
          width: 252px;
          height: 40px;
          background: $grey-0;
          border: 1px solid $green-1;
          border-radius: $border-radius-1;
          font-size: 14px;
          font-weight: 700;
          color: $green-1;
          transition: 0.25s;

          .iconfont {
            font-size: 23px;
            margin-right: 9.7px;
            font-weight: normal;
          }

          &:hover {
            border: 1px solid $green-1;
            color: $grey-0;
            background: $green-1;
          }
        }
      }
    }
  }
}
</style>
