<!--
 * @Description: 管理员头部导航
 * @Version:
 * @Autor: Z_Y_C
 * @Date: 2022-02-21 22:02:46
 * @LastEditors: Z_Y_C
 * @LastEditTime: 2022-02-27 23:28:14
-->
<template>
  <div class="admin-navigation">
    <div class="admin-navigation-left">
      <div
        v-show="showMenu"
        class="icon"
        role="button"
        @click="changeMenu"
        :class="roateMenu ? '' : 'roate'"
      >
        <i class="iconfont blog-menu-fold-line"></i>
      </div>
    </div>
    <div class="admin-navigation-right">
      <el-dropdown
        placement="bottom"
        @visible-change="changeAdminVisible"
      >
        <div
          role="button"
          class="admin-info"
        >
          <base-avatar
            :size="40"
            :src="'https://i.gtimg.cn/club/item/face/img/2/16022_100.gif'"
            :style="{marginLeft:'15px'}"
          />
          <div class="admin-name">admin
            <div class="icon"><i
                class="iconfont blog-arrow-down-s-line"
                :class="adminDropdownVisible ? 'rotate' : ''"
              ></i></div>
          </div>
        </div>
        <template #dropdown>
          <el-dropdown-menu v-show="adminDropdownVisible">
            <div
              class="admin-item"
              role="button"
              @click="cliclItem(0)"
            >
              <div class="icon"><i class="iconfont blog-ri-user-line"></i></div>
              个人中心
            </div>

            <div
              class="admin-item"
              role="button"
              @click="cliclItem(1)"
            >
              <div class="icon"><i class="iconfont blog-ri-logout-circle-r-line"></i></div>
              退出登录
            </div>
          </el-dropdown-menu>
        </template>
      </el-dropdown>

      <div class="right-icon">

        <div
          class="icon"
          role="button"
        ><i class="iconfont blog-ri-search-line"></i></div>

        <div class="notice">
          <el-dropdown placement="bottom">
            <el-badge
              :value="3"
              :max="99"
              class="item"
            >
              <div
                class="icon1"
                role="button"
              ><i class="iconfont blog-ri-notification-line"></i></div>
            </el-badge>

            <template #dropdown>
              <el-dropdown-menu>
                <div class="notice-content">
                  <div class="top">
                    <el-tabs
                      v-model="activeName"
                      class="demo-tabs"
                      @tab-click="handleClick"
                    >
                      <el-tab-pane
                        label="通知"
                        name="first"
                      >
                        <el-scrollbar height="210px">
                          <div
                            v-infinite-scroll="load"
                            infinite-scroll-delay="300"
                            :infinite-scroll-disabled="true"
                          >
                            <div
                              v-for="i in count"
                              :key="i"
                            >{{ i }}</div>
                          </div>
                        </el-scrollbar>
                      </el-tab-pane>
                      <el-tab-pane
                        label="邮件"
                        name="second"
                      >邮件</el-tab-pane>
                    </el-tabs>
                  </div>
                </div>
              </el-dropdown-menu>

            </template>
          </el-dropdown>
        </div>
        <div
          class="icon"
          role="button"
        ><i class="iconfont blog-ri-fullscreen-fill"></i></div>
        <div
          class="icon"
          role="button"
        ><i class="iconfont blog-ri-refresh-line"></i></div>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent, reactive, ref } from 'vue';
import BaseAvatar from '@/components/content/baseAvatar/BaseAvatar.vue';
import events from '@/events';

/**
 * @description: 管理员头部导航
 * @author: Z_Y_C
 */

export default defineComponent({
  name: 'adminNavigation',
  components: { BaseAvatar },
  setup(_, content) {
    const adminDropdownVisible = ref(false); // 下拉框显示
    const activeName = ref('first'); // el-tabs显示name
    const roateMenu = ref(true); // 图标旋转
    const showMenu = ref(true); // 显示展示子菜单目录
    /**
     * @description: 点击用户下拉框
     * @param {number} index 下拉框下标
     * @return {void}
     * @author: Z_Y_C
     */
    function cliclItem(index) {
      console.log(index);
      adminDropdownVisible.value = false;
    }

    events.on('AdmiSubMenu-subMenuChange', (showLength, show) => {
      roateMenu.value = show && showLength;
      showMenu.value = showLength;
    });

    /**
     * @description: 显示adminDropdownVisible下拉框
     * @param {boolean} e true:显示,false 隐藏
     * @return {void}
     * @author: Z_Y_C
     */
    function changeAdminVisible(e) {
      adminDropdownVisible.value = e;
    }

    /**
     * @description: 展开或关闭菜单
     * @return {void}
     * @author: Z_Y_C
     */
    function changeMenu() {
      // 监听全局修改事件
      events.emit('AdminNavigation-changeMenu');
      roateMenu.value = !roateMenu.value;
    }

    function handleClick(e) {
      activeName.value = e.paneName.value;
    }

    const count = reactive([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]);

    function load() {
      console.log('=============================');
      count.push(count.length + 1);
    }

    return {
      cliclItem,
      changeAdminVisible,
      adminDropdownVisible,
      activeName,
      handleClick,
      count,
      load,
      changeMenu,
      roateMenu,
      showMenu,
    };
  },
});
</script>

<style lang="scss" scoped>
.admin-navigation {
  box-sizing: border-box;
  width: 100%;
  height: 60px;
  @include flex(center, space-between);
  padding: 0 20px;

  .admin-navigation-left {
    height: inherit;
    @include flex(center);
    transition: 0.25s all;

    .icon {
      height: 16px;
      line-height: 16px;
      margin-right: 20px;
      color: $grey-8;

      .iconfont {
        font-size: 16px;
      }
    }
    .roate {
      transform: rotateY(180deg);
    }
  }

  .admin-navigation-right {
    height: inherit;
    @include flex(center, initial, row-reverse);

    .admin-info {
      @include flex(center);

      .admin-name {
        font-size: 14px;
        color: $grey-8;
        margin-left: 6px;
        @include flex(center);
        transition: 2s;

        .icon {
          height: 16px;
          width: 16px;
          @include flex(center, center);

          .iconfont {
            font-size: 12px;
            transition: 0.4s;
          }

          .rotate {
            transform: rotate(180deg);
          }
        }
      }
    }

    .right-icon {
      @include flex(center);

      .icon {
        color: $grey-8;
        margin-left: 20px;
        height: 16px;
        line-height: 16px;

        .iconfont {
          font-size: 16px;
        }
      }
      .notice {
        margin-left: 20px;
        .item {
          .icon1 {
            color: $grey-8;
            height: 16px;
            line-height: 16px;

            .iconfont {
              font-size: 16px;
            }
          }
        }
      }
    }
  }
}

:deep(.el-dropdown :focus-visible) {
  outline: none;
}

.admin-item {
  line-height: 22px;
  padding: 5px 16px;
  margin: 0;
  font-size: 14px;
  transition: 0.25s;
  @include flex(center);
  color: $grey-8;

  .icon {
    height: 22px;
    line-height: 22px;
    @include flex(center);
    margin-right: 3px;

    .iconfont {
      font-size: 16px;
    }
  }

  &:hover {
    background: rgba($blue-0, 0.2);
    color: $blue-1;
  }
}

.notice-content {
  padding: 0 10px;

  .demo-tabs {
    width: 270px;
    // .infinite-list {
    //   height: 10px;
    //   padding: 0;
    //   margin: 0;
    //   list-style: none;
    // }
  }
}
</style>
