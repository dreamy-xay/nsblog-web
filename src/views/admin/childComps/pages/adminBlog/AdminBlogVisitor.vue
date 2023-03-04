<!--
 * @Description: 访客信息
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2022-04-06 14:57:24
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2023-03-04 16:53:51
-->
<template>
  <admin-view class="admin-blog-visitor">
    <img
      src="/admin/pages/adminBlogVisitor.png"
      alt=""
    >
  </admin-view>
</template>

<script>
import { defineComponent } from 'vue';
import AdminView from '@/views/admin/childComps/AdminView.vue';

/**
 * @description: 访客信息
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'adminBlogVisitor',
  components: {
    AdminView,
  },
});
</script>

<style lang="scss" scoped>
.admin-blog-visitor {
  user-select: none;
  -webkit-user-drag: none;

  img {
    width: 100%;
  }
}
</style>
