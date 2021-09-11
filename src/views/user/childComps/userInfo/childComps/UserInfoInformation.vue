<!--
 * @Description:
 * @Version:
 * @Autor: Z_Y_C
 * @Date: 2021-09-10 09:23:58
 * @LastEditors: Z_Y_C
 * @LastEditTime: 2021-09-11 15:09:51
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
        v-if="index===0"
        class="user-info-information-context-text1"
      >{{informData[index]}}</div>

      <a
        v-else-if="index===1"
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
          v-show="index < 5 || tagsShow"
        >
          {{tag}}
        </div>

        <div
          @click="tagsShow =! tagsShow"
          role="button"
        >
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
        class="iconfont blog-qq-s"
      ></i>
      <a
        :href="'https://www.weibo.com/u/' + data.weibo"
        :target="'https://www.weibo.com/u/' + data.weibo"
      >
        <i
          v-if="data.weibo"
          role="button"
          class="iconfont blog-weibo"
        ></i>
      </a>

      <a :href="'mailto:'+data.email">
        <i
          role="button"
          class="iconfont blog-email1"
        ></i>
      </a>
    </div>
  </div>
</template>

<script>
import { computed, defineComponent, ref } from 'vue';

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
    const tagsShow = ref(false);
    const icon1Data = ['iconfont blog-xingbie', 'iconfont blog-wangluo', 'iconfont blog-biaoqian1'];
    const informData = computed(() => {
      if (props.data.username) {
        return [
          props.data.gender !== null ? (props.data.gender ? '女' : '男') : '保密',
          `${process.env.VUE_APP_APIHOST}/blog/${props.data.username}`,
          props.data.tags,
        ];
      }
      return ['', '', ''];
    });

    return { icon1Data, informData, tagsShow };
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
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      word-break: break-all;
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

      &:first-child {
        &:hover {
          color: $blue-1;
        }
      }

      &:nth-child(2) {
        &:hover {
          color: $red-3;
        }
      }

      &:last-child {
        &:hover {
          color: $blue-0;
        }
      }
    }
  }
}
</style>
