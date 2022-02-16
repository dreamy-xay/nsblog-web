<!--
 * @Description:资源页面
 * @Version:
 * @Autor: Z_Y_C
 * @Date: 2022-01-21 23:15:38
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2022-02-16 15:39:20
-->
<template>
  <div class="resource-home">
    <div class="resource-home-center">
      <div class="left">
        <resource-left
          :resource-data="resourceData"
          :select-tag="selectTag"
          :select-time="selectTime"
          :show-content-loading="showContentLoading"
          @change-tag="changeTag($event)"
          @change-time="changeTime($event)"
        />
        <div
          class="button"
          role="button"
          v-show="showButton && !showContentLoading"
          @click="getMessage"
        >加载更多...</div>

      </div>
      <div class="right">
        <base-rank-card
          :loading="showRankCardLoading"
          title="下载排行"
          :data="rankinglist"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent, reactive, ref, watch } from 'vue';
import BaseRankCard from '@/components/common/baseRankCard/BaseRankCard.vue';
import ResourceLeft from '@/views/resource/childComps/pages/resourceHome/childComps/resourceLeft/ResourceLeft.vue';
import { getResources } from '@/network/api/resources';
import { getResourcesList } from '@/network/api/list';
import { useMessage } from 'naive-ui';

/**
 * @description:资源页面
 * @author: Z_Y_C
 */

export default defineComponent({
  name: 'resourceHome',
  components: {
    BaseRankCard,
    ResourceLeft,
  },
  setup() {
    const msg = useMessage(); // naive-ui组件
    const selectTag = ref(0); // 0为综合，1为最新，2为热门
    const selectTime = ref(0); // 0为不限时间，1为最近一天，2为最近一周，3为最近一个月
    const limit = 10; // 获取信息条数
    const showButton = ref(true); // 显示按钮
    const resourceData = reactive([]); // 资源数据
    const rankinglist = reactive([]); // 下载排行
    const showContentLoading = ref(false); // 是否显示加载内容过渡
    const showRankCardLoading = ref(false); // rank-card 是否显示加载状态

    /**
     * @description: 加载数据函数
     * @return {void}
     * @author: Z_Y_C
     */
    function getMessage() {
      if (showButton.value)
        getResources(null, resourceData.length, limit, selectTime.value, selectTag.value, {
          beforeRequest() {
            showContentLoading.value = true;
          },
          afterResopnse() {
            showContentLoading.value = false;
          },
        })
          .then((data) => {
            resourceData.splice(resourceData.length, 0, ...data.resources);
            if (data.resources.length < limit) showButton.value = false;
          })
          .catch((error) => {
            console.log(error);
            msg.error('获取资源信息失败，请重试');
          });
    }

    // 获取数据
    getMessage();

    getResourcesList({
      beforeRequest() {
        showRankCardLoading.value = true;
      },
      afterResopnse() {
        showRankCardLoading.value = false;
      },
    })
      .then((data) => {
        for (let i = 0; i < data.resources.length; i++) {
          let arr = {
            title: null,
            url: `resource/`,
          };
          arr.title = data.resources[i].title;
          arr.url += data.resources[i].id;
          rankinglist.splice(rankinglist.length, 0, arr);
        }
      })
      .catch((error) => {
        console.log(error);
        msg.error('获取下载排行数据失败');
      });

    /**
     * @description: 改变标签
     * @param {number} e 几号标签 0为综合，1为最新，2为热门
     * @return {void}
     * @author: Z_Y_C
     */
    function changeTag(e) {
      if (e !== selectTag.value) {
        selectTag.value = e;
        resourceData.splice(0, resourceData.length);
        showButton.value = true;
        getMessage();
      }
    }

    /**
     * @description: 改变时间
     * @param {number} e 0为不限时间，1为最近一天，2为最近一周，3为最近一个月
     * @return {void}
     * @author: Z_Y_C
     */
    function changeTime(e) {
      if (e !== selectTime.value) {
        selectTime.value = e;
        resourceData.splice(0, resourceData.length);
        showButton.value = true;
        getMessage();
      }
    }

    return {
      rankinglist,
      showButton,
      resourceData,
      selectTag,
      selectTime,
      getMessage,
      changeTag,
      changeTime,
      showContentLoading,
      showRankCardLoading,
    };
  },
});
</script>

<style lang="scss" scoped>
.resource-home {
  @include flex(center, center, column);

  .resource-home-center {
    width: 1000px;
    margin-top: 16px;
    margin-bottom: 6px;
    @include flex(initial, space-between);

    .left {
      width: 700px;
      @include flex(center, initial, column);

      .button {
        @include flex(center, center);
        height: 32px;
        margin-top: 10px;
        width: 300px;
        border-radius: $border-radius-0;
        box-shadow: $shadow-0;
        background-color: $grey-0;

        transition: 0.25s;

        &:hover {
          background: $grey-1;
        }
      }
    }

    .right {
      width: 284px;
    }
  }
}
</style>
