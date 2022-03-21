<!--
 * @Description: 管理员头部导航
 * @Version:
 * @Autor: Z_Y_C
 * @Date: 2022-02-21 22:02:46
 * @LastEditors: Z_Y_C
 * @LastEditTime: 2022-03-21 17:13:26
-->
<template>
  <div class="admin-navigation">
    <div class="admin-navigation-left">
      <div
        v-show="showMenu"
        class="icon-menu"
        role="button"
        @click="changeMenu"
        :class="roateMenu ? '' : 'roate'"
      >
        <i class="iconfont blog-menu-fold-line"></i>
      </div>
      <div
        class="breadcrumb"
        v-for="(item , index) in breadcrumbData"
        :key="index"
      >
        <div class="content">
          <div
            class="icon"
            v-if="item.icon"
          >
            <i :class="'iconfont '+item.icon"></i>
          </div>
          {{item.content}}
        </div>

        <div
          class="icon-next"
          v-if="index != breadcrumbData.length-1"
        >
          <i class="iconfont blog-arrow-down"></i>
        </div>

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
          @click="changeSearch"
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
                  <el-tabs
                    class="demo-tabs"
                    v-model="activeName"
                  >
                    <el-tab-pane
                      label="通知"
                      name="first"
                    >
                    </el-tab-pane>
                    <el-scrollbar
                      v-if="activeName=='first'"
                      height="210px"
                    >
                      <div
                        v-for="(item , index) in notice"
                        :key="index"
                        class="notice-item"
                      >
                        <base-avatar
                          :size="50"
                          :src="item.avatar"
                          :style="{marginLeft:'15px'}"
                        />
                        <div class="text">{{item.content}}</div>
                      </div>
                    </el-scrollbar>
                    <div class="clean">
                      <div
                        class="icon"
                        role="button"
                        @click="jumpMessage"
                      >
                        <!-- <i></i> -->
                        查看全部
                      </div>
                    </div>
                  </el-tabs>
                </div>

              </el-dropdown-menu>

            </template>
          </el-dropdown>
        </div>
        <div
          class="icon"
          role="button"
          @click="fullscreen = changeFullScreen(fullscreen)"
        ><i :class=" fullscreen ? 'iconfont blog-ri-fullscreen-exit-fill':'iconfont blog-ri-fullscreen-fill'"></i></div>
        <div
          class="icon"
          role="button"
          @click="clickRefresh()"
        ><i class="iconfont blog-ri-refresh-line"></i></div>
      </div>
    </div>
  </div>

  <admin-search
    v-model:show="showSearch"
    @close-search="changeSearch"
  />
</template>
<script>
import { defineComponent, inject, reactive, ref } from 'vue';
import BaseAvatar from '@/components/content/baseAvatar/BaseAvatar.vue';
import AdminSearch from '@/views/admin/childComps/adminHead/childComps/AdminSearch.vue';
import events from '@/events';
import { clearToken } from '@/network/token';
import { mapMutations } from '@/util/store';
import { authLogout } from '@/network/api/auth';
import { changeFullScreen } from '@/util/dom';
import { useRouter } from 'vue-router';

/**
 * @description: 管理员头部导航
 * @param breadcrumbData 面包屑数据 `必传参数`
 * @author: Z_Y_C
 */

export default defineComponent({
  name: 'adminNavigation',
  components: {
    BaseAvatar,
    AdminSearch,
  },
  props: {
    breadcrumbData: {
      type: Array,
      require: true,
    },
  },
  setup() {
    const adminDropdownVisible = ref(false); // 下拉框显示
    const activeName = ref('first'); // el-tabs显示name
    const roateMenu = ref(true); // 图标旋转
    const showMenu = ref(true); // 显示展示子菜单目录
    const fullscreen = ref(false); // 是否全屏
    const showSearch = ref(false); // 显示搜索
    const { updateTokenInfo } = mapMutations('global', ['updateTokenInfo']); // 更新tokenInfo
    const router = useRouter();

    /**
     * @description: 点击用户下拉框
     * @param {number} index 下拉框下标
     * @return {void}
     * @author: Z_Y_C
     */
    function cliclItem(index) {
      adminDropdownVisible.value = false;
      if (index == 0) {
        router.push({ name: 'userCenter' });
      } else if (index == 1) {
        clearToken();
        updateTokenInfo({ status: false });
        // 登出
        authLogout().catch((error) => console.log(error));
        router.push({ name: 'login' });
      }
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

    const notice = reactive([
      { avatar: '', content: 'ZYC赞了你的评论' },
      { avatar: '', content: '收到了clq的打赏' },
      { avatar: '', content: 'xxb踩了你的回答' },
      { avatar: '', content: 'xay回答了你的问题' },
    ]); //消息通知

    /**
     * @description: 跳转到系统消息界面
     * @return {void}
     * @author: Z_Y_C
     */
    function jumpMessage() {
      router.push({ name: 'adminSystemNotice' });
    }

    // 刷新按钮页面
    const clickRefresh = inject('reload');

    /**
     * @description: 关闭或打开搜索
     * @return {void}
     * @author: Z_Y_C
     */
    function changeSearch() {
      showSearch.value = !showSearch.value;
    }

    return {
      cliclItem,
      changeAdminVisible,
      adminDropdownVisible,
      activeName,
      notice,
      changeMenu,
      roateMenu,
      showMenu,
      clickRefresh,
      changeFullScreen,
      fullscreen,
      showSearch,
      changeSearch,
      jumpMessage,
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

    .icon-menu {
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

    .breadcrumb {
      @include flex(center);
      color: $grey-8;

      .content {
        @include flex(center);
        font-size: 14px;

        .icon {
          height: 14px;
          line-height: 14px;
          margin-right: 3px;
          .iconfont {
            font-size: 14px;
          }
        }
      }

      .icon-next {
        margin: 0 10px;
        height: 14px;
        line-height: 14px;
        transform: rotate(-90deg);
        .iconfont {
          font-size: 14px;
        }
      }
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
  .demo-tabs {
    width: 270px;

    :deep(.el-tabs__header) {
      padding: 0 10px;
    }

    :deep(.el-tabs__active-bar) {
      width: 28px !important; // 选择标题下方蓝线
    }
  }
  .notice-item {
    @include flex(center);
    min-height: 50px;
    padding: 10px 10px;

    .text {
      width: 150px;
      margin-left: 10px;
      font-size: 14px;
      color: $grey-8;
      @include word-break;
    }
  }
  .clean {
    padding: 0 10px;
    @include flex(center, center, column);
    height: 32px;
    color: $blue-1;
    font-style: 14px;

    &:hover {
      color: $blue-0;
    }

    .icon {
      height: 100%;
      width: calc(100% - 10px);
      border-top: 1px solid $grey-2;
      @include flex(center, center);
      padding-top: 10px;
    }
  }
}
</style>
