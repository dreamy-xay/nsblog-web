<!--
 * @Description:
 * @Version:
 * @Autor: Z_Y_C
 * @Date: 2021-09-29 17:08:41
 * @LastEditors: Z_Y_C
 * @LastEditTime: 2021-09-29 21:00:39
-->

<template>
  <div class="blog-main-article-item">
    <div
      class="blog-main-article-item-context"
      v-for="(item, index) in data"
      :key="index"
      :class="index % 2 ? '' : 'reverse'"
    >
      <div class="image">
        <base-image
          class="image-inner"
          src="https://s3.bmp.ovh/imgs/2021/09/fd25f71e808f3f23.jpg"
          :loading="2"
        />
      </div>
      <div class="context">
        <div>123</div>
        <div>阅读全文</div>
      </div>

    </div>
  </div>
</template>
<script>
import { defineComponent } from 'vue';
import BaseImage from '@/components/content/baseImage/BaseImage.vue';

/**
 * @description:
 * @param {Array} data 展示文章数据 `必传参数`
 * @author: Z_Y_C
 */

export default defineComponent({
  name: 'blogMainArticleItem',
  components: { BaseImage },
  props: {
    data: {
      type: Array,
      required: true,
    },
  },
});
</script>

<style lang="scss" scoped>
.blog-main-article-item {
  width: 100%;
  margin-top: 20px;

  .blog-main-article-item-context {
    @include flex(center);
    width: 100%;
    height: 300px;
    background-color: $grey-0;
    border-radius: $border-radius-0;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.16);
    margin-bottom: 40px;
    transition: 0.25s;
    overflow: hidden;

    &:hover .image .image-inner {
      transform: scale(1.2);
    }

    .image {
      width: 50%;
      height: 100%;
      overflow: hidden;
      transition: 0.25s;
      background-color: rgba($green-0, 0.5);

      .image-inner {
        transition: 0.25s;
      }
    }

    .context {
      width: calc(50% - 32px);
      height: calc(100% - 46px);
      padding: 16px 16px 30px 16px;
      @include flex(initial, space-between, column);
    }

    &:hover {
      box-shadow: 0 0 20px rgba(0, 0, 0, 0.48);
    }
  }

  .reverse {
    @include flex(center, initial, row-reverse);
  }
}
</style>
