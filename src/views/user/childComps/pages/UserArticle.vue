<!--
 * @Description: 用户主页发布文章记录
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-09-07 16:24:57
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-09-13 19:50:20
-->
<template>
  <div class="user-article">
    <base-svg
      svg="no-permission"
      :color="styles.green0"
    />
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import BaseSvg from '@/components/content/baseSvg/BaseSvg.vue';
import styles from '@/assets/style/define.scss';

/**
 * @description: 用户主页发布文章记录
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'userArticle',
  components: {
    BaseSvg,
  },
  setup() {
    return {
      styles,
    };
  },
});
</script>

<style lang="scss" scoped>
.user-article {
  width: 100%;
  height: 500px;
  border-radius: $border-radius-0;
  box-shadow: $shadow-0;
  background-color: $grey-0;
  @include flex(center, center);
}
</style>
