<!--
 * @Description: 用户中心头部
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-09-07 18:05:59
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-09-11 12:50:02
-->
<template>
  <div class="user-header">
    <div class="user-header-left">
      <base-avatar
        :src="data.avatar"
        :alt="data.username"
        shape="square"
        :size="80"
      />
      <div class="info">
        <div
          class="nickname"
          role="button"
        >
          {{data.nickname}}
          <a
            v-if="isLogin"
            href="/userCenter/profile"
            target="/userCenter/profile"
          ><i class="iconfont blog-edit"></i></a>
        </div>
        <div class="username">
          {{data.username}}
        </div>
        <div class="rank">
          全站排名
          <div>{{getSplitNum(data.rank)}}</div>
        </div>
      </div>
    </div>
    <div class="user-header-right">
      {{data.signature}}
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import BaseAvatar from '@/components/content/baseAvatar/BaseAvatar.vue';
import { getSplitNum } from '@/util/util';
import { mapGetters } from '@/util/store';

/**
 * @description: 用户中心头部
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'userHeader',
  components: {
    BaseAvatar,
  },
  props: {
    data: {
      type: Object,
      required: true,
    },
    self: {
      required: true,
    },
  },
  setup() {
    return {
      getSplitNum,
      ...mapGetters('global', ['isLogin']),
    };
  },
});
</script>

<style lang="scss" scoped>
.user-header {
  width: calc(100% - 16px);
  height: 80px;
  padding: 8px;
  box-shadow: $shadow-0;
  border-radius: $border-radius-0;
  background-color: $grey-0;
  @include flex(center, space-between);

  .user-header-left {
    height: 100%;
    @include flex(center, center);

    .info {
      margin-left: 24px;
      height: 100%;
      letter-spacing: 0.5px;
      @include flex(initial, center, column);

      .nickname {
        height: 27px;
        line-height: 27px;
        font-size: 20px;
        color: $grey-11;

        .iconfont {
          opacity: 0;
          color: $grey-11;
          transition: 0.25s;
          font-size: 20px;
          line-height: 27px;
        }

        &:hover .iconfont {
          opacity: 1;
        }
      }

      .username {
        height: 14px;
        line-height: 14px;
        font-size: 12px;
        color: $grey-6;
        margin: 7px 0 13px 0;
      }

      .rank {
        height: 19px;
        line-height: 14px;
        font-size: 14px;
        color: $grey-11;
        @include flex(center);

        div {
          margin-left: 14px;
          font-weight: 600;
        }
      }
    }
  }

  .user-header-right {
    max-width: 600px;
    margin-right: 16px;
    color: $grey-9;
    font-size: 16px;
    letter-spacing: 0.5px;
    @include word-break;
  }
}
</style>
