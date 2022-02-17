<!--
 * @Description: 用户中心左侧基本信息
 * @Version:
 * @Autor: Z_Y_C
 * @Date: 2021-09-10 09:23:58
 * @LastEditors: Z_Y_C
 * @LastEditTime: 2022-02-17 13:51:15
-->
<template>
  <div class="user-info-information">
    <div class="user-info-information-title"> 基本信息</div>

    <div
      class="user-info-information-context"
      v-for="(item,index) in icon1Data"
      :key=index
    >
      <div class="user-info-information-context-icon"><i :class="item"></i></div>

      <div
        v-if="index === 0"
        class="user-info-information-context-text1"
      >{{informData[index]}}</div>

      <a
        v-else-if="index === 1"
        class="user-info-information-context-text2"
        role="button"
        :href="informData[index]"
        :target="informData[index]"
      >{{informData[index]}}</a>

      <div
        v-if="index === 2"
        class="user-info-information-context-text3"
      >
        <div
          class="lable"
          role="button"
          v-for="(tag, index) in informData[index]"
          :key="index"
          v-show="(index < 5 || tagsShow) && tag !== ''"
          @click="jumpTagPage(tag)"
        >
          {{tag}}
        </div>

        <div
          @click="tagsShow =! tagsShow"
          role="button"
        >
          <div
            v-show="!self && informData[2].length === 0"
            class="lable"
          >暂无标签</div>

          <div
            v-show="self && informData[2].length === 0"
            class="lable"
            @click="changeUserCenter"
          >添加标签</div>
          <div
            v-show="!tagsShow && informData[2].length > 5"
            class="lable"
          > 显示全部...</div>
          <div
            v-show="tagsShow && informData[2].length > 5"
            class="lable"
          >收起</div>
        </div>

      </div>
    </div>

    <div class="user-info-information-web">

      <i
        v-if="data.qq"
        role="button"
        class="iconfont blog-qq-s iconfontqq"
      ></i>
      <a
        :href="'https://www.weibo.com/u/' + data.weibo"
        :target="'https://www.weibo.com/u/' + data.weibo"
      >
        <i
          v-if="data.weibo"
          role="button"
          class="iconfont blog-weibo  iconfontweibo"
        ></i>
      </a>

      <a :href="'mailto:' + data.email">
        <i
          role="button"
          class="iconfont blog-email1 iconfontemail"
        ></i>
      </a>
    </div>
  </div>
</template>

<script>
import { computed, defineComponent, ref } from 'vue';
import router from '@/router';

/**
 * @description:用户中心左侧基本信息
 * @param {Object} data 用户中心左侧基本信息数据 `必传参数`
 * @param {null | Boolean} self 用户是否是自己或在线，是自己为true 用户退出登录为null 不是自己false `必传参数`
 * @author: Z_Y_C
 */
export default defineComponent({
  name: 'userInfoInformation',
  props: {
    data: {
      type: Object,
      required: true,
    },
    self: {
      required: true,
    },
  },
  setup(props) {
    const tagsShow = ref(false); // 显示全部或者收起
    const icon1Data = ['iconfont blog-xingbie', 'iconfont blog-wangluo', 'iconfont blog-biaoqian1']; // 图标

    //  处理基本信息数据
    const informData = computed(() => {
      if (props.data.username) {
        return [
          props.data.gender !== null ? (props.data.gender ? '女' : '男') : '保密',
          `${window.location.host}/blog/${props.data.username}`,
          props.data.tags,
        ];
      }
      return ['', '', ['']];
    });

    /**
     * @description: 点击添加标签跳转路由
     * @return {void}
     * @author: Z_Y_C
     */
    function changeUserCenter() {
      router.push({
        name: 'userCenterProfile',
        params: {
          toBottom: true,
        },
      });
    }

    /**
     * @description: 跳转标签
     * @param {string} tag 标签名
     * @return {void}
     * @author: Z_Y_C
     */
    function jumpTagPage(tag) {
      router.push(`/tag/${tag}`);
    }

    return { icon1Data, informData, tagsShow, changeUserCenter, jumpTagPage };
  },
});
</script>

<style lang="scss" scoped>
.user-info-information {
  width: 100%;
  @include flex(initial, center, column);

  .user-info-information-title {
    margin-left: 16px;
    font-size: 16px;
    font-weight: 700;
    color: $grey-11;
    line-height: 21px;
  }

  .user-info-information-context {
    @include flex(initial, initial, row);
    margin: 16px 0 0 16px;

    .user-info-information-context-icon {
      width: 20px;
      height: 20px;
      margin-right: 10px;
      color: $grey-9;
      .iconfont {
        font-size: 20px;
      }
    }

    .user-info-information-context-text1 {
      font-size: 14px;
      color: $grey-8;
    }

    .user-info-information-context-text2 {
      font-size: 14px;
      color: $grey-8;
      @include ellipsis(1);
      margin-right: 16px;
      height: 20px;
      line-height: 20px;
      transition: all 0.25s;

      &:hover {
        color: $green-0;
      }
    }

    .user-info-information-context-text3 {
      @include flex(initial, initial, row);
      flex-wrap: wrap;
      width: 176px;

      .lable {
        height: 16px;
        background-color: $grey-3;
        border-radius: $border-radius-1;
        font-size: 12px;
        color: $grey-8;
        padding: 0 8px;
        margin: 0 4px 10px 4px;
        max-width: 168px;
        @include ellipsis(1);
        transition: all 0.25s;

        &:hover {
          background-color: $grey-4;
          color: $grey-10;
        }
      }
    }
  }

  .user-info-information-web {
    @include flex(center, initial, row);
    margin: 6px 16px 0 16px;
    height: 20px;

    .iconfont {
      color: $grey-7;
      font-size: 20px;
      margin-right: 16px;
    }

    .iconfontqq {
      &:hover {
        color: $blue-1;
      }
    }

    .iconfontweibo {
      &:hover {
        color: $red-3;
      }
    }

    .iconfontemail {
      &:hover {
        color: $blue-0;
      }
    }
  }
}
</style>
