<!--
 * @Description: 顶部右侧头像组件
 * @Version:
 * @Autor: Ban
 * @Date: 2021-07-19 18:32:43
 * @LastEditors: continue-hs
 * @LastEditTime: 2021-08-05 09:09:00
-->
<template>
  <div class="user">
    <div
      class="user-little-img"
      @mouseenter="avatarMissing"
    >
      <div v-show="avatarShow">
        <a :href="'/users/' + username">
          <img
            v-if="isLogin"
            :src="avatar"
            alt="avatar"
          />
        </a>
        <div
          v-if="!isLogin"
          @click="$router.push({name: 'signIn'})"
        >
          登录
        </div>
      </div>
    </div>
    <div
      v-if="isLogin"
      class="user-tool-bar"
      :class="{'user-tool-bar-show': toolBarShow}"
      :style="{display: toolBarDisplay}"
      @mouseleave="barMissing"
    >
      <div class="user-tool-bar-top">
        <a :href="'/users/' + username">
          <img
            :src="avatar"
            alt="avatar"
            class="bigImg"
          >
        </a>
        <div
          v-text="username"
          class="name"
        ></div>
        <div class="age">
          <div class="age-left">
            <span>学龄 </span> <span> {{ age }}年 </span>
          </div>
          <div class="age-right">
            <span> {{experience[0]}} </span>/<span> {{experience[1]}} </span>
          </div>
          <div class="age-line"></div>
          <div
            class="age-percent"
            :style="{width: setpercent + 'px'}"
          ></div>
        </div>
        <div class="top-bottom">
          <div class="bottom-left"><a href=""><i class="iconfont blog-zan"></i></a>
            <div class="like"> {{ like_count }} </div>
          </div>
          <div class="bottom-right"><a href="">
              <div class="zanborder"><i class="iconfont blog-youxiang"></i></div>
            </a></div>
        </div>
      </div>
      <div class="user-tool-bar-mid">
        <a
          href=""
          class="mid-left"
        >
          <span>关注</span>
          <div> {{ recommend_count ? recommend_count : '--' }} </div>
        </a>
        <a
          href=""
          class="mid-mid"
        >
          <span>粉丝</span>
          <div> {{ fans_count ? fans_count:'--'}} </div>
        </a>
        <a
          href=""
          class="mid-right"
        >
          <span>动态</span>
          <div> {{ dynamic_count ? dynamic_count : '--' }} </div>
        </a>
      </div>
      <div class="user-tool-bar-bottom">
        <ul>
          <li
            v-for="(bottom, index) in toolbarBottom"
            :key="bottom.name"
          >
            <a :href="bottom.url"><i
                class="iconfont"
                :class="iconfonts[index]"
              ></i> {{ bottom.name }} </a>
          </li>
        </ul>
      </div>
      <div class="user-tool-bar-exit">
        <a href=""><i class="iconfont blog-exit-door"></i> 退出</a>
      </div>
    </div>

  </div>
</template>

<script>
import { defineComponent, ref, onMounted, reactive, computed } from 'vue';
import { getUserInfo } from '@/network/api/user';
import { verifyToken } from '@/network/token';
/**
 * @description:  顶部头像组件
 * @author: Ban
 */
export default defineComponent({
  name: 'user',
  setup() {
    const isLogin = ref(verifyToken().status); // 是否已登录
    const avatar = ref('/home/avatarLoading.gif'); // 初始头像
    const username = ref('');
    const age = ref(0);
    const experience = reactive([0, 0]);
    const percent = ref(0);
    const like_count = ref(0);
    const recommend_count = ref(0);
    const fans_count = ref(0);
    const dynamic_count = ref(0);
    const toolbarBottom = [
      {
        name: '个人中心',
        url: '',
      },
      {
        name: '我的订阅',
        url: '',
      },
      {
        name: '数据统计',
        url: '',
      },
      {
        name: '文章管理',
        url: '',
      },
      {
        name: '个人设置',
        url: '',
      },
    ];
    const iconfonts = ['blog-gerenziliao', 'blog-xin', 'blog-shujutongji', 'blog-wenzhang', 'blog-shezhi1'];
    const avatarShow = ref(true);
    const toolBarShow = ref('');
    const toolBarDisplay = ref('none');

    //avatar显示和隐藏
    function avatarMissing() {
      if (!isLogin.value) return;
      avatarShow.value = false;
      toolBarShow.value = true;
      toolBarDisplay.value = 'flex';
    }

    function barMissing() {
      avatarShow.value = true;
      toolBarShow.value = false;

      setTimeout(() => {
        toolBarDisplay.value = 'none';
      }, 300);
    }

    onMounted(() => {
      getUserInfo()
        .then((data) => {
          username.value = data.username; //更新昵称
          recommend_count.value = data.recommend_count; //更新关注数量
          like_count.value = data.like_count; //更新点赞数量
          fans_count.value = data.fans_count; //更新粉丝数量
          dynamic_count.value = data.dynamic_count; //更新动态数量
          const a = new Date();
          const b = parseInt(data.registration_time.substring(0, 4)); //注册时间_年
          const c = a.getFullYear(); //现在时间_年
          age.value = c - b; //计算学龄_年
          //判断闰年，闰年366天，平年365天
          const isRunnian = (c % 4 == 0 && c % 100 != 0) || c % 400 == 0;
          experience[1] = isRunnian ? 366 : 365;
          //获取注册_月
          const d = parseInt(data.registration_time.substring(5, 7));
          //获取注册_日
          const e = parseInt(data.registration_time.substring(8, 10));
          //  计算天数
          experience[0] = (function () {
            let month,
              monthDay = 0;
            if (isRunnian) month = [0, 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
            else month = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
            for (let i = 1; i < d; i++) {
              monthDay += month[i];
            }
            return monthDay + e;
          })();
          avatar.value = data.avatar;
        })
        .catch((error) => {
          console.log(error);
          isLogin.value = false;
        });
    });

    const setpercent = computed(() => {
      return (experience[0] / experience[1]) * 190; //190是.age-percent的宽度
    });
    return {
      isLogin,
      avatar,
      username,
      age,
      experience,
      percent,
      like_count,
      recommend_count,
      fans_count,
      dynamic_count,
      toolbarBottom,
      iconfonts,
      avatarShow,
      toolBarShow,
      toolBarDisplay,
      avatarMissing,
      barMissing,
      setpercent,
    };
  },
});
</script>

<style lang="scss" scoped>
$avatarlitteImg: 36px;
$avatarbigImg: 68px;
$toolbarWidth: 240px;
$fontcolor: $grey-11;

.user {
  width: 32px;
  position: relative;
  color: $fontcolor;
  line-height: normal;

  .user-little-img {
    width: 50px;
    height: 50px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;

    img,
    div {
      width: $avatarlitteImg;
      height: $avatarlitteImg;
      border-radius: 50%;
      overflow: hidden;
    }

    div {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 14px;
      background-color: $grey-1;
      font-weight: 600;
      color: $green-0;
    }
  }

  .user-tool-bar {
    border-radius: 8px;
    box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.16);
    position: absolute;
    right: -106px;
    top: 50px;
    display: flex;
    width: $toolbarWidth;
    flex-direction: column;
    background: $grey-0;
    opacity: 0;
    transition: opacity 0.3s;

    &.user-tool-bar-show {
      opacity: 1;
    }

    .user-tool-bar-top {
      text-align: center;
      border-bottom: 1px solid $grey-4;

      .age {
        //line-height: 12px;
        position: relative;
        width: 100%;
        padding-bottom: 21px;

        .age-line {
          display: block;
          height: 1px;
          width: 190px;
          position: absolute;
          left: 25px;
          background: $grey-4;
          bottom: 0;
        }

        .age-left {
          float: left;
          margin-left: 25px;
          font-size: 14px;
          font-weight: 400;
        }

        .age-right {
          float: right;
          margin-right: 25px;
          font-size: 10px;
          color: $grey-9;
        }

        .age-percent {
          height: 1px;
          background: $green-0;
          position: absolute;
          left: 25px;
          bottom: 0;
          z-index: 1;
        }
      }

      .name {
        width: 100%;
        font-size: 16px;
        font-weight: 700;
        margin: 55px 0 22px 0;
      }

      @keyframes bigger {
        from {
          transform: translate(0, -30px) scale(0.529);
          opacity: 0;
        }
        to {
          transform: translate(0, 0) scale(1);
          opacity: 1;
        }
      }

      .bigImg {
        height: $avatarbigImg;
        width: $avatarbigImg;
        border-radius: 50%;
        position: absolute;
        top: -30px;
        left: 36%;
        animation: bigger 0.1s ease-out;
      }

      .top-bottom {
        width: 100%;

        .bottom-left {
          float: left;
          line-height: normal;
          margin: 8px 0 8px 23px;

          .blog-zan {
            font-size: 24px;
            color: $green-0;
          }

          .like {
            display: inline-block;
            transform: translate(6px, -4px);
            font-size: 13px;
          }
        }

        .bottom-right {
          float: right;
          margin-right: 23px;

          .zanborder {
            display: inline-block;
            background: $green-0;
            border-radius: 50%;
            height: 20px;
            width: 20px;
            text-align: center;
            margin-top: 10px;

            .blog-youxiang {
              font-size: 12px;
              color: $grey-0;
            }
          }
        }
      }
    }

    .user-tool-bar-mid {
      line-height: 8px;
      display: flex;
      padding: 14px 30px 14px 30px;
      text-align: center;
      font-weight: 700;
      border-bottom: 1px solid $grey-4;

      a div {
        margin-top: 20px;
        color: $grey-11;
      }

      a span {
        color: $grey-7;
        font-weight: 400;
        display: block;
      }

      a {
        width: 60px;
      }
    }

    .user-tool-bar-bottom {
      border-bottom: 1px solid $grey-4;

      ul li {
        line-height: 44px;
        display: block;

        &:hover {
          background: $grey-2;

          a {
            color: $green-0;
          }

          i {
            color: $green-0;
          }
        }

        a {
          margin-left: 20px;
          color: $grey-11;
          display: block;
          i {
            font-size: 20px;
            color: $grey-6;
          }
        }
      }
    }

    .user-tool-bar-exit {
      line-height: 44px;

      &:hover {
        background: $grey-2;

        a {
          color: $green-0;
        }

        i {
          color: $green-0;
        }
      }

      a {
        margin-left: 20px;
        color: $grey-11;

        i {
          font-size: 20px;
          color: $grey-6;
        }
      }
    }
  }
}
</style>
