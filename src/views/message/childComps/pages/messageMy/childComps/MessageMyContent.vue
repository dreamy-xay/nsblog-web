<!--
 * @Description: 我的消息内容
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-08-18 17:21:32
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-08-19 13:00:11
-->
<template>
  <div class="message-my-content">
    <div class="message-my-content-head">
      {{name}}
    </div>
    <div class="message-my-content-body">
      <base-svg
        svg="message-empty"
        :color="styles.green1"
        v-if="data.length === 0"
      />
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import BaseSvg from '@/components/content/baseSvg/BaseSvg.vue';
import styles from '@/assets/style/define.scss';

/**
 * @description: 我的消息内容
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'messageMyContent',
  components: {
    BaseSvg,
  },
  props: {
    name: {
      type: String,
      required: true,
    },
    data: {
      type: Array,
      required: true,
    },
  },
  setup(props, context) {
    return {
      styles,
    };
  },
});
</script>

<style lang="scss" scoped>
.message-my-content {
  width: 706px;
  height: 100%;
  overflow: hidden;
  border-left: 1px solid $grey-5;
  box-sizing: border-box;

  .message-my-content-head {
    width: 100%;
    height: 36px;
    @include flex(center, center);
    font-size: 14px;
    font-weight: 600;
    color: $grey-10;
    border-bottom: 1px solid $grey-5;
  }

  .message-my-content-body {
    width: 100%;
    height: calc(100% - 37px);
    background-color: $grey-1;
    @include flex(center, center);
  }
}
</style>
