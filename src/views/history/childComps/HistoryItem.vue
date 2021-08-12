<!--
 * @Description: 历史记录单条内容
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-08-05 15:56:58
 * @LastEditors: continue-hs
 * @LastEditTime: 2021-08-12 10:44:12
-->
<template>
  <div
    class="history-item clearfix"
    :class="'history-item-' + (index % 2 ? 'odd' : 'even')"
  >
    <div
      class="history-item-info"
      :class="'history-item-info-' + (index % 2 ? 'odd' : 'even')"
    >
      <span>🍀</span>
      <span>{{firstTime}}</span>
      <span>({{lastTime}})</span>
    </div>
    <div class="history-item-content">
      <div class="content">
        <div class="content-left">
          <base-tag
            :text="data.type === 1 ? '文章' : '问答'"
            :color="styles.pink0"
            :hollow="true"
          />
        </div>
        <a
          :href="(data.type === 1 ? '/article/' : '/question/') + data.id "
          class="content-right"
        >
          {{data.title}}
        </a>
      </div>
      <div class="other">
        <div class="other-left">
          <base-tag
            class="tag"
            v-for="(item, index) in data.topic_tag.slice(0, 3)"
            :key="index"
            :text="item"
            :color="tagColor[index]"
            :style="{borderRadius: '6px', transition: '0.25s'}"
            role="button"
            @click="tagClick(item)"
            @hover="tagHover($event, index)"
          />
        </div>
        <div class="other-right">
          <a :href="'/user/' + data.username">
            <i class="iconfont blog-personal"></i>
            <span>{{data.username}}</span>
          </a>
          <i
            class="iconfont blog-delete"
            role="button"
            @click="deleteItem"
          ></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive } from 'vue';
import { dateFormat } from '@/util/date';
import BaseTag from '@/components/content/baseTag/BaseTag.vue';
import styles from '@/assets/style/define.scss';

/**
 * @description: 历史记录单条内容
 * @param {Object} data 传递数据 `必传参数`
 * @param {Number} index 外部索引值，从0开始 `必传参数`
 * @event delete 点击删除时触发事件
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'historyItem',
  components: {
    BaseTag,
  },
  props: {
    data: {
      type: Object,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  },
  setup(props, context) {
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

    /**
     * @description: 删除单条历史记录
     * @return {void}
     * @author: dreamy-xay
     */
    function deleteItem() {
      context.emit('delete');
    }

    const tagColor = reactive([styles.orange0, styles.orange0, styles.orange0]); // 标签颜色设置

    /**
     * @description: 点击标签跳转链接
     * @param {string} tagName 标签名 `v-for值`
     * @return {void}
     * @author: dreamy-xay
     */
    function tagClick(tagName) {
      console.log(tagName);
    }

    /**
     * @description: baseTag 被hover 修改其样式
     * @param {boolean} isEnter 是否进入元素内 `上层事件参数`
     * @param {number} index tag索引 `v-for索引值`
     * @return {void}
     * @author: dreamy-xay
     */
    function tagHover(isEnter, index) {
      tagColor[index] = isEnter ? styles.orange1 : styles.orange0;
    }

    return {
      styles,
      firstTime: dateGetText(new Date(props.data.time)),
      lastTime: dateFormat('YY-mm-dd', new Date(props.data.time)),
      deleteItem,
      tagColor,
      tagClick,
      tagHover,
    };
  },
});
</script>

<style lang="scss" scoped>
.history-item {
  position: relative;

  &::before {
    display: block;
    position: absolute;
    top: -42px;
    content: '';
    content: '';
    height: 6px;
    width: 15px;
    border: 4px solid $grey-4;
    border-radius: $border-radius-0;
    background: $green-1;
  }

  &.history-item-odd {
    margin-left: 18px;

    &::before {
      left: -25px;
    }
  }

  &.history-item-even {
    margin-right: 18px;

    &::before {
      right: -25px;
    }
  }

  .history-item-info {
    padding: 0 10px;
    height: 30px;
    background: $grey-0;
    font-size: 13px;
    box-shadow: $shadow-0;
    color: $grey-10;
    border-radius: $border-radius-0;
    position: absolute;
    top: -40px;
    overflow: hidden;
    display: flex;
    align-items: center;

    &.history-item-info-odd {
      left: 0;
    }

    &.history-item-info-even {
      right: 0;
    }

    span {
      margin-left: 8px;

      &:first-child {
        margin-left: 0;
      }

      &:nth-child(2) {
        color: $green-2;
      }

      &:last-child {
        color: $grey-10;
      }
    }
  }

  .history-item-content {
    background: $grey-0;
    width: 553px;
    padding: 10px;
    box-sizing: border-box;
    box-shadow: $shadow-0;
    border-radius: $border-radius-0;
    overflow: hidden;

    .content {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;

      .content-left {
        width: 42px;
        height: 100%;
        display: flex;
        align-items: center;
      }

      .content-right {
        overflow: hidden;
        width: 491px;
        color: $grey-10;
        font-size: 14px;
        line-height: 19px;
        word-break: break-all;
        text-overflow: ellipsis;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        transition: 0.25s;

        &:hover {
          color: $green-1;
        }
      }
    }

    .other {
      width: 491px;
      padding-left: 42px;
      height: 18px;
      margin-top: 10px;

      .other-left,
      .other-right {
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .other-left {
        float: left;

        .tag {
          margin-right: 5px;
        }
      }

      .other-right {
        float: right;

        .iconfont,
        span {
          font-size: 16px;
          color: $grey-7;
          transition: 0.25s;

          &:hover {
            color: $grey-10;
          }
        }

        a:hover .iconfont,
        a:hover span {
          color: $grey-10;
        }

        span {
          margin-right: 15px;
          margin-left: 4px;
          font-size: 14px;
          color: $grey-7;
        }
      }
    }
  }
}
</style>
