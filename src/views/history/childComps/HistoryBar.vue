<!--
 * @Description: 历史记录顶部栏
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-08-04 18:45:12
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2023-03-03 16:22:24
-->

<template>
  <div class="history-bar">
    <div class="history-bar-left">
      <i class="iconfont blog-lishijilu-copy"></i>
      <div>历史记录</div>
    </div>
    <div
      class="history-bar-right"
      v-if="isLogin"
    >
      <div
        class="search"
        :class="{active: searchValue !== ''}"
      >
        <input
          type="text"
          placeholder="搜索历史记录"
          v-model.trim="searchValue"
          @keyup.enter="search"
        >
        <i
          class="iconfont blog-search"
          role="button"
          @click="search"
        ></i>
        <i
          class="iconfont blog-cha"
          role="button"
          @click="clear"
        ></i>
      </div>
      <div
        class="button"
        role="button"
        @click="stopHistory"
      >
        {{switchHistoryStatus}}历史记录
        <base-modal
          :show="stopModalShow"
          :content="`啊叻？你要${switchHistoryStatus}历史记录功能吗？`"
          :confirmeText="`确定${switchHistoryStatus}`"
          @confirm="stopConfirm"
          @cancel="stopCancel"
        />
      </div>
      <div
        class="button"
        role="button"
        @click="clearHistory"
      >
        清空历史
        <base-modal
          :show="clearModalShow"
          content="清空之后就什么都没有了哦~"
          confirmeText="确定清空"
          @confirm="clearConfirm"
          @cancel="clearCancel"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { computed, defineComponent, ref } from 'vue';
import BaseModal from '@/components/content/baseModal/BaseModal.vue';
import events from '@/events';
import { modifySetting, getHistorySetting } from '@/network/api/setting';
import { mapGetters } from '@/utils/store';

/**
 * @description: 历史记录顶部栏
 * @emits HistoryBar-getHistory 按关键词获取历史记录，传递关键词参数
 * @emits HistoryBar-clearAllHistory 清除全部历史记录
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'historyBar',
  components: {
    BaseModal,
  },
  setup() {
    const historyRecord = ref(true); // 是否启动历史记录
    const searchValue = ref(''); // 搜索输入框内容
    const stopModalShow = ref(false); // 暂停历史记录设置模态框显示
    const clearModalShow = ref(false); // 清空历史记录设置模态框显示

    // 获取历史记录是否启动记录的状态
    getHistorySetting()
      .then((data) => {
        historyRecord.value = data.history_record;
      })
      .catch((err) => {
        console.log(err);
      });

    // 计算开关历史记录状态
    const switchHistoryStatus = computed(() => {
      return historyRecord.value ? '暂停' : '开启';
    });

    /**
     * @description: 开始搜索
     * @return {void}
     * @author: dreamy-xay
     */
    function search() {
      if (searchValue.value !== '') events.emit('HistoryBar-getHistory', searchValue.value);
    }

    /**
     * @description: 清除搜索内容
     * @return {void}
     * @author: dreamy-xay
     */
    function clear() {
      searchValue.value = '';
    }

    /**
     * @description: 暂停历史记录
     * @return {void}
     * @author: dreamy-xay
     */
    function stopHistory() {
      stopModalShow.value = true;
    }

    /**
     * @description: 暂停历史记录确认
     * @return {void}
     * @author: dreamy-xay
     */
    function stopConfirm() {
      stopModalShow.value = false;

      // 修改设置
      modifySetting({
        history_record: !historyRecord.value,
      })
        .then(() => {
          historyRecord.value = !historyRecord.value;
        })
        .catch((error) => {
          console.log(error);
        });
    }

    /**
     * @description: 暂停历史记录取消
     * @return {void}
     * @author: dreamy-xay
     */
    function stopCancel() {
      stopModalShow.value = false;
    }

    /**
     * @description: 清空全部历史记录
     * @return {void}
     * @author: dreamy-xay
     */
    function clearHistory() {
      clearModalShow.value = true;
    }

    /**
     * @description: 清空历史记录确认
     * @return {void}
     * @author: dreamy-xay
     */
    function clearConfirm() {
      clearModalShow.value = false;
      events.emit('HistoryBar-clearAllHistory');
    }

    /**
     * @description: 清空历史记录取消
     * @return {void}
     * @author: dreamy-xay
     */
    function clearCancel() {
      clearModalShow.value = false;
    }

    return {
      searchValue,
      switchHistoryStatus,
      search,
      clear,
      ...mapGetters('global', ['isLogin']),
      stopHistory,
      clearHistory,
      stopModalShow,
      clearModalShow,
      stopConfirm,
      clearConfirm,
      stopCancel,
      clearCancel,
    };
  },
});
</script>

<style lang="scss" scoped>
.history-bar {
  width: 100%;
  height: 42px;
  border-radius: $border-radius-0;
  box-shadow: $shadow-0;
  background-color: $grey-0;

  .history-bar-left,
  .history-bar-right {
    height: 100%;
    overflow: hidden;
    display: flex;
    align-items: center;
  }

  .history-bar-left {
    float: left;
    margin-left: 20px;
    user-select: none;

    .iconfont {
      display: inline-block;
      height: 22px;
      line-height: 22px;
      font-size: 22px;
      color: $green-1;
      margin-right: 8px;
    }

    div {
      font-size: 18px;
      color: $grey-10;
    }
  }

  .history-bar-right {
    float: right;
    margin-right: 20px;

    & > div {
      margin-left: 30px;
      height: 28px;
      display: flex;
      align-items: center;
    }

    .search {
      width: 186px;
      border-radius: 50px;
      border: 1px solid $grey-7;
      box-sizing: border-box;
      padding: 3px 36px;
      position: relative;

      &:focus-within {
        border-color: $green-1;
      }

      &.active {
        border-color: $green-1;

        & .iconfont {
          display: inline-block;
          color: $green-1;
        }
      }

      input {
        width: 100%;
        height: 100%;
        outline: none;
        border: 0;
        font-size: 12px;
        color: $grey-7;
      }

      .iconfont {
        display: inline-block;
        height: 20px;
        font-size: 20px;
        line-height: 20px;
        position: absolute;
        color: $grey-7;
      }

      .blog-search {
        top: 3px;
        left: 7px;
      }

      .blog-cha {
        top: 4px;
        font-size: 13px;
        right: 12px;
        display: none;
      }
    }

    .button {
      padding: 6px 7px;
      font-size: 12px;
      color: $green-1;
      border: 1px solid $green-1;
      box-sizing: border-box;
      border-radius: 5px;
      background-color: $grey-0;
      transition: 0.4s;

      &:hover {
        background-color: $green-1;
        color: $grey-0;
      }
    }
  }
}
</style>
