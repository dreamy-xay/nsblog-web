<!--
 * @Description: 问答详情评论组件
 * @Version:
 * @Autor: clq
 * @Date: 2022-01-25 13:54:46
 * @LastEditors: clq
 * @LastEditTime: 2022-01-29 16:27:52
-->
<template>
  <div class="question-detail-answers">
    <div class="question-detail-answers-top">
      <div class="header">
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
      <div class="body">
        <div
          v-for="(answer,index) in answers"
          :key="index"
          class="answer"
        >
          <question-detail-answers-item
            @addReply="addReply"
            :answer="answer"
          />
          <div
            v-show="answer.child_replies.length"
            class="child-answer"
          >
            <question-detail-answers-item
              v-for="(item,index) in answer.child_replies"
              :parentId="answer.id"
              :key="index"
              :answer="item"
              @addReply="addReply"
            />
          </div>
          <div
            v-show="answer.child_replies.length && answer.child_replies.length%limit==0"
            class="btn"
            role="button"
            @click="loadMoreAnswers(answer.id)"
          >加载更多...</div>
        </div>
      </div>
    </div>
    <div
      class="question-detail-answers-bottom"
      role="button"
      @click="loadMoreAnswers()"
    >
      加载更多...
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive, ref } from 'vue';
import QuestionDetailAnswersItem from '@/views/question/childComps/pages/questionDetail/childComps/QuestionDetailAnswersItem.vue';
import { getQuestionReplies } from '@/network/api/questions';
import { useRoute } from 'vue-router';
import { useMessage } from 'naive-ui';

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
    const msg = useMessage(); // naive-ui 消息组件
    const route = useRoute(); //route
    const questionId = route.params.questionId; // 问答id
    let answersType = ref(0); // 问答过滤规则，0:综合，1:最新
    let answers = reactive([]); // 问答回答数据
    let limit = ref(3); // 单次获取数量
    let offset = ref(0); // 起始偏移量

    // 获取回答数据
    getReplies(true);

    /**
     * @description: 获取回答
     * @param {boolean} clean 是否清空原始数据
     * @param {number} replyId 回答id
     * @return {void}
     * @author: clq
     */
    function getReplies(clean, replyId) {
      // console.log('replyId');
      // console.log(replyId);
      // 获取回答数据
      getQuestionReplies(questionId, answersType.value, replyId, limit.value, offset.value)
        .then((data) => {
          console.log('getQuestionReplies');
          console.log(data);
          if (clean) answers.splice(0, answers.length);
          if (!replyId) {
            for (let reply of data.replies) {
              answers.splice(answers.length, 0, reply);
            }
          } else {
            for (let i = 0; i < answers.length; i++) {
              if (answers[i].id == replyId) {
                for (let reply of data.replies) {
                  answers[i].child_replies.splice(answers[i].child_replies.length, 0, reply);
                }
              }
            }
          }
        })
        .catch((error) => {
          // console.log(error);
          msg.error('获取回答失败', { duration: 2000, closable: true });
        });
    }

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
        getReplies(true);
      }
    }

    /**
     * @description: 加载更多回答
     * @param {number} replyId 上级回答的id，undefine则获取一级回答
     * @return {void}
     * @author: clq
     */
    function loadMoreAnswers(replyId) {
      console.log('replyId: ' + replyId);
      getReplies(false, replyId);
    }

    /**
     * @description: 新增回答
     * @param {number} parentId 一级回复id
     * @param {number} replyId 回复对象id
     * @param {string} text 回复文本信息
     * @return {void}
     * @author: clq
     */
    function addReply(parentId, replyId, text) {
      console.log('addReply');
      console.log('parentId: ' + parentId);
      console.log('replyId: ' + replyId);
      console.log('text: ' + text);

      // for (let i = 0; i < answers.length; i++) {
      //   if (answers[i].id == parentId) {
      //   }
      // }
    }

    return {
      answers,
      answersType,
      limit,
      changeAnswerType,
      loadMoreAnswers,
      addReply,
    };
  },
});
</script>

<style lang="scss" scoped>
.question-detail-answers {
  width: 100%;
  margin-bottom: 16px;

  .question-detail-answers-top {
    width: 100%;
    background-color: $grey-0;
    border-radius: $border-radius-0;
    box-shadow: $shadow-0;

    .header {
      @include flex(center, space-between);
      box-sizing: border-box;
      width: 100%;
      height: 53px;
      padding: 7px 16px 15px;
      border-bottom: 1px solid $grey-3;

      .left {
        height: 30px;
        font-size: 16px;
        font-weight: 700;
        color: $grey-10;
        line-height: 30px;
      }

      .right {
        @include flex();
        width: 80px;
        height: 30px;
        border: 1px solid $green-1;
        border-radius: $border-radius-1;

        & > div {
          width: 50%;
          height: 100%;
          transition: 0.25s;

          font-size: 14px;
          font-weight: Narrow;
          text-align: center;
          color: $grey-7;
          line-height: 30px;
        }

        .active {
          background-color: $green-1;
          color: $grey-0;
        }
      }
    }

    .body {
      width: 100%;
      margin-bottom: 16px;

      .answer {
        box-sizing: border-box;
        width: 100%;
        padding: 30px;
        border-bottom: 1px solid $grey-3;

        .child-answer {
          box-sizing: border-box;
          width: 100%;
          padding: 16px;
          background: $grey-0;
          border-radius: $border-radius-0;
          box-shadow: $shadow-0;
        }

        .btn {
          width: 200px;
          height: 32px;
          margin: 16px auto 0px;
          background: $grey-0;
          border-radius: $border-radius-0;
          box-shadow: $shadow-0;
          font-size: 14px;
          text-align: center;
          line-height: 32px;
          color: $grey-9;
          transition: 0.25s;

          &:hover {
            background-color: $grey-7;
            color: $grey-0;
          }
        }
      }
    }
  }

  .question-detail-answers-bottom {
    width: 300px;
    height: 32px;
    margin: 0px auto;
    background: $grey-0;
    border-radius: $border-radius-0;
    box-shadow: $shadow-0;
    font-size: 14px;
    text-align: center;
    line-height: 32px;
    color: $grey-9;
    transition: 0.25s;

    &:hover {
      background-color: $grey-6;
      color: $grey-0;
    }
  }
}
</style>
