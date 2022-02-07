<!--
 * @Description: 学习小组模块
 * @Version:
<<<<<<< HEAD
 * @Autor: xiao
 * @Date: 2022-01-21 19:42:59
 * @LastEditors: xiao
 * @LastEditTime: 2022-02-07 14:49:19
-->
<template>
  <base-view
    :background="true"
    :top-bar="true"
    :top-bar-scroll="true"
    bind-class="group"
  >
    <template #top-bar-bottom>
      <base-topic-bar
        :details="false"
        :firstItem="'全部'"
        @selectTopic="selectTopic"
      />
    </template>

    <div class="group-container">
      <group-list
        class="group-search"
        :studyGroups="groups"
        @changeGroupJoin="changeGroupJoin"
      />
      <div class="group-right">
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
        <base-bulletin
          :bulletin-data="bulletinData"
          style="margin-bottom: 16px"
        />
        <base-rank-card
          :data="rankingList"
          title="活跃排行榜"
          @clickMenuItem="rankCardClickMenuItem(index,item)"
        />
      </div>
    </div>
    <group-popover v-model:modelValue="isShow" />
  </base-view>
=======
 * @Autor: dreamy-xay
 * @Date: 2022-01-22 15:58:15
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2022-01-29 14:40:39
-->
<template>
  <div class="group">
    <router-view />
  </div>
>>>>>>> b493f229e44688e1a104dbc095934a19a0977e21
</template>

<script>
import { defineComponent } from 'vue';

/**
 * @description: 学习小组模块
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'group',
<<<<<<< HEAD
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
    const rankingList = reactive([
      {
        title: 'react有tab页，如何实现未选中的tab页隐藏但不销毁在JavaScript中一组数据如何进行关联呢',
        url: '#',
      },
      {
        title: '在JavaScript中一组数据如何进行关联呢',
        url: '#',
      },
      {
        title: '奇想宇宙',
        url: '#',
      },
      {
        title: '资源分享',
        url: '#',
      },
      {
        title: '新人大本营',
        url: '#',
      },
      {
        title: 'vue-cli3 打包加了时间戳，【偶尔】浏览器还是会有缓存，该如何杜绝？',
        url: '#',
      },
    ]);
    const bulletinData = reactive([
      { text: '需要精通Java大佬救命', href: '#' },
      { text: '需要大佬一位', href: '#' },
      { text: '需要一些资源，请进组分享给大家...', href: '#' },
    ]);

    /**
     * @description: 跟新学习小组数据
     * @param {boolean} flag 是否清空原数组
     * @return {void}
     * @author: clq
     */
    function updateGroups(flag) {
      // 获取小组
      getGroups('dreamy', topicSelect.value, 0, 10)
        .then((data) => {
          console.log('getgroups');
          console.log(data);
          if (flag == true) groups.splice(0, groups.length);
          console.log('groups', groups);
          for (let i of data.groups) {
            groups.splice(groups.length, 0, i);
          }
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
      console.log(`select Topic: ${topic}`);
      updateGroups(true);
    }

    /**
     * @description: 点击活跃排行榜
     * @return {void}
     * @author: xiao
     */
    function rankCardClickMenuItem(index, item) {
      console.log(index, item);
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
      rankCardClickMenuItem,
    };
  },
=======
>>>>>>> b493f229e44688e1a104dbc095934a19a0977e21
});
</script>

<style lang="scss" scoped>
.group {
  width: 100%;
}
</style>
