<!--
 * @Description: 历史记录页面
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-08-04 13:03:40
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-08-07 12:51:49
-->
<template>
  <base-view
    :background="true"
    :top-bar="true"
    bind-class="history"
    @scrollToBottom="scrollToBottom"
    :scroll-disabled="scrollDisabled"
  >
    <history-bar class="history-inner-bar" />
    <history-content
      class="history-inner-content"
      :event-id="eventId"
      @toBottom="historyToBottom"
    />
  </base-view>
</template>

<script>
import { defineComponent, ref } from 'vue';
import BaseView from '@/components/content/baseView/BaseView.vue';
import HistoryBar from '@/views/history/childComps/HistoryBar.vue';
import HistoryContent from '@/views/history/childComps/HistoryContent.vue';
import events from '@/events';

/**
 * @description: history页面
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'history',
  components: {
    BaseView,
    HistoryBar,
    HistoryContent,
  },
  setup() {
    const eventId = 'histroyPageToBottom' + parseInt(Math.random() * 1000); // 全局事件id
    const scrollDisabled = ref(false); // 是否禁用滚动触底事件

    /**
     * @description: 触发滚动到底部事件
     * @return {void}
     * @author: dreamy-xay
     */
    function scrollToBottom() {
      events.emit(eventId);
    }

    /**
     * @description: 到了所有历史记录的底部，无需监听历史记录触底事件
     * @return {void}
     * @author: dreamy-xay
     */
    function historyToBottom() {
      events.off(eventId);
      scrollDisabled.value = true;
    }

    return {
      eventId,
      scrollToBottom,
      historyToBottom,
      scrollDisabled,
    };
  },
});
</script>

<style lang="scss" scoped>
.history {
  .history-inner-bar {
    margin-top: 16px;
  }

  .history-inner-content {
    margin-top: 32px;
    margin-bottom: 32px;
  }
}
</style>
