<!--
 * @Description: 工作台动态信息
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2023-03-21 18:37:33
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2023-03-22 19:02:30
-->
<template>
  <div class="workbench-dynamic">
    <div class="workbench-dynamic-head">
      <div class="left">
        <div class="icon">
          <i class="iconfont blog-dongtai"></i>
        </div>
        最新动态
      </div>
      <a
        class="right"
        role="button"
        :href="`/user/${username}/dynamic`"
        :target="`/user/${username}/dynamic`"
      >
        更多
      </a>
    </div>
    <div class="workbench-dynamic-body">
      <div
        class="dynamic-info"
        v-for="(item, index) in dynamic"
        :key="index"
      >
        <div class="avatar">
          <img
            :src="avatarList[index]"
            alt="avatar"
          >
        </div>
        <div class="content">
          <div class="markdown">
            <v-md-preview :text="item.content" />
          </div>
          <div class="date">{{dateGetText(new Date(item.time),null,'YY-mm-dd')}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, defineComponent } from 'vue';
import { shuffle } from 'lodash';
import { dateGetText } from '@/util/date';

/**
 * @description: 工作台动态信息
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'workbenchDynamic',
  props: {
    dynamic: {
      type: Array,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const avatarList = computed(() =>
      shuffle(
        [...new Array(props.dynamic.length)].map(
          (_, index) =>
            `/admin/home/workbench/dynamic-avatar-${(index >= 6 ? Math.floor(Math.random() * 6) : index) + 1}.svg`
        )
      )
    ); // 头像列表

    return {
      avatarList,
      dateGetText,
    };
  },
});
</script>

<style lang="scss" scoped>
.workbench-dynamic {
  margin-top: 16px;
  width: 100%;
  border-radius: $border-radius-1;
  background-color: $grey-0;
  @include flex(center, center, column);
  overflow: hidden;

  & > div {
    width: 100%;
    box-sizing: border-box;
  }

  .workbench-dynamic-head {
    height: 58px;
    font-size: 16px;
    color: $grey-10;
    border-bottom: 1px solid $grey-4;
    padding: 0 24px;
    @include flex(center, space-between);

    .left,
    .right {
      height: 100%;
      @include flex(center);
    }

    .icon {
      margin-right: 6px;
      width: 16px;
      height: 16px;
      @include flex(center, center);

      .iconfont {
        font-size: 18px;
        margin-bottom: 1px;
      }
    }

    .right {
      color: $blue-1;
      transition: 0.25s;

      &:hover {
        color: $blue-2;
      }
    }
  }

  .workbench-dynamic-body {
    @include flex(center, center, column);
    width: 100%;
    padding: 24px;
    box-sizing: border-box;

    .dynamic-info {
      width: 100%;
      border-bottom: 1px solid $grey-4;
      box-sizing: border-box;
      padding: 12px 0;
      @include flex(initial, space-between);
      overflow: hidden;

      &:last-child {
        border: none;
      }

      .avatar {
        height: 30px;
        width: 30px;
        margin-right: 18px;
        border-radius: 50%;
        overflow: hidden;

        img {
          height: 100%;
          width: 100%;
        }
      }

      .content {
        width: calc(100% - 48px);
        height: 100%;
        @include flex(center, center, column);

        .markdown {
          width: 100%;
          :deep(.v-md-editor-preview > div) {
            padding: 0;

            & > p {
              margin-bottom: 0;
            }
          }
        }

        .date {
          margin-top: 5px;
          width: 100%;
          height: 22px;
          @include flex(center);
          font-size: 14px;
          color: $grey-8;
        }
      }
    }
  }
}
</style>
