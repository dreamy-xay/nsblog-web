<!--
 * @Description: 问答主页
 * @Version:
 * @Autor: clq
 * @Date: 2022-01-16 18:28:08
 * @LastEditors: clq
 * @LastEditTime: 2022-01-29 16:11:13
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
        </div>
        <div
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
            :data="rankingList"
            title="热门文章"
            :menu-list="['综合', '点赞', '回答']"
            @clickMenuItem="rankCardClickMenuItem"
          />
        </div>
        <div class="right-bottom">
          <base-tag-card
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
import BaseTagCard from '@/components/common/baseTagCard/BaseTagCard.vue';
import { getQuestions } from '@/network/api/questions';
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
  },
  setup() {
    const msg = useMessage(); // naive-ui 消息组件
    const questions = reactive([]); // 问答数据
    let activeFilterRuleIndex = ref(0); // 当前有效的过滤规则 `{0:'最热', 1:'最新', 2:'待回答', 3:'周榜', 4:'月榜'}`
    let topicName = ref(''); // 主体
    let tagName = ref(''); // 标签
    let limit = ref(10); // 单次获取问答条数
    let offset = ref(0); // 问答记录起始偏移量
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

    /**
     * @description: 跟新问答数据
     * @param {boolean} flag 是否清空原数组
     * @return {void}
     * @author: clq
     */
    function updateQuestions(flag) {
      // 获取问答
      getQuestions('', 0, 0, activeFilterRuleIndex.value, topicName.value, tagName.value, limit.value, offset.value)
        .then((data) => {
          console.log('getQuestions');
          console.log(data);
          if (flag == true) questions.splice(0, questions.length);
          // console.log('questions');
          // console.log(questions);
          for (let i of data.questions) {
            questions.splice(questions.length, 0, i);
          }
        })
        .catch((error) => {
          console.log(error);
          msg.error('获取问答失败', { duration: 2000, closable: true });
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
      // 模拟
      const data = rankingList[rankingList.length - 1];
      rankingList.splice(rankingList.length - 1, 1);
      rankingList.splice(0, 0, data);
    }

    return {
      questions,
      activeFilterRuleIndex,
      rankingList,
      hotTags,
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
