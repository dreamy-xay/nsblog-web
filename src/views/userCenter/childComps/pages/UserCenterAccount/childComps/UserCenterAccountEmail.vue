<!--
 * @Description: 帐号安全-绑定邮箱
 * @Version:
 * @Autor: Ban
 * @Date: 2021-09-14 19:08:58
 * @LastEditors: Ban
 * @LastEditTime: 2021-09-25 16:44:42
-->
<template>
  <div class="user-center-account-email">
    <div
      @click="init"
      class="user-center-account-change-title"
    >
      {{title}}
    </div>
    <n-modal
      :title="title"
      :show="showModal"
      class="user-center-account-email-modal"
      preset="card"
      style="width : 400px"
      :closable="true"
      @close="showModal = false"
    >
      <div class="user-center-account-email-inner">
        <div>邮箱
          <user-center-input
            placeholder="邮箱"
            :clearable="true"
          >
          </user-center-input>
        </div>
        <div>验证码
          <div class="verification">
            <user-center-input
              placeholder="验证码"
              style="width: 200px; margin: 0px;"
              :maxlength="6"
            >
            </user-center-input>
            <div
              class="verification-code"
              role="button"
            >
              发送验证码
            </div>
          </div>

        </div>

      </div>
      <template #footer>
        <div class="user-center-account-email-footer">
          <div
            role="button"
            @click="submit"
          >确定</div>
          <div
            role="button"
            @click="closeModal"
          >取消</div>
        </div>
      </template>
    </n-modal>

  </div>
</template>

<script>
import { defineComponent, ref, reactive } from 'vue';
import UserCenterInput from '@/views/userCenter/childComps/UserCenterInput.vue';
/**
 * @description: 帐号安全-绑定邮箱
 * @param {String} title 标题内容 `必传参数`
 * @author: Ban
 */
export default defineComponent({
  name: 'UserCenterAccountEmail',
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  components: {
    UserCenterInput,
  },
  setup() {
    const showModal = ref(false); // 是否显示模态框

    /**
     * @description: 初始化（清空数据）
     * @author: Ban
     */
    function init() {
      showModal.value = true;
    }

    return {
      showModal,
      init,
    };
  },
});
</script>

<style lang='scss' scoped>
.user-center-account-email-modal {
  .user-center-account-email-inner {
    @include flex(initial, center, column);
    div {
      padding: 5px 0;
    }
    .verification {
      @include flex();
      .verification-code {
        @include flex(center, center);
        margin-top: 3px;
        margin-left: 20px;
        height: 24px;
        width: 80px;
        border: 1px solid $green-0;
        border-radius: $border-radius-0;
        color: $grey-0;
        background: $green-0;
        transition: 0.25s;

        &:hover {
          background: $green-1;
        }
      }
    }
  }

  .user-center-account-email-footer {
    height: 30px;
    width: 100%;
    @include flex(center, flex-end);

    div {
      height: 100%;
      @include flex(center);
      padding: 0 15px;
      background-color: $green-0;
      transition: 0.25s;
      box-shadow: $shadow-0;
      color: $grey-0;
      border-radius: $border-radius-0;
      letter-spacing: 1px;

      &:hover {
        background-color: $green-1;
      }

      &:first-child {
        margin-right: 10px;
      }
    }
  }
}
</style>
