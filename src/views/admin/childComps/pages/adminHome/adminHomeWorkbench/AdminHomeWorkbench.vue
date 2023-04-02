<!--
 * @Description: 工作台页面
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2022-02-26 19:56:18
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2023-03-28 17:24:37
-->
<template>
  <admin-view
    class="admin-home-workbench"
    :loading="loading"
  >
    <div class="home-workbench-head">
      <div class="workbench-head-left">
        <base-avatar
          :src="userData.avatar"
          :alt="userData.nickname"
          :size="72"
          :href="`/user/${userData.username}`"
          :target="`/user/${userData.username}`"
        />
        <div class="info">
          <div class="tip">{{tip}}</div>
          <div class="weather">{{weather}}</div>
        </div>
      </div>
      <div class="workbench-head-right">
        <div
          class="data-item"
          v-for="item in dataList"
          :key="item.title"
        >
          <div class="title">{{item.title}}</div>
          <div class="content">{{item.content}}</div>
        </div>
      </div>
    </div>
    <div class="home-workbench-body">
      <div class="workbench-body-left">
        <workbench-draft :draft="draft" />
        <workbench-dynamic
          :dynamic="dynamic.dynamic"
          :username="userData.username"
        />
      </div>
      <div class="workbench-body-right">
        <workbench-navigation />
        <div class="img">
          <img src="/admin/home/workbench/work.svg">
        </div>
        <workbench-to-do />
      </div>
    </div>
  </admin-view>
</template>

<script>
import { computed, defineComponent, inject, reactive, ref } from 'vue';
import BaseAvatar from '@/components/content/baseAvatar/BaseAvatar.vue';
import AdminView from '@/views/admin/childComps/AdminView.vue';
import WorkbenchDraft from '@/views/admin/childComps/pages/adminHome/adminHomeWorkbench/childComps/WorkbenchDraft.vue';
import WorkbenchDynamic from '@/views/admin/childComps/pages/adminHome/adminHomeWorkbench/childComps/WorkbenchDynamic.vue';
import WorkbenchNavigation from '@/views/admin/childComps/pages/adminHome/adminHomeWorkbench/childComps/WorkbenchNavigation.vue';
import WorkbenchToDo from '@/views/admin/childComps/pages/adminHome/adminHomeWorkbench/childComps/workbenchToDo/WorkbenchToDo.vue';
import { dateGetDayText } from '@/util/date';
import { mapGetters } from '@/util/store';
import { useMessage } from 'naive-ui';
import { HeFengWeather } from '@/network/api/tools/weather';
import { getDynamic } from '@/network/api/dynamic';

/**
 * @description: 工作台页面
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'adminHomeWorkbench',
  components: {
    BaseAvatar,
    AdminView,
    WorkbenchDraft,
    WorkbenchDynamic,
    WorkbenchNavigation,
    WorkbenchToDo,
  },
  setup() {
    const msg = useMessage(); // naive-ui message
    const loading = ref(true); // 是否处于加载状态
    const userData = inject('userData'); // 用户数据
    const weatherInfo = reactive({
      temperature: 20,
      text: '晴',
    }); // 天气数据
    const draft = reactive([]); // 草稿数据
    const dynamic = reactive({ count: 0, dynamic: [] }); // 动态数据

    /**
     * @description: 数据获取函数初始化
     * @return {void}
     * @author: dreamy-xay
     */
    function init() {
      const promises = []; // 存放所有 promise

      // 获取天气信息
      promises.push(
        HeFengWeather.getWeather()
          .then((data) => {
            data = HeFengWeather.standardizeWeatherInfo(data); // 标准化天气信息
            for (const key in data) weatherInfo[key] = data[key]; //  更新信息
          })
          .catch((err) => {
            console.log(err);
            msg.error('获取天气信息失败');
          })
      );

      // 获取草稿数据
      draft.splice(
        0,
        0,
        ...[
          {
            id: 10000,
            title: '等待',
            content: '不要等待机会，而要创造机会。阿卡莎开始啊纱卡纱卡沙克啥安康市',
            type: 1,
            release_time: '2021-04-01',
          },
          {
            id: 10001,
            title: '周周照照形形色色明撒娇卡河水库',
            content: '现在的你决定将来的你。',
            type: 2,
            release_time: '2021-03-21',
          },
          {
            id: 10002,
            title: '开始行动',
            content: '勇往直前，激流而上。',
            type: 4,
            release_time: '2021-03-19',
          },
          {
            id: 10003,
            title: '渴望一且',
            content: '热情和欲望可以突破一切难关。',
            type: 5,
            release_time: '2021-03-18',
          },
          {
            id: 10004,
            title: '勇闯难关向上',
            content: '失之东隅，父子上虞。',
            type: 3,
            release_time: '2021-03-02',
          },
        ]
      );

      // 获取动态数据
      promises.push(
        getDynamic(userData.username, 0, 6, 1)
          .then((data) => {
            dynamic.count = data.count;
            dynamic.dynamic.splice(dynamic.length, 0, ...data.dynamic);
          })
          .catch((error) => {
            console.log(error);
            msg.error('获取动态失败');
          })
      );

      // 全部请求执行完毕
      Promise.all(promises).finally(() => {
        loading.value = false;
      });
    }

    // 初始化
    init();

    // 计算提示信息
    const tip = computed(() => {
      return dateGetDayText((text, hour) => {
        if (hour < 4 || hour > 19) return `${text}，${userData.nickname}，工作之余注意身体休息！`;
        else if (hour < 11) return `${text}，${userData.nickname}，开始您一天的工作吧！`;
        else return `${text}，${userData.nickname}，继续加油工作吧！`;
      });
    });

    // 计算天气信息
    const weather = computed(() => {
      let baseInfo = `今天${weatherInfo.text}，室外温度${weatherInfo.temperature}℃`;
      if (weatherInfo.humidity) baseInfo += `，相对湿度${weatherInfo.humidity}%`;
      if (weatherInfo.wind) baseInfo += `，${weatherInfo.wind.scale}级${weatherInfo.wind.direction}`;
      return baseInfo + '!';
    });

    // 代办事项数量
    const { toDoListCount } = mapGetters('globalStore', ['toDoListCount']);

    // 计算顶部各项数据信息
    const dataList = computed(() => {
      return [
        {
          title: '待办',
          content: `${toDoListCount.value.complete}/${toDoListCount.value.all}`,
        },
        {
          title: '草稿',
          content: draft.length,
        },
        {
          title: '动态',
          content: dynamic.count,
        },
      ];
    });

    return {
      loading,
      userData,
      draft,
      dynamic,
      tip,
      weather,
      dataList,
    };
  },
});
</script>

<style lang="scss" scoped>
.admin-home-workbench {
  @include flex(center, center, column);

  .home-workbench-head {
    width: 100%;
    padding: 22px 16px;
    height: 116px;
    box-sizing: border-box;
    background-color: $grey-0;
    border-radius: $border-radius-1;
    overflow: hidden;
    @include flex(center, space-between);

    & > div {
      height: 100%;
      @include flex(center, center);
    }

    .workbench-head-left {
      margin-left: 8px;

      .info {
        margin-left: 24px;
        height: 100%;
        @include flex(initial, center, column);
        color: $grey-11;

        .tip {
          height: 28px;
          line-height: 28px;
          font-size: 18px;
          font-weight: 700;
          margin-top: 8px;
        }

        .weather {
          margin: 9px 0 8px 0;
          height: 19px;
          line-height: 19px;
          font-size: 14px;
        }
      }
    }

    .workbench-head-right {
      height: 100%;
      @include flex(center, center);
      margin-right: 8px;

      .data-item {
        width: 50px;
        height: 100%;
        @include flex(center, center, column);
        margin-left: 64px;
        color: $grey-11;

        &:first-child {
          margin-left: 0;
        }

        .title {
          height: 22px;
          line-height: 22px;
          font-size: 14px;
        }

        .content {
          height: 32px;
          line-height: 32px;
          font-size: 24px;
        }
      }
    }
  }

  .home-workbench-body {
    width: 100%;
    @include flex(initial, space-between);

    & > div {
      @include flex(center, initial, column);
    }

    .workbench-body-left {
      width: calc(66.666666667% - 8px);
      margin-right: 16px;
    }

    .workbench-body-right {
      width: calc(33.333333333% - 8px);

      .quick-navigation,
      .img {
        width: 100%;
        margin-top: 16px;
        border-radius: $border-radius-1;
        background-color: $grey-0;
      }

      .img {
        padding: 24px;
        width: calc(100% - 48px);

        img {
          width: 100%;
        }
      }
    }
  }
}
</style>
