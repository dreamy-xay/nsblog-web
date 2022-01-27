<!--
 * @Description: 问答详情评论组件
 * @Version:
 * @Autor: clq
 * @Date: 2022-01-25 13:54:46
 * @LastEditors: clq
 * @LastEditTime: 2022-01-27 12:59:34
-->
<template>
  <div class="question-detail-answers">
    <div class="question-detail-answers-header">
      <div class="left">1 个回答</div>
      <div class="right">
        <div
          :class="{'active' : !answersType}"
          role="button"
          @click="changeAnswerType(0)"
        >综合</div>
        <div
          :class="{'active' : answersType}"
          role="button"
          @click="changeAnswerType(1)"
        >最新</div>
      </div>
    </div>
    <div class="question-detail-answers-body">
      <div
        v-for="(answer,index) in answers"
        :key="index"
        class="answer"
      >
        <question-detail-answers-item :answer="answer" />
        <div class="child-answer">
          <question-detail-answers-item
            v-for="(item,index) in answer.child_replies"
            :key="index"
            :parent-id="answer.id"
            :answer="item"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive, ref } from 'vue';
import QuestionDetailAnswersItem from '@/views/question/childComps/pages/questionDetail/childComps/QuestionDetailAnswersItem.vue';
/**
 * @description:
 * @author: clq
 */

export default defineComponent({
  name: 'questionDetailAnswers',
  components: {
    QuestionDetailAnswersItem,
  },
  props: {},
  setup() {
    let answersType = ref(0); // 问答过滤规则，0:综合，1:最新

    let answers = reactive([
      {
        id: 10,
        username: 'us6',
        nickname: 'cccc',
        avatar: 'https://ccc',
        time: '2021-12-21 12:12:12',
        content: '真不戳！',
        support_count: 12,
        oppose_count: 54,
        evaluation: 0,
        child_replies: [
          {
            id: 123,
            username: 'us6',
            nickname: 'cccc',
            reply_username: '',
            reply_nickname: '',
            avatar: 'https://ccc',
            time: '2021-12-21 12:12:12',
            content: '真不戳！',
            support_count: 12,
            oppose_count: 54,
            evaluation: 0,
          },
          {
            id: 123,
            username: 'us6',
            nickname: 'cccc',
            reply_username: '',
            reply_nickname: '',
            avatar: 'https://ccc',
            time: '2021-12-21 12:12:12',
            content: '真不戳！',
            support_count: 12,
            oppose_count: 54,
            evaluation: 0,
          },
        ],
      },
      {
        id: 10,
        username: 'us6',
        nickname: 'cccc',
        avatar: 'https://ccc',
        time: '2021-12-21 12:12:12',
        content: '真不戳！',
        support_count: 12,
        oppose_count: 54,
        evaluation: 0,
        child_replies: [
          {
            id: 123,
            username: 'us6',
            nickname: 'cccc',
            reply_username: '',
            reply_nickname: '',
            avatar: 'https://ccc',
            time: '2021-12-21 12:12:12',
            content: '真不戳！',
            support_count: 12,
            oppose_count: 54,
            evaluation: 0,
          },
        ],
      },
    ]);

    /**
     * @description: 更改回答类型
     * @param {number} newType 0:综合，1:最新
     * @return {void}
     * @author: clq
     */
    function changeAnswerType(newType) {
      // console.log('newType: ' + newType);
      if (newType != answersType.value) {
        answersType.value = newType;
      }
    }

    return {
      answers,
      answersType,
      changeAnswerType,
    };
  },
});
</script>

<style lang="scss" scoped>
.question-detail-answers {
  // height: 100px;
  width: 100%;

  .question-detail-answers-header {
    @include flex(center, space-between);
    box-sizing: border-box;
    width: 100%;
    height: 52px;
    padding: 7px 16px 15px;
    border-bottom: 1px solid #f0f0f0;

    .left {
      height: 30px;
      font-size: 16px;
      font-weight: 700;
      color: #262626;
      line-height: 30px;
    }

    .right {
      @include flex();
      width: 80px;
      height: 30px;
      border: 1px solid #4bd8aa;
      border-radius: 4px;

      & > div {
        width: 50%;
        height: 100%;
        transition: 0.25s;

        font-size: 14px;
        font-weight: Narrow;
        text-align: center;
        color: #8c8c8c;
        line-height: 30px;

        // &:hover {
        // background-color: #4bd8aa;
        // color: #ffffff;
        // color: $grey-9;
        // }
      }

      .active {
        background-color: #4bd8aa;
        color: #ffffff;
      }
    }
  }

  .question-detail-answers-body {
    width: 100%;

    .answer {
      box-sizing: border-box;
      width: 100%;
      padding: 30px;
      border-bottom: 1px solid #f0f0f0;

      .child-answer {
        box-sizing: border-box;
        width: 100%;
        padding: 16px;
        background: #ffffff;
        border-radius: 8px;
        box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.16);
      }
    }
  }
}
</style>
