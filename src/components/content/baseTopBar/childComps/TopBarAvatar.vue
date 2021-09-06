<!--
 * @Description: 顶部右侧头像组件
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-07-19 18:32:43
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-09-06 11:53:55
-->
<template>
  <div class="top-bar-avatar">
    <a
      href="/login/signIn"
      v-if="!tokenInfo.status"
    >
      <div
        class="top-bar-avatar-not-login"
        role="button"
      >
        登录
      </div>
    </a>
    <el-popover
      v-else
      placement="bottom"
      popper-class="top-bar-avatar-inner"
      :width="null"
      :show-arrow="false"
      trigger="hover"
      :show-after="200"
      :offset="10"
      @show="updateActive(true)"
      @hide="updateActive(false)"
    >
      <div class="user-info">
        <div class="user-info-top">
          <a
            :href="'/users/' + username"
            class="avatar"
            :class="{active: active}"
          >
            <base-avatar
              size="100%"
              :src="avatar"
              alt="avatar"
            />
          </a>
          <div class="name">
            {{username}}
          </div>
          <div class="age">
            <div class="age-left">
              学龄 {{age}}年
            </div>
            <div class="age-right">
              {{remainDay}}/365
            </div>
            <div class="age-line"></div>
            <div
              class="age-percent"
              :style="{width: setpercent}"
            ></div>
          </div>
          <div class="info">
            <div class="info-left">
              <i class="iconfont blog-zan"></i>
              {{likeCount}}
            </div>
            <a :href="'/user/' ">
              <div
                class="info-right"
                role="button"
              >
                <i class="iconfont blog-youxiang"></i>
              </div>
            </a>
          </div>
        </div>
        <div class="user-info-mid">
          <a
            v-for="(item, index) in detail"
            :key="index"
            :href="item.url"
            class="inner"
            role="button"
          >
            <div>{{item.name}}</div>
            <div>{{item.count}}</div>
          </a>
        </div>
        <div class="user-info-bottom">
          <a
            v-for="(item, index) in menu"
            :href="item.url"
            :key="index"
            role="button"
          >
            <div class="item">
              <div>
                <i :class="'iconfont ' + item.icon"></i>
              </div>
              {{item.name}}
            </div>
          </a>
        </div>
        <div
          class="user-info-exit"
          role="button"
          @click="exit"
        >
          <div>
            <i class="iconfont blog-exit-door"></i>
          </div>
          退出
        </div>
      </div>
      <template #reference>
        <div
          class="top-bar-avatar-login"
          role="button"
          :class="{active: active}"
        >
          <base-avatar
            size="100%"
            v-show="showAvatar"
            :src="avatar"
            alt="avatar"
            :href="'/users/' + username"
            target="_self"
          />
        </div>
      </template>
    </el-popover>
  </div>
</template>

<script>
import { defineComponent, ref, computed } from 'vue';
import BaseAvatar from '@/components/content/baseAvatar/BaseAvatar.vue';
import { getUserInfo } from '@/network/api/user';
import { clearToken } from '@/network/token';
import { getCurrentDiffirence } from '@/util/date';
import { mapState, mapMutations } from '@/util/store';

/**
 * @description:  顶部头像组件
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'topBarAvatar',
  components: {
    BaseAvatar,
  },
  setup() {
    const { updateTokenInfo } = mapMutations('global', ['updateTokenInfo']); // 更新tokenInfo
    const { tokenInfo } = mapState('global', ['tokenInfo']); // 获取tokenInfo
    const avatar = ref('/home/avatarLoading.gif'); // 初始头像
    const username = ref(''); // 用户名
    const age = ref(0); // 学龄
    const remainDay = ref(0); // 多余学龄天数
    const likeCount = ref(0); // 点赞数
    const recommendCount = ref(0); // 关注数
    const fansCount = ref(0); // 粉丝数
    const dynamicCount = ref(0); // 动态数
    // 中间菜单
    const menu = [
      {
        name: '个人中心',
        url: '/userCenter/profile',
        icon: 'blog-gerenziliao',
      },
      {
        name: '我的订阅',
        url: '#',
        icon: 'blog-xin',
      },
      {
        name: '数据统计',
        url: '#',
        icon: 'blog-shujutongji',
      },
      {
        name: '文章管理',
        url: '#',
        icon: 'blog-wenzhang',
      },
      {
        name: '隐私设置',
        url: '/userCenter/setting',
        icon: 'blog-shezhi1',
      },
    ];

    // 获取用户信息
    if (tokenInfo.value.status) {
      getUserInfo(tokenInfo.value.username)
        .then((data) => {
          username.value = data.username; //更新昵称
          recommendCount.value = data.recommend_count; //更新关注数量
          likeCount.value = data.like_count; //更新点赞数量
          fansCount.value = data.fans_count; //更新粉丝数量
          dynamicCount.value = data.dynamic_count; //更新动态数量
          const date = new Date(data.registration_time);
          const diff = getCurrentDiffirence(date);
          remainDay.value = diff % 365;
          age.value = Math.floor(diff / 365);
          avatar.value = data.avatar;
        })
        .catch((error) => {
          console.log(error);
          updateTokenInfo({ status: false });
        });
    }

    // 激活经验条宽度
    const setpercent = computed(() => {
      const rate = remainDay.value / 365;
      return 'calc(' + rate * 100 + '% - ' + (40 % rate) + 'px)';
    });

    // 计算关注，粉丝等细节
    const detail = computed(() => {
      return [
        {
          name: '关注',
          url: '#',
          count: recommendCount.value ? recommendCount.value : '--',
        },
        {
          name: '粉丝',
          url: '#',
          count: fansCount.value ? fansCount.value : '--',
        },
        {
          name: '动态',
          url: '#',
          count: dynamicCount.value ? dynamicCount.value : '--',
        },
      ];
    });

    /**
     * @description: 登出
     * @return {void}
     * @author: dreamy-xay
     */
    function exit() {
      clearToken();
      updateTokenInfo({ status: false });
    }

    const active = ref(false); // 是否激活显示菜单
    const showAvatar = ref(true); // 是否显示头像
    function updateActive(isActive) {
      if (isActive) {
        showAvatar.value = false;
        setTimeout(() => {
          active.value = true;
        }, 0);
      } else {
        active.value = false;
        setTimeout(() => {
          showAvatar.value = true;
        }, 90);
      }
    }

    return {
      tokenInfo,
      avatar,
      username,
      age,
      remainDay,
      likeCount,
      menu,
      setpercent,
      detail,
      exit,
      active,
      updateActive,
      showAvatar,
    };
  },
});
</script>

<style lang="scss" scoped>
.top-bar-avatar {
  height: 100%;
  display: flex;
  align-items: center;
  overflow: hidden;

  .top-bar-avatar-not-login {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    background-color: $grey-1;
    font-weight: 600;
    color: $green-0;
    transition: 0.25s;

    &:hover {
      color: $green-1;
      background-color: $grey-2;
    }
  }

  .top-bar-avatar-login {
    width: 36px;
    height: 36px;
  }
}

.top-bar-avatar-inner {
  .user-info {
    position: relative;
    width: 240px;
    display: inline-block;

    .user-info-top {
      border-bottom: 1px solid $grey-3;

      .avatar {
        overflow: hidden;
        position: absolute;
        top: -47px;
        height: 36px;
        width: 36px;
        border-radius: 50%;
        left: calc(50% - 18px);
        transition: 0.09s linear;

        &.active {
          height: 68px;
          width: 68px;
          top: -34px;
          left: calc(50% - 34px);
        }
      }

      .name {
        width: 100%;
        height: 17px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: $grey-11;
        font-size: 16px;
        font-weight: 600;
        margin: 49px 0 22px 0;
      }

      .age {
        position: relative;
        width: 100%;
        height: 19px;
        overflow: hidden;
        padding-bottom: 16px;

        .age-left,
        .age-right {
          display: flex;
          align-items: center;
        }

        .age-left {
          float: left;
          margin-left: 20px;
          font-size: 14px;
          color: $grey-11;
        }

        .age-right {
          float: right;
          margin-right: 20px;
          font-size: 11px;
          color: $grey-9;
        }

        .age-line,
        .age-percent {
          height: 1.5px;
          position: absolute;
          left: 20px;
          bottom: 9px;
        }

        .age-line {
          width: calc(100% - 40px);
          background: $grey-4;
        }

        .age-percent {
          width: 0;
          transition: 0.4s;
          background: $green-0;
        }
      }

      .info {
        width: calc(100% - 40px);
        height: 20px;
        padding: 0 20px 10px 20px;

        .info-left,
        .info-right {
          height: 100%;
          display: flex;
          align-items: center;
        }

        .info-left {
          float: left;
          user-select: none;
          font-size: 13px;

          .iconfont {
            font-size: 22px;
            color: $green-0;
            margin-right: 6px;
          }
        }

        .info-right {
          float: right;
          height: 20px;
          width: 20px;
          overflow: hidden;
          border-radius: 50%;
          background-color: $green-0;
          justify-content: center;

          .iconfont {
            font-size: 13px;
            color: $grey-0;
            transform: translateX(-0.4px);
          }
        }
      }
    }

    .user-info-mid {
      padding: 12px 3px 11px 3px;
      height: 41px;
      width: calc(100% - 6px);
      display: flex;
      justify-content: center;
      align-items: center;
      border-bottom: 1px solid $grey-3;

      .inner {
        display: inline-block;
        height: 100%;
        width: 78px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;

        div {
          display: flex;
          align-items: center;
          justify-content: center;

          &:first-child {
            color: $grey-7;
            font-size: 14px;
            height: 19px;
            margin-bottom: 5px;
          }

          &:last-child {
            color: $grey-11;
            font-size: 15px;
            font-weight: 600;
            height: 17px;
          }
        }
      }
    }

    .user-info-bottom {
      border-bottom: 1px solid $grey-3;
      overflow: hidden;
      width: 100%;
      padding: 7px 0;

      a {
        display: block;
        width: calc(100% - 20px);
        padding-left: 20px;
        height: 44px;
        transition: 0.25s;

        &:hover {
          background: $grey-2;

          .item {
            color: $green-0;

            .iconfont {
              color: $green-0;
            }
          }
        }

        .item {
          float: left;
          height: 100%;
          display: flex;
          align-items: center;
          color: $grey-11;
          font-size: 16px;
          transition: 0.25s;
          letter-spacing: 1px;

          div {
            width: 20px;
            height: 20px;
            margin-right: 10px;
            display: flex;
            justify-content: center;
            align-items: center;

            .iconfont {
              font-size: 20px;
              color: $grey-6;
            }
          }
        }
      }
    }

    .user-info-exit {
      height: 44px;
      width: calc(100% - 21px);
      margin: 7px 0;
      padding-left: 21px;
      font-size: 16px;
      display: flex;
      align-items: center;
      transition: 0.25s;
      color: $grey-11;
      letter-spacing: 1px;

      &:hover {
        background: $grey-2;
        color: $green-0;

        .iconfont {
          color: $green-0;
        }
      }

      div {
        width: 20px;
        height: 20px;
        margin-right: 10px;
        display: flex;
        justify-content: center;
        align-items: center;

        .iconfont {
          font-size: 20px;
          color: $grey-6;
          transition: 0.25s;
        }
      }
    }
  }
}
</style>
