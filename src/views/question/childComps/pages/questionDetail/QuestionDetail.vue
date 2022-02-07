<!--
 * @Description: 问答详情页面
 * @Version:
 * @Autor: clq
 * @Date: 2022-01-25 10:25:30
 * @LastEditors: clq
 * @LastEditTime: 2022-01-27 16:25:16
-->
<template>
  <base-view
    :background="true"
    :top-bar="true"
    :top-bar-scroll="true"
    bind-class="question-detail"
  >
    <div class="question-detail-container">
      <div class="container-top">
        <question-detail-info />
      </div>
      <div class="container-middle">
        <question-detail-answers />
      </div>
      <div class="container-bottom">
        <question-detail-write-answer />
      </div>
    </div>
  </base-view>
</template>

<script>
import { defineComponent, reactive } from 'vue';
import BaseView from '@/components/content/baseView/BaseView.vue';
import QuestionDetailInfo from '@/views/question/childComps/pages/questionDetail/childComps/QuestionDetailInfo.vue';
import QuestionDetailAnswers from '@/views/question/childComps/pages/questionDetail/childComps/QuestionDetailAnswers.vue';
import QuestionDetailWriteAnswer from '@/views/question/childComps/pages/questionDetail/childComps/QuestionDetailWriteAnswer.vue';

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
    return {};
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
