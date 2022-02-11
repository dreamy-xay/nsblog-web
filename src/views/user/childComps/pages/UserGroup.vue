<!--
 * @Description: 用户主页学习小组记录
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-09-07 16:24:57
 * @LastEditors: Z_Y_C
 * @LastEditTime: 2022-02-10 20:59:55
-->
<template>
  <div
    class="user-group"
    v-if="groupData.length"
  >
    <div
      v-for="(item, index) in groupData"
      :key="index"
      class="user-group-context"
    >
      <div class="top">
        <div
          class="name"
          role="button"
        >{{item.name}}</div>
        <div
          :class="item.join == 0 ? 'no' : 'yes'"
          role="button"
          @click="changeJoin(index)"
        >
          <div
            v-if="item.join == 0"
            class="join"
          >
            <div class="icon"><i class="iconfont blog-daochu1024-29"></i></div>
            <div>加入</div>
          </div>

          <div v-else>已加入</div>
        </div>
      </div>
      <div class="center">{{item.remark}}</div>
      <div class="bottom">
        <div class="info">
          <base-tag
            :text="item.topic_name"
            :hollow="true"
            :size="20"
            :color="styles.orange0"
            :href="`/group?topic=${item.topic_name}`"
            :target="`/group?topic=${item.topic_name}`"
          >
            <template #text-pre>
              <i class="iconfont blog-zhu"></i>
            </template>
          </base-tag>
          <div class="number">
            <div class="icon"><i class="iconfont blog-ruqunrenshu"></i></div>
            <div class="text">{{item.member_count + '人'}}</div>
          </div>
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

  <user-null
    v-else
    :select="true"
  />
</template>

<script>
import { defineComponent, reactive, ref } from 'vue';
import { getGroups } from '@/network/api/groups';
import { useRoute } from 'vue-router';
import BaseTag from '@/components/content/baseTag/BaseTag.vue';
import styles from '@/assets/style/define.scss';
import { dateFormat } from '@/util/date';
import { useMessage } from 'naive-ui';
import UserNull from '@/views/user/childComps/UserNull.vue';

/**
 * @description: 用户主页学习小组记录
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'userGroup',
  components: {
    BaseTag,
    UserNull,
  },
  setup() {
    const msg = useMessage(); // naive-ui
    const route = useRoute();
    const username = route.params.username; // 获取路由的username
    const groupData = reactive([]);
    const loading = ref(false); // 查看数据是否加载完
    const limit = 10; // 获取数据条数

    // 首次获取数据
    getGroups(username, 0, limit)
      .then((data) => {
        console.log(data);
        loading.value = data.groups.length === limit;
        groupData.splice(0, 0, ...data.groups);
      })
      .catch((error) => {
        console.log(error);
        msg.error('获取学习小组信息失败', { duration: 2000, closable: true });
      });

    function addGroupData() {
      getGroups(username, groupData.length, limit)
        .then((data) => {
          loading.value = data.groups.length === limit;
          groupData.splice(groupData.length, 0, ...data.groups);
        })
        .catch((error) => {
          console.log(error);
          msg.error('获取学习小组信息失败', { duration: 2000, closable: true });
        });
    }

    /**
     * @description: 退出或加入学习小组
     * @param {Number} index 数据下标
     * @return {Void}
     * @author: Z_Y_C
     */
    function changeJoin(index) {
      groupData[index].join = !groupData[index].join;
    }

    return {
      styles,
      groupData,
      dateFormat,
      addGroupData,
      loading,
      changeJoin,
    };
  },
});
</script>

<style lang="scss" scoped>
.user-group {
  width: 100%;
  @include flex(center, center, column);

  .user-group-context {
    width: 858px;
    @include flex(initial, center, column);
    box-shadow: $shadow-0;
    border-radius: $border-radius-0;
    background-color: $grey-0;
    padding: 16px;
    margin-bottom: 16px;

    .top {
      @include flex(center, space-between);

      .name {
        font-size: 16px;
        color: $grey-11;
        height: 21px;
        line-height: 21px;
        font-weight: 700;
      }

      .yes {
        height: 24px;
        width: 44px;
        padding: 0 12px;
        @include flex(center, center);
        border-radius: $border-radius-1;
        border: 1px solid $green-1;
        font-size: 14px;
        color: $green-1;
        transition: 0.25s;

        &:hover {
          box-shadow: $shadow-2;
        }
      }

      .no {
        height: 24px;
        width: 44px;
        padding: 0 12px;
        @include flex(center, center);
        border-radius: $border-radius-1;
        border: 1px solid $grey-7;
        font-size: 14px;
        color: $grey-7;
        transition: 0.25s;

        .join {
          height: 100%;
          @include flex(center, space-between);

          .icon {
            width: 12px;
            height: 100%;
            margin-right: 4px;
            @include flex(center, center);

            .iconfont {
              font-size: 12px;
            }
          }
        }

        &:hover {
          color: $green-0;
          border: 1px solid $green-0;
        }
      }
    }

    .center {
      margin-top: 5px;
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

      .info {
        @include flex(center, initial, row);
        .iconfont {
          font-size: 12px;
          margin-right: 5px;
        }

        .number {
          @include flex(center, initial, row);
          .icon {
            line-height: 20px;
            height: 20px;
            margin-left: 24px;
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
