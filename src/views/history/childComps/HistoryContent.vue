<!--
 * @Description: 历史记录主要内容
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-08-04 18:49:08
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-09-13 20:03:51
-->
<template>
  <div class="history-content">
    <div
      class="history-content-inner"
      v-if="historyList.length !== 0"
    >
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
    <div
      class="history-content-info"
      v-else
    >
      <base-svg
        svg="data-empty"
        :color="styles.green1"
      />
    </div>
    <div
      class="history-content-end"
      v-if="end"
    >
      <base-svg svg="bottom" />
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive, ref } from 'vue';
import HistoryItem from '@/views/history/childComps/HistoryItem.vue';
import BaseSvg from '@/components/content/baseSvg/BaseSvg';
import { getHistory, deleteHistory } from '@/network/api/history';
import { mapGetters } from '@/util/store';
import styles from '@/assets/style/define.scss';
import events from '@/events';
import { useMessage } from 'naive-ui';

/**
 * @description: 历史记录主要内容
 * @param {String} eventId 滚动到底部事件触发id
 * @event toBottom 历史记录到底部触发事件
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'historyContent',
  components: {
    HistoryItem,
    BaseSvg,
  },
  props: {
    eventId: {
      type: String,
      required: true,
    },
  },
  setup(props, context) {
    const msg = useMessage(); //  // naive-ui message
    let offset = 0; // 偏移量
    let historyList = reactive([]); // 历史记录信息列表
    const end = ref(false);
    const { isLogin } = mapGetters('global', ['isLogin']);

    /**
     * @description: 删除历史记录
     * @param {number} index 删除历史记录索引 `v-for索引`
     * @return {void}
     * @author: dreamy-xay
     */
    function deleteItem(index) {
      deleteHistory(historyList[index].history_id, historyList[index].type)
        .then(() => {
          --offset;
          historyList.splice(index, 1);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    /**
     * @description:
     * @param {boolean} clear 是否清空原有内容 `默认不清空`
     * @param {string} keyword 搜索关键词 `默认为 ''`
     * @return {void}
     * @author: dreamy-xay
     */
    function getHistoryList(clear = false, keyword = '') {
      if (isLogin.value)
        getHistory(0, offset, keyword, 20)
          .then((data) => {
            if (data.history.length < 20) {
              context.emit('toBottom');
              end.value = true;
            }
            offset += data.history.length;
            historyList.splice(clear ? 0 : historyList.length, clear ? historyList.length : 0, ...data.history);
          })
          .catch((error) => {
            console.log(error);
          });
      else msg.error('请先登录再查看历史记录', { duration: 2000, closable: true });
    }

    // 获取历史记录
    getHistoryList();

    // 触底事件监听
    events.on(props.eventId, (keyword) => {
      getHistoryList(false, keyword);
    });

    events.on('HistoryBar-getHistory', (keyword) => {
      offset = 0;
      getHistoryList(true, keyword);
    });

    // 清空历史记录事件监听
    events.on('HistoryBar-clearAllHistory', () => {
      deleteHistory()
        .then(() => {
          historyList.splice(0, historyList.length);
        })
        .catch((error) => {
          console.log(error);
        });
    });

    return {
      styles,
      historyList,
      deleteItem,
      end,
    };
  },
});
</script>

<style lang="scss" scoped>
.history-content {
  width: 100%;
  display: inline-block;

  .history-content-inner {
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

  .history-content-info {
    width: 100%;
    margin-top: 100px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .history-content-end {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: -100px;
  }
}
</style>
