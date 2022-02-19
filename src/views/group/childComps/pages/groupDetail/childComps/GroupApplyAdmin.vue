<!--
 * @Description: 学习小组申请管理员
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2022-02-15 19:24:21
 * @LastEditors: Ban
 * @LastEditTime: 2022-02-19 14:28:08
-->
<template>
  <n-modal
    display-directive="show"
    :show="modelValue"
  >
    <div class="group-apply-admin">
      <div class="group-apply-admin-head">
        <div class="title">
          申请管理员
        </div>
        <div
          class="close"
          role="button"
          @click="closeModal"
        >
          <i class="iconfont blog-cha"></i>
        </div>
      </div>
      <div class="group-apply-admin-body">
        <el-input
          class="input-remark"
          v-model.trim="content"
          type="textarea"
          maxlength="256"
          placeholder="请输入申请理由"
          :show-word-limit="true"
          :clearable="true"
          :rows="9"
        />
      </div>
      <div class="group-apply-admin-footer">
        <div
          class="submit"
          role="button"
          @click="submit"
        >
          立即申请
        </div>
      </div>
    </div>
  </n-modal>
</template>

<script>
import { useMessage } from 'naive-ui';
import { defineComponent, ref } from 'vue';
import { useRoute } from 'vue-router';

/**
 * @description: 学习小组申请管理员
 * @param {Boolean} modelValue model是否显示，支持v-model `默认为false`
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'groupApplyAdmin',
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
  },
  setup(_, context) {
    const msg = useMessage(); // naive-ui message
    const route = useRoute(); // route
    const groupName = route.params.groupName; // 学习小组名
    const content = ref(''); // 申请理由

    /**
     * @description: 关闭模态框
     * @return {void}
     * @author: dreamy-xay
     */
    function closeModal() {
      context.emit('update:modelValue', false);
    }

    /**
     * @description: 申请成为管理员
     * @return {void}
     * @author: dreamy-xay
     */
    function submit() {
      let success = true; // 是否验证成功
      if (!content.value) {
        success = false;
        msg.error('请输入申请理由－O－');
      }
      if (success) {
        // apply for
        console.log('申请管理员: ', groupName, content.value);

        msg.info('申请管理员成功，请等待审核！');
        content.value = '';
        closeModal();
      }
    }

    return {
      content,
      closeModal,
      submit,
    };
  },
});
</script>

<style lang="scss" scoped>
.group-apply-admin {
  width: 500px;
  height: 353px;
  background-color: $grey-0;
  border-radius: $border-radius-0;
  box-shadow: $shadow-0;

  & > div {
    width: 100%;
  }

  .group-apply-admin-head {
    @include flex(center, center);
    box-sizing: border-box;
    height: 54px;
    border-bottom: 1px solid $grey-2;
    position: relative;

    .title {
      font-size: 16px;
      font-weight: 700;
      color: $grey-11;
      line-height: 22px;
    }

    .close {
      width: 28px;
      height: 28px;
      border-radius: $border-radius-1;
      color: $grey-7;
      @include flex(center, center);
      transition: all 0.25s;
      position: absolute;
      top: 13px;
      right: 16px;

      .iconfont {
        font-size: 16px;
      }

      &:hover {
        color: $green-0;
        background-color: $grey-2;
      }
    }
  }

  .group-apply-admin-body {
    padding: 16px;
    width: calc(100% - 32px);
    @include flex(inherit, inherit, column);

    :deep(.el-textarea__inner) {
      resize: none;
      padding: 6px 8px;
      transition: 0.25s;

      &:hover,
      &:focus {
        color: $green-1;
        box-shadow: $shadow-2;
        border-color: $grey-0;
      }
    }
  }

  .group-apply-admin-footer {
    box-sizing: border-box;
    height: 64px;
    border-top: 1px solid $grey-2;
    @include flex(center, center);

    .submit {
      @include flex(center, center);
      width: 100px;
      height: 32px;
      background-color: $green-1;
      border-radius: $border-radius-0;
      font-size: 14px;
      font-weight: 400;
      color: $grey-0;
      transition: 0.25s;

      &:hover {
        background-color: $green-2;
      }
    }
  }
}
</style>
