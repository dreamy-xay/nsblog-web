<!--
 * @Description: 学习小组资源页面
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2022-01-29 16:44:56
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2022-02-21 20:17:23
-->
<template>
  <div class="group-detail-resource">
    <div class="group-detail-resource-inner">
      <base-select-head
        :select-tag="selectTag"
        :select-time="selectTime"
        @change-tag="changeTag"
        @change-select="changeSelect"
      />
      <div class="contont">
        <resource-body :resource-data="resourceData" />
        <base-content-loading
          v-show="showContentLoading"
          :style="{padding: '16px 0 12px 0', borderTop: resourceData.length ? `1px solid ${styles.grey4}` : 0}"
        />
      </div>
    </div>
    <div
      class="group-detail-resource-loading"
      role="button"
      v-show="showLoading && !showContentLoading"
      @click="getMoreInfo"
    >加载更多...</div>
  </div>
</template>

<script>
import { defineComponent, reactive, ref } from 'vue';
import BaseSelectHead from '@/components/common/baseSelectHead/BaseSelectHead.vue';
import ResourceBody from '@/views/resource/childComps/pages/resourceHome/childComps/resourceLeft/ResourceBody.vue';
import BaseContentLoading from '@/components/content/baseContentLoading/BaseContentLoading.vue';
import { useMessage } from 'naive-ui';
import { getGroupResources } from '@/network/api/groups';
import styles from '@/assets/style/define.scss';
import { useRoute } from 'vue-router';

/**
 * @description: 学习小组资源页面
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'groupDetailResource',
  components: {
    BaseSelectHead,
    ResourceBody,
    BaseContentLoading,
  },
  setup() {
    const msg = useMessage(); // naive-ui组件
    const route = useRoute(); // route
    const groupName = route.params.groupName; // 学习小组名
    const selectTag = ref(0); // 0为综合，1为最新，2为热门
    const selectTime = ref(0); // 0为不限时间，1为最近一天，2为最近一周，3为最近一个月
    const limit = 10; // 获取信息条数
    const showLoading = ref(true); // 显示按钮
    const resourceData = reactive([]); // 资源数据
    const showContentLoading = ref(false); // 是否显示加载内容过渡

    /**
     * @description: 加载数据函数
     * @return {void}
     * @author: dreamy-xay
     */
    function getMoreInfo() {
      if (showLoading.value)
        getGroupResources(groupName, selectTag.value, selectTime.value, resourceData.length, limit, {
          beforeRequest() {
            showContentLoading.value = true;
          },
          afterResponse() {
            showContentLoading.value = false;
          },
        })
          .then((data) => {
            resourceData.splice(resourceData.length, 0, ...data.resources);
            if (data.resources.length < limit) showLoading.value = false;
          })
          .catch((error) => {
            console.log(error);
            msg.error('获取资源信息失败，请重试');
          });
    }

    // 初始化，获取资源数据
    getMoreInfo();

    /**
     * @description: 选择标签
     * @param {object} e e.index标签下标
     * @return {void}
     * @author: dreamy-xay
     */
    function changeTag(e) {
      if (e.index === selectTag.value) return;
      selectTag.value = e.index;
      resourceData.splice(0, resourceData.length);
      showLoading.value = true;
      getMoreInfo();
    }

    /**
     * @description: 选择时间下拉框
     * @param {object} e e.index标签下标
     * @return {void}
     * @author: dreamy-xay
     */
    function changeSelect(e) {
      if (e.index === selectTime.value) return;
      selectTag.value = e.index;
      resourceData.splice(0, resourceData.length);
      showLoading.value = true;
      getMoreInfo();
    }

    return {
      styles,
      selectTag,
      selectTime,
      showLoading,
      resourceData,
      showContentLoading,
      getMoreInfo,
      changeTag,
      changeSelect,
    };
  },
});
</script>

<style lang="scss" scoped>
.group-detail-resource {
  width: 700px;
  @include flex(center, center, column);

  .group-detail-resource-inner {
    width: 100%;
    border-radius: $border-radius-0;
    box-shadow: $shadow-0;
    background-color: $grey-0;
    padding-bottom: 4px;

    .contont {
      margin: 0 20px;
    }
  }

  .group-detail-resource-loading {
    @include flex(center, center);
    height: 32px;
    margin-top: 10px;
    width: 300px;
    border-radius: $border-radius-0;
    box-shadow: $shadow-0;
    background-color: $grey-0;
    color: $grey-9;
    transition: 0.25s;

    &:hover {
      background: $grey-1;
      color: $grey-10;
    }
  }
}
</style>
