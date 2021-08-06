<!--
 * @Description: 历史记录主要内容
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-08-04 18:49:08
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-08-06 12:11:29
-->
<template>
  <div class="history-content">
    <ul class="history-content-line clearfix">
      <li
        class="animated fade-in-up"
        v-for="(item, index) in historyList"
        :key="index"
        :style="{'animation-delay': (index + 1) / 10 + 's'}"
      >
        <history-item
          :index="index"
          :data="item"
        />
      </li>
    </ul>
  </div>
</template>

<script>
import { defineComponent, reactive } from 'vue';
import HistoryItem from '@/views/history/childComps/HistoryItem.vue';

/**
 * @description: 历史记录主要内容
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'historyContent',
  components: {
    HistoryItem,
  },
  setup() {
    const historyList = reactive([
      {
        history_id: 20,
        time: '2021-7-6 12:24:00',
        title: '数据结构和算法：终于可以用三种语言（C，C#，JavaScript）把图的广度优先遍历讲清楚了（推荐收藏）',
        topic_tag: ['数据结构和算法'],
        username: '刘一哥GIS',
        type: 1,
      },
      {
        history_id: 20,
        time: '2021-8-5 22:52:00',
        title: '数据结构和算法：终于可以用三种语言（C，C#，JavaScript）把图的广度优先遍历讲清楚了（推荐收藏）',
        topic_tag: ['数据结构和算法'],
        username: '刘一哥GIS',
        type: 2,
      },
      {
        history_id: 20,
        time: '2020-12-18 12:24:00',
        title: '数据结构和算法：终于可以用三种语言（C，C#，JavaScript）把图的广度优先遍历讲清楚了（推荐收藏）',
        topic_tag: ['数据结构和算法'],
        username: '刘一哥GIS',
        type: 1,
      },
      {
        history_id: 20,
        time: '2021-7-6 12:24:00',
        title: '数据结构和算法：终于可以用三种语言（C，C#，JavaScript）把图的广度优先遍历讲清楚了（推荐收藏）',
        topic_tag: ['数据结构和算法'],
        username: '刘一哥GIS',
        type: 1,
      },
      {
        history_id: 20,
        time: '2021-7-6 12:24:00',
        title: '数据结构和算法：终于可以用三种语言（C，C#，JavaScript）把图的广度优先遍历讲清楚了（推荐收藏）',
        topic_tag: ['数据结构和算法'],
        username: '刘一哥GIS',
        type: 2,
      },
      {
        history_id: 20,
        time: '2021-7-6 12:24:00',
        title: '数据结构和算法：终于可以用三种语言（C，C#，JavaScript）把图的广度优先遍历讲清楚了（推荐收藏）',
        topic_tag: ['数据结构和算法'],
        username: '刘一哥GIS',
        type: 1,
      },
      {
        history_id: 20,
        time: '2021-8-6 01:24:00',
        title: '数据结构和算法：终于可以用三种语言（C，C#，JavaScript）把图的广度优先遍历讲清楚了（推荐收藏）',
        topic_tag: ['数据结构和算法'],
        username: '刘一哥GIS',
        type: 1,
      },
      {
        history_id: 20,
        time: '2021-7-6 12:24:00',
        title: '数据结构和算法：终于可以用三种语言（C，C#，JavaScript）把图的广度优先遍历讲清楚了（推荐收藏）',
        topic_tag: ['数据结构和算法'],
        username: '刘一哥GIS',
        type: 2,
      },
    ]);

    return {
      historyList,
    };
  },
});
</script>

<style lang="scss" scoped>
.history-content {
  width: 100%;
  position: relative;
  display: inline-block;

  .history-content-line {
    list-style: none;
    padding: 50px 0 150px;
    margin: 0 auto;
    width: 100%;
    position: relative;
    display: inline-block;
    z-index: 0;
    margin-bottom: 15px;

    &::before {
      background: $green-1;
      content: '';
      left: calc(50% - 1px);
      top: 0;
      bottom: 0;
      position: absolute;
      width: 2px;
      z-index: -99;
    }

    & > li {
      display: block;
      width: 50%;
      position: relative;
      margin-top: 165px;
      z-index: -1;

      &:nth-child(odd) {
        float: left;
        clear: left;
      }

      &:nth-child(even) {
        float: right;
        clear: right;
      }

      &:nth-child(1) {
        margin-top: 18px;
      }

      &:nth-child(2) {
        margin-top: 77px;
      }
    }
  }

  .animated {
    -webkit-animation-duration: 1s;
    -moz-animation-duration: 1s;
    -o-animation-duration: 1s;
    animation-duration: 1s;
    -webkit-animation-fill-mode: both;
    -moz-animation-fill-mode: both;
    -o-animation-fill-mode: both;
    animation-fill-mode: both;
  }

  .animated {
    -webkit-animation-duration: 2s;
    -moz-animation-duration: 2s;
    -o-animation-duration: 2s;
    animation-duration: 2s;
  }

  @-webkit-keyframes fadeInUp {
    0% {
      opacity: 0;
      -webkit-transform: translateY(20px);
    }
    100% {
      opacity: 1;
      -webkit-transform: translateY(0);
    }
  }

  @-moz-keyframes fadeInUp {
    0% {
      opacity: 0;
      -moz-transform: translateY(20px);
    }
    100% {
      opacity: 1;
      -moz-transform: translateY(0);
    }
  }

  @-o-keyframes fadeInUp {
    0% {
      opacity: 0;
      -o-transform: translateY(20px);
    }
    100% {
      opacity: 1;
      -o-transform: translateY(0);
    }
  }

  @keyframes fadeInUp {
    0% {
      opacity: 0;
      transform: translateY(20px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .fade-in-up {
    -webkit-animation-name: fadeInUp;
    -moz-animation-name: fadeInUp;
    -o-animation-name: fadeInUp;
    animation-name: fadeInUp;
  }
}
</style>
