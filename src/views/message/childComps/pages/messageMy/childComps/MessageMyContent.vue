<!--
 * @Description: 我的消息内容
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-08-18 17:21:32
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-08-19 16:06:19
-->
<template>
  <div class="message-my-content">
    <div
      class="message-my-content-head"
      v-if="data.length"
    >
      {{name}}
    </div>
    <div
      class="message-my-content-body"
      v-if="data.length"
    >
    </div>
    <div
      class="message-my-content-no-message"
      v-if="data.length === 0"
    >
      <base-svg
        svg="no-message"
        :color="styles.green1"
      />
      <div>
        没有新的未读消息呢，快找小伙伴聊天吧
      </div>
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

  .message-my-content-head {
    width: 100%;
    height: 36px;
    @include flex(center, center);
    font-size: 14px;
    font-weight: 600;
    color: $grey-10;
    border-bottom: 1px solid $grey-4;
  }

  .message-my-content-body {
    width: 100%;
    height: calc(100% - 37px);
    background-color: $grey-1;
    @include flex(center, center);
  }

  .message-my-content-no-message {
    width: 100%;
    height: 100%;
    @include flex(center, center, column);
    background-color: $grey-0;

    div {
      color: $green-2;
      opacity: 0.6;
    }
  }
}
</style>
