<!--
 * @Description: article 页面加载条
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-09-20 16:56:09
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-09-26 12:16:15
-->
<template>
  <div
    class="article-loading-bar"
    :style="{width}"
  >
  </div>
</template>

<script>
import { defineComponent, onMounted, ref, inject } from 'vue';

/**
 * @description: article 页面加载条
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'articleLoadingBar',
  setup() {
    const width = ref('0%'); // 加载条宽度
    const articlePage = inject('articlePage'); // 获取主页面 ref (dom)

    // dom渲染完成
    onMounted(() => {
      // 初始化加载条
      width.value =
        (articlePage.value.scrollTop / (articlePage.value.scrollHeight - articlePage.value.offsetHeight)) * 100 + '%';

      // 更新加载条
      articlePage.value.addEventListener('scroll', (e) => {
        width.value = (e.target.scrollTop / (e.target.scrollHeight - e.target.offsetHeight)) * 100 + '%';
      });
    });

    return {
      width,
    };
  },
});
</script>

<style lang="scss" scoped>
.article-loading-bar {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 2000;
  background-color: $green-1;
  height: 2.5px;
  transition: 0.4s ease;
}
</style>
