<!--
 * @Description:学习小组列表
 * @Version:
 * @Autor: xiao
 * @Date: 2022-01-14 18:52:17
 * @LastEditors: xiao
 * @LastEditTime: 2022-02-13 14:12:08
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
              @click="showExit(group)"
            >
              已加入
            </div>
          </div>
          <div class="remark">{{group.remark}}</div>
          <div class="category-member-count">
            <base-tag
              :text="group.topic_name"
              :hollow="true"
              :size="20"
              :color="styles.green1"
              :href="`/group?topic=${group.topic_name}`"
              :target="`/group?topic=${group.topic_name}`"
            >
              <template #text-pre>
                <i class="iconfont blog-zhu"></i>
              </template>
            </base-tag>
            <div class="member-count">
              <i class="iconfont blog-xiaozu1"></i>
              {{group.member_count}}
            </div>
          </div>
          <hr style="background-color: #e5e5e5;height:0.5px; border:none;">
        </div>
      </div>
    </div>
    <div
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
import { useMessage } from 'naive-ui';
import { addGroup, deleteGroup } from '@/network/api/groups';
import { useRouter } from 'vue-router';
import styles from '@/assets/style/define.scss';
import BaseTag from '@/components/content/baseTag/BaseTag.vue';

/**
 * @description:学习小组列表
 * @param {Array} studyGroups 学习小组数据
 * @author: xiao
 */

export default defineComponent({
  name: 'searchPageStudygroup',
  components: {
    BaseModal,
    BaseTag,
  },
  emits: ['changeGroupJoin', 'updateGroups'],
  props: {
    studyGroups: {
      type: Array,
      required: true,
    },
  },

  setup(props, context) {
    const msg = useMessage(); // naive-ui 组件
    const modalShow = ref(false); //是否显示退出提示
    const selectGroup = ref(-1); //选择的小组下标
    const router = useRouter();

    /**
     * @description: 加载更多
     * @return {void}
     * @author: xiao
     */
    function moreGroup() {
      console.log('updateGroups');
      context.emit('updateGroups', false);
    }

    /**
     * @description: 加入学习小组
     * @param {*} index 选择点击的小组
     * @return {void}
     * @author: xiao
     */
    function joinGroup(group) {
      //加入学习小组
      addGroup(group.name)
        .then(() => {
          msg.success(`加入小组成功`);
          group.join = 1;
        })
        .catch((error) => {
          console.log(error);
          msg.error('加入小组失败', { duration: 2000, closable: true });
        });
    }

    /**
     * @description: 退出学习小组
     * @return {void}
     * @author: xiao
     */
    function exitGroup() {
      console.log('props.studyGroups[selectGroup.value].name', props.studyGroups[selectGroup.value].name);
      //退出学习小组
      deleteGroup(props.studyGroups[selectGroup.value].name)
        .then(() => {
          msg.success(`退出成功`);
          context.emit('changeGroupJoin', selectGroup.value);
          modalShow.value = false;
        })
        .catch((error) => {
          console.log(error);
          msg.error('退出小组失败', { duration: 2000, closable: true });
        });
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
     * @param {object} group 选择的小组
     * @return {void}
     * @author: xiao
     */
    function showExit(group) {
      for (let index = 0; index < props.studyGroups.length; index++) {
        if (props.studyGroups[index] == group) {
          selectGroup.value = index;
        }
      }
      modalShow.value = true;
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

    return {
      moreGroup,
      joinGroup,
      exitGroup,
      modalShow,
      showExit,
      close,
      changePage,
      styles,
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
          font-size: 14px;
          color: $grey-7;
          height: 24px;
          width: 66px;
          border-radius: 4px;
          border: solid 1px $grey-7;
          @include flex(center, center);
          transition: 0.25s;

          .iconfont {
            font-size: 14px;
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
          margin-left: 24px;
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
