<!--
 * @Description: 问答详情页面
 * @Version:
 * @Autor: clq
 * @Date: 2022-01-25 10:25:30
 * @LastEditors: clq
 * @LastEditTime: 2022-01-27 10:02:16
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
    let comments = reactive([
      {
        comment_id: 123,
        username: 'test',
        nickname: 'cccc',
        avatar: 'https://ccc',
        release_time: '2021-10-12',
        content: '真不戳！',
        support_count: 12,
        oppose_count: 54,
        evaluation: 0,
        child_comments: [],
      },
      {
        comment_id: 123,
        username: 'test',
        nickname: 'cccc',
        avatar: 'https://ccc',
        release_time: '2021-10-12',
        content: '真不戳！',
        support_count: 12,
        oppose_count: 54,
        evaluation: 0,
        child_comments: [
          {
            comment_id: 123,
            username: 'test',
            nickname: 'cccc',
            reply_username: '',
            reply_nickname: '',
            avatar: 'https://ccc',
            release_time: '2021-10-12',
            content: '真不戳！',
            support_count: 12,
            oppose_count: 54,
            evaluation: 0,
          },
        ],
      },
    ]);

    return {
      comments,
    };
  },
});
</script>

<style lang="scss" scoped>
.question-detail {
  .question-detail-container {
    width: 1000px;
    margin: 16px auto;

    & > div {
      width: 100%;
      margin-bottom: 16px;
      background-color: #fff;
      border-radius: 8px;
      box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.16);
    }
  }
}
</style>
