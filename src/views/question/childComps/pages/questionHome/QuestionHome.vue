<!--
 * @Description: 问答主页
 * @Version:
 * @Autor: clq
 * @Date: 2022-01-16 18:28:08
 * @LastEditors: clq
 * @LastEditTime: 2022-02-16 14:21:31
-->
<template>
  <base-view
    :background="true"
    :top-bar="true"
    :top-bar-scroll="true"
    bind-class="question-home"
  >
    <template #top-bar-bottom>
      <base-topic-bar
        @selectTopic="changeTpoic"
        @selectTag="changeTag"
      />
    </template>
    <base-topic-tags
      @selectTopic="changeTpoic"
      @selectTag="changeTag"
    />
    <div class="question-container">
      <div class="container-left">
        <div class="left-top">
          <question-header
            :activeIndex="activeFilterRuleIndex"
            @changeFilterRule="changeFilterRule"
          />
          <question-item
            v-for="(item, index) in questions"
            :key="index"
            :question="item"
          />
          <base-content-loading
            v-show="showContentLoading"
            :style="{width: '664px',padding: '16px'}"
          />
        </div>
        <div
          v-show="!showContentLoading && showLoadMore"
          class="left-bottom"
          role="button"
          @click="loadMoreQuestions"
        >
          加载更多...
        </div>
      </div>
      <div class="container-right">
        <div class="right-top">
          <question-my-question />
        </div>
        <div class="right-middle">
          <base-rank-card
            :loading="showRankCardLoading"
            :data="rankingList"
            title="热门问答"
            :menu-list="['综合', '点赞', '回答']"
            @clickMenuItem="rankCardClickMenuItem"
          />
        </div>
        <div class="right-bottom">
          <base-tag-card
            :loading="showTagCardLoading"
            title="热门标签"
            :tags="hotTags"
          />
        </div>
      </div>
    </div>
  </base-view>
</template>

<script>
import { defineComponent, reactive, ref } from 'vue';
import BaseView from '@/components/content/baseView/BaseView.vue';
import BaseTopicBar from '@/components/common/baseTopicBar/BaseTopicBar.vue';
import BaseTopicTags from '@/components/common/baseTopicBar/BaseTopicTags.vue';
import QuestionHeader from '@/views/question/childComps/pages/questionHome/chldComps/QuestionHeader.vue';
import QuestionItem from '@/views/question/childComps/pages/questionHome/chldComps/QuestionItem.vue';
import QuestionMyQuestion from '@/views/question/childComps/pages/questionHome/chldComps/QuestionMyQuestion.vue';
import BaseRankCard from '@/components/common/baseRankCard/BaseRankCard.vue';
import BaseContentLoading from '@/components/content/baseContentLoading/BaseContentLoading.vue';
import BaseTagCard from '@/components/common/baseTagCard/BaseTagCard.vue';
import { getQuestions } from '@/network/api/questions';
import { getQuestionsList, getTagsList } from '@/network/api/list';
import { useMessage } from 'naive-ui';

/**
 * @description:
 * @author: clq
 */

export default defineComponent({
  name: 'questionHome',
  components: {
    BaseView,
    BaseTopicBar,
    BaseTopicTags,
    QuestionHeader,
    QuestionItem,
    QuestionMyQuestion,
    BaseRankCard,
    BaseTagCard,
    BaseContentLoading,
  },
  setup() {
    const msg = useMessage(); // naive-ui 消息组件
    const questions = reactive([]); // 问答数据
    let showContentLoading = ref(true); //加载动画显示控制
    let showLoadMore = ref(true); // 加载更多显示控制
    const showRankCardLoading = ref(false); // rank-card 是否显示加载状态
    const showTagCardLoading = ref(false); // tag-card 是否显示加载状态
    let activeFilterRuleIndex = ref(0); // 当前有效的过滤规则 `{0:'最热', 1:'最新', 2:'待回答', 3:'周榜', 4:'月榜'}`
    let topicName = ref(''); // 主体
    let tagName = ref(''); // 标签
    let limit = ref(10); // 单次获取问答条数
    let offset = ref(0); // 问答记录起始偏移量
    const rankingList = reactive([]); // 热门问答
    const hotTags = reactive([]); // 热门标签

    // 初始化热门问答
    updateQuestionsList();

    // 初始化热门标签
    getTagsList({
      beforeRequest() {
        showTagCardLoading.value = true;
      },
      afterResopnse() {
        showTagCardLoading.value = false;
      },
    })
      .then((data) => {
        // console.log('getTagsList');
        // console.log(data);
        hotTags.splice(0, hotTags.length);
        for (let i = 0; i < data.tags.length; i++) {
          let item = {
            name: null,
            url: `tag/`,
          };
          item.name = data.tags[i];
          item.url += data.tags[i];
          hotTags.splice(hotTags.length, 0, item);
        }
      })
      .catch((error) => {
        console.log(error);
        msg.error('获取标签失败', { closable: true, duration: 2000 });
      });

    /**
     * @description: 更新热门问答
     * @return {void}
     * @author: clq
     */
    function updateQuestionsList(type = 0) {
      getQuestionsList(type, {
        beforeRequest() {
          showRankCardLoading.value = true;
        },
        afterResopnse() {
          showRankCardLoading.value = false;
        },
      })
        .then((data) => {
          // console.log('getQuestionsList');
          // console.log(data);
          // 清空原始数据
          rankingList.splice(0, rankingList.length);
          for (let i = 0; i < data.questions.length; i++) {
            let item = {
              title: null,
              url: `question/`,
            };
            item.title = data.questions[i].title;
            item.url += data.questions[i].id;
            rankingList.splice(rankingList.length, 0, item);
          }
        })
        .catch((error) => {
          console.log(error);
          msg.error('获取热门问答失败', { closable: true, duration: 2000 });
        });
    }

    /**
     * @description: 跟新问答数据
     * @param {boolean} flag 是否清空原数组
     * @return {void}
     * @author: clq
     */
    function updateQuestions(flag) {
      // 获取问答
      getQuestions('', 0, 0, activeFilterRuleIndex.value, topicName.value, tagName.value, limit.value, offset.value, {
        beforeRequest() {
          showContentLoading.value = true;
        },
        afterResopnse() {
          showContentLoading.value = false;
        },
      })
        .then((data) => {
          // console.log('getQuestions');
          // console.log(data);
          if (flag == true) questions.splice(0, questions.length);
          // console.log('questions');
          // console.log(questions);
          if (data.questions.length == limit.value) showLoadMore.value = true;
          else showLoadMore.value = false;
          for (let i of data.questions) {
            questions.splice(questions.length, 0, i);
          }
        })
        .catch((error) => {
          console.log(error);
          msg.error('获取问答失败', { closable: true, duration: 2000 });
        });
    }

    //初始化数据
    updateQuestions(true);

    /**
     * @description: 加载更多问答信息
     * @return {void}
     * @author: clq
     */
    function loadMoreQuestions() {
      console.log('loadMoreQuestions()');
      offset.value += limit.value;
      updateQuestions(false);
    }

    /**
     * @description: 更改过滤规则
     * @param {number} newFilterRuleIndex 新规则对应索引 {0:'最热', 1:'最新', 2:'待回答', 3:'周榜', 4:'月榜'}
     * @return {void}
     * @author: clq
     */
    function changeFilterRule(newFilterRuleIndex) {
      console.log('newFilterRuleIndex: ' + newFilterRuleIndex);
      activeFilterRuleIndex.value = newFilterRuleIndex;
      offset.value = 0;
      updateQuestions(true);
    }

    /**
     * @description: 改变topic
     * @param {string} newTopic
     * @return {void}
     * @author: clq
     */
    function changeTpoic(newTopic) {
      topicName.value = newTopic;
      // 清空tag
      tagName.value = '';
      console.log('newTopic: ' + newTopic);
      updateQuestions(true);
    }

    /**
     * @description: 改变tag
     * @param {string} newTag 新tag
     * @return {void}
     * @author: clq
     */
    function changeTag(newTag) {
      tagName.value = newTag;
      console.log('newTag: ' + newTag);
      updateQuestions(true);
    }

    /**
     * @description: 排行卡卡片中点击菜单
     * @param {number} index 点击的菜单索引 `必传参数`
     * @param {string} item 点击菜单菜单项名 `必传参数`
     * @return {void}
     * @author: dreamy-xay
     */
    function rankCardClickMenuItem(index, item) {
      console.log(index, item);
      updateQuestionsList(index);
    }

    return {
      questions,
      activeFilterRuleIndex,
      rankingList,
      hotTags,
      showContentLoading,
      showLoadMore,
      showRankCardLoading,
      showTagCardLoading,
      loadMoreQuestions,
      changeFilterRule,
      changeTpoic,
      changeTag,
      rankCardClickMenuItem,
    };
  },
});
</script>

<style lang="scss" scoped>
.question-home {
  .question-container {
    @include flex();
    margin: 16px 0px 3px 75px;
    padding-bottom: 40px;

    .container-left {
      @include flex(center, initial, column);
      margin-right: 16px;

      .left-top {
        width: 696px;
        background: $grey-0;
        border-radius: $border-radius-0;
        box-shadow: $shadow-0;
      }

      .left-bottom {
        width: 300px;
        height: 32px;
        margin-top: 16px;
        background: $grey-0;
        border-radius: $border-radius-0;
        box-shadow: $shadow-0;
        font-size: 14px;
        font-weight: 400;
        text-align: center;
        line-height: 32px;
        color: $grey-9;
        transition: 0.25s;

        &:hover {
          background-color: $grey-1;
        }
      }
    }

    .container-right {
      @include flex(center, initial, column);

      & > div {
        width: 284px;
        margin-bottom: 16px;
      }

      // .right-middle {
      //   height: 100px;
      // }

      // .right-bottom {
      //   height: 100px;
      // }
    }
  }
}
</style>
