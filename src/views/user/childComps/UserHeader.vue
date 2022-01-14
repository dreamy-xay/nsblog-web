<!--
 * @Description: 用户中心头部
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-09-07 18:05:59
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2022-01-14 15:33:32
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
          :role="isLogin ? 'button' : null"
        >
          <template v-if="isSelf">
            {{data.nickname}}
            <a
              href="/userCenter/profile"
              target="/userCenter/profile"
            ><i class="iconfont blog-edit"></i></a>
          </template>
          <template v-else-if="isLogin">
            <n-popover
              trigger="hover"
              display-directive="show"
              placement="right"
              :raw="true"
            >
              <template #trigger>
                {{data.nickname}}
              </template>
              <div
                class="user-header-left-send"
                role="button"
                @click="sendMessage"
              >
                发消息
              </div>
            </n-popover>
          </template>
          <template v-else>
            {{data.nickname}}
          </template>
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
import { defineComponent, computed } from 'vue';
import BaseAvatar from '@/components/content/baseAvatar/BaseAvatar.vue';
import { getSplitNum } from '@/util/util';
import { mapState, mapGetters } from '@/util/store';
import router from '@/router';

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
  setup(props) {
    const { tokenInfo } = mapState('global', ['tokenInfo']); // 获取登录信息
    // 判断是否登录并且访问页面是否为自己的主页
    const isSelf = computed(() => {
      return tokenInfo.value.status && tokenInfo.value.username === props.data.username;
    });

    /**
     * @description: 发消息
     * @return {void}
     * @author: dreamy-xay
     */
    function sendMessage() {
      router.push({
        name: 'messageMy',
        params: {
          dialogue: JSON.stringify({
            username: props.data.username,
            nickname: props.data.nickname,
            avatar: props.data.avatar,
          }),
        },
      });
    }

    return {
      getSplitNum,
      isSelf,
      sendMessage,
      ...mapGetters('global', ['isLogin']),
    };
  },
});
</script>

<style lang="scss" scoped>
.user-header-left-send {
  width: 76px;
  height: 30px;
  background-color: $grey-0;
  overflow: hidden;
  @include flex(center, center);
  color: $grey-9;
  transition: 0.25s;
  font-size: 15px;

  &:hover {
    color: $green-1;
  }
}

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
