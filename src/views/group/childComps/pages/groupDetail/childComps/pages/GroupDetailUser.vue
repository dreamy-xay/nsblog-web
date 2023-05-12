<!--
 * @Description: 搜索主页-用户
 * @Version:
 * @Autor: Ban
 * @Date: 2022-01-15 17:32:07
 * @LastEditors: Z_Y_C
 * @LastEditTime: 2022-02-20 16:43:33
-->
<template>
  <div class="groud-detail-user">
    <div class="groud-detail-user-list">
      <base-select-head
        :selectTag="selectTag"
        :menu="['小组成员', '管理员']"
        :selectMenu="[]"
        @changeTag="changeTag"
      >
      </base-select-head>
      <div
        class="groud-detail-user-list-content"
        v-for="item, index in userData"
        :key="index"
      >
        <div class="left">
          <base-avatar
            :src="item.avatar"
            :size="46"
            alt="data.username"
          />
        </div>
        <div class="center">
          <div class="username">
            <div
              class="username-content"
              role="button"
              @click="changePages('/user/' + item.nickname)"
            >
              {{ item.nickname }}
            </div>
          </div>
          <div class="sign">
            {{ item.signature }}</div>
        </div>
        <div
          :class="item.attention == 1 ? 'cancel' : 'focus'"
          role="button"
          @click="item.attention == 1 ? modal(index) : focus(index)"
        >{{item.attention == 1 ? "取消关注" : "关注"}}</div>
      </div>
      <base-content-loading
        :style="{padding: '16px 20px', boxSizing: 'border-box',borderTop: userData.length ? `1px solid ${styles.grey4}` : 0}"
        v-show="dataState"
      ></base-content-loading>
    </div>
    <search-page-to-load-more
      @click="getUser"
      v-show="!dataState && showButton"
    ></search-page-to-load-more>
    <base-modal
      content="确定要取消关注吗"
      :show="modalShow"
      @confirm="cancel"
      @cancel="close"
    />
  </div>
</template>

<script>
import { defineComponent, reactive, ref, onMounted, watch } from 'vue';
import BaseAvatar from '@/components/content/baseAvatar/BaseAvatar.vue';
import SearchPageToLoadMore from '@/views/search/childComps/SearchPageToLoadMore.vue';
import { useRoute } from 'vue-router';
import { getGroupUsers } from '@/network/api/groups';
import BaseContentLoading from '@/components/content/baseContentLoading/BaseContentLoading.vue';
import { mapGetters } from '@/utils/store';
import { useMessage } from 'naive-ui';
import BaseModal from '@/components/content/baseModal/BaseModal.vue';
import { addAttentions, deleteAttentions } from '@/network/api/attentions';
import BaseSelectHead from '@/components/common/baseSelectHead/BaseSelectHead.vue';
import styles from '@/assets/style/define.scss';

/**
 * @description: 搜索主页-用户
 * @author: Ban
 */

export default defineComponent({
  name: 'searchPageTag',
  components: {
    BaseAvatar,
    SearchPageToLoadMore,
    BaseContentLoading,
    BaseModal,
    BaseSelectHead,
  },
  setup(props, context) {
    // 用户搜索数据
    const userData = reactive([]);
    const route = useRoute(); // 路由
    const dataState = ref(false); //是否在获取数据
    const msg = useMessage();
    const modalShow = ref(false); // 是否展示模态框
    const selectedUser = ref(-1); // 选中用户索引
    const selectTag = ref(0); //选择 0:'小组成员', 1:'管理员'
    const showButton = ref(false); // 是否显示加载更多按钮
    const limit = 10; // 获取数据长度

    const { isLogin } = mapGetters('global', ['isLogin']); // 是否登录

    /**
     * @description:关注事件
     * @param {number} 索引 `必传参数`
     * @return {*}
     * @author: Ban
     */
    function focus(index) {
      if (isLogin.value)
        addAttentions(userData[index].nickname)
          .then(() => {
            userData[index].attention = 1;
            msg.success('关注成功');
          })
          .catch((error) => {
            console.log(error);
            msg.error('操作失败');
          });
      else msg.error('未登录');
    }

    /**
     * @description:取消关注事件
     * @author: Ban
     */

    function cancel() {
      if (isLogin.value) {
        if (selectedUser.value != -1)
          deleteAttentions(userData[selectedUser.value].nickname)
            .then(() => {
              userData[selectedUser.value].attention = 0;
              msg.success('取消成功');
              close();
            })
            .catch((error) => {
              console.log(error);
              msg.error('操作失败');
            });
      } else msg.error('未登录');
    }

    /**
     * @description: 获取用户搜索结果
     * @author: Ban
     */

    function getUser() {
      dataState.value = true;
      getGroupUsers(route.path.split('/')[2], selectTag.value, limit, userData.length)
        .then((data) => {
          showButton.value = data.users.length === limit;
          data.users.forEach((item) => {
            userData.push(item);
          });
          dataState.value = false;
        })
        .catch((error) => {
          console.log(error);
        });
    }

    onMounted(() => {
      getUser();
    });

    /**
     * @description: 监听路由query
     * @author: Ban
     */

    watch(
      () => [route.path.split('/')[2], selectTag.value],
      () => {
        userData.splice(0, userData.length); // 清空数组
        getUser(); // 重新获取数据
      }
    );

    /**
     * @description: 跳转页面
     * @param {string} path
     * @author: Ban
     */

    function changePages(path) {
      window.open(path, path);
    }

    /**
     * @description: 关闭模态框
     * @author: Ban
     */

    function close() {
      modalShow.value = false;
      selectedUser.value = -1;
    }

    /**
     * @description: 开启模态框
     * @param {number} index 索引
     * @author: Ban
     */

    function modal(index) {
      selectedUser.value = index;
      modalShow.value = true;
    }

    /**
     * @description: 改变选中标签
     * @param {Object} index 索引
     * @author: Ban
     */
    function changeTag(index) {
      selectTag.value = index.index;
    }

    return {
      userData,
      focus,
      cancel,
      getUser,
      changePages,
      dataState,
      modalShow,
      close,
      modal,
      selectTag,
      changeTag,
      styles,
      showButton,
    };
  },
});
</script>

<style lang="scss" scoped>
.groud-detail-user {
  width: 700px;
  @include flex(center, initial, column);

  .groud-detail-user-list {
    box-shadow: $shadow-0;
    border-radius: $border-radius-0;
    overflow: hidden;
    margin-bottom: 10px;
    width: 100%;

    .groud-detail-user-list-content {
      height: 93px;
      background: $grey-0;
      @include flex(center, space-between);
      box-sizing: content-box;
      padding: 0 24px;
      border-top: 1px solid $grey-4;

      &:nth-child(2) {
        border-top: none;
      }

      .center {
        width: 484px;
        height: 100%;
        color: $grey-8;
        margin-right: 12px;
        box-sizing: border-box;
        padding: 24px 0;
        @include flex(initial, space-around, column);

        .username {
          display: flex;

          .username-content {
            color: $grey-11;
            font-size: 16px;
            font-weight: 700;

            &:hover {
              color: $grey-8;
            }
          }
        }

        .sign {
          color: $grey-7;
          @include ellipsis(1);
        }
      }

      .focus {
        height: 28px;
        width: 82px;
        @include flex(center, center);
        background: $grey-0;
        box-shadow: $shadow-0;
        color: $grey-8;
        border-radius: 14px;
        transition: 0.25s;

        &:hover {
          box-shadow: $shadow-2;
          color: $green-0;
          transition: 0.25s;
        }
      }

      .cancel {
        height: 28px;
        width: 82px;
        @include flex(center, center);
        background: $green-0;
        box-shadow: $shadow-0;
        color: $grey-0;
        border-radius: 14px;
        transition: 0.25s;

        &:hover {
          background: $green-1;
          transition: 0.25s;
        }
      }
    }
  }
}
</style>
