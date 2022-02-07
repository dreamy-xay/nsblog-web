<!--
 * @Description:
 * @Version:
 * @Autor: xiao
 * @Date: 2022-01-23 15:06:34
 * @LastEditors: xiao
 * @LastEditTime: 2022-01-26 15:53:59
-->
<template>
  <n-modal
    display-directive="show"
    :show="isShow"
  >
    <div class="quesition-detail-invitation">
      <div class="quesition-detail-invitation-head">
        <div class="title">邀请回答</div>
        <div
          class="top-icon"
          role="button"
          @click="close"
        ><i class="iconfont blog-close"></i></div>
      </div>
      <hr class="hr">
      <div class="quesition-detail-invitation-body">
        <div
          class="invitation-item"
          v-for="(user,index) in users"
          :key="index"
        >
          <div class="item-left">
            <base-avatar
              :size="40"
              :src="'../public/blog/none.jpg'"
            />

            <div class="name">{{user.username}}</div>
          </div>
          <div
            class="button"
            role="button"
          >邀请回答</div>
          <hr class="item-hr">
        </div>
      </div>
      <hr class="hr">
    </div>
  </n-modal>

</template>

<script>
import { defineComponent, reactive } from 'vue';
import BaseAvatar from '@/components/content/baseAvatar/BaseAvatar';

/**
 * @description:邀请回答
 * @param {Boolean} isShow 是否显示邀请回答界面 `默认为false`
 * @author: xiao
 */

export default defineComponent({
  name: 'quesitionDetailInvitation',
  components: {
    BaseAvatar,
  },
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
  },
  setup(_, context) {
    const users = reactive([
      {
        username: 'aaa',
      },
      {
        username: 'bbb',
      },
      {
        username: 'ccc',
      },
      {
        username: 'ddd',
      },
      {
        username: 'ddd',
      },
      {
        username: 'ddd',
      },
      {
        username: 'ddd',
      },
      {
        username: 'ddd',
      },
      {
        username: 'ddd',
      },
      {
        username: 'ddd',
      },
    ]);

    /**
     * @description: 点击关闭触发函数
     * @author: xiao
     */
    function close() {
      context.emit('update:isShow', false);
    }

    return {
      close,
      users,
    };
  },
});
</script>

<style lang="scss" scoped>
.quesition-detail-invitation {
  width: 600px;
  height: 669px;
  background: $grey-0;
  border-radius: $border-radius-0;
  box-shadow: $shadow-0;

  .hr {
    height: 1px;
    border: none;
    border-top: 1px;
    background: $grey-2;
  }

  .quesition-detail-invitation-head {
    @include flex(center, center, column);
    height: 52px;
    position: relative;

    .title {
      font-size: 16px;
      font-weight: bold;
      color: $grey-10;
    }

    .top-icon {
      color: $grey-7;
      position: absolute;
      right: 24px;
      transition: 0.25s;

      .iconfont {
        font-size: 16px;
      }

      &:hover {
        color: $green-0;
      }
    }
  }

  .quesition-detail-invitation-body {
    .invitation-item {
      @include flex(center, space-between);
      height: 60px;

      .item-left {
        @include flex(center, flex-start);
        margin-left: 24px;

        .name {
          width: 28px;
          height: 19px;
          font-size: 14px;
          font-weight: 700;
          color: $grey-10;
          margin-left: 12px;
        }
      }

      .button {
        @include flex(center, center);
        width: 76px;
        height: 30px;
        margin-right: 24px;
        background: $green-0;
        border-radius: 15px;
        box-shadow: $shadow-0;
        font-size: 14px;
        font-weight: 400;
        color: $grey-0;
        transition: 0.25s;

        &:hover {
          background: $green-1;
          box-shadow: $shadow-1;
          color: $grey-1;
        }
      }

      .item-hr {
        position: absolute;
        height: 1px;
        border: none;
        border-top: 1px;
        background: $grey-2;
        width: 552px;
        margin-top: 60px;
        margin-left: 24px;
      }
    }
  }
}
</style>
