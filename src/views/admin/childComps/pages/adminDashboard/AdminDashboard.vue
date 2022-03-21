<!--
 * @Description:
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2022-02-26 19:56:18
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2022-03-21 17:24:49
-->
<template>
  <div class="admin-dashboard">
    <PanelGroup @handle-set-line-chart-data="handleSetLineChartData" />
    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;border-radius: 8px;">
      <LineChart :chart-data="lineChartData" />
    </el-row>

    <el-row :gutter="32">
      <el-col
        :xs="24"
        :sm="24"
        :lg="8"
      >
        <div class="chart-wrapper">
          <RadarChart />
        </div>
      </el-col>
      <el-col
        :xs="24"
        :sm="24"
        :lg="8"
      >
        <div class="chart-wrapper">
          <PieChart />
        </div>
      </el-col>
      <el-col
        :xs="24"
        :sm="24"
        :lg="8"
      >
        <div class="chart-wrapper">
          <BarChart />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { defineComponent, onMounted } from 'vue';
import { useLoadingBar } from 'naive-ui';
import { ref } from 'vue';
import PanelGroup from './childComps/PanelGroup.vue';
import LineChart from './childComps/LineChart.vue';
import RadarChart from './childComps/RadarChart.vue';
import PieChart from './childComps/PieChart.vue';
import BarChart from './childComps/BarChart.vue';

/**
 * @description:
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'adminDashboard',
  components: {
    PanelGroup,
    LineChart,
    RadarChart,
    PieChart,
    BarChart,
  },
  setup() {
    const loadingBar = useLoadingBar(); // naive-ui loadingBar
    loadingBar.start();

    onMounted(() => {
      loadingBar.finish();
    });

    const data = {
      newVisitis: {
        expectedData: [100, 120, 161, 134, 105, 160, 165],
        actualData: [120, 82, 91, 154, 162, 140, 145],
      },
      messages: {
        expectedData: [200, 192, 120, 144, 160, 130, 140],
        actualData: [180, 160, 151, 106, 145, 150, 130],
      },
      purchases: {
        expectedData: [80, 100, 121, 104, 105, 90, 100],
        actualData: [120, 90, 100, 138, 142, 130, 130],
      },
      shoppings: {
        expectedData: [130, 140, 141, 142, 145, 150, 160],
        actualData: [120, 82, 91, 154, 162, 140, 130],
      },
    };

    const lineChartData = ref(data.newVisitis);
    const handleSetLineChartData = (type) => {
      lineChartData.value = data[type];
    };

    return {
      lineChartData,
      handleSetLineChartData,
    };
  },
});
</script>

<style lang="scss" scoped>
.admin-dashboard {
  position: relative;

  .github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
    border-radius: 8px;
  }
}

@media (max-width: 1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
