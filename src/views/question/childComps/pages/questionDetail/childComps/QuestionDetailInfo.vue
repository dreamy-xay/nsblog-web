<!--
 * @Description: 问答信息组件
 * @Version:
 * @Autor: clq
 * @Date: 2022-01-25 12:46:18
 * @LastEditors: clq
 * @LastEditTime: 2022-02-26 14:14:27
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
          :class="questionInfo.evaluation ? 'active':''"
          role="button"
          @click="changeEvaluation"
        >
          <div v-if="!questionInfo.evaluation"><i class="iconfont blog-dianzan1" /></div>{{questionInfo.evaluation? '已点赞':'点赞'}} {{questionInfo.evaluation_count}}
        </div>

        <div
          class="btn-style-2"
          :class="questionInfo.collection? 'active': ''"
          role="button"
          @click="showFavorite(questionInfo.collection)"
        >
          <div v-if="!questionInfo.collection"><i class="iconfont blog-shoucang21" /></div>{{questionInfo.collection? '已收藏':'收藏'}}
        </div>

        <base-qr-code-popover
          :value="path"
          :placement="'right'"
          title="扫一扫，分享资源"
        >
          <div
            class="btn-style-2"
            role="button"
          >
            <div><i class="iconfont blog-fenxiang" /></div>分享
          </div>
        </base-qr-code-popover>

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
    <base-report
      v-model:show="isShowReport"
      :id="questionInfo.id"
      :type="'2'"
    />
    <base-favorite
      v-model:isShow="isShowFavorite"
      :cid="questionInfo.id"
      :type="'1'"
      @addCollection="addCollection"
    >
    </base-favorite>

    <base-modal
      content="确定要取消收藏嘛"
      :show="modalShow"
      @confirm="delCollection"
      @cancel="close"
    />
  </div>
</template>

<script>
import { defineComponent, ref, inject } from 'vue';
import BaseAvatar from '@/components/content/baseAvatar/BaseAvatar.vue';
import BaseFavorite from '@/components/common/baseFavorite/BaseFavorite.vue';
import BaseQrCodePopover from '@/components/content/baseQrCodePopover/BaseQrCodePopover.vue';
import BaseReport from '@/components/common/baseReport/BaseReport.vue';
import { useMessage } from 'naive-ui';
import BaseModal from '@/components/content/baseModal/BaseModal.vue';

/**
 * @description:
 * @param {Object} questionInfo 问答数据对象
 * @event changeEvaluation 修改问答评价
 * @event toEdit 转到编辑区
 * @event cacelCollection 删除收藏
 * @event addCollection 增加收藏
 * @author: clq
 */

export default defineComponent({
  name: 'questionDetailInfo',
  components: {
    BaseQrCodePopover,
    BaseAvatar,
    BaseReport,
    BaseModal,
    BaseFavorite,
  },
  emits: ['changeEvaluation', 'toEdit', 'cacelCollection', 'addCollection'],
  props: {
    questionInfo: {
      type: Object,
      required: true,
    },
  },
  setup(props, context) {
    const msg = useMessage(); // naive-ui 消息组件
    // const articlePage = inject('articlePage'); // 获取主页面 ref (dom)
    let isShowReport = ref(false); // 举报页面显示控制
    let isShowFavorite = ref(false); // 举报页面显示控制
    const modalShow = ref(false); //取消收藏提示

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
      context.emit('toEdit');
    }

    /**
     * @description: 修改问答评价
     * @return {void}
     * @author: clq
     */
    function changeEvaluation() {
      context.emit('changeEvaluation');
    }

    /**
     * @description: 添加收藏
     * @param {string} id 收藏夹id
     * @return {void}
     * @author: clq
     */
    function addCollection(id) {
      // console.log('addCollection: ' + id);
      context.emit('addCollection', id);
      isShowFavorite.value = false;
    }

    /**
     * @description: 显示收藏组件
     * @param {collection} 收藏状态
     * @return {void}
     * @author: clq
     */
    function showFavorite(collection) {
      if (collection) {
        modalShow.value = true;
        console.log('modalShow: ' + modalShow.value);
      } else {
        isShowFavorite.value = true;
      }
      console.log('collection: ' + collection);
    }

    /**
     * @description: 取消收藏
     * @return {void}
     * @author: xiao
     */
    function delCollection() {
      modalShow.value = false;
      context.emit('cacelCollection'); //取消收藏
      msg.success(`取消收藏成功`);
    }

    /**
     * @description: 关闭提示框
     * @return {void}
     * @author: xiao
     */
    function close() {
      modalShow.value = false;
    }

    return {
      isShowReport,
      isShowFavorite,
      modalShow,
      path: window.location.href,
      changeEvaluation,
      toUserCenter,
      showReport,
      toTagPage,
      toEdit,
      addCollection,
      showFavorite,
      delCollection,
      close,
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

      .active {
        background-color: $green-1;
        color: $grey-0;
        border: 1px solid $green-1;
        &:hover {
          border: 1px solid $grey-7;
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
