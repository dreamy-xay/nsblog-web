<!--
 * @Description:活动栏
 * @Version:
 * @Autor: Z_Y_C
 * @Date: 2022-01-15 14:15:21
 * @LastEditors: Z_Y_C
 * @LastEditTime: 2022-01-15 21:09:55
-->
<template>
  <div class="home-activity">
    <div
      class="home-activity-image"
      v-for="(item , index) in data"
      :key="index"
      role="button"
    >
      <a
        :href="item.href"
        :target="item.href"
      >
        <base-image :src="item.image" />
      </a>
    </div>

  </div>
</template>
<script>
import { defineComponent } from 'vue';
import BaseImage from '@/components/content/baseImage/BaseImage.vue';

/**
 * @description: 活动栏
 * @param {Array} activityData 显示活动图片以及跳转连接 `默认[]`
 * @author: Z_Y_C
 */

export default defineComponent({
  name: 'homeActivity',
  components: {
    BaseImage,
  },
  props: {
    activityData: {
      type: Array,
      default: () => [],
    },
  },
  setup() {
    const data = [
      { image: 'https://s3.bmp.ovh/imgs/2021/09/7fc65c1d3e881ea5.jpg', href: 'http://localhost:8888/' },
      { image: 'https://s3.bmp.ovh/imgs/2021/09/8bcf34ab186f752c.jpg', href: 'http://localhost:8888/' },
      { image: 'https://s3.bmp.ovh/imgs/2021/09/fd25f71e808f3f23.jpg', href: 'http://localhost:8888/' },
    ];

    return {
      data,
    };
  },
});
</script>

<style lang="scss" scoped>
.home-activity {
  width: 284px;
  border-radius: $border-radius-0;
  background: transparent;

  .home-activity-image {
    width: 100%;
    border-radius: $border-radius-0;
    box-shadow: $shadow-0;
    overflow: hidden;
    margin-bottom: 10px;

    &:last-child {
      margin-bottom: 0px;
    }
  }
}
</style>
