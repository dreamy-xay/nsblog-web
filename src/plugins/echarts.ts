/*
 * @Description: 图表插件使用
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-09-09 16:46:05
 * @LastEditors: clq
 * @LastEditTime: 2022-01-13 14:35:47
 */
import { App } from 'vue';
import ECharts from 'vue-echarts';
import { use } from 'echarts/core';

// import ECharts modules manually to reduce bundle size
import { CanvasRenderer } from 'echarts/renderers';
import { BarChart, PieChart, LineChart, RadarChart } from 'echarts/charts';
import { GridComponent, TitleComponent, TooltipComponent, LegendComponent } from 'echarts/components';

// 表格组件
const charts = [BarChart, PieChart, LineChart, RadarChart];

// 插件
const plugins = [CanvasRenderer, GridComponent, TitleComponent, TooltipComponent, LegendComponent];

export default (app: App) => {
  // 使用echarts
  use([...charts, ...plugins]);

  // register globally (or you can do it locally)
  app.component('v-chart', ECharts);
};
