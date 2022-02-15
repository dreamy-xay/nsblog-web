<!--
 * @Description:学习小组列表
 * @Version:
 * @Autor: xiao
 * @Date: 2022-01-14 18:52:17
 * @LastEditors: Z_Y_C
 * @LastEditTime: 2022-02-15 23:26:52
-->
<template>
  <div class="group-list">
    <div class="group-list-less">
      <div
        v-for="(group,index) in studyGroups"
        :key="index"
      >
        <div class="groups">
          <div class="name">
            <div
              role="button"
              @click="changePage(group.name)"
            >
              {{group.name}}
            </div>
            <div
              class="join"
              role="button"
              @click="joinGroup(index)"
              v-show="group.join===0"
            >
              <div class="icon">
                <i class="iconfont blog-daochu1024-29"></i>
              </div>
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
            <div
              role="button"
              @click="onTag(group)"
            >
              <base-tag
                :text="group.topic_name"
                :hollow="true"
                :size="20"
                :color="styles.green1"
              >
                <template #text-pre>
                  <i class="iconfont blog-zhu"></i>
                </template>
              </base-tag>
            </div>
            <div class="member-count">
              <div class="icon">
                <i class="iconfont blog-xiaozu1"></i>
              </div>
              {{group.member_count}}
            </div>
          </div>
          <hr style="background-color: #e5e5e5;height:0.5px; border:none;">
        </div>
      </div>
      <base-content-loading
        v-show="showContentLoading"
        :style="{paddingTop: studyGroups.length ? '16px':'0'}"
      />
    </div>
    <div
      v-if="showLoading && !showContentLoading"
      class="group-list-more"
      role="button"
      @click="moreGroup"
    >
      加载更多...
    </div>
  </div>
  <base-modal
    content="确定要退出学习小组吗"
    :show="modalShow"
    @confirm="exitGroup"
    @cancel="close"
  />
</template>

<script>
import { defineComponent, ref } from 'vue';
import BaseModal from '@/components/content/baseModal/BaseModal.vue';
import { useRouter } from 'vue-router';
import styles from '@/assets/style/define.scss';
import BaseTag from '@/components/content/baseTag/BaseTag.vue';
import BaseContentLoading from '@/components/content/baseContentLoading/BaseContentLoading.vue';
import { mapGetters } from '@/util/store';
import { useMessage } from 'naive-ui';

/**
 * @description:学习小组列表
 * @param {Array} studyGroups 学习小组数据
 * @param {Boolean} showContentLoading 是否显示加载内容过渡
 * @param {Boolean} showLoading 是否显示加载按钮
 * @author: xiao
 */

export default defineComponent({
  name: 'searchPageStudygroup',
  components: {
    BaseModal,
    BaseTag,
    BaseContentLoading,
  },
  emits: ['changeGroupJoin', 'updateGroups'],
  props: {
    studyGroups: {
      type: Array,
      required: true,
    },
    showContentLoading: {
      type: Boolean,
      required: true,
    },
    showLoading: {
      type: Boolean,
      required: true,
    },
  },

  setup(props, context) {
    const msg = useMessage(); // naive-ui 消息组件
    const modalShow = ref(false); //是否显示退出提示
    const selectGroup = ref(-1); //选择的小组下标
    const router = useRouter();
    const { isLogin } = mapGetters('global', ['isLogin']); // 是否登录

    /**
     * @description: 加载更多
     * @return {void}
     * @author: xiao
     */
    function moreGroup() {
      context.emit('updateGroups', false); //更新学习小组
    }

    /**
     * @description: 加入学习小组
     * @param {number} index 选择的小组下标
     * @return {void}
     * @author: xiao
     */
    function joinGroup(index) {
      context.emit('changeGroupJoin', index);
    }

    /**
     * @description: 退出学习小组
     * @return {void}
     * @author: xiao
     */
    function exitGroup() {
      context.emit('changeGroupJoin', selectGroup.value);
      modalShow.value = false;
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
     * @description: 进入学习小组主页
     * @param {string} name 学习小组名
     * @return {void}
     * @author: xiao
     */
    function changePage(name) {
      router.push(`/group/${name}`);
    }

    /**
     * @description: 点击标签
     * @param {*} group 标签所属的小组
     * @return {void}
     * @author: xiao
     */
    function onTag(group) {
      router.push({
        name: 'groupHome',
        query: { topic: group.topic_name },
      });
    }

    return {
      moreGroup,
      joinGroup,
      exitGroup,
      modalShow,
      showExit,
      close,
      changePage,
      styles,
      onTag,
    };
  },
});
</script>

<style lang="scss" scoped>
.group-list {
  @include flex(center, center, column);
  margin-right: 16px;

  .group-list-less {
    width: 660px;
    height: 100%;
    background: $grey-0;
    border-radius: $border-radius-0; //圆角
    box-shadow: $shadow-0;
    padding: 16px 20px;

    & > div {
      &:nth-child(1) div {
        margin-top: 0px;
      }
    }

    .groups {
      widows: 660px;
      height: 84px;
      margin-top: 24px;

      .name {
        height: 24px;
        margin-bottom: 11px;
        font-size: 16px;
        font-weight: bold;
        @include flex(center, center);
        justify-content: space-between;
        transition: 0.25s;

        &:hover {
          color: $grey-8;
        }

        .join {
          height: 22px;
          width: 64px;
          @include flex(center, center);
          border-radius: $border-radius-1;
          border: 1px solid $grey-7;
          font-size: 14px;
          color: $grey-7;
          transition: 0.25s;
          font-weight: normal;

          .icon {
            height: 100%;
            margin-right: 5px;
            @include flex(center, center);

            .iconfont {
              font-size: 12px;
            }
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

        .iconfont {
          font-size: 12px;
          margin-right: 5px;
        }

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
          margin-left: 24px;
          @include flex(center, center);

          .icon {
            line-height: 20px;
            .iconfont {
              font-size: 14px;
            }
          }
        }
      }
    }
  }

  .group-list-more {
    @include flex(center, center);
    width: 300px;
    height: 32px;
    border-radius: $border-radius-0; //圆角
    box-shadow: $shadow-0;
    margin-top: 10px;
    color: $grey-9;
    background: $grey-0;
    font-size: 14px;
    transition: 0.25s;

    &:hover {
      color: $green-1;
    }
  }
}
</style>
