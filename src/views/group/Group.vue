<!--
 * @Description:
 * @Version:
 * @Autor: xiao
 * @Date: 2022-01-21 19:42:59
 * @LastEditors: xiao
 * @LastEditTime: 2022-01-22 14:39:45
-->
<template>
  <base-view
    :background="true"
    :top-bar="true"
    :top-bar-scroll="true"
    bind-class="group"
  >
    <template #top-bar-bottom>
      <base-topic-bar />
    </template>

    <div class="group-container">
      <search-page-studygroup class="group-search" />
      <div class="group-create">
        <div
          class="create-button"
          role="button"
          @click="createGroup"
        >
          <i class="iconfont blog-chuangjianxiaozu"></i>
          创建学习小组
        </div>
      </div>
    </div>
    <group-popover v-model:modelValue="isShow" />
  </base-view>
</template>

<script>
import { defineComponent, ref } from 'vue';
import BaseView from '@/components/content/baseView/BaseView.vue';
import BaseTopicBar from '@/components/common/baseTopicBar/BaseTopicBar.vue';
import SearchPageStudygroup from '@/views/search/childComps/pages/SearchPageStudygroup.vue';
import GroupPopover from '@/views/group/childComps/GroupPopover.vue';

/**
 * @description:
 * @author: xiao
 */

export default defineComponent({
  name: 'group',
  components: {
    BaseView,
    BaseTopicBar,
    SearchPageStudygroup,
    GroupPopover,
  },

  setup() {
    const isShow = ref('false'); //是否显示创建小组页面

    /**
     * @description: 点击创建学习小组
     * @return {*}
     * @author: xiao
     */
    function createGroup() {
      isShow.value = !isShow.value;
    }

    return {
      createGroup,
      isShow,
    };
  },
});
</script>

<style lang="scss" scoped>
.group {
  .group-container {
    @include flex();
    margin: 16px 0px 16px 75px;

    .group-search {
      margin-right: 16px;
    }

    .group-create {
      width: 284px;
      height: 72px;
      background: $grey-0;
      border-radius: $border-radius-0;
      box-shadow: $shadow-0;
      @include flex(center, center);

      .create-button {
        @include flex(center, center);
        width: 252px;
        height: 40px;
        background: $grey-0;
        border: 1px solid $green-1;
        border-radius: $border-radius-1;
        font-size: 14px;
        font-weight: 700;
        color: $green-1;
        transition: 0.25s;

        .iconfont {
          font-size: 23px;
          margin-right: 9.7px;
          font-weight: normal;
        }

        &:hover {
          border: 1px solid $green-1;
          color: $grey-0;
          background: $green-1;
        }
      }
    }
  }
}
</style>
