<!--
 * @Description: 征集令页面右侧
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2022-02-15 12:39:50
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2022-02-15 17:03:15
-->
<template>
  <div class="solicitation-right">
    <div class="solicitation-right-top">
      <base-avatar
        :src="data.avatar"
        :href="`/user/${data.username}`"
        :target="`/user/${data.username}`"
        :size="64"
        :alt="data.username"
      />
      <a v-prefix
        class="nickname"
        :href="`/user/${data.username}`"
        :target="`/user/${data.username}`"
      >
        {{ data.nickname }}
      </a>
    </div>
    <div class="solicitation-right-mid">
      <div class="fans">
        <div class="count">
          {{ data.fans_count }}
        </div>
        粉丝
      </div>
      <div
        class="message"
        role="button"
        @click="sendMessage"
      >
        <div class="icon">
          <i class="iconfont blog-c-comment"></i>
        </div>
        私信
      </div>
    </div>
    <div
      class="solicitation-right-bottom"
      role="button"
      @click="attentionClick"
    >
      {{ data.attention ? '取消关注' : '关注作者' }}
    </div>
    <base-modal
      :show="modalShow"
      content="取消后可就伤感情了哦~"
      @confirm="modalChanage(true)"
      @cancel="modalChanage(false)"
    />
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import BaseAvatar from '@/components/content/baseAvatar/BaseAvatar.vue';
import BaseModal from '@/components/content/baseModal/BaseModal.vue';
import { addAttentions, deleteAttentions } from '@/network/api/attentions';
import { mapGetters } from '@/utils/store';
import { useMessage } from 'naive-ui';
import router from '@/router';

/**
 * @description: 征集令页面右侧
 * @param {Object} data 征集令数据 `必传参数`
 * @event changeAttention 修改关注状态 (attention: 0 | 1) => void
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'solicitationRight',
  components: {
    BaseAvatar,
    BaseModal,
  },
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  setup(props, context) {
    const msg = useMessage(); // naive-ui message
    const modalShow = ref(false); // 取消关注模态框是否显示

    const { isLogin } = mapGetters('global', ['isLogin']);
    /**
     * @description: 点击关注
     * @return {void}
     * @author: dreamy-xay
     */
    function attentionClick() {
      if (!isLogin.value) {
        msg.error('请先登录');
        return;
      }
      if (props.data.attention) modalShow.value = true;
      else
        addAttentions(props.data.username) // 添加关注
          .then(() => {
            msg.success('关注成功*^____^*');
            context.emit('changeAttention', 1);
          })
          .catch((error) => {
            console.log(error);
            msg.error('关注失败＞﹏＜');
          });
    }

    /**
     * @description: 确认取消关注
     * @param {boolean} isConfirm 是否确认 `必传参数`
     * @return {void}
     * @author: dreamy-xay
     */
    function modalChanage(isConfirm) {
      if (isConfirm)
        deleteAttentions(props.data.username) // 取消关注
          .then(() => {
            msg.success('取消关注成功*^____^*');
            context.emit('changeAttention', 0);
          })
          .catch((error) => {
            console.log(error);
            msg.error('取消关注失败＞﹏＜');
          });
      modalShow.value = false;
    }

    /**
     * @description: 私信
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
      modalShow,
      attentionClick,
      modalChanage,
      sendMessage,
    };
  },
});
</script>

<style lang="scss" scoped>
.solicitation-right {
  width: 252px;
  height: 158px;
  padding: 16px;
  @include flex(center, center, column);
  box-shadow: $shadow-0;
  background-color: $grey-0;
  border-radius: $border-radius-0;

  & > div {
    width: 100%;
  }

  .solicitation-right-top {
    height: 64px;
    @include flex(center, space-between);

    .nickname {
      display: block;
      width: 172px;
      height: 64px;
      line-height: 64px;
      font-size: 20px;
      color: $grey-10;
      @include ellipsis(1);
      transition: 0.25s;

      &:hover {
        color: $grey-7;
      }
    }
  }

  .solicitation-right-mid {
    height: 24px;
    margin: 16px 0;
    @include flex(center);

    .fans {
      font-size: 16px;
      height: 100%;
      @include flex(center);
      color: $grey-8;

      .count {
        font-weight: 700;
        color: $grey-10;
        margin-right: 6px;
      }
    }

    .message {
      margin-left: 16px;
      height: 100%;
      @include flex(center);
      color: $grey-8;
      font-size: 16px;
      transition: 0.25s;

      .icon {
        height: 100%;
        width: 14px;
        margin-right: 6px;
        @include flex(center, center);
      }

      &:hover {
        color: $green-1;
      }
    }
  }

  .solicitation-right-bottom {
    height: 38px;
    @include flex(center, center);
    background-color: $green-0;
    transition: 0.25s;
    color: $grey-0;
    border-radius: $border-radius-0;
    font-size: 16px;

    &:hover {
      background-color: $green-1;
    }
  }
}
</style>
