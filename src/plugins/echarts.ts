/*
 * @Description: 图表插件使用
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-09-09 16:46:05
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-09-09 17:10:09
 */
import { App } from 'vue';
import ECharts from 'vue-echarts';
import { use } from 'echarts/core';

// import ECharts modules manually to reduce bundle size
import { CanvasRenderer } from 'echarts/renderers';
import { BarChart, PieChart } from 'echarts/charts';
import { GridComponent, TitleComponent, TooltipComponent, LegendComponent } from 'echarts/components';

const echartsPlugins = [
  CanvasRenderer,
  BarChart,
  PieChart,
  GridComponent,
  TitleComponent,
  TooltipComponent,
  LegendComponent
];

export default (app: App) => {
  use(echartsPlugins);

  // register globally (or you can do it locally)
  app.component('v-chart', ECharts);
};
