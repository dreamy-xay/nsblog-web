<!--
 * @Description: 问答信息组件
 * @Version:
 * @Autor: clq
 * @Date: 2022-01-25 12:46:18
 * @LastEditors: clq
 * @LastEditTime: 2022-01-25 13:53:08
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
        {{questionInfo.content}}
      </div>
      <div class="tags">
        <div
          v-for="(item, index) in questionInfo.tags"
          :key="index"
          class="tag-item"
          role="button"
        >
          {{item}}
        </div>
      </div>
      <div class="buttons">
        <div
          class="btn-style-1"
          role="button"
        >
          <div><i class="iconfont blog-edit" /></div>写回答
        </div>
        <div
          class="btn-style-2"
          role="button"
        >
          <div><i class="iconfont blog-dianzan1" /></div>点赞 {{questionInfo.likeCount}}
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
        >举报</div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive } from 'vue';
import BaseAvatar from '@/components/content/baseAvatar/BaseAvatar.vue';
import { useRoute } from 'vue-router';

/**
 * @description:
 * @author: clq
 */

export default defineComponent({
  name: 'questionDetailInfo',
  components: {
    BaseAvatar,
  },
  setup() {
    const route = useRoute(); //route

    let questionInfo = reactive({
      id: 12,
      title:
        '文章标题文章标题文章标题文章标题文章标题文章标题文章标题文章标题文章标题文章标题文章标题文章标题文章标题文章标题文章标题文章标题文章标题文章标题文章标题文章标题文章标题',
      content:
        '文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容',
      solution: 1,
      likeCount: 12,
      browsing_count: 12,
      username: 'us6',
      nickname: 'dexteryu1',
      avatar: 'https://ccc',
      release_time: '2021-10-12',
      tags: ['Java', 'C++'],
    });

    console.log('route');
    console.log(route.query.id);

    /**
     * @description: 跳转到用户主页
     * @param {string} username 用户名
     * @return {*}
     * @author: clq
     */
    function toUserCenter(username) {
      window.open(`/user/${username}`);
    }
    return {
      questionInfo,
      toUserCenter,
    };
  },
});
</script>

<style lang="scss" scoped>
.question-detail-info {
  width: 100%;
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
      color: #262626;
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
        color: #4bd8aa;
        line-height: 32px;
        transition: 0.25s;

        &:hover {
          color: $green-2;
        }
      }

      .release-time {
        font-size: 14px;
        font-weight: 400;
        color: #707070;
        line-height: 32px;
      }
    }

    .content {
    }

    .tags {
      @include flex();
      margin: 16px 0px 24px;
      height: 24px;

      .tag-item {
        height: 100%;
        margin-right: 8px;
        background: rgba(133, 232, 199, 0.3);
        border-radius: 4px;
        padding: 0px 8px;
        // padding-top: 5px;
        font-size: 14px;
        line-height: 24px;
        font-weight: 400;
        color: #4bd8aa;
        transition: 0.25s;

        &:hover {
          background-color: rgba(133, 232, 199, 0.7);
          color: #37aa84;
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
        background: #85e8c7;
        border-radius: 16px;
        box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.16);
        color: #ffffff;
        &:hover {
          background-color: $green-2;
        }
        & > div {
          margin-right: 6px;
        }
      }

      .btn-style-2 {
        margin-right: 10px;
        background: #ffffff;
        border: 1px solid #8c8c8c;
        border-radius: 4px;
        color: #8c8c8c;

        &:hover {
          background-color: #707070;
          color: #ffffff;
        }
      }
    }

    .footer {
      @include flex(center, space-between);
      height: 20px;
      font-size: 14px;
      line-height: 20px;
      color: #8c8c8c;

      .left {
        @include flex(center);

        .point {
          width: 4px;
          height: 4px;
          margin: 0px 6px;
          border-radius: 50%;
          background-color: #707070;
        }
      }

      .right {
        transition: 0.25s;
        &:hover {
          color: red;
        }
      }
    }
  }
}
</style>
