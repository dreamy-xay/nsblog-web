<!--
 * @Description: 历史记录主要内容
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-08-04 18:49:08
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-08-05 19:49:08
-->
<template>
  <div class="history-content">
    <ul class="history-content-line clearfix">
      <li
        class="animated fade-in-up"
        v-for="index of 10"
        :key="index"
      >
        <history-item
          :index="index"
          :data="{}"
        />
      </li>
    </ul>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import HistoryItem from '@/views/history/childComps/HistoryItem.vue';

/**
 * @description: 历史记录主要内容
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'historyContent',
  components: {
    HistoryItem,
  },
});
</script>

<style lang="scss" scoped>
.history-content {
  width: 100%;
  position: relative;
  overflow: hidden;

  .history-content-line {
    list-style: none;
    padding: 50px 0 150px;
    margin: 0 auto;
    width: 100%;
    position: relative;
    overflow: hidden;
    z-index: 0;
    margin-bottom: 15px;

    &::before {
      background: $green-1;
      content: '';
      left: 50%;
      top: 80px;
      bottom: 100px;
      position: absolute;
      width: 2px;
      margin-left: -1px;
      margin-top: -10px;
      height: 999999px;
      z-index: -99;
    }

    & > li {
      display: block;
      width: 50%;
      position: relative;
      padding-top: 60px;
      z-index: -1;

      &:nth-child(odd) {
        float: left;
        clear: left;
        padding-right: 20px;
      }

      &:nth-child(even) {
        float: right;
        clear: right;
        padding-left: 20px;
      }

      &:nth-child(1),
      &:nth-child(2) {
        padding-top: 60px;
      }

      &:nth-child(2n) {
        margin-top: 60px;
      }

      &:nth-child(1) {
        animation-delay: 0.1s;
      }

      &:nth-child(2) {
        animation-delay: 0.2s;
      }

      &:nth-child(3) {
        animation-delay: 0.3s;
      }

      &:nth-child(4) {
        animation-delay: 0.4s;
      }
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

  .fade-in-up {
    -webkit-animation-name: fadeInUp;
    -moz-animation-name: fadeInUp;
    -o-animation-name: fadeInUp;
    animation-name: fadeInUp;
  }
}
</style>
