<!--
 * @Description: 历史记录页面
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-08-04 13:03:40
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-08-05 18:02:21
-->
<template>
  <base-view
    :background="true"
    :top-bar="true"
    bind-class="history"
  >
    <history-bar class="history-inner-bar" />
    <history-content class="history-inner-content" />
  </base-view>
</template>

<script>
import { defineComponent } from 'vue';
import BaseView from '@/components/content/baseView/BaseView.vue';
import HistoryBar from '@/views/history/childComps/HistoryBar.vue';
import HistoryContent from '@/views/history/childComps/HistoryContent.vue';

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
