<!--
 * @Description: 我的消息好友列表
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-08-18 17:21:17
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-08-19 15:06:19
-->
<template>
  <div class="message-my-friend">
    <div class="message-my-friend-head">
      近期消息
    </div>
    <div class="message-my-friend-body">
      <el-scrollbar>
        <div
          class="friend"
          v-for="(item, index) in friendList"
          :class="{'friend-active': activeIndex === index}"
          role="button"
          @click="friendClick(index)"
          @contextmenu.prevent="contextmenu($event, index)"
          :key="index"
        >
          <div class="friend-left">
            <base-avatar
              :src="item.avatar"
              :alt="item.username"
              :size="42"
              href="/"
            />
            <div class="info">
              <div class="username">
                {{item.nickname}}
              </div>
              <div class="content">
                {{item.content}}
              </div>
            </div>
          </div>
          <div class="friend-right">
            <n-badge
              :value="item.count"
              :max="99"
              :color="styles.pink0"
              v-if="item.count > 0"
            />
          </div>
        </div>
      </el-scrollbar>
    </div>
    <div
      class="message-my-friend-menu"
      v-clickOutside="menuClickOutside"
      v-show="menuShow"
      :style="menuStyle"
    >
      <div
        role="button"
        @click="enterUserPage"
      >个人主页</div>
      <div
        role="button"
        @click="deleteDialogue"
      >删除对话</div>
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive, ref } from 'vue';
import BaseAvatar from '@/components/content/baseAvatar/BaseAvatar.vue';
import styles from '@/assets/style/define.scss';

/**
 * @description: 我的消息好友列表
 * @param {Array} friendList 消息队列好友列表信息 `必传参数`
 * @event clickItem 点击好友项触发事件，回调索引值 (index) => void
 * @event deleteItem 删除好友聊天记录触发事件，回调索引值以及下一步操作函数 (index, next) => void
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'messageMyFriend',
  components: {
    BaseAvatar,
  },
  props: {
    friendList: {
      type: Array,
      required: true,
    },
  },
  setup(props, context) {
    const activeIndex = ref(-1); // 激活项
    const menuShow = ref(false); // 右键菜单是否显示
    const menuStyle = reactive({ left: 0, top: 0 }); // 右键菜单位置
    let currentMenuIndex = -1; // 当前右键菜单激活索引

    /**
     * @description: 点击好友对话项
     * @param {number} index
     * @return {void}
     * @author: dreamy-xay
     */
    function friendClick(index) {
      if (activeIndex.value !== index) {
        activeIndex.value = index;
        context.emit('clickItem', index);
      }
    }

    /**
     * @description: 右键菜单激活
     * @param {any} e 接收事件 `dom事件监听必传参数`
     * @param {number} index 右键菜单索引 `必传参数`
     * @return {void}
     * @author: dreamy-xay
     */
    function contextmenu(e, index) {
      currentMenuIndex = index;
      menuStyle.left = e.pageX + 'px';
      menuStyle.top = e.pageY + 'px';
      menuShow.value = true;
    }

    /**
     * @description: 点击个人主页
     * @return {void}
     * @author: dreamy-xay
     */
    function enterUserPage() {
      if (currentMenuIndex >= 0 && currentMenuIndex < props.friendList.length)
        window.open(`/user/${props.friendList[currentMenuIndex].username}`);
      currentMenuIndex = -1;
      menuShow.value = false;
    }

    /**
     * @description: 删除指定对话
     * @return {void}
     * @author: dreamy-xay
     */
    function deleteDialogue() {
      const isEqual = currentMenuIndex === activeIndex.value;
      if (currentMenuIndex >= 0 && currentMenuIndex < props.friendList.length)
        context.emit('deleteItem', currentMenuIndex, (callback) => {
          if (isEqual) activeIndex.value = -1;
          callback && callback(isEqual);
          currentMenuIndex = -1;
          menuShow.value = false;
        });
    }

    /**
     * @description: 点击菜单外触发
     * @return {void}
     * @author: dreamy-xay
     */
    function menuClickOutside() {
      currentMenuIndex = -1;
      menuShow.value = false;
    }

    return {
      styles,
      activeIndex,
      friendClick,
      contextmenu,
      enterUserPage,
      deleteDialogue,
      menuClickOutside,
      menuShow,
      menuStyle,
    };
  },
});
</script>

<style lang="scss" scoped>
.message-my-friend {
  width: 286px;
  height: 100%;
  overflow: hidden;
  border-right: 1px solid $grey-5;
  box-sizing: border-box;

  .message-my-friend-head {
    width: calc(100% - 24px);
    height: 36px;
    padding-left: 24px;
    @include flex(center);
    color: $grey-7;
    border-bottom: 1px solid $grey-5;
  }

  .message-my-friend-body {
    width: 100%;
    height: calc(100% - 37px);
    overflow: hidden;

    :deep(.el-scrollbar__thumb) {
      background-color: $grey-8;
    }

    .friend {
      height: 80px;
      width: 100%;
      @include flex(center, space-between);
      background-color: $grey-0;
      transition: 0.25s;

      & > div {
        height: 100%;
        @include flex(center);
      }

      &.friend-active {
        background-color: $green-0;

        .friend-left .info .username,
        .friend-left .info .content {
          color: $grey-0;
        }

        &:hover {
          background-color: $green-0;
        }
      }

      &:hover {
        background-color: $grey-2;
      }

      .friend-left {
        margin-left: 24px;

        .info {
          margin-left: 14px;
          height: 42px;
          width: 150px;

          & > div {
            height: 16px;
            @include ellipsis(1);
            line-height: 16px;
          }

          .username {
            font-size: 14px;
            font-weight: 600;
            color: $grey-11;
          }

          .content {
            font-size: 12px;
            color: $grey-7;
          }
        }
      }

      .friend-right {
        margin-right: 16px;
      }
    }
  }

  .message-my-friend-menu {
    position: fixed;
    width: 88px;
    height: 67px;
    overflow: hidden;
    border-radius: $border-radius-0;
    box-shadow: $shadow-0;
    z-index: 1002;

    div {
      width: 100%;
      height: 50%;
      @include flex(center, center);
      background-color: $grey-0;
      transition: 0.25s;
      font-size: 14px;
      font-weight: 600;
      color: $grey-10;

      &:hover {
        background-color: $grey-2;
      }
    }
  }
}
</style>
