<!--
 * @Description: 征集令页面左侧
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2022-02-15 12:39:50
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2022-02-15 15:56:01
-->
<template>
  <div class="solicitation-left">
    <div class="solicitation-left-main">
      <div class="title">
        {{ data.title }}
      </div>
      <div class="user-info">
        <base-avatar
          :src="data.avatar"
          :href="`/user/${data.username}`"
          :target="`/user/${data.username}`"
          :size="32"
          :alt="data.username"
        />
        <a
          class="nickname"
          :href="`/user/${data.username}`"
          :target="`/user/${data.username}`"
        >
          {{ data.nickname }}
        </a>
        <div class="time">
          发布于 {{ dateGetText(new Date(data.release_time)) }}
        </div>
      </div>
      <div class="content">
        <v-md-preview :text="data.content" />
      </div>
      <div class="some-button">
        <div
          class="receive"
          role="button"
        >
          <div
            class="icon"
            v-if="!receive"
          >
            <i class="iconfont blog-zhiling"></i>
          </div>
          {{ receive ? '已接令' : '接令' }}
        </div>
        <base-qr-code-popover
          title="扫一扫，分享令牌"
          :value="url"
          placement="right"
        >
          <div
            class="share"
            role="button"
          >
            <div class="icon">
              <i class="iconfont blog-fenxiang"></i>
            </div>
            分享
          </div>
        </base-qr-code-popover>
      </div>
      <div class="bottom">
        <div class="time">
          截止至 {{ dateFormat('Y年m月d日 H时M分S秒', new Date(data.deadline)) }}
        </div>
        <div
          class="report"
          role="button"
          @click="reportClick"
        >
          举报
        </div>
        <base-report v-model:show="reportShow" />
      </div>
    </div>
  </div>
</template>

<script>
import { computed, defineComponent, ref } from 'vue';
import BaseAvatar from '@/components/content/baseAvatar/BaseAvatar.vue';
import BaseQrCodePopover from '@/components/content/baseQrCodePopover/BaseQrCodePopover.vue';
import BaseReport from '@/components/common/baseReport/BaseReport.vue';
import { dateGetText, dateFormat } from '@/util/date';
import { mapState } from '@/util/store';

/**
 * @description: 征集令页面左侧
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'solicitationLeft',
  components: {
    BaseAvatar,
    BaseQrCodePopover,
    BaseReport,
  },
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const url = window.location.href;
    const { tokenInfo } = mapState('global', ['tokenInfo']);

    // 是否已经接令
    const receive = computed(() => {
      return (
        tokenInfo.value.status &&
        props.data.users.findIndex((user) => user.username === tokenInfo.value.username) !== -1
      );
    });

    const reportShow = ref(false); // 举报框是否显示
    /**
     * @description: 点击举报
     * @return {coid}
     * @author: dreamy-xay
     */
    function reportClick() {
      reportShow.value = true;
    }

    return {
      url,
      receive,
      reportShow,
      reportClick,
      dateGetText,
      dateFormat,
    };
  },
});
</script>

<style lang="scss" scoped>
.solicitation-left {
  width: 700px;
  @include flex(center, center, column);

  .solicitation-left-main {
    width: 660px;
    padding: 20px;
    @include flex(center, center, column);
    box-shadow: $shadow-0;
    background-color: $grey-0;
    border-radius: $border-radius-0;

    & > div {
      width: 100%;
    }

    .title {
      line-height: 42px;
      font-size: 32px;
      color: $grey-10;
      @include word-break();
      @include ellipsis(2);
    }

    .user-info {
      height: 32px;
      margin: 16px 0;
      @include flex(center);

      .nickname {
        @include flex(center);
        height: 32px;
        font-size: 14px;
        color: $green-1;
        transition: 0.25s;
        margin-left: 10px;

        &:hover {
          color: $green-0;
        }
      }

      .time {
        @include flex(center);
        height: 32px;
        font-size: 14px;
        margin-left: 30px;
      }
    }

    .content {
      @include flex(center, center);

      :deep(.v-md-editor-preview > div) {
        padding: 0;
      }
    }

    .some-button {
      height: 32px;
      margin: 16px 0;
      @include flex(center);

      & > div {
        height: 100%;
        overflow: hidden;
        transition: 0.25s;
        font-size: 14px;
        @include flex(center, center);

        .icon {
          height: 100%;
          width: 14px;
          margin-right: 6px;
          @include flex(center, center);
        }
      }

      .receive {
        width: 66px;
        border-radius: 16px;
        color: $grey-0;
        background-color: $green-0;

        &:hover {
          background-color: $green-1;
        }
      }

      .share {
        width: 64px;
        border-radius: $border-radius-1;
        margin-left: 20px;
        box-sizing: border-box;
        border: 1px solid $grey-8;
        background-color: $grey-0;
        color: $grey-8;

        &:hover {
          color: $grey-0;
          background-color: $grey-8;
        }
      }
    }

    .bottom {
      @include flex(center, space-between);
      height: 20px;
      color: $grey-7;
      font-size: 14px;

      & > div {
        height: 100%;
        @include flex(center, center);
      }

      .report {
        transition: 0.25s;

        &:hover {
          color: $red-1;
        }
      }
    }
  }
}
</style>
