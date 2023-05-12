<!--
 * @Description: 用户主页学习小组记录
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-09-07 16:24:57
 * @LastEditors: Z_Y_C
 * @LastEditTime: 2022-02-15 18:29:00
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
          @click="changePage(item.name)"
        >{{item.name}}</div>
        <div
          class="join-box"
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

  <base-modal
    content="确定要退出学习小组吗"
    :show="modalShow"
    @confirm="delGroup()"
    @cancel="modalShow = !modalShow"
  />
</template>

<script>
import { defineComponent, reactive, ref } from 'vue';
import { addGroup, getGroups, deleteGroup } from '@/network/api/groups';
import { useRoute, useRouter } from 'vue-router';
import BaseTag from '@/components/content/baseTag/BaseTag.vue';
import styles from '@/assets/style/define.scss';
import { dateFormat } from '@/utils/date';
import { useMessage } from 'naive-ui';
import UserNull from '@/views/user/childComps/UserNull.vue';
import BaseModal from '@/components/content/baseModal/BaseModal.vue';
import { mapGetters } from '@/utils/store';

/**
 * @description: 用户主页学习小组记录
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'userGroup',
  components: {
    BaseTag,
    UserNull,
    BaseModal,
  },
  setup() {
    const msg = useMessage(); // naive-ui
    const route = useRoute();
    const router = useRouter();
    const username = route.params.username; // 获取路由的username
    const groupData = reactive([]);
    const loading = ref(false); // 查看数据是否加载完
    const limit = 10; // 获取数据条数
    const modalShow = ref(false); //是否显示退出提示
    const indexTag = ref(null); // 记录下标
    const { isLogin } = mapGetters('global', ['isLogin']); // 是否登录

    // 首次获取数据
    addGroupData();

    /**
     * @description: 加载更多数据
     * @return {void}
     * @author: Z_Y_C
     */
    function addGroupData() {
      getGroups(username, groupData.length, limit)
        .then((data) => {
          loading.value = data.groups.length === limit;
          groupData.splice(groupData.length, 0, ...data.groups);
        })
        .catch((error) => {
          console.log(error);
          msg.error('获取学习小组信息失败');
        });
    }

    /**
     * @description: 加入学习小组
     * @param {Number} index 数据下标
     * @return {Void}
     * @author: Z_Y_C
     */
    function changeJoin(index) {
      if (isLogin.value) {
        if (!groupData[index].join) {
          addGroup(groupData[index].name)
            .then(() => {
              groupData[index].join = 1;
              msg.success('加入学习小组成功');
            })
            .catch((error) => {
              console.log(error);
              msg.error('加入学习小组失败');
            });
        } else {
          indexTag.value = index;
          modalShow.value = true;
        }
      } else msg.error('请先登录');
    }

    /**
     * @description: 退出学习小组
     * @return {void}
     * @author: Z_Y_C
     */
    function delGroup() {
      deleteGroup(groupData[indexTag.value].name)
        .then(() => {
          groupData[indexTag.value].join = 0;
          msg.success('退出学习小组成功');
          indexTag.value = null;
        })
        .catch((error) => {
          console.log(error);
          msg.error('退出学习小组失败');
        });
      modalShow.value = false;
    }

    /**
     * @description: 进入学习小组主页
     * @param {string} name 学习小组名
     * @return {void}
     * @author: Z_Y_C
     */
    function changePage(name) {
      router.push(`/group/${name}`);
    }

    return {
      styles,
      groupData,
      dateFormat,
      addGroupData,
      loading,
      changeJoin,
      modalShow,
      delGroup,
      changePage,
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

        &:hover {
          color: $grey-8;
        }
      }

      .join-box {
        height: 22px;
        width: 64px;
        @include flex(center, center);
        border-radius: $border-radius-1;
        border: 1px solid $grey-7;
        font-size: 14px;
        color: $grey-7;
        transition: 0.25s;

        .join {
          height: 100%;
          @include flex(center, center);

          .icon {
            height: 100%;
            margin-right: 5px;
            @include flex(center, center);

            .iconfont {
              font-size: 12px;
            }
          }
        }

        &:hover {
          border-color: $green-1;
          color: $green-1;
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
