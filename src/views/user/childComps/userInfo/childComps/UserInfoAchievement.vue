<!--
 * @Description: 用户中心左侧获得成就
 * @Version:
 * @Autor: Z_Y_C
 * @Date: 2021-09-07 20:15:50
 * @LastEditors: Z_Y_C
 * @LastEditTime: 2021-09-13 15:19:00
-->
<template>
  <div class="user-info-achievement">
    <div class="user-info-achievement-title"> 获得成就</div>

    <div
      class="user-info-achievement-context"
      v-for="(item , index) in menusData"
      :key="index"
      :class="{'self': !self}"
    >

      <div class="user-info-achievement-context-title">
        <div class="icon">
          <i
            :class="item.icon"
            :style="{'color': item.iconColor}"
          ></i>
        </div>

        <div class="text">{{item.text}}</div>
        <div
          v-if="index === 0"
          class="number1"
        >
          <i class="iconfont blog-leaf"></i>

          <div class="time">{{getTime.year + '年'}}</div>

        </div>
        <div
          v-else
          class="number"
        >{{numberData[index-1].all}}</div>

      </div>

      <div
        v-if="self"
        class="user-info-achievement-context-add"
      >
        <div
          v-if="index===0"
          class="add-text"
        >{{'距离' + (getTime.year + 1) + '年还有' + getTime.data + '天'}}</div>

        <div
          v-else
          class="add-text"
        >
          <div class="add-text-yesterday">昨日</div>
          <div
            v-if="numberData[index-1].yesterday !== null"
            :class="numberData[index-1].yesterday ? 'add-color' : ''"
          >{{'+'+numberData[index-1].yesterday}}</div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { computed, defineComponent } from 'vue';
import style from '@/assets/style/define.scss';
import { getSplitNum } from '@/utils/utils';

/**
 * @description: 用户中心左侧获得成就
 * @param {Object} data 用户中心左侧成就信息数据 `必传参数`
 * @param {null | Boolean} self 用户是否是自己或在线，是自己为true 用户退出登录为null 不是自己false `必传参数`
 * @author: Z_Y_C
 */
export default defineComponent({
  name: 'useerInfoAchievement',
  props: {
    data: {
      type: Object,
      required: true,
    },
    self: {
      required: true,
    },
  },
  setup(props, context) {
    // 目录信息加载
    const menusData = [
      { icon: 'iconfont blog-leaf', text: '当前学龄', iconColor: style.blue0 },
      { icon: 'iconfont blog-eye', text: '浏览总数', iconColor: style.blue1 },
      { icon: 'iconfont blog-tubiao73', text: '获得点赞', iconColor: style.green3 },
      { icon: 'iconfont blog-fav', text: '获得收藏', iconColor: style.orange1 },
    ];

    // 计算时间
    const getTime = computed(() => {
      const Data = parseInt(
        (new Date().getTime() - new Date(props.data.registration_time).getTime()) / 1000 / 3600 / 24
      );
      const Year = parseInt(Data / 365);
      return {
        year: Year,
        data: 365 - (Data % 365),
      };
    });

    // 成就数据加载
    const numberData = computed(() => {
      return [
        { all: getSplitNum(props.data.browse_count), yesterday: props.data.browse_yesterday },
        { all: getSplitNum(props.data.recommend_count), yesterday: props.data.recommend_yesterday },
        { all: getSplitNum(props.data.collect_count), yesterday: props.data.collect_yesterday },
      ];
    });

    return { menusData, getTime, numberData };
  },
});
</script>

<style lang="scss" scoped>
.user-info-achievement {
  width: 100%;
  @include flex(initial, center, column);

  .user-info-achievement-title {
    margin-left: 16px;
    font-size: 16px;
    font-weight: 700;
    color: $grey-11;
    line-height: 21px;
  }

  .user-info-achievement-context {
    @include flex(initial, center, column);
    margin: 16px 0 0 16px;

    &.self {
      margin-top: 10px;

      &:nth-child(2) {
        margin-top: 16px;
      }
    }

    .user-info-achievement-context-title {
      @include flex(center);

      .icon {
        @include flex(center, center);
        height: 20px;
        width: 20px;
        margin-right: 8px;

        .iconfont {
          font-size: 20px;
        }
      }

      .text {
        font-size: 14px;
        margin-right: 10px;
        line-height: 20px;
        color: $grey-9;
      }

      .number1 {
        height: 14px;
        background-color: $grey-5;
        color: $grey-0;
        border-radius: $border-radius-1;
        @include flex(center);

        .iconfont {
          font-size: 15px;
        }

        .time {
          margin-left: 5px;
          font-size: 12px;
          font-weight: 700;
          color: $grey-0;
          letter-spacing: 1px;
        }
      }

      .number {
        @include flex(center);
        font-size: 14px;
        font-weight: 700;
        line-height: 20px;
      }
    }

    .user-info-achievement-context-add {
      margin: 7px 0 0 28px;
      @include flex(center, initial, row);

      .add-text-yesterday {
        @include flex(center);
        margin-right: 5px;
      }
      .add-text {
        @include flex(center);

        font-size: 12px;
        color: $grey-7;
      }

      .add-color {
        color: $green-3;
      }
    }
  }
}
</style>
