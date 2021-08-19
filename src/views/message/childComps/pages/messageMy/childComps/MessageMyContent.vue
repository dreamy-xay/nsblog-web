<!--
 * @Description: 我的消息内容
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-08-18 17:21:32
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-08-19 19:48:19
-->
<template>
  <div class="message-my-content">
    <div
      class="message-my-content-head"
      v-if="name"
    >
      {{name}}
    </div>
    <div
      class="message-my-content-body"
      v-if="name"
    >
      <div class="record">
        <dialogue-record :data="data" />
      </div>
      <div class="edit">
        <dialogue-edit />
      </div>
    </div>
    <div
      class="message-my-content-no-message"
      v-else
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
import { computed, defineComponent } from 'vue';
import DialogueEdit from '@/views/message/childComps/pages/messageMy/childComps/DialogueEdit.vue';
import DialogueRecord from '@/views/message/childComps/pages/messageMy/childComps/DialogueRecord.vue';
import BaseSvg from '@/components/content/baseSvg/BaseSvg.vue';
import styles from '@/assets/style/define.scss';

/**
 * @description: 我的消息内容
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'messageMyContent',
  components: {
    DialogueEdit,
    DialogueRecord,
    BaseSvg,
  },
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  setup(props, context) {
    // 好友昵称计算
    const name = computed(() => {
      return props.data.friendNickname;
    });

    return {
      styles,
      name,
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

    .edit {
      width: 100%;
      height: 192px;
      border-top: 1px solid $grey-4;
      overflow: hidden;
    }

    .record {
      width: 100%;
      height: calc(100% - 193px);
      overflow: hidden;
    }
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
