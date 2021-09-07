<!--
 * @Description: 用户详细信息页面
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-09-07 16:04:40
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-09-07 16:26:45
-->
<template>
  <base-view
    :top-bar="true"
    :background="true"
    bind-class="user"
  >
  </base-view>
</template>

<script>
import { defineComponent } from 'vue';
import BaseView from '@/components/content/baseView/BaseView.vue';

/**
 * @description: 用户详细信息页面
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'user',
  components: {
    BaseView,
  },
});
</script>

<style lang="scss" scoped>
.user {
  width: 100%;
}
</style>
