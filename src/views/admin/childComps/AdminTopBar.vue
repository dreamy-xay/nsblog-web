<!--
 * @Description:
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-06-09 13:15:08
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-06-19 13:34:07
-->

<template>
  <div class="admin-top-bar">
    <div class="admin-top-bar-left">
      <div
        class="left-menu"
        role="button"
        @click="$emit('mainMenuClick')"
      >
        <i class="iconfont blog-menu"></i>
      </div>
    </div>
    <div class="admin-top-bar-right">
      <div
        class="right-notice"
        role="button"
        @click="$emit('noticeClick')"
      >
        <el-badge
          :value="noticeSum"
          :max="maxNoticeSum"
          type="danger"
        ><i class="iconfont blog-tongzhi"></i></el-badge>
      </div>
      <div
        class="right-search"
        :class="{'input-focus': inputFocus}"
      >
        <input
          type="text"
          v-model="searchValue"
          @keyup.enter="searchClick"
          placeholder="Search for..."
          @focus="inputFocus = true"
          @blur="inputFocus = false"
        />
        <span
          role="button"
          :class="{'iconfont blog-cancel': true,'blog-cancel-active': searchValue!=''}"
          @click="cancelClick"
        ></span>
        <a
          href="javascript:;"
          @click="searchClick"
        >
          <span class="iconfont blog-search"></span>
        </a>
      </div>
      <div
        class="right-logout"
        role="button"
        @click="$emit('logoutClick')"
      >
        <i class="iconfont blog-logout"></i>
        Logout
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
/**
 * @description: 管理员界面顶部栏
 * @param {Number} noticeSum 通知数量 `必传参数`
 * @param {Number} maxNoticeSum 最大限制通知数量 `默认为99`
 * @event mainMenuClick 主菜单按钮点击事件
 * @event noticeClick 通知按钮点击事件
 * @event searchClick 搜索点击事件
 * @event logoutClick 登出点击事件
 * @author: dreamy-xay
 */

export default Vue.extend({
  name: 'adminTopBar',
  props: {
    noticeSum: {
      type: Number,
      required: true,
    },
    maxNoticeSum: {
      type: Number,
      default: 99,
    },
  },
  data() {
    return {
      currentIndex: 0,
      searchValue: '',
      inputFocus: false,
    };
  },
  methods: {
    searchClick() {
      if (this.searchValue) this.$emit('searchClick', this.searchValue);
    },
    cancelClick() {
      this.searchValue = '';
    },
  },
});
</script>

<style lang="scss" scoped>
.admin-top-bar {
  width: 100%;
  height: 70px;
  background-color: $admin-top-bar-background-color;
  position: sticky;
  top: 0;
  right: 0;
  overflow: hidden;

  .admin-top-bar-left,
  .admin-top-bar-right {
    height: 100%;
    overflow: hidden;
    display: flex;
    align-items: center;
  }

  .admin-top-bar-left {
    float: left;

    .left-menu {
      width: 50px;
      height: 50px;
      text-align: center;
      line-height: 50px;
      border-radius: 2px;
      overflow: hidden;
      transition: all 0.3s;
      margin-left: 20px;

      &:hover {
        background-color: $admin-top-bar-menu-hover-background-color;
      }

      .iconfont {
        font-size: 35px;
        font-weight: 600;
        color: $admin-top-bar-menu-icon-color;
      }
    }
  }

  .admin-top-bar-right {
    float: right;

    .right-logout {
      float: right;
      margin-right: 20px;
      color: $admin-top-bar-logout-text-color;
      transition: all 0.4s;
      line-height: 70px;

      &:hover {
        color: $admin-top-bar-logout-hover-text-color;
      }

      .iconfont {
        padding-top: 5px;
        font-size: 18px;
      }
    }

    .right-search {
      position: relative;
      float: right;
      height: 35px;
      width: 230px;
      background-color: $admin-top-bar-search-background-color;
      border-radius: 5px;
      overflow: hidden;
      margin-right: 20px;
      transition: all 0.3s;

      input {
        outline: none;
        height: 100%;
        border: 0;
        padding-left: 10px;
        padding-right: 16px;
        width: 195px;
        font-size: 14px;
        background-color: $admin-top-bar-search-input-background-color;
        color: $admin-top-bar-search-input-text-color;
        line-height: 35px;
        letter-spacing: 1px;
        transition: all 0.4s;

        &:focus {
          background-color: $admin-top-bar-search-input-focus-background-color;
        }
      }

      &.input-focus {
        background-color: $admin-top-bar-search-focus-background-color;
        box-shadow: 0 0 0 2px rgba(196, 189, 141, 0.25);
      }

      .blog-cancel {
        display: none;
        font-size: 12px;
        position: absolute;
        right: 37px;
        top: 10.5px;
      }

      .blog-cancel-active {
        display: inline-block;
      }

      a {
        position: absolute;
        right: 8px;
        top: 2.5px;

        &:hover .iconfont {
          color: $admin-top-bar-search-hover-icon-color;
        }

        .iconfont {
          transition: all 0.4s;
          line-height: 30px;
          font-size: 20px;
          color: $admin-top-bar-search-icon-color;
        }
      }
    }

    .right-notice {
      float: right;
      margin-right: 30px;
      padding-top: 5px;

      .iconfont {
        font-size: 24px;
        color: $admin-top-bar-notice-icon-color;
        transition: all 0.4s;

        &:hover {
          color: $admin-top-bar-notice-hover-icon-color;
        }
      }
    }
  }
}
</style>
