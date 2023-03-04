<!--
 * @Description: 数据统计
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2022-04-06 11:27:34
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2023-03-04 17:11:53
-->
<template>
  <admin-view class="admin-maintain-statistics-map">
    <v-chart
      class="chart"
      :option="option"
    />
  </admin-view>
</template>

<script>
import { defineComponent, computed } from 'vue';
import AdminView from '@/views/admin/childComps/AdminView.vue';
import chinaMap from '@/util/json/china.json';
import { registerMap } from 'echarts';

/**
 * @description: 数据统计
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'adminMaintainStatisticsMap',
  components: {
    AdminView,
  },
  setup() {
    const mapData = [
      {
        name: '北京',
        value: Math.round(Math.random() * 1000),
        tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)],
      },
      {
        name: '天津',
        value: Math.round(Math.random() * 1000),
        tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)],
      },
      {
        name: '上海',
        value: Math.round(Math.random() * 1000),
        tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)],
      },
      {
        name: '重庆',
        value: Math.round(Math.random() * 1000),
        tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)],
      },
      {
        name: '河北',
        value: Math.round(Math.random() * 1000),
        tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)],
      },
      {
        name: '河南',
        value: Math.round(Math.random() * 1000),
        tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)],
      },
      {
        name: '云南',
        value: Math.round(Math.random() * 1000),
        tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)],
      },
      {
        name: '辽宁',
        value: Math.round(Math.random() * 1000),
        tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)],
      },
      {
        name: '黑龙江',
        value: Math.round(Math.random() * 1000),
        tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)],
      },
      {
        name: '湖南',
        value: Math.round(Math.random() * 1000),
        tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)],
      },
      {
        name: '安徽',
        value: Math.round(Math.random() * 1000),
        tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)],
      },
      {
        name: '山东',
        value: Math.round(Math.random() * 1000),
        tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)],
      },
      {
        name: '新疆',
        value: Math.round(Math.random() * 1000),
        tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)],
      },
      {
        name: '江苏',
        value: Math.round(Math.random() * 1000),
        tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)],
      },
      {
        name: '浙江',
        value: Math.round(Math.random() * 1000),
        tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)],
      },
      {
        name: '江西',
        value: Math.round(Math.random() * 1000),
        tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)],
      },
      {
        name: '湖北',
        value: Math.round(Math.random() * 1000),
        tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)],
      },
      {
        name: '广西',
        value: Math.round(Math.random() * 1000),
        tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)],
      },
      {
        name: '甘肃',
        value: Math.round(Math.random() * 1000),
        tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)],
      },
      {
        name: '山西',
        value: Math.round(Math.random() * 1000),
        tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)],
      },
      {
        name: '内蒙古',
        value: Math.round(Math.random() * 1000),
        tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)],
      },
      {
        name: '陕西',
        value: Math.round(Math.random() * 1000),
        tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)],
      },
      {
        name: '吉林',
        value: Math.round(Math.random() * 1000),
        tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)],
      },
      {
        name: '福建',
        value: Math.round(Math.random() * 1000),
        tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)],
      },
      {
        name: '贵州',
        value: Math.round(Math.random() * 1000),
        tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)],
      },
      {
        name: '广东',
        value: Math.round(Math.random() * 1000),
        tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)],
      },
      {
        name: '青海',
        value: Math.round(Math.random() * 1000),
        tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)],
      },
      {
        name: '西藏',
        value: Math.round(Math.random() * 1000),
        tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)],
      },
      {
        name: '四川',
        value: Math.round(Math.random() * 1000),
        tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)],
      },
      {
        name: '宁夏',
        value: Math.round(Math.random() * 1000),
        tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)],
      },
      {
        name: '海南',
        value: Math.round(Math.random() * 1000),
        tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)],
      },
      {
        name: '台湾',
        value: Math.round(Math.random() * 1000),
        tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)],
      },
      {
        name: '香港',
        value: Math.round(Math.random() * 1000),
        tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)],
      },
      {
        name: '澳门',
        value: Math.round(Math.random() * 1000),
        tipData: [Math.round(Math.random() * 1000), Math.round(Math.random() * 1000)],
      },
    ];

    registerMap('china', chinaMap);
    // 计算图表选项
    const option = computed(() => {
      return {
        visualMap: [
          {
            min: 0,
            max: 1000,
            left: 'left',
            top: 'bottom',
            text: ['高', '低'],
            calculable: false,
            orient: 'horizontal',
            inRange: {
              color: ['#e0ffff', '#006edd'],
              symbolSize: [30, 100],
            },
          },
        ],
        tooltip: {
          trigger: 'item',
          backgroundColor: 'rgba(0, 0, 0, .6)',
          textStyle: {
            color: '#fff',
            fontSize: 12,
          },
        },
        series: [
          {
            name: 'iphone4',
            type: 'map',
            map: 'china',
            label: {
              show: true,
              color: 'rgb(249, 249, 249)',
              fontSize: 10,
            },
            itemStyle: {
              areaColor: '#2f82ce',
              borderColor: '#0DAAC1',
            },
            data: mapData,
          },
        ],
      };
    });

    return {
      option,
    };
  },
});
</script>

<style lang="scss" scoped>
.admin-maintain-statistics-map {
  height: calc(100vh - 142px);
}
</style>
