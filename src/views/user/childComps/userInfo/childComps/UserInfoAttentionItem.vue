<!--
 * @Description:关注面板数据条组件
 * @Version:
 * @Autor: clq
 * @Date: 2021-09-09 20:58:06
 * @LastEditors: clq
 * @LastEditTime: 2021-09-14 11:42:46
-->
<template>
  <div class="user-info-attention-item">
    <div class="user-info-attention-item-content">
      <div class="avatar">
        <base-avatar
          :src="avatar"
          shape="square"
          :size="50"
          :href="`/user/${username}`"
          :target="`/user/${username}`"
        />
      </div>
      <div class="info">
        <div class="nickname-font">{{nickname}}</div>
        <div class="username-font">{{username}}</div>
        <div class="signature-font">{{signature}}</div>
      </div>
      <div
        v-if="attention"
        class="btn"
        role="button"
        @click.stop="changeAttention"
      >取消关注</div>
      <div
        v-else
        class="btn"
        role="button"
        @click.stop="changeAttention"
      >关注</div>
    </div>
    <!-- 确认取消关注 -->
    <base-modal
      :show="modalShow"
      content="取消后可就伤感情了哦~"
      @confirm="sureCancelAttention"
      @cancel="modalShow=!modalShow"
    ></base-modal>
  </div>
</template>

<script>
import { defineComponent, nextTick, ref } from 'vue';
import BaseAvatar from '@/components/content/baseAvatar/BaseAvatar.vue';
import BaseModal from '@/components/content/baseModal/BaseModal';

/**
 * @description:
 * @param {String} avatar 头像链接
 * @param {String} nickname 昵称
 * @param {String} username 用户名
 * @param {String} signature 个性签名
 * @param {Boolean} attention 是否关注
 * @author: clq
 */
export default defineComponent({
  name: 'userInfoAttentionItem',
  components: {
    BaseAvatar,
    BaseModal,
  },
  props: {
    avatar: {
      type: String,
      default: null,
    },
    nickname: {
      type: String,
      default: null,
    },
    username: {
      type: String,
      default: null,
    },
    signature: {
      type: String,
      default: null,
    },
    attention: {
      type: Boolean,
      default: false,
    },
    showModal: {
      type: Boolean,
      dafault: false,
    },
  },
  setup(props, context) {
    const modalShow = ref(false);

    /**
     * @description: 改变关注状态
     * @return {void}
     * @author: clq
     */
    function changeAttention() {
      if (props.attention === true) {
        modalShow.value = true;
      } else {
        context.emit('update:attention', !props.attention);
      }
    }

    /**
     * @description: 确定取消关注
     * @return {void}
     * @author: clq
     */
    function sureCancelAttention() {
      modalShow.value = !modalShow.value;
      context.emit('update:attention', !props.attention);
      // deleteAttentions(attentionData[sureCancel.value].content.username)
      //   .then(() => {
      //     attentionData[sureCancel.value].content.attention = false;
      //   })
      //   .catch((error) => {
      //     console.log(error), msg.error('取消关注失败，请重试', { duration: 2000, closable: true });
      //   });
    }

    return {
      modalShow,
      sureCancelAttention,
      changeAttention,
    };
  },
});
</script>

<style lang="scss" scoped>
.user-info-attention-item {
  box-sizing: border-box;
  width: 100%;
  height: 82px;
  margin: 0px;
  padding: 16px 0px 15px;
  border-bottom: 1px solid $grey-2;

  .user-info-attention-item-content {
    width: 100%;
    height: 100%;

    @include flex(center, initial, row);
    .avatar {
      width: 50px;
      height: 50px;
    }

    .info {
      height: 100%;
      padding-left: 10px;
      background-color: $grey-0;
      width: 502px;

      .nickname-font {
        height: 20px;
        line-height: 20px;
        font-size: 14px;
        color: $grey-10;
      }

      .username-font {
        height: 14px;
        line-height: 14px;
        font-size: 12px;
        color: $grey-7;
      }

      .signature-font {
        height: 16px;
        line-height: 16px;
        font-size: 12px;
        color: $grey-7;
        @include ellipsis(1);
      }
    }

    .btn {
      width: 80px;
      margin: 0 16px;
      padding: 6px 0;
      border-radius: 5px;
      background-color: $grey-3;
      font-size: 14px;
      text-align: center;
      color: $grey-9;
      transition: 0.25s;

      &:hover {
        color: $grey-10;
        background-color: $grey-4;
      }
    }
  }
}
</style>
