<!--
 * @Description: 问答信息组件
 * @Version:
 * @Autor: clq
 * @Date: 2022-01-25 12:46:18
 * @LastEditors: Z_Y_C
 * @LastEditTime: 2022-02-20 17:08:49
-->
<template>
  <div class="question-detail-info">
    <div class="question-detail-info-container">
      <div class="title">{{questionInfo.title}}</div>
      <div class="userinfo">
        <div class="avatar">
          <base-avatar
            :src="questionInfo.avatar"
            :size="32"
          />
        </div>
        <div
          class="nickname"
          role="button"
          @click="toUserCenter(questionInfo.username)"
        >
          {{questionInfo.nickname}}
        </div>
        <div class="release-time">
          {{questionInfo.release_time}}
        </div>
      </div>
      <div class="content">
        <v-md-preview :text="questionInfo.content" />
      </div>
      <div class="tags">
        <div
          v-for="(tag, index) in questionInfo.tags"
          :key="index"
          class="tag-item"
          role="button"
          @click="toTagPage(tag)"
        >
          {{tag.tag_name}}
        </div>
      </div>
      <div class="buttons">
        <div
          class="btn-style-1"
          role="button"
          @click="toEdit"
        >
          <div><i class="iconfont blog-edit" /></div>写回答
        </div>
        <div
          class="btn-style-2"
          role="button"
        >
          <div><i class="iconfont blog-dianzan1" /></div>点赞 {{questionInfo.evaluation_count}}
        </div>
        <div
          class="btn-style-2"
          role="button"
        >
          <div><i class="iconfont blog-shoucang21" /></div>收藏
        </div>
        <div
          class="btn-style-2"
          role="button"
        >
          <div><i class="iconfont blog-fenxiang" /></div>分享
        </div>
      </div>
      <div class="footer">
        <div class="left">{{questionInfo.solution? '已解决':'未解决'}}
          <div class="point"></div>
          {{questionInfo.browsing_count}} 阅读
        </div>
        <div
          class="right"
          role="button"
          @click="showReport"
        >举报</div>
      </div>
    </div>
    <base-report v-model:isShow="isShowReport" />
  </div>
</template>

<script>
import { defineComponent, reactive, ref, inject } from 'vue';
import BaseAvatar from '@/components/content/baseAvatar/BaseAvatar.vue';
import BaseReport from '@/components/common/baseReport/BaseReport.vue';
import { getQuestionDetail } from '@/network/api/questions';
import { useRoute } from 'vue-router';
import { useMessage } from 'naive-ui';

/**
 * @description:
 * @author: clq
 */

export default defineComponent({
  name: 'questionDetailInfo',
  components: {
    BaseAvatar,
    BaseReport,
  },
  setup() {
    const articlePage = inject('articlePage'); // 获取主页面 ref (dom)
    const msg = useMessage(); // naive-ui 消息组件
    const route = useRoute(); //route
    const questionId = route.params.questionId; // 问答id
    let questionInfo = reactive({}); // 问答详情
    let isShowReport = ref(false); // 举报页面显示控制

    // 获取问答详情
    getQuestionDetail(questionId)
      .then((data) => {
        // console.log('getQuestionDetail');
        // console.log(data);
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
     * @description: 跳转到用户主页
     * @param {string} username 用户名
     * @return {*}
     * @author: clq
     */
    function toUserCenter(username) {
      window.open(`/user/${username}`);
    }

    /**
     * @description: 显示举报页面
     * @return {void}
     * @author: clq
     */
    function showReport() {
      isShowReport.value = true;
    }

    /**
     * @description: 跳转至标签页面
     * @param {object} tag
     * @return {void}
     * @author: clq
     */
    function toTagPage(tag) {
      window.open(`/question?topic=${tag.topic_name}&tag=${tag.tag_name}`);
    }

    /**
     * @description: 跳转到编辑框
     * @return {void}
     * @author: clq
     */
    function toEdit() {
      console.log('toEdit');
    }

    return {
      questionInfo,
      isShowReport,
      toUserCenter,
      showReport,
      toTagPage,
      toEdit,
    };
  },
});
</script>

<style lang="scss" scoped>
.question-detail-info {
  width: 100%;
  margin-bottom: 16px;
  background-color: $grey-0;
  border-radius: $border-radius-0;
  box-shadow: $shadow-0;

  .question-detail-info-container {
    box-sizing: border-box;
    width: 100%;
    padding: 30px;

    & > div {
      width: 100%;
    }

    .title {
      @include ellipsis(2);
      font-size: 32px;
      font-weight: 400;
      color: $grey-10;
      line-height: 38px;
    }

    .userinfo {
      @include flex();
      margin: 16px 0px;
      & > div {
        height: 32px;
      }

      .avatar {
        width: 32px;
      }

      .nickname {
        margin-left: 10px;
        margin-right: 30px;
        font-size: 14px;
        font-weight: 400;
        text-align: center;
        color: $green-1;
        line-height: 32px;
        transition: 0.25s;

        &:hover {
          color: $green-2;
        }
      }

      .release-time {
        font-size: 14px;
        font-weight: 400;
        color: $grey-8;
        line-height: 32px;
      }
    }

    .content {
      @include word-break;

      :deep(.v-md-editor-preview > div) {
        padding: 0;

        & > p {
          margin-bottom: 0;
        }
      }
    }

    .tags {
      @include flex();
      margin: 16px 0px 24px;
      height: 24px;

      .tag-item {
        height: 100%;
        margin-right: 8px;
        background-color: rgba(133, 232, 199, 0.3);
        border-radius: $border-radius-1;
        padding: 0px 8px;
        font-size: 14px;
        line-height: 24px;
        font-weight: 400;
        color: $green-1;
        transition: 0.25s;

        &:hover {
          background-color: $green-0;
          color: $green-2;
        }
      }
    }

    .buttons {
      @include flex();
      height: 32px;
      margin-bottom: 16px;

      & > div {
        @include flex();
        height: 100%;
        padding: 0px 10px;
        transition: 0.25s;
        font-size: 14px;
        transition: 0.25s;
        line-height: 32px;

        & > div {
          width: 14px;
          height: 14px;
          margin-right: 3px;
        }
      }

      .btn-style-1 {
        margin-right: 20px;
        background: $green-0;
        border-radius: $border-radius-1;
        box-shadow: $shadow-0;
        color: $grey-0;
        &:hover {
          background-color: $green-1;
        }
        & > div {
          margin-right: 6px;
        }
      }

      .btn-style-2 {
        margin-right: 10px;
        background: $grey-0;
        border: 1px solid $grey-7;
        border-radius: $border-radius-1;
        color: $grey-7;

        &:hover {
          background-color: $grey-8;
          color: $grey-0;
        }
      }
    }

    .footer {
      @include flex(center, space-between);
      height: 20px;
      font-size: 14px;
      line-height: 20px;
      color: $grey-7;

      .left {
        @include flex(center);

        .point {
          width: 4px;
          height: 4px;
          margin: 0px 6px;
          border-radius: 50%;
          background-color: $grey-8;
        }
      }

      .right {
        transition: 0.25s;
        &:hover {
          color: $red-2;
        }
      }
    }
  }
}
</style>
