<!--
 * @Description: 资源详细信息页面top
 * @Version:
 * @Autor: Z_Y_C
 * @Date: 2022-01-24 21:42:19
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2022-02-16 13:05:36
-->
<template>
  <div class="resource-detail-top">
    <div class="title">{{data.name}}</div>
    <div class="user">
      <base-avatar
        role="button"
        :src="data.avatar"
        :size="32"
        :href="'/user/'+data.username"
        :target="'/user/'+data.username"
      />
      <div
        class="name"
        role="button"
        @click="clickButton(0)"
      >{{data.nickname}}</div>
      <div class="time">{{dateFormat('YY-mm-dd HH:MM:SS',new Date(data.upload_time))+' 上架'}}</div>
    </div>
    <div class="text">{{data.remark}}</div>
    <div class="button">
      <div
        class="download"
        role="button"
        @click="clickButton(1)"
      >
        <div class="download-icon"><i class="iconfont blog-xiazai"></i></div>
        <div class="download-text">下载</div>
      </div>

      <div
        class="collect"
        role="button"
        @click="clickButton(2)"
      >
        <div
          class="collect-icon"
          v-if="!data.collection"
        ><i class="iconfont blog-shoucang21"></i></div>
        <div class="collect-text">{{data.collection ? '已收藏' : '收藏'}}</div>
      </div>

      <base-qr-code-popover
        :value="path"
        :placement="'right'"
        title="扫一扫，分享资源"
      >
        <div
          class="collect"
          role="button"
        >
          <div class="collect-icon"><i class="iconfont blog-fenxiang"></i></div>
          <div class="collect-text">分享</div>
        </div>
      </base-qr-code-popover>

    </div>

    <div class="bottom">
      <div>下载量 • {{data.download_count}} 下载</div>
      <div
        role="button"
        class="bottom-button"
        @click="clickButton(3)"
      >举报</div>
    </div>
  </div>

  <base-favorite
    v-model:is-show="isShow"
    :type="type"
    :cid="id"
    @add-collection="addCollection"
  />

  <!-- 确认取消收藏 -->
  <base-modal
    :show="modalShow"
    content="取消后可就没有了哦~"
    @confirm="sureCancelCollection"
    @cancel="modalShow=!modalShow"
  />

  <base-report
    v-model:show="showReport"
    :type="3"
    :id="id"
  />
</template>
<script>
import { defineComponent, ref } from 'vue';
import BaseAvatar from '@/components/content/baseAvatar/BaseAvatar.vue';
import BaseQrCodePopover from '@/components/content/baseQrCodePopover/BaseQrCodePopover.vue';
import BaseReport from '@/components/common/baseReport/BaseReport.vue';
import BaseFavorite from '@/components/common/baseFavorite/BaseFavorite.vue';
import BaseModal from '@/components/content/baseModal/BaseModal.vue';
import { dateFormat } from '@/util/date';

/**
 * @description: 资源详细信息页面top
 * @param {Object} data 显示数据 `默认为null`
 * @event changeCollection 改变收藏状态
 * @author: Z_Y_C
 */

export default defineComponent({
  name: 'resourceDetailTop',
  components: {
    BaseAvatar,
    BaseQrCodePopover,
    BaseFavorite,
    BaseModal,
    BaseReport,
  },
  emits: ['changeCollection'],
  props: {
    data: {
      type: Object,
      default: null,
    },
  },
  setup(props, context) {
    const isShow = ref(false); // 显示收藏夹
    const modalShow = ref(false); // 显示取消收藏
    const id = ref(null); // 资源id
    const type = '3'; // 收藏类型
    const showReport = ref(false);

    /**
     * @description: 按钮跳转
     * @param {Number} index 0:username, 1:下载,2:收藏,3:举报
     * @return {Void}
     * @author: Z_Y_C
     */
    function clickButton(index) {
      id.value = props.data.id;
      if (index == 0) window.open('/user/' + props.data.username, '/user/' + props.data.username);
      else if (index == 1) window.open(props.data.link, props.data.link);
      else if (index == 2) {
        if (!props.data.collection) {
          isShow.value = true;
          addCollection();
        } else {
          modalShow.value = true;
        }
      } else {
        showReport.value = true;
      }
    }

    /**
     * @description: 收藏
     * @param {string} id 收藏id
     * @return {void}
     * @author: Z_Y_C
     */
    function addCollection(id) {
      context.emit('changeCollection', id);
    }

    function sureCancelCollection() {
      context.emit('changeCollection', 0);
      modalShow.value = false;
    }

    return {
      clickButton,
      isShow,
      modalShow,
      id,
      type,
      path: window.location.href,
      addCollection,
      sureCancelCollection,
      dateFormat,
      showReport,
    };
  },
});
</script>

<style lang="scss" scoped>
.resource-detail-top {
  width: calc(100% - 60px);
  border-radius: $border-radius-0;
  box-shadow: $shadow-0;
  background-color: $grey-0;
  padding: 30px;
  margin: 16px 0;

  .title {
    font-size: 32px;
    color: $grey-10;
    margin-bottom: 16px;
  }

  .user {
    height: 32px;
    @include flex(center);

    .name {
      margin-left: 10px;
      font-size: 14px;
      color: $green-1;
      transition: 0.25s;

      &:hover {
        color: $green-0;
      }
    }

    .time {
      margin-left: 20px;
      font-size: 14px;
      color: $grey-8;
    }
  }

  .text {
    margin-top: 10px;
    font-size: 16px;
    color: $grey-8;
  }

  .button {
    margin-top: 24px;
    height: 32px;
    @include flex(center);

    .download {
      height: 32px;
      border-radius: 16px;
      padding: 0 10px;
      background-color: $green-0;
      @include flex(center);
      color: $grey-0;
      box-shadow: $shadow-0;
      transition: 0.25s;
      margin-right: 20px;

      &:hover {
        box-shadow: $shadow-2;
        background-color: $green-1;
      }

      .download-icon {
        .iconfont {
          font-size: 14px;
        }
      }

      .download-text {
        font-size: 14px;
        margin-left: 5px;
      }
    }

    .collect {
      height: 30px;
      border-radius: $border-radius-1;
      padding: 0 10px;
      @include flex(center);
      color: $grey-7;
      border: 1px solid $grey-7;
      transition: 0.25s;
      margin-right: 10px;

      &:hover {
        color: $grey-2;
        border: 1px solid $grey-8;
        background-color: $grey-8;
      }

      .collect-icon {
        margin-right: 5px;
        .iconfont {
          font-size: 14px;
        }
      }

      .collect-text {
        font-size: 14px;
      }
    }
  }

  .bottom {
    margin-top: 16px;
    height: 20px;
    font-size: 14px;
    color: $grey-7;
    @include flex(center, space-between);

    .bottom-button {
      transition: 0.25s;
      color: $grey-7;

      &:hover {
        color: $red-2;
      }
    }
  }
}
</style>
