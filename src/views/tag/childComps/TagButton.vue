<!--
 * @Description:
 * @Version:
 * @Autor: continue-hs
 * @Date: 2022-01-27 10:52:36
 * @LastEditors: continue-hs
 * @LastEditTime: 2022-01-27 20:58:25
-->
<template>
  <div class="tag-button">
    <div
      class="tag-button-true"
      v-if="detail.attention"
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
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'tagButton',
  props: {
    detail: {
      type: Object,
      default: null,
    },
  },
  setup(_, context) {
    function clickAttention() {
      context.emit('click-attention');
    }
    return { clickAttention };
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

    &:hover {
      transition: 0.25s;
      border: 1px solid $green-1;
      background: $green-1;
    }

    .true-text {
      width: 42px;
      height: 19px;
      font-size: 14px;
      font-weight: 400;
      text-align: left;
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
    @include flex(center);

    &:hover {
      transition: 0.25s;
      border: 1px solid $green-1;
      color: $green-1;
    }

    i {
      margin: 0 4px 0 10px;
      font-size: 14px;
      color: $green-0;
    }

    .false-text {
      width: 28px;
      height: 19px;
      font-size: 14px;
      font-weight: 400;
      text-align: left;
      color: $green-0;
    }
  }
}
</style>
