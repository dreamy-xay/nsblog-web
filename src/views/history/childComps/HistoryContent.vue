<!--
 * @Description: 历史记录主要内容
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-08-04 18:49:08
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-08-05 12:15:51
-->
<template>
  <div class="history-content">

  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'historyContent',
});
</script>

<style lang="scss" scoped>
.history-content {
  width: 100%;
  height: 2000px;
  overflow-y: hidden;

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
