<!--
 * @Description:Message的子组件MessageLeft
 * @Version:
 * @Autor: Z_Y_C
 * @Date: 2021-07-29 22:48:57
 * @LastEditors: Z_Y_C
 * @LastEditTime: 2021-09-11 15:52:44
-->
<template>
  <div class="message-left">

    <div
      class="message-left-title1"
      role="button"
    >
      <i class="iconfont blog-paper-full message-left-title1-iconfont"></i>
      <span>消息中心</span>
    </div>

    <div
      v-for="(item, index) in menus"
      :key="item.id"
      class="message-left-title2"
      :class="messagetag === item.key ? 'message-left-title-color' : ''"
      @click="changeColor(item, [2, 3, 4, 1, 5][index])"
      role="button"
    >
      <div class="iconfont">
        <i :class="item.iconfont"></i>
      </div>
      <span class="message-left-title2-text">{{item.key}}</span>

      <n-badge
        :value="messageCount[index]"
        :max="99"
        v-if="messageCount[index]>0"
        :color="styles.pink0"
      />

    </div>

    <div class='message-left-line'></div>

    <div
      class="message-left-title3"
      :class="messagetag === menu.key ? 'message-left-title-color' : ''"
      @click="changeColor(menu)"
      role="button"
    >
      <div class="iconfont">
        <i :class="menu.iconfont"></i>
      </div>
      <div>{{menu.key}}</div>
    </div>

  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { getMessages } from '@/network/api/messages';
import { useMessage } from 'naive-ui';
import { mapState, mapMutations } from '@/util/store';
import styles from '@/assets/style/define.scss';

/**
 * @description: Message的子组件MessageLeft
 * @param {Array} menus 左侧菜单目录 `默认为[]`
 * @param {Object} menu 左侧菜单目录 `默认为{}`
 * @param {String} messagetag 当前页面名称 `默认为''`
 * @param {Function} changeColor 改变当前选中页面目录颜色 `默认为null`
 * @param {Array} menuData 菜单目录未读消息 `默认为[]`
 * @author: Z_Y_C
 */

export default defineComponent({
  name: 'MessageMenu',
  props: {
    menus: {
      type: Array,
      default: () => [],
    },
    menu: {
      type: Object,
      default: () => ({}),
    },
    messagetag: {
      type: String,
      default: '',
    },
    changeColor: {
      type: Function,
      default: null,
    },
  },
  setup(props) {
    const msg = useMessage(); // naive-ui mssage

    const { messageCount } = mapState('message', ['messageCount']); // 获取tokenInfo

    const { updateMessageCount } = mapMutations('message', ['updateMessageCount']);
    /**
     * @description: 得到未读消息之后查看路由，所在路由界面消息置为0
     * @return {void}
     * @author: Z_Y_C
     */

    getMessages()
      .then((data) => {
        updateMessageCount({ type: 2, count: data.count[0] });
        updateMessageCount({ type: 3, count: data.count[1] });
        updateMessageCount({ type: 4, count: data.count[2] });
        updateMessageCount({ type: 1, count: data.count[3] });
        updateMessageCount({ type: 5, count: data.count[4] });

        for (let i = 0; i < 5; i++) {
          if (props.menus[i].key === props.messagetag) {
            setTimeout(() => {
              // 延迟1s消失
              updateMessageCount({ type: [2, 3, 4, 1, 5][i], count: 0 });
            }, 1000);
          }
        }
      })
      .catch((error) => {
        console.log(error), msg.error('获取未读消息条数，请重试', { duration: 2000, closable: true });
      });

    return {
      styles,
      messageCount,
    };
  },
});
</script>

<style lang="scss" scoped>
$border-radius0: $border-radius-0;
$shadow0: $shadow-0;
$grey0: $grey-0;
$grey11: $grey-11;
$grey7: $grey-7;
$grey4: $grey-4;
$green0: $green-0;

.message-left {
  width: 120px;
  height: 343px;
  display: flex;
  flex-wrap: wrap;
  background-color: $grey0;
  margin: 10px 0 10px 0;
  padding: 12px 0 16px 20px;
  border-radius: $border-radius0;
  box-shadow: $shadow0;
  font-size: 14px;
  line-height: 18px;
  font-weight: 700;
  transition: all 0.4s;

  .message-left-title1 {
    margin-bottom: 25px;
    color: $grey11;

    .message-left-title1-iconfont {
      margin-right: 6px;
    }
  }

  .message-left-title2 {
    display: flex;
    align-items: center;
    padding: 15px 0;
    font-size: 14px;
    line-height: 18px;
    font-weight: 700;
    color: $grey7;
    transition: all 0.4s;

    .iconfont {
      width: 20px;
      height: 20px;
      font-size: 20px;
      margin-right: 5px;
    }

    .message-left-title2-text {
      margin-right: 4px;
    }
    &:hover {
      color: $green0;
    }
  }

  .message-left-line {
    width: 80px;
    height: 1px;
    margin: 15px 0;
    background-color: $grey-4;
  }

  .message-left-title3 {
    @include flex(center, initial, row);
    padding-top: 5px;
    color: $grey-7;
    transition: all 0.4s;

    .iconfont {
      width: 20px;
      height: 20px;
      font-size: 20px;
      margin-right: 5px;
    }

    &:hover {
      color: $green-0;
    }
  }

  .message-left-title-color {
    color: $green-0;
  }
}
</style>
