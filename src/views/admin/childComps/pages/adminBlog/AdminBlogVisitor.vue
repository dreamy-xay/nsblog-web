<!--
 * @Description: 访客信息
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2022-04-06 14:57:24
 * @LastEditors: Z_Y_C
 * @LastEditTime: 2022-07-01 21:06:13
-->
<template>
  <div class="admin-blog-visitor">
    <img
      src="/admin/pages/adminBlogVisitor.png"
      alt=""
    >
  </div>
</template>

<script>
import { defineComponent } from 'vue';

/**
 * @description: 访客信息
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'adminBlogVisitor',
});
</script>

<style lang="scss" scoped>
.admin-blog-visitor {
  width: 100%;
  user-select: none;
  -webkit-user-drag: none;

  img {
    width: 100%;
  }
}
</style>
