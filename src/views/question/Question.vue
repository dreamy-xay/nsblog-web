<!--
 * @Description: 问答主页
 * @Version:
 * @Autor: clq
 * @Date: 2022-01-16 18:28:08
 * @LastEditors: clq
 * @LastEditTime: 2022-01-22 15:55:52
-->
<template>
  <base-view
    :background="true"
    :top-bar="true"
    :top-bar-scroll="true"
    bind-class="question"
  >
    <template #top-bar-bottom>
      <base-topic-bar />
    </template>

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
        <div class="right-middle"></div>
        <div class="right-bottom"></div>
      </div>
    </div>

    <!-- <base-content-loading /> -->
  </base-view>
</template>

<script>
import { defineComponent, reactive, ref } from 'vue';
import BaseView from '@/components/content/baseView/BaseView.vue';
import BaseTopicBar from '@/components/common/baseTopicBar/BaseTopicBar.vue';
import BaseContentLoading from '@/components/content/baseContentLoading/BaseContentLoading.vue';
import QuestionHeader from '@/views/question/chldComps/QuestionHeader.vue';
import QuestionItem from '@/views/question/chldComps/QuestionItem.vue';
import QuestionMyQuestion from '@/views/question/chldComps/QuestionMyQuestion.vue';
import { getQuestions } from '@/network/api/questions';
import { useMessage } from 'naive-ui';

/**
 * @description:
 * @author: clq
 */

export default defineComponent({
  name: 'question',
  components: {
    BaseView,
    BaseTopicBar,
    QuestionHeader,
    QuestionItem,
    QuestionMyQuestion,
  },
  setup() {
    const msg = useMessage(); // naive-ui 消息组件
    // 问答
    const questions = reactive([
      {
        id: 10,
        title: 'hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh',
        content:
          'jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj',
        reply_count: 0,
        solution: 0,
        browsing_count: 100,
        username: 'dexteryu',
        nickname: 'dexteryu1',
        release_time: '2022-01-16 10:01',
        tags: [
          {
            id: 12,
            name: 'Java',
          },
          {
            id: 13,
            name: 'Java',
          },
          {
            id: 14,
            name: 'Java',
          },
        ],
      },
      {
        id: 11,
        title: 'hhhhhh',
        content: 'jjjjj',
        reply_count: 1,
        solution: 0,
        browsing_count: 99,
        username: 'dexteryu',
        nickname: 'dexteryu1',
        release_time: '2022-01-16 10:01',
        tags: [
          {
            id: 12,
            name: 'Java',
          },
        ],
      },
      {
        id: 12,
        title: 'hhhhhh',
        content: 'jjjjj',
        reply_count: 123,
        solution: 1,
        browsing_count: 12,
        username: 'dexteryu',
        nickname: 'dexteryu1',
        release_time: '2022-01-16 10:01',
        tags: [
          {
            id: 12,
            name: 'Java',
          },
        ],
      },
    ]);
    let activeFilterRuleIndex = ref(0);

    // 获取问答
    getQuestions('us1')
      .then((data) => {
        console.log('getQuestions');
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
        msg.error('获取问答失败', { duration: 2000, closable: true });
      });

    /**
     * @description: 加载更多问答信息
     * @return {void}
     * @author: clq
     */
    function loadMoreQuestions() {
      console.log('loadMoreQuestions()');
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
    }

    return {
      questions,
      activeFilterRuleIndex,
      loadMoreQuestions,
      changeFilterRule,
    };
  },
});
</script>

<style lang="scss" scoped>
.question {
  .question-container {
    @include flex();
    margin: 16px 0px 3px 75px;

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
        background: $grey-0;
        border-radius: $border-radius-0;
        box-shadow: $shadow-0;
      }

      .right-bottom {
        height: 100px;
      }

      .right-middle {
        height: 100px;
      }
    }
  }
}
</style>
