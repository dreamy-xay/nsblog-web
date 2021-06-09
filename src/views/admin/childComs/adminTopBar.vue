<template>
  <div class="admin-top-bar">
    <div class="admin-top-bar-left">
      <div
        class="left-menu"
        role="button"
        @click="$emit('mainMenuClick')"
      >
        <i class="iconfont blog-caidan1"></i>
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
          :max="99"
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
export default {
  name: 'adminTopBar',
  props: {
    noticeSum: {
      type: Number,
      required: true,
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
      if ((this as any).searchValue) (this as any).$emit('searchClick', (this as any).searchValue);
    },
    cancelClick() {
      (this as any).searchValue = '';
    },
  },
};
</script>

<style lang="scss" scoped>
.admin-top-bar {
  width: 100%;
  height: 70px;
  background-color: #6f6486;
  position: sticky;
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
        background-color: #5e4d81;
      }

      .iconfont {
        font-size: 35px;
        font-weight: 600;
        color: white;
      }
    }
  }

  .admin-top-bar-right {
    float: right;

    .right-logout {
      float: right;
      margin-right: 20px;
      color: #d6cbcb;
      transition: all 0.4s;
      line-height: 70px;

      &:hover {
        color: white;
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
      background-color: rgba(255, 255, 255, 0.2);
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
        background-color: rgba(255, 255, 255, 0.8);
        color: #6c757d;
        line-height: 35px;
        letter-spacing: 1px;
        transition: all 0.4s;

        &:focus {
          background-color: white;
        }
      }

      &.input-focus {
        background-color: rgba(255, 255, 255, 0.4);
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
          color: white;
        }

        .iconfont {
          transition: all 0.4s;
          line-height: 30px;
          font-size: 20px;
          color: #371777;
        }
      }
    }

    .right-notice {
      float: right;
      margin-right: 30px;
      padding-top: 5px;

      .iconfont {
        font-size: 24px;
        color: #d6cbcb;
        transition: all 0.4s;

        &:hover {
          color: white;
        }
      }
    }
  }
}
</style>
