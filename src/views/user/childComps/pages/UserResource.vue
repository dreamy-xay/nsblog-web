<!--
 * @Description: 用户主页资源记录
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-09-07 16:24:57
 * @LastEditors: Z_Y_C
 * @LastEditTime: 2021-09-16 19:52:42
-->
<template>
  <div class="user-resource">
    <div
      v-for="(item, index) in resourceData"
      :key="index"
      class="user-resource-context"
    >
      <div class="top">{{item.name}}</div>
      <div class="center">{{item.remark}}</div>
      <div class="bottom">
        <div class="download">
          <div class="icon"><i class="iconfont blog-xiazai"></i></div>
          <div class="text">前往下载</div>
        </div>

        <div class="time">
          <div class="time-icon"><i class="iconfont blog-lishijilu-copy"></i></div>
          <div class="time-text">{{"创建于 "+dateFormat('YY-mm-dd HH:MM', new Date(item.time))}}</div>
        </div>

      </div>
    </div>

    <div
      class="button"
      role="button"
      v-if="loading"
      @click="addGroupData"
    >
      加载更多...
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive, ref } from 'vue';
import { getGroups } from '@/network/api/groups';
import { useRoute } from 'vue-router';
import styles from '@/assets/style/define.scss';
import { dateFormat } from '@/util/date';

/**
 * @description: 用户主页资源记录
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'userGroup',
  setup() {
    const route = useRoute();
    const username = route.params.username; // 获取路由的username
    const resourceData = reactive([]);
    const loading = ref(false); // 查看数据是否加载完
    const limit = 10; // 获取数据条数

    // 首次获取数据
    getGroups(username, 0, limit).then((data) => {
      // console.log(data.groups.length === limit);
      loading.value = data.groups.length === limit;
      resourceData.splice(0, 0, ...data.groups);
    });

    function addGroupData() {
      getGroups(username, resourceData.length, limit).then((data) => {
        loading.value = data.groups.length === limit;
        resourceData.splice(resourceData.length, 0, ...data.groups);
      });
    }

    return { styles, resourceData, dateFormat, addGroupData, loading };
  },
});
</script>

<style lang="scss" scoped>
.user-resource {
  width: 100%;
  @include flex(center, center, column);

  .user-resource-context {
    width: 858px;
    @include flex(initial, center, column);
    box-shadow: $shadow-0;
    border-radius: $border-radius-0;
    background-color: $grey-0;
    padding: 16px;
    margin-bottom: 16px;

    .top {
      font-size: 16px;
      color: $grey-11;
      height: 21px;
      line-height: 21px;
      margin-bottom: 5px;
    }

    .center {
      font-size: 14px;
      color: $grey-7;
      @include ellipsis(2);
      @include word-break;
      margin-bottom: 16px;
    }

    .bottom {
      @include flex(center, space-between, row);
      height: 20px;
      width: 100%;

      .download {
        @include flex(center, initial, row);
        .icon {
          line-height: 20px;
          height: 20px;
          margin-right: 5px;

          .iconfont {
            font-size: 16px;
            color: $grey-7;
          }
        }

        .text {
          color: $grey-10;
          font-size: 14px;
          height: 20px;
          line-height: 20px;
        }
      }

      .time {
        @include flex(center, initial, row);

        .time-icon {
          line-height: 20px;
          height: 20px;
          margin-right: 5px;

          .iconfont {
            font-size: 16px;
            color: $grey-7;
          }
        }

        .time-text {
          height: 20px;
          line-height: 20px;
          color: $grey-7;
        }
      }
    }
  }
  .button {
    @include flex(center, center);
    width: 300px;
    height: 32px;
    box-shadow: $shadow-0;
    border-radius: $border-radius-0;
    background-color: $grey-0;
    font-size: 14px;
    color: $grey-9;

    &:hover {
      color: $grey-10;
      background-color: $grey-1;
    }
  }
}
</style>
