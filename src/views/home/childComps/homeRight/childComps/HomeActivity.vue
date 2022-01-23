<!--
 * @Description:活动栏
 * @Version:
 * @Autor: Z_Y_C
 * @Date: 2022-01-15 14:15:21
 * @LastEditors: Z_Y_C
 * @LastEditTime: 2022-01-23 15:51:11
-->
<template>
  <div class="home-activity">
    <div
      class="home-activity-image"
      v-for="(item , index) in activityData"
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
 * @param {Array} activityData 显示活动图片image以及跳转连接href `默认[]`
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
    return {};
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
