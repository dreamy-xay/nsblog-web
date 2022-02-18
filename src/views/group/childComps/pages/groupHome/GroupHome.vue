<!--
 * @Description: 学习小组主页
 * @Version:
 * @Autor: xiao
 * @Date: 2022-01-21 19:42:59
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2022-02-16 13:02:17
-->
<template>
  <base-view
    :background="true"
    :top-bar="true"
    :top-bar-scroll="true"
    :back-top="true"
    :footer="true"
    ref="view"
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
          :show-content-loading="showContentLoading"
          :show-loading="showLoading"
          @change-group-join="changeGroupJoin"
          @update-groups="updateGroups"
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
          :loading="showSolicitationLoading"
          :bulletin-data="solicitationList"
          style="margin-bottom: 16px"
        />
        <base-rank-card
          :data="rankingList"
          title="活跃排行榜"
          :loading="showRankCardLoading"
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
import BaseBulletin from '@/components/common/baseBulletin/BaseBulletin.vue';
import BaseRankCard from '@/components/common/baseRankCard/BaseRankCard.vue';
import { getGroups, getGroupSolicitations } from '@/network/api/groups';
import { useMessage } from 'naive-ui';
import { getGroupsList } from '@/network/api/list';
import { useRoute } from 'vue-router';
import { mapGetters } from '@/util/store';
import { addGroup, deleteGroup } from '@/network/api/groups';

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
    const solicitationList = reactive([]); // 征集令列表
    const rankingList = reactive([]); //活跃排行榜
    const showContentLoading = ref(true); // 是否显示加载内容过渡
    const limit = 10; // 每次加载列表条数
    const showLoading = ref(true); // 是否显示加载按钮
    const showRankCardLoading = ref(false); // rank-card 是否显示加载状态
    const showSolicitationLoading = ref(false); // 征集令 是否显示加载状态

    const { isLogin } = mapGetters('global', ['isLogin']); // 是否登录

    //获取征集令
    getGroupSolicitations('', 0, 10, {
      beforeRequest() {
        showSolicitationLoading.value = true;
      },
      afterResponse() {
        showSolicitationLoading.value = false;
      },
    })
      .then((data) => {
        // console.log(data);
        for (let solicitation of data.solicitations) {
          solicitationList.splice(solicitationList.length, 0, {
            text: solicitation.title,
            href: '/solicitation/' + solicitation.id,
          });
        }
      })
      .catch((error) => {
        console.log(error);
        msg.error('获取征集令失败');
      });

    //获取学习小组活跃排行
    getGroupsList({
      beforeRequest() {
        showRankCardLoading.value = true;
      },
      afterResponse() {
        showRankCardLoading.value = false;
      },
    })
      .then((data) => {
        for (let group of data.groups)
          rankingList.splice(rankingList.length, 0, { title: group, url: '/group/' + group });
      })
      .catch((error) => {
        console.log(error);
        msg.error('获取小组排行失败');
      });

    const view = ref(null); // baseview视图 ref
    /**
     * @description: 跟新学习小组数据
     * @param {boolean} flag 是否清空原数组
     * @return {void}
     * @author: clq
     */
    function updateGroups(flag) {
      if (flag) {
        groups.splice(0, groups.length);
        view.value.setScrollTop(true); // 回顶部
      }
      // 获取小组
      getGroups(username, topicSelect.value, 0, limit, '', {
        beforeRequest() {
          showContentLoading.value = true;
        },
        afterResponse() {
          showContentLoading.value = false;
        },
      })
        .then((data) => {
          if (data.groups.length < limit) showLoading.value = false;
          groups.splice(groups.length, 0, ...data.groups);
        })
        .catch((error) => {
          console.log(error);
          msg.error('获取小组失败');
        });
    }

    /**
     * @description: 点击创建学习小组
     * @return {void}
     * @author: xiao
     */
    function createGroup() {
      if (isLogin.value) isShow.value = !isShow.value;
      else msg.error('请先登录');
    }

    /**
     * @description: 退出学习小组
     * @param {join} 小组下标
     * @return {void}
     * @author: xiao
     */
    function changeGroupJoin(join) {
      console.log('join', join);
      if (isLogin.value)
        if (!groups[join].join)
          //加入学习小组
          addGroup(groups[join].name)
            .then(() => {
              msg.success(`加入学习小组成功`);
              groups[join].join = 1;
            })
            .catch((error) => {
              console.log(error);
              msg.error('加入学习小组失败');
            });
        //退出学习小组
        else
          deleteGroup(groups[join].name)
            .then(() => {
              groups[join].join = 0;

              msg.success(`退出学习小组成功`);
            })
            .catch((error) => {
              console.log(error);
              msg.error('退出学习小组失败');
            });
      else msg.error('请先登录');
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
      view,
      solicitationList,
      selectTopic,
      updateGroups,
      changeGroupJoin,
      showContentLoading,
      showLoading,
      showRankCardLoading,
      showSolicitationLoading,
    };
  },
});
</script>

<style lang="scss" scoped>
.group-home {
  .group-home-container {
    @include flex();
    margin: 16px 0px 16px 75px;

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
