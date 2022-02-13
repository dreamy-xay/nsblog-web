<!--
 * @Description: 关注按钮
 * @Version:
 * @Autor: continue-hs
 * @Date: 2022-01-27 10:52:36
 * @LastEditors: Z_Y_C
 * @LastEditTime: 2022-02-13 16:37:51
-->
<template>
  <div class="tag-button">
    <div
      class="tag-button-true"
      v-if="attention"
      role="button"
      @click="clickAttention"
    >
      <div class="true-text">已关注</div>
    </div>
    <div
      class="tag-button-false"
      v-else
      role="button"
      @click="clickAttention"
    >
      <i class="iconfont blog-daochu1024-29" />
      <div class="false-text">关注</div>
    </div>
  </div>

  <!-- 确认取消关注 -->
  <base-modal
    :show="modalShow"
    content="取消后可就没有了哦~"
    @confirm="sureCancelAttention"
    @cancel="modalShow=!modalShow"
  />

</template>

<script>
import { defineComponent, ref } from 'vue';
import BaseModal from '@/components/content/baseModal/BaseModal.vue';

/**
 * @description: 关注按钮
 * @param {number} attention 是否关注 `默认为 0`
 * @event clickAttention 点击关注按钮触发事件
 * @author: Z_Y_C
 */

export default defineComponent({
  name: 'tagButton',
  components: {
    BaseModal,
  },
  emits: ['clickAttention'],
  props: {
    attention: {
      type: Number,
      default: 0,
    },
  },
  setup(props, context) {
    const modalShow = ref(false); // 取消关注显示

    /**
     * @description: 点击关注
     * @return {void}
     * @author: Z_Y_C
     */
    function clickAttention() {
      if (!props.attention) context.emit('clickAttention');
      else modalShow.value = true;
    }

    /**
     * @description: 确定取消关注
     * @return {void}
     * @author: Z_Y_C
     */
    function sureCancelAttention() {
      context.emit('clickAttention');
      modalShow.value = false;
    }

    return { clickAttention, modalShow, sureCancelAttention };
  },
});
</script>

<style lang="scss" scoped>
.tag-button {
  width: 64px;
  height: 24px;

  .tag-button-true {
    width: 64px;
    height: 24px;
    border: 1px solid $green-0;
    box-shadow: $shadow-0;
    border-radius: 4px;
    background: $green-0;
    @include flex(center, center);
    transition: 0.25s;

    &:hover {
      border: 1px solid $green-1;
      background: $green-1;
    }

    .true-text {
      @include flex(center, center);
      width: 42px;
      height: 19px;
      font-size: 14px;
      font-weight: 400;
      color: $grey-0;
    }
  }
  .tag-button-false {
    width: 64px;
    height: 24px;
    background: $grey-0;
    border: 1px solid $green-0;
    border-radius: 4px;
    box-shadow: $shadow-0;
    @include flex(center, center);
    transition: 0.25s;

    &:hover {
      border: 1px solid $green-1;
      color: $green-1;
    }

    i {
      margin-right: 4px;
      font-size: 14px;
      color: $green-0;
    }

    .false-text {
      @include flex(center, center);
      width: 28px;
      height: 19px;
      font-size: 14px;
      font-weight: 400;
      color: $green-0;
    }
  }
}
</style>
