<!--
 * @Description: 问答详情评论组件
 * @Version:
 * @Autor: clq
 * @Date: 2022-01-25 13:54:46
 * @LastEditors: clq
 * @LastEditTime: 2022-04-06 15:20:39
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
            :answer="answer"
            :isBtn="true"
            :solution-id="solutionId"
            :isAccept="solutionId == answer.id"
            @addReply="addReply"
            @changeAcceptValue="changeAccept"
            @changeEvaluation="changeEvaluation"
          />
          <!-- :isBtn="isLogin && username == tokenInfo.username" -->
          <div
            v-show="answer.child_replies.length"
            class="child-answer"
          >
            <question-detail-answers-item
              v-for="(item,index) in answer.child_replies"
              :parentId="answer.id"
              :key="index"
              :solution-id="solutionId"
              :answer="item"
              @addReply="addReply"
              @changeEvaluation="changeEvaluation"
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
import { defineComponent, reactive, ref, watch } from 'vue';
import QuestionDetailAnswersItem from '@/views/question/childComps/pages/questionDetail/childComps/QuestionDetailAnswersItem.vue';
import { getQuestionReplies, releaseQuestionReply } from '@/network/api/questions';
import { useRoute } from 'vue-router';
import { useMessage } from 'naive-ui';
import { mapState } from '@/util/store';
import { mapGetters } from '@/util/store';
import { dateGetText } from '@/util/date';

/**
 * @description:
 * @param {Number} solutionId 被采纳回答的id
 * @param {String} username 问答发布者用户名
 * @param {String} newReplyContent 新发布的一级回答
 * @event changeAcceptValue 修改回答采纳状态 {answerId: 待修改的回答id}
 * @author: clq
 */

export default defineComponent({
  name: 'questionDetailAnswers',
  components: {
    QuestionDetailAnswersItem,
  },
  emits: ['changeAcceptValue'],
  props: {
    solutionId: {
      type: Number,
      default: 10,
    },
    username: {
      type: String,
      default: 'user6',
    },
    newReplyContent: {
      type: String,
      default: '',
    },
  },
  setup(props, context) {
    const msg = useMessage(); // naive-ui 消息组件
    const route = useRoute(); //route
    const questionId = route.params.questionId; // 问答id
    const { tokenInfo } = mapState('global', ['tokenInfo']); // 全局用户信息
    const { isLogin } = mapGetters('global', ['isLogin']); //登录状态
    let answersType = ref(0); // 问答过滤规则，0:综合，1:最新
    let answers = reactive([]); // 问答回答数据
    let limit = ref(3); // 单次获取数量
    let offset = ref(0); // 起始偏移量

    // console.log('solutionId: ' + props.solutionId);
    // console.log('username: ' + props.username);
    // console.log('isLogin: ' + isLogin.value);
    // console.log('tokenInfoUsername: ' + tokenInfo.value.username);

    // 获取回答数据
    getReplies(true);

    watch(
      () => props.newReplyContent,
      (newValue) => {
        console.log('releaseQuestionReply');
        releaseQuestionReply(questionId, newValue)
          .then((data) => {
            console.log(data);
            msg.success('发布回答成功');
          })
          .catch((error) => {
            console.log(error);
            msg.error('发布回答失败', { duration: 2000, closable: true });
          });
        console.log('newValue');
        console.log(newValue);
        let newReply = {};
        newReply.id = 1234;
        newReply.avatar = '#';
        newReply.evaluation = 0;
        newReply.content = newValue;
        newReply.username = 'username';
        newReply.nickname = 'nickname';
        newReply.oppose_count = 400;
        newReply.support_count = 300;
        newReply.time = '1974-03-26 07:37:14';
        newReply.child_replies = [];
        answers.splice(0, 0, newReply);
      }
    );

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
          // console.log('getQuestionReplies');
          // console.log(data);
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
            answers[0].id = props.solutionId;
          }
          console.log('answers');
          console.log(answers);
        })
        .catch((error) => {
          // console.log(error);
          msg.error('获取回答失败');
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
      // console.log('replyId: ' + replyId);
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
    function addReply(parentId, replyId, text, replyUsername) {
      // console.log('addReply');
      // console.log('parentId: ' + parentId);
      // console.log('replyId: ' + replyId);
      // console.log('text: ' + text);
      // console.log('replyUsername: ' + replyUsername);
      let newReply = {};

      releaseQuestionReply(questionId, text, parentId, replyUsername)
        .then((data) => {
          msg.success('发布成功');
          console.log(data);

          for (let i = 0; i < answers.length; i++) {
            if (answers[i].id == parentId) {
              if (replyId != -1) {
                for (let j = 0; j < answers[i].child_replies.length; j++) {
                  if (replyId == answers[i].child_replies[j].id) {
                    newReply.id = data.id;
                    newReply.avatar = data.avatar;
                    newReply.evaluation = 0;
                    newReply.content = text;
                    newReply.username = data.username;
                    newReply.nickname = data.nickname;
                    newReply.oppose_count = 0;
                    newReply.reply_nickname = answers[i].child_replies[j].nickname;
                    newReply.reply_username = answers[i].child_replies[j].username;
                    newReply.support_count = 0;
                    // newReply.time = data.time;
                    newReply.time = dateGetText(new Date(data.time), '');
                  }
                }
              } else {
                newReply.id = data.id;
                newReply.avatar = data.avatar;
                newReply.evaluation = 0;
                newReply.content = text;
                newReply.username = data.username;
                newReply.nickname = data.nickname;
                newReply.oppose_count = 0;
                newReply.reply_nickname = answers[i].nickname;
                newReply.reply_username = answers[i].username;
                newReply.support_count = 0;
                // newReply.time = data.time;
                newReply.time = dateGetText(new Date(data.time), '');
              }
              answers[i].child_replies.splice(0, 0, newReply);
            }
          }
        })
        .catch((error) => {
          console.log(error);
          msg.error('发布回答失败', { duration: 2000, closable: true });
        });
    }

    /**
     * @description: 修改回答采纳状态
     * @param {number} answerId 回答id
     * @return {void}
     * @author: clq
     */
    function changeAccept(answerId) {
      // console.log('DetailAnswersanswerId: ', answerId);
      context.emit('changeAcceptValue', answerId);
    }

    /**
     * @description: 修改回答评价
     * @param {number} parentId 一级回答id
     * @param {number} replyId 回答id
     * @param {number} newEvaluation 新评价
     * @param {number} newSupportCount 新支持数
     * @param {number} newOpposeCount 新反对数
     * @return {void}
     * @author: clq
     */
    function changeEvaluation(parentId, replyId, newEvaluation, newSupportCount, newOpposeCount) {
      if (parentId == -1) {
        for (let i = 0; i < answers.length; i++) {
          if (answers[i].id == replyId) {
            answers[i].evaluation = newEvaluation;
            answers[i].support_count = newSupportCount;
            answers[i].oppose_count = newOpposeCount;
          }
        }
      } else {
        for (let i = 0; i < answers.length; i++) {
          if (answers[i].id == parentId) {
            for (let j = 0; j < answers[i].child_replies.length; j++) {
              if (answers[i].child_replies[j].id == replyId) {
                answers[i].child_replies[j].evaluation = newEvaluation;
                answers[i].child_replies[j].support_count = newSupportCount;
                answers[i].child_replies[j].oppose_count = newOpposeCount;
              }
            }
          }
        }
      }
    }

    return {
      answers,
      answersType,
      limit,
      tokenInfo,
      isLogin,
      changeAnswerType,
      loadMoreAnswers,
      addReply,
      changeAccept,
      changeEvaluation,
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
