<!--
 * @Description: 历史记录页面
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-08-04 13:03:40
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-08-04 19:10:09
-->
<template>
  <div class="history">
    <base-background />
    <base-top-bar />
    <div class="history-inner">
      <history-bar class="history-inner-bar" />
      <history-content class="history-inner-content" />
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import BaseBackground from '@/components/content/baseBackground/BaseBackground';
import BaseTopBar from '@/components/content/baseTopBar/BaseTopBar';
import HistoryBar from '@/views/history/childComps/HistoryBar';
import HistoryContent from '@/views/history/childComps/HistoryContent';

/**
 * @description: history页面
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'history',
  components: {
    BaseBackground,
    BaseTopBar,
    HistoryBar,
    HistoryContent,
  },
});
</script>

<style lang="scss" scoped>
.history {
  width: 100%;
  height: 100%;
  overflow: auto;

  .history-inner {
    width: 1442px;
    overflow-y: hidden;
    overflow-x: none;
    margin: 0 auto;

    .history-inner-bar {
      margin-top: 16px;
    }

    .history-inner-content {
      margin-top: 16px;
    }
  }

  .animated {
    -webkit-animation-duration: 1s;
    -moz-animation-duration: 1s;
    -o-animation-duration: 1s;
    animation-duration: 1s;
    -webkit-animation-fill-mode: both;
    -moz-animation-fill-mode: both;
    -o-animation-fill-mode: both;
    animation-fill-mode: both;
  }

  .animated {
    -webkit-animation-duration: 2s;
    -moz-animation-duration: 2s;
    -o-animation-duration: 2s;
    animation-duration: 2s;
  }

  @-webkit-keyframes fadeInUp {
    0% {
      opacity: 0;
      -webkit-transform: translateY(20px);
    }
    100% {
      opacity: 1;
      -webkit-transform: translateY(0);
    }
  }

  @-moz-keyframes fadeInUp {
    0% {
      opacity: 0;
      -moz-transform: translateY(20px);
    }
    100% {
      opacity: 1;
      -moz-transform: translateY(0);
    }
  }

  @-o-keyframes fadeInUp {
    0% {
      opacity: 0;
      -o-transform: translateY(20px);
    }
    100% {
      opacity: 1;
      -o-transform: translateY(0);
    }
  }

  @keyframes fadeInUp {
    0% {
      opacity: 0;
      transform: translateY(20px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .fadeInUp {
    -webkit-animation-name: fadeInUp;
    -moz-animation-name: fadeInUp;
    -o-animation-name: fadeInUp;
    animation-name: fadeInUp;
  }
}
</style>
