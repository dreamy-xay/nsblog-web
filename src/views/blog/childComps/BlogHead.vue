<!--
 * @Description: 博客头部
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-09-30 16:27:56
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-09-30 16:59:19
-->
<template>
  <div class="blog-head">
    <div
      class="blog-head-cover"
      ref="blogHeadCoverRef"
    >
      <base-image
        :loading="2"
        src="https://s3.bmp.ovh/imgs/2021/09/7fc65c1d3e881ea5.jpg"
      />
    </div>
    <div class="blog-head-inner">

    </div>
  </div>
</template>

<script>
import { defineComponent, ref, inject, onMounted } from 'vue';
import BaseImage from '@/components/content/baseImage/BaseImage.vue';
import circleMagic from '@/util/animation/circleMagic';

/**
 * @description:
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'blogHead',
  components: {
    BaseImage,
  },
  setup() {
    const blogHeadCoverRef = ref(null); // 博客首页头部 ref
    const blogPage = inject('blogPage'); // 博客首页绑定滚动 ref

    // dom 渲染完成
    onMounted(() => {
      circleMagic(blogHeadCoverRef.value, { scrollElement: blogPage.value });
    });

    return {
      blogHeadCoverRef,
    };
  },
});
</script>

<style lang="scss" scoped>
.blog-head {
  height: 100vh;
  width: 100%;
  position: relative;

  .blog-head-cover {
    width: 100%;
    height: 100%;
    position: absolute;
    background-color: $grey-10;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
  }
}
</style>
