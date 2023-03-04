<!--
 * @Description: 问答详情页面
 * @Version:
 * @Autor: clq
 * @Date: 2022-01-25 10:25:30
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2023-03-03 15:16:21
-->
<template>
  <base-view
    :background="true"
    :top-bar="true"
    :top-bar-scroll="true"
    :footer="true"
    :footer-show-all="false"
    :back-top="true"
    bind-class="question-detail"
    ref="baseViewRef"
  >
    <div class="question-detail-container">
      <div class="container-top">
        <question-detail-info
          :questionInfo="questionInfo"
          @changeEvaluation="changeEvaluation"
          @toEdit="toEdit"
          @cacelCollection="cacelCollection"
          @addCollection="addCollection"
        />
      </div>
      <div class="container-middle">
        <question-detail-answers
          :solutionId="questionInfo.solution"
          :username="questionInfo.username"
          :newReplyContent="newReply"
          @changeAcceptValue="changeAccept"
        />
      </div>
      <div class="container-bottom">
        <question-detail-write-answer @releaseReply="releaseReply" />
      </div>
    </div>
  </base-view>
</template>

<script>
import { defineComponent, reactive, ref } from 'vue';
import BaseView from '@/components/content/baseView/BaseView.vue';
import QuestionDetailInfo from '@/views/question/childComps/pages/questionDetail/childComps/QuestionDetailInfo.vue';
import QuestionDetailAnswers from '@/views/question/childComps/pages/questionDetail/childComps/QuestionDetailAnswers.vue';
import QuestionDetailWriteAnswer from '@/views/question/childComps/pages/questionDetail/childComps/QuestionDetailWriteAnswer.vue';
import { getQuestionDetail } from '@/network/api/questions';
import { useRoute } from 'vue-router';
import { useMessage } from 'naive-ui';
import { changeEvaluationOnQuestion, changeSolution } from '@/network/api/questions';

/**
 * @description: 问答详情页面
 * @author: clq
 */

export default defineComponent({
  name: 'questionDetail',
  components: {
    BaseView,
    QuestionDetailInfo,
    QuestionDetailAnswers,
    QuestionDetailWriteAnswer,
  },
  setup() {
    const msg = useMessage(); // naive-ui 消息组件
    const route = useRoute(); //route
    const questionId = route.params.questionId; // 问答id
    const baseViewRef = ref(null); // baseView 引用对象
    let newReply = ref(''); // 新发布的回答
    let questionInfo = reactive({}); // 问答详情

    // 获取问答详情
    getQuestionDetail(questionId)
      .then((data) => {
        // console.log('getQuestionDetail');
        // console.log(data);
        questionInfo.id = data.id;
        questionInfo.title = data.title;
        questionInfo.avatar = data.avatar;
        questionInfo.nickname = data.nickname;
        questionInfo.username = data.username;
        questionInfo.release_time = data.release_time;
        questionInfo.content = data.content;
        questionInfo.tags = data.tags;
        questionInfo.evaluation = data.evaluation;
        questionInfo.evaluation_count = data.evaluation_count;
        questionInfo.collection = data.collection;
        questionInfo.solution = data.solution;
        questionInfo.browsing_count = data.browsing_count;
        // console.log('questionInfo');
        // console.log(questionInfo);
      })
      .catch((error) => {
        console.log(error);
        msg.error('获取问答失败');
      });

    /**
     * @description: 修改问答评价
     * @return {void}
     * @author: clq
     */
    function changeEvaluation() {
      let newEvaluation;
      let newEvaluationCount;
      if (questionInfo.evaluation == 0) {
        newEvaluation = 1;
        newEvaluationCount = questionInfo.evaluation_count + 1;
      } else {
        newEvaluation = 0;
        newEvaluationCount = questionInfo.evaluation_count - 1;
      }
      // questionInfo.evaluation = newEvaluation;
      changeEvaluationOnQuestion(questionInfo.id, newEvaluation)
        .then(() => {
          msg.success('修改评价成功', { duration: 2000, closable: true });
          questionInfo.evaluation = newEvaluation;
          questionInfo.evaluation_count = newEvaluationCount;
        })
        .catch((error) => {
          console.log(error);
          msg.error('修改评价失败', { duration: 2000, closable: true });
        });
      // console.log('evaluation: ' + newEvaluation);
    }

    /**
     * @description: 修改回答采纳状态
     * @param {number} answerId 回答id
     * @return {void}
     * @author: clq
     */
    function changeAccept(answerId) {
      // console.log('DetailAnswerId: ', answerId);
      let newSolution = questionInfo.solution == answerId ? -1 : answerId;
      changeSolution(answerId, questionInfo.id)
        .then(() => {
          msg.success('采纳成功');
          questionInfo.solution = newSolution;
        })
        .catch((error) => {
          console.log(error);
          msg.error('采纳失败', { duration: 2000, closable: true });
        });
      // questionInfo.solution = newSolution;
    }

    /**
     * @description: 转到编辑区
     * @return {void}
     * @author: clq
     */
    function toEdit() {
      baseViewRef.value.setScrollTop(false);
      // console.log('DetailToEdit');
    }

    /**
     * @description: 取消收藏
     * @return {void}
     * @author: clq
     */
    function cacelCollection() {
      // console.log('Detail-cacelCollection');
      questionInfo.collection = 0;
    }

    /**
     * @description: 添加收藏
     * @return {void}
     * @author: clq
     */
    function addCollection() {
      // console.log('Detail-addCollection: ' + id);
      questionInfo.collection = 1;
    }

    /**
     * @description: 发布一级回答
     * @param {string} text 回答内容
     * @return {void}
     * @author: clq
     */
    function releaseReply(text) {
      // console.log('Detail-releaseReply: ' + text);
      baseViewRef.value.setScrollTop(true);
      newReply.value = text;
    }

    return {
      questionInfo,
      baseViewRef,
      newReply,
      changeEvaluation,
      changeAccept,
      toEdit,
      cacelCollection,
      addCollection,
      releaseReply,
    };
  },
});
</script>

<style lang="scss" scoped>
.question-detail {
  .question-detail-container {
    width: 1000px;
    margin: 16px auto;
  }
}
</style>
