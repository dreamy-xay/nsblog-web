<!--
 * @Description:搜索学习小组
 * @Version:
 * @Autor: xiao
 * @Date: 2022-01-14 18:52:17
 * @LastEditors: Z_Y_C
 * @LastEditTime: 2022-02-20 18:30:17
-->
<template>
  <div class="search-page-studygroup">
    <div class="search-page-studygroup-less">
      <div
        v-for="(group,index) in groups"
        :key="index"
      >
        <div class="groups">
          <div class="name">
            {{group.name}}
            <div
              class="join"
              role="button"
              @click="joinGroup(group)"
              v-show="group.join===0"
            >
              <i class="iconfont blog-daochu1024-29"></i>
              加入
            </div>
            <div
              v-show="group.join===1"
              class="join"
              role="button"
              @click="showExit(index)"
            >
              已加入
            </div>
          </div>
          <div class="remark">{{group.remark}}</div>
          <div class="category-member-count">
            <div class="category">
              <i class="iconfont blog-zhu"></i>
              {{group.topic_name}}
            </div>
            <div class="member-count">
              <i class="iconfont blog-xiaozu1"></i>
              {{group.member_count}}
            </div>
          </div>
        </div>
      </div>
      <base-content-loading
        v-show="showContentLoading"
        :style="{padding: '16px 0 12px 0', borderTop: groups.length ? `1px solid ${styles.grey4}` : 0}"
      />
    </div>
    <search-page-to-load-more
      @onButtonClick="getData"
      :show='showLoading'
    ></search-page-to-load-more>
  </div>
  <base-modal
    content="确定要退出学习小组吗"
    :show="modalShow"
    @confirm="exitGroup"
    @cancel="close"
  />
</template>

<script>
import { defineComponent, reactive, ref, onMounted, watch } from 'vue';
import { useMessage } from 'naive-ui';
import { search } from '@/network/api/search';
import { useRoute } from 'vue-router';
import SearchPageToLoadMore from '@/views/search/childComps/SearchPageToLoadMore.vue';
import BaseModal from '@/components/content/baseModal/BaseModal.vue';
import BaseContentLoading from '@/components/content/baseContentLoading/BaseContentLoading.vue';
import styles from '@/assets/style/define.scss';
import { mapGetters } from '@/util/store';
import { addGroup, deleteGroup } from '@/network/api/groups';

/**
 * @description:搜索学习小组
 * @author: xiao
 */

export default defineComponent({
  name: 'searchPageStudygroup',
  components: {
    SearchPageToLoadMore,
    BaseModal,
    BaseContentLoading,
  },
  emits: ['changeActiveIndex'],
  setup(_, context) {
    const msg = useMessage(); // naive-ui 组件
    const groups = reactive([]); //学习小组数据
    const show = ref(false); //是否加载更多
    const change = ref(true); //是否加入
    const route = useRoute(); // route
    const modalShow = ref(false); //是否显示退出提示
    const selectGroup = ref(-1); //选择的小组下标
    const showLoading = ref(false); // 显示按钮
    const showContentLoading = ref(false); // 是否显示加载内容过渡
    const limit = 10; // 获取数据条数
    const { isLogin } = mapGetters('global', ['isLogin']); // 是否登录

    /**
     * @description: 获取数据
     * @author: Ban
     */
    function getData() {
      search(route.query.keyword, 3, limit, groups.length, '', '', {
        beforeRequest() {
          showContentLoading.value = true;
        },
        afterResponse() {
          showContentLoading.value = false;
        },
      })
        .then((data) => {
          console.log('data', data);
          showLoading.value = data.gropus.length === limit;

          data.gropus.forEach((item) => {
            groups.push(item);
            // context.emit('changeLoadingState', 3, true);
          });
          console.log(groups);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    onMounted(() => {
      context.emit('changeActiveIndex', 3);
      getData();
    });

    watch(
      () => route.query.keyword,
      () => {
        groups.splice(0, groups.length); // 清空数组
        getData(); // 重新获取数据
      }
    );

    /**
     * @description: 加入学习小组
     * @param {*} index 选择点击的小组
     * @return {void}
     * @author: xiao
     */
    function joinGroup(group) {
      if (isLogin.value) {
        addGroup(group.name)
          .then(() => {
            group.join = 1;
            msg.success('加入学习小组成功');
          })
          .catch((error) => {
            console.log(error);
            msg.error('加入学习小组失败');
          });
      } else msg.error('请先登录');
    }

    /**
     * @description: 关闭提示框
     * @return {void}
     * @author: xiao
     */
    function close() {
      modalShow.value = false;
    }

    /**
     * @description: 显示提示框
     * @param {number} index 选择的小组下标
     * @return {void}
     * @author: xiao
     */
    function showExit(index) {
      if (isLogin.value) {
        selectGroup.value = index;
        modalShow.value = true;
      } else msg.error('请先登录');
    }

    /**
     * @description: 退出学习小组
     * @return {void}
     * @author: xiao
     */
    function exitGroup() {
      deleteGroup(groups[selectGroup.value].name)
        .then(() => {
          groups[selectGroup.value].join = 0;
          msg.success('退出学习小组成功');
          selectGroup.value = null;
        })
        .catch((error) => {
          console.log(error);
          msg.error('退出学习小组失败');
        });
      modalShow.value = false;
    }

    return {
      groups,
      getData,
      joinGroup,
      exitGroup,
      showExit,
      close,
      show,
      change,
      modalShow,
      styles,
      showLoading,
      showContentLoading,
    };
  },
});
</script>

<style lang="scss" scoped>
.search-page-studygroup {
  @include flex(center, center, column);

  .search-page-studygroup-less {
    width: 660px;
    height: 100%;
    background: $grey-0;
    border-radius: $border-radius-0; //圆角
    box-shadow: $shadow-0;
    padding: 4px 20px;
    margin-bottom: 10px;

    & > div {
      &:nth-child(1) div {
        border-top: none;
      }
    }

    .groups {
      widows: 660px;
      height: 84px;
      padding: 12px 0 12px 0;
      border-top: 1px solid $grey-4;

      .name {
        height: 24px;
        margin-bottom: 11px;
        font-size: 16px;
        font-weight: bold;
        @include flex(center, center);
        justify-content: space-between;

        .join {
          font-size: 14px;
          color: $grey-7;
          height: 24px;
          width: 66px;
          border-radius: 4px;
          border: solid 1px $grey-7;
          @include flex(center, center);
          transition: 0.25s;
          font-weight: normal;

          .iconfont {
            margin-right: 4.78px;
            font-size: 12px;
          }

          &:hover {
            border-color: $green-1;
            color: $green-1;
          }
        }
      }

      .remark {
        height: 22px;
        margin-bottom: 10px;
        width: 571px;
        @include ellipsis(1);
        font-size: 13px;
        color: $grey-7;
      }

      .category-member-count {
        height: 20px;
        margin-bottom: 11.8px;
        @include flex(center, flex-start);

        .category {
          border-radius: $border-radius-1; //圆角
          border: 1px solid $green-1;
          box-shadow: $shadow-0;
          color: $green-1;
          margin-right: 24px;
          font-size: 14px;
          padding: 0px 4px;
        }

        .member-count {
          font-size: 14px;
          color: $grey-7;
        }
      }
    }
  }
}
</style>
