<!--
 * @Description: 历史记录主要内容
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-08-04 18:49:08
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-08-06 23:24:43
-->
<template>
  <div class="history-content">
    <ul class="history-content-line clearfix">
      <li
        class="animated fade-in-up"
        v-for="(item, index) in historyList"
        :key="index"
        :style="{'animation-delay': (index > 6 ? 0.7 : (index + 1) / 10) + 's'}"
      >
        <history-item
          :index="index"
          :data="item"
          @delete="deleteItem(index)"
        />
      </li>
    </ul>
  </div>
</template>

<script>
import { defineComponent, reactive } from 'vue';
import HistoryItem from '@/views/history/childComps/HistoryItem.vue';
import { getHistory, deleteHistory } from '@/network/api/history';
import events from '@/events';

/**
 * @description: 历史记录主要内容
 * @param {String} eventId 滚动到底部事件触发id
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'historyContent',
  components: {
    HistoryItem,
  },
  props: {
    eventId: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    let offset = 0; // 偏移量
    let historyList = reactive([]); // 历史记录信息列表

    // 获取历史记录
    getHistory(0, offset, 20)
      .then((data) => {
        offset += data.history.length;
        historyList.splice(0, 0, ...data.history);
      })
      .catch((error) => {
        console.log(error);
      });

    /**
     * @description: 删除历史记录
     * @param {number} index 删除历史记录索引 `v-for索引`
     * @return {void}
     * @author: dreamy-xay
     */
    function deleteItem(index) {
      deleteHistory(historyList[index].history_id, historyList[index].type)
        .then(() => {
          historyList.splice(index, 1);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    /**
     * @description:
     * @param {*}
     * @return {*}
     * @author: dreamy-xay
     */
    events.on(props.eventId, () => {
      getHistory(0, offset, 20)
        .then((data) => {
          offset += data.history.length;
          historyList.splice(historyList.length, 0, ...data.history);
        })
        .catch((error) => {
          console.log(error);
        });
    });

    return {
      historyList,
      deleteItem,
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
    margin: 0 auto;
    padding: 50px 0 50px;
    width: 100%;
    position: relative;
    display: inline-block;
    z-index: 0;

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
