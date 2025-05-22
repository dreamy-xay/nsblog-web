<!--
 * @Description: 文章管理
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2022-04-06 14:57:24
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2023-04-24 16:28:00
-->
<template>
  <admin-view class="admin-creation-article-manage">
    <img v-prefix
      src="/admin/pages/adminCreationManage.png"
      alt=""
    >
  </admin-view>
</template>

<script>
import { defineComponent } from 'vue';
import AdminView from '@/views/admin/childComps/AdminView.vue';

/**
 * @description: 文章管理
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'adminCreationArticleManage',
  components: {
    AdminView,
  },
});
</script>

<style lang="scss" scoped>
.admin-creation-article-manage {
  user-select: none;
  -webkit-user-drag: none;

  img {
    width: 100%;
  }
}
</style>
