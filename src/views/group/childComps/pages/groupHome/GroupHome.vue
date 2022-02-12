<!--
 * @Description: 学习小组主页
 * @Version:
 * @Autor: xiao
 * @Date: 2022-01-21 19:42:59
 * @LastEditors: xiao
 * @LastEditTime: 2022-02-12 21:58:48
-->
<template>
  <base-view
    :background="true"
    :top-bar="true"
    :top-bar-scroll="true"
    :footer="true"
    bind-class="group-home"
  >
    <template #top-bar-bottom>
      <base-topic-bar
        :details="false"
        first-item="全部"
        @selectTopic="selectTopic"
      />
    </template>

    <div class="group-home-container">
      <div>
        <group-list
          :study-groups="groups"
          @changeGroupJoin="changeGroupJoin"
        />
      </div>
      <div class="group-home-right">
        <div class="group-home-create">
          <div
            class="create-button"
            role="button"
            @click="createGroup"
          >
            <i class="iconfont blog-chuangjianxiaozu"></i>
            创建学习小组
          </div>
        </div>
        <base-bulletin
          :bulletin-data="bulletinData"
          style="margin-bottom: 16px"
        />
        <base-rank-card
          :data="rankingList"
          title="活跃排行榜"
        />
      </div>
    </div>

    <group-popover v-model:modelValue="isShow" />
  </base-view>
</template>

<script>
import { defineComponent, ref, reactive } from 'vue';
import BaseView from '@/components/content/baseView/BaseView.vue';
import BaseTopicBar from '@/components/common/baseTopicBar/BaseTopicBar.vue';
import GroupList from '@/views/group/childComps/pages/groupHome/childComps/GroupList.vue';
import GroupPopover from '@/views/group/childComps/pages/groupHome/childComps/GroupPopover.vue';
import BaseBulletin from '@/components/common/baseBulletin/BaseBulletin';
import BaseRankCard from '@/components/common/baseRankCard/BaseRankCard';
import { getGroups, getSolicitations } from '@/network/api/groups';
import { useMessage } from 'naive-ui';
import { getListGroups } from '@/network/api/list';
import { useRoute } from 'vue-router';

/**
 * @description: 学习小组主页
 * @author: xiao
 */

export default defineComponent({
  name: 'group',
  components: {
    BaseView,
    BaseTopicBar,
    GroupList,
    GroupPopover,
    BaseBulletin,
    BaseRankCard,
  },

  setup() {
    const isShow = ref(false); //是否显示创建小组页面
    const topicSelect = ref(''); //选择的专题
    const groups = reactive([]); //学习小组数据
    const msg = useMessage(); // naive-ui 消息组件
    const route = useRoute(); // route
    const username = route.params.username; // 获取用户名
    const rankingList = reactive([
      //   {
      //     title: 'react有tab页，如何实现未选中的tab页隐藏但不销毁在JavaScript中一组数据如何进行关联呢',
      //     url: '#',
      //   },
      //   {
      //     title: '在JavaScript中一组数据如何进行关联呢',
      //     url: '#',
      //   },
      //   {
      //     title: '奇想宇宙',
      //     url: '#',
      //   },
      //   {
      //     title: '资源分享',
      //     url: '#',
      //   },
      //   {
      //     title: '新人大本营',
      //     url: '#',
      //   },
      //   {
      //     title: 'vue-cli3 打包加了时间戳，【偶尔】浏览器还是会有缓存，该如何杜绝？',
      //     url: '#',
      //   },
    ]);
    const bulletinData = reactive([
      { text: '需要精通Java大佬救命', href: '#' },
      { text: '需要大佬一位', href: '#' },
      { text: '需要一些资源，请进组分享给大家...', href: '#' },
    ]);

    //获取征集令
    getSolicitations('123')
      .then((data) => {
        console.log('Solicitations', data);
      })
      .catch((error) => {
        console.log(error);
        msg.error('获取征集令失败', { duration: 2000, closable: true });
      });

    //获取学习小组活跃排行
    getListGroups()
      .then((data) => {
        console.log('getListGroups', data);
        rankingList.splice(0, 0, ...data.groups);
        console.log('rankingList', rankingList);
      })
      .catch((error) => {
        console.log(error);
        msg.error('获取小组排行失败', { duration: 2000, closable: true });
      });

    /**
     * @description: 跟新学习小组数据
     * @param {boolean} flag 是否清空原数组
     * @return {void}
     * @author: clq
     */
    function updateGroups(flag) {
      // 获取小组
      getGroups(username, topicSelect.value, 0, 10)
        .then((data) => {
          console.log('updateGroups', data);
          if (flag == true) groups.splice(0, groups.length);
          groups.splice(groups.length, 0, ...data.groups);
        })
        .catch((error) => {
          console.log(error);
          msg.error('获取小组失败', { duration: 2000, closable: true });
        });
    }

    //初始化数据
    updateGroups(true);

    /**
     * @description: 点击创建学习小组
     * @return {*}
     * @author: xiao
     */
    function createGroup() {
      isShow.value = !isShow.value;
    }

    /**
     * @description: 退出学习小组
     * @param {join} 小组下标
     * @return {void}
     * @author: xiao
     */
    function changeGroupJoin(join) {
      console.log('join', join);
      groups[join].join = 0;
    }

    /**
     * @description: 选择了专题
     * @param {string} topic 专题名
     * @return {void}
     * @author: xiao
     */
    function selectTopic(topic) {
      topicSelect.value = topic;
      updateGroups(true);
    }

    return {
      createGroup,
      isShow,
      groups,
      rankingList,
      bulletinData,
      selectTopic,
      updateGroups,
      changeGroupJoin,
    };
  },
});
</script>

<style lang="scss" scoped>
.group-home {
  .group-home-container {
    @include flex();
    margin: 16px 0px 16px 75px;
    padding-bottom: 50px;

    .group-home-right {
      @include flex(center, flex-start, column);
      .group-home-create {
        width: 284px;
        height: 72px;
        background: $grey-0;
        border-radius: $border-radius-0;
        box-shadow: $shadow-0;
        margin-bottom: 14px;
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
}
</style>
