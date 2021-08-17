<!--
 * @Description: 顶部栏历史记录
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-08-12 17:09:45
 * @LastEditors: Ban
 * @LastEditTime: 2021-08-17 22:15:27
-->
<template>
  <div class="top-bar-history">
    <div class="top-bar-history-header">
      <div
        role="button"
        :class="{'header-left' : true,   'styleIsPitch' : isPitch === 1}"
        @click="changePitch(1)"
        v-text="isPitch === 1 ? '文章历史' : '文章'"
      >
      </div>
      <div
        role="button"
        :class="{'header-left' : true,   'styleIsPitch' : isPitch === 2}"
        @click="changePitch(2)"
        v-text="isPitch === 2 ? '问答历史' : '问答'"
      >
      </div>
      <a
        href="/history"
        class="header-right"
      >
        查看全部
      </a>
    </div>
    <el-scrollbar
      class="top-bar-history-bottom"
      height="360px"
    >
      <div
        v-if="isEmpty(isPitch)"
        class="empty-list"
      >
        暂时没有历史记录哦~
      </div>
      <div
        v-for="(item, index) in isPitch === 1 ? articleList : qaList"
        :key="index"
        class="bottom-item"
        role="button"
        @click="openArticle(item.id)"
      >

        <div class="bottom-item-content">
          <base-tag
            :text="item.topic_tag[0]"
            :color="styles.orange0"
            :hollow="true"
          ></base-tag>

          <div class="bottom-item-text">
            {{ item.title }}
          </div>
        </div>
        <div class="bottom-item-other">
          <div style="margin-right : 12px">{{ dateGetText(new Date(item.time)) }}</div>
          <div>{{ item.nickname }}</div>
        </div>
      </div>
    </el-scrollbar>
  </div>
</template>

<script>
import { defineComponent, ref, reactive } from 'vue';
import { getHistory } from '@/network/api/history';
import BaseTag from '@/components/content/baseTag/BaseTag.vue';
import styles from '@/assets/style/define.scss';
import { dateFormat } from '@/util/date';

/**
 * @description: 顶部栏历史记录
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'topBarHistory',
  components: {
    BaseTag,
  },
  setup() {
    const isPitch = ref(1); //当前状态
    const articleList = reactive([]); //文章历史
    const qaList = reactive([]); //问答历史

    //改变选中
    function changePitch(num) {
      isPitch.value = num;
      if (num === 1) {
        getArticle();
      } else if (num === 2) {
        getQuestion();
      }
    }
    //获取数据
    //获取最新文章数据
    function getArticle() {
      getHistory(1, 0, '', 0)
        .then((data) => {
          if (articleList.length !== 0) articleList.splice(0, articleList.length);
          articleList.splice(0, 0, ...data.history);
          console.log(articleList);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    getArticle();
    //获取最新问答数据
    function getQuestion() {
      getHistory(2, 0, '', 20)
        .then((data) => {
          if (qaList.length !== 0) qaList.splice(0, qaList.length);
          qaList.splice(0, 0, ...data.history);
          console.log(qaList);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    getQuestion();

    /**
     * @description: 形式化日期
     * @param {Date} date 形式化日期对象 `必传参数`
     * @return {string} 返回形式化字符串
     * @author: dreamy-xay
     */
    function dateGetText(date) {
      const current = new Date();
      const time = parseInt((current.getTime() - date.getTime()) / 1000 + '');
      if (time <= 86400) {
        if (current.getDay() !== date.getDay()) return '昨天' + ' ' + dateFormat('HH:MM', date);
        else return '今天' + ' ' + dateFormat('HH:MM', date);
      } else if (time <= 172800) {
        if (new Date(current.getTime() - 86400000).getDay() === date.getDay())
          return '昨天' + ' ' + dateFormat('HH:MM', date);
        else return dateFormat('m月d日 HH:MM', date);
      } else return dateFormat('m月d日 HH:MM', date);
    }
    //判断数组为空
    function isEmpty(num) {
      if (num === 1) {
        return articleList.length === 0;
      } else if (num === 2) {
        return qaList === 0;
      }
    }

    //打开文章
    function openArticle(id) {
      if (isPitch.value === 1) {
        window.open(`/article/${id}`);
      } else if (isPitch.value === 2) {
        window.open(`/question/${id}`);
      }
    }
    return {
      isPitch,
      changePitch,
      articleList,
      qaList,
      styles,
      dateGetText,
      isEmpty,
      openArticle,
    };
  },
});
</script>

<style lang="scss" scoped>
.top-bar-history {
  width: 323px;

  .top-bar-history-header {
    height: 40px;
    border-bottom: 1px solid $grey-2;

    .header-left {
      position: relative;
      float: left;
      margin-left: 16px;
      border: 1px solid transparent;
      border-radius: 10px;
      color: $grey-11;
      top: 14px;
      font-size: 11px;
      transition: 0.25s ease;

      .header-left-active {
        display: inline-block;
        height: 19px;
        width: 59px;
        border-radius: 10px;
        background: $green-0;
        position: absolute;
        left: -6px;
        top: -2px;
        z-index: -1;
      }
    }

    .styleIsPitch {
      padding: 1px 7px;
      background: $green-0;
      color: $grey-0;
    }

    .header-right {
      float: right;
      position: relative;
      color: $green-0;
      font-size: 11px;
      top: 14px;
      margin-right: 17px;
      font-weight: 700;
      transition: 0.25s;

      &:hover {
        color: $green-1;
      }
    }
  }

  .top-bar-history-bottom {
    margin: 10px 0;

    .bottom-item {
      font-size: 16px;
      color: $grey-11;
      box-sizing: border-box;
      padding: 6px 21px 6px 16px;
      transition: 0.25s;

      &:hover {
        background: $grey-2;
      }

      .bottom-item-content {
        height: 21px;
        display: flex;
        align-items: center;

        .bottom-item-text {
          margin-left: 7px;
          @include ellipsis(1);
        }
      }

      .bottom-item-other {
        text-align: right;
        font-size: 12px;
        color: $grey-7;
        margin-top: 2px;

        div {
          display: inline-block;
        }
      }
    }

    .empty-list {
      color: $grey-7;
      text-align: center;
      position: relative;
      top: 160px;
    }
  }
}
</style>
