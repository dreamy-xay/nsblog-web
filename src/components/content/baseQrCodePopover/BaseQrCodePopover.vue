<!--
 * @Description: 基础二维码弹窗
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2022-01-27 12:33:19
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2022-01-27 14:03:54
-->

<template>
  <n-popover
    :placement="placement"
    trigger="hover"
    display-directive="show"
    :disabled="disabled"
    :delay="delay"
    raw
    class="base-qr-code-popover"
  >
    <template #trigger>
      <slot></slot>
    </template>
    <div class="base-qr-code-popover-container">
      <div class="title">
        {{ title }}
      </div>
      <div class="code">
        <qrcode-vue
          class="code-inner"
          :value="value"
          :size="124"
          :foreground="styles.green1"
        />
      </div>
    </div>
  </n-popover>
</template>

<script>
import { defineComponent } from 'vue';
import QrcodeVue from 'qrcode.vue';
import styles from '@/assets/style/define.scss';

/**
 * @description: 基础二维码弹窗
 * @param {String} title 弹出框标题 `必传参数`
 * @param {String} value 二维码的值 `必传参数`
 * @param {String} placement 弹出位置，'top-start' | 'top' | 'top-end' | 'right-start' | 'right' | 'right-end' | 'bottom-start' | 'bottom' | 'bottom-end' | 'left-start' | 'left' | 'left-end' | `默认是 'top'`
 * @param {Boolean} disabled 是否不能激活弹出信息 `默认是 false`
 * @param {Number} delay 悬浮触发弹出信息的延迟 `默认是100`
 * @slot 默认插槽 hover 的目标
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'baseQrCodePopover',
  components: {
    QrcodeVue,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
    placement: {
      type: String,
      default: 'top',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    delay: {
      type: Number,
      default: 100,
    },
  },
  setup() {
    return {
      styles,
    };
  },
});
</script>

<style lang="scss" scoped>
.base-qr-code-popover-container {
  width: 128px;
  height: 156px;
  padding: 12px;
  @include flex(center, center, column);

  .title {
    width: 124px;
    height: 20px;
    margin-bottom: 8px;
    @include flex(center, center);
    font-size: 15px;
    color: $green-1;
  }

  .code {
    height: 128px;
    width: 128px;
    @include flex(center, center);
  }
}
</style>

<style lang="scss">
.base-qr-code-popover {
  background-color: $grey-0;
  border-radius: $border-radius-0;
}
</style>
