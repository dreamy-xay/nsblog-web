<!--
 * @Description: 用户中心文章信息
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-09-09 10:57:00
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-09-09 16:53:41
-->
<template>
  <div class="user-main-article">
    <v-chart
      class="chart"
      :option="option"
    />
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'userMainArticle',
  setup() {
    const option = ref({
      title: {
        text: 'Traffic Sources',
        left: 'center',
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)',
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        data: ['Direct', 'Email', 'Ad Networks', 'Video Ads', 'Search Engines'],
      },
      series: [
        {
          name: 'Traffic Sources',
          type: 'pie',
          radius: '55%',
          center: ['50%', '60%'],
          data: [
            { value: 335, name: 'Direct' },
            { value: 310, name: 'Email' },
            { value: 234, name: 'Ad Networks' },
            { value: 135, name: 'Video Ads' },
            { value: 1548, name: 'Search Engines' },
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
        },
      ],
    });

    return { option };
  },
});
</script>

<style lang="scss" scoped>
.user-main-article {
  height: 100%;
  width: 286px;
  box-shadow: $shadow-0;
  border-radius: $border-radius-0;
  background-color: $grey-0;
}
</style>
