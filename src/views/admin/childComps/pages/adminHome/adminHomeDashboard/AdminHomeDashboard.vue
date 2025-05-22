<!--
 * @Description: 仪表盘页面
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2022-02-26 19:56:18
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2023-03-12 17:40:01
-->
<template>
  <admin-view class="admin-home-dashboard">
    <div class="home-dashboard-info">
      <div
        class="data-info"
        v-for="(info, index) in dataInfoList"
        :key="index"
      >
        <div class="info-title">
          <div class="title">
            {{info.title}}
          </div>
          <div
            class="unit"
            :style="{background: `rgba(${colorHexToDec(info.color).rgb}, 0.1)`, border: `1px solid ${info.color}`, 'color': info.color}"
          >
            {{info.unit}}
          </div>
        </div>
        <div class="info-content">
          <div class="unit-number">
            <div class="number">
              $<n-number-animation
                show-separator
                :from="0"
                :duration="4000"
                :to="info.unitData"
              />
            </div>
            <img v-prefix
              :src="info.icon"
              class="icon"
            />
          </div>
          <div class="total-number">
            <div class="total-number-name">
              {{info.totalDataName}}
            </div>
            <div class="number">
              $<n-number-animation
                show-separator
                :from="0"
                :duration="4000"
                :to="info.totalData"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="home-dashboard-charts">
      <dashboard-line-chart />
      <dashboard-circle-chart />
    </div>
  </admin-view>
</template>

<script>
import { computed, defineComponent } from 'vue';
import AdminView from '@/views/admin/childComps/AdminView.vue';
import DashboardLineChart from '@/views/admin/childComps/pages/adminHome/adminHomeDashboard/childComps/DashboardLineChart.vue';
import DashboardCircleChart from '@/views/admin/childComps/pages/adminHome/adminHomeDashboard/childComps/DashboardCircleChart.vue';
import styles from '@/assets/style/define.scss';
import { colorHexToDec } from '@/utils/utils';

/**
 * @description: 仪表盘页面
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'adminHomeDashboard',
  components: {
    AdminView,
    DashboardLineChart,
    DashboardCircleChart,
  },
  setup() {
    // 数据信息列表
    const dataInfoList = computed(() => {
      return [
        {
          title: '访客',
          unit: '月',
          icon: '/admin/home/dashboard/historicalVisitors.png',
          unitData: 2086,
          totalData: 839271,
          totalDataName: '总访问量',
          color: styles.green3,
        },
        {
          title: '文章',
          unit: '月',
          icon: '/admin/home/dashboard/article.png',
          unitData: 12,
          totalData: 98,
          totalDataName: '共发表',
          color: styles.purple1,
        },
        {
          title: '问答',
          unit: '月',
          icon: '/admin/home/dashboard/question.png',
          unitData: 35,
          totalData: 1233,
          totalDataName: '总问答数',
          color: styles.blue1,
        },
        {
          title: '资源',
          unit: '年',
          icon: '/admin/home/dashboard/resource.png',
          unitData: 5,
          totalData: 83,
          totalDataName: '共分享',
          color: styles.orange0,
        },
        {
          title: '博客',
          unit: '月',
          icon: '/admin/home/dashboard/blog.png',
          unitData: 5,
          totalData: 21,
          totalDataName: '博文总数',
          color: styles.blue0,
        },
        {
          title: '文件',
          unit: '年',
          icon: '/admin/home/dashboard/file.png',
          unitData: 76,
          totalData: 181,
          totalDataName: '总文件数',
          color: styles.yellow1,
        },
        {
          title: '图片',
          unit: '年',
          icon: '/admin/home/dashboard/picture.png',
          unitData: 121,
          totalData: 9141,
          totalDataName: '总图片数',
          color: styles.pink0,
        },
        {
          title: '评论',
          unit: '月',
          icon: '/admin/home/dashboard/comment.png',
          unitData: 134,
          totalData: 1543,
          totalDataName: '总评论数',
          color: styles.red2,
        },
      ];
    });

    return {
      dataInfoList,
      colorHexToDec,
    };
  },
});
</script>

<style lang="scss" scoped>
.admin-home-dashboard {
  .home-dashboard-info {
    width: 100%;
    @include flex(center, center);
    flex-wrap: wrap;

    .data-info {
      height: 174px;
      width: calc(25% - 12px);
      margin-right: 16px;
      background-color: $grey-0;
      // box-shadow: $shadow-0;
      border-radius: $border-radius-1;
      @include flex(center, center, column);
      overflow: hidden;
      margin-bottom: 16px;

      &:nth-child(4),
      &:last-child {
        margin-right: 0;
      }

      .info-title {
        width: 100%;
        height: 40px;
        padding: 0 20px 0 12px;
        @include flex(center, space-between);
        border-bottom: 1px solid $grey-4;
        box-sizing: border-box;

        .title {
          height: 100%;
          font-size: 14px;
          color: $grey-10;
          @include flex(center);
        }

        .unit {
          width: 26px;
          height: 22px;
          font-size: 12px;
          @include flex(center, center);
          border-radius: $border-radius-1;
          box-sizing: border-box;
        }
      }

      .info-content {
        width: 100%;
        height: 134px;
        padding: 28px 28px 20px 28px;
        box-sizing: border-box;
        @include flex(center, center, column);

        & > div {
          width: 100%;
          @include flex(center, space-between);
        }

        .unit-number {
          height: 40px;
          margin-bottom: 24px;

          .number {
            height: 100%;
            @include flex(center);
            font-size: 24px;
            color: $grey-10;
          }

          .icon {
            height: 40px;
            width: 40px;
            overflow: hidden;
          }
        }

        .total-number {
          height: 22px;

          & > div {
            height: 100%;
            @include flex(center);
            color: $grey-10;
            font-size: 14px;
          }
        }
      }
    }
  }

  .home-dashboard-charts {
    width: 100%;
  }
}
</style>
