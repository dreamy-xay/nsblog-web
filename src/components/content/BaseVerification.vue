<!--
 * @Description: 基本滑动验证框
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-06-12 13:08:14
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-06-12 20:17:32
-->
<template>
  <div
    class="base-verification"
    :style="{top: baseVerificationTop, left: baseVerificationLeft}"
    :class="{'base-verification-show': isVerificationShow}"
  >
    <puzzle-verification
      v-model="isVerificationShow"
      :block-type="blockType"
      :block-size="blockSize"
      :block-radius="blockRadius"
      :puzzle-img-list="imageList"
      :width="width"
      :height="height"
      :deviation="deviation"
      :wraper-padding="wraperPadding"
      :on-success="onSuccess"
      :on-error="onError"
    />
  </div>
</template>

<script lang="ts">
import PuzzleVerification from 'vue-puzzle-verification';

/**
 * @description: 基本滑动验证框
 * @param {String} blockType 滑块的形状，可选参数('square', 'puzzle') `默认为puzzle`
 * @param {Number} blockSize 滑块的大小（正方形），不能大于画布尺寸 `默认为40`
 * @param {Number} blockRadius 滑块圆角的大小，仅当其形状是square有效 `默认为4`
 * @param {Array} imageList 传入的图片 `默认为两张动图`
 * @param {Number} width 画布图片的宽度 `默认为260`
 * @param {Number} height 画布图片的高度 `默认为120`
 * @param {Number} offsetX 画布水平偏移量 `默认为0`
 * @param {Number} offsetY 画布垂直偏移量 `默认为0`
 * @param {Number} deviation 滑块吻合的误差 `默认为8`
 * @param {Number} wraperPadding 滑块随机出现的范围，数字越大，范围越大(不能大于画布尺寸) `默认为20`
 * @event success 拼接成功时的触发事件
 * @event error 拼接失败时的触发事件
 * @method open 打开验证码框
 * @method close 关闭验证码框
 * @author: dreamy-xay
 */

export default {
  name: 'baseVerification',
  props: {
    blockType: {
      type: String,
      default: 'puzzle',
    },
    blockSize: {
      type: Number,
      default: 40,
    },
    blockRadius: {
      type: Number,
      default: 4,
    },
    imageList: {
      type: Array,
      default: () => ['https://files-cdn.cnblogs.com/files/dreamy-xay/200R0103J1-1.bmp'],
    },
    width: {
      type: Number,
      default: 320,
    },
    height: {
      type: Number,
      default: 180,
    },
    offsetX: {
      type: Number,
      default: 0,
    },
    offsetY: {
      type: Number,
      default: 0,
    },
    deviation: {
      type: Number,
      default: 8,
    },
    wraperPadding: {
      type: Number,
      default: 20,
    },
  },
  data() {
    return {
      isVerificationShow: false,
    };
  },
  methods: {
    open() {
      (this as any).isVerificationShow = true;
    },
    close() {
      (this as any).isVerificationShow = false;
    },
    onSuccess() {
      (this as any).$emit('success');
    },
    onError() {
      (this as any).$emit('error');
    },
  },
  computed: {
    baseVerificationTop() {
      return 'calc(50% - ' + ((this as any).height + 100 - (this as any).offsetY) / 2 + 'px)';
    },
    baseVerificationLeft() {
      return 'calc(50% - ' + ((this as any).width + 32 - (this as any).offsetX) / 2 + 'px)';
    },
  },
  components: {
    PuzzleVerification,
  },
};
</script>

<style lang="scss" scoped>
.base-verification {
  position: fixed;
  overflow: hidden;
  user-select: none;
  transform: scale(0.3);
  opacity: 0;
  transition: all 0.4s;

  &.base-verification-show {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
