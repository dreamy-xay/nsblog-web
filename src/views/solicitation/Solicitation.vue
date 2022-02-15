<!--
 * @Description: 征集令页面
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2022-02-15 12:27:49
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2022-02-15 14:32:52
-->
<template>
  <base-view
    :top-bar="true"
    :footer="true"
    :background="true"
    :back-top="true"
    bind-class="solicitation"
  >
    <div class="solicitation-inner">
      <solicitation-left :data="solicitationData" />
      <solicitation-right
        :data="solicitationData"
        @changeAttention="changeAttention"
      />
    </div>
  </base-view>
</template>

<script>
import { defineComponent, reactive } from 'vue';
import BaseView from '@/components/content/baseView/BaseView.vue';
import SolicitationLeft from '@/views/solicitation/childComps/solicitationLeft/SolicitationLeft.vue';
import SolicitationRight from '@/views/solicitation/childComps/SolicitationRight.vue';
import { getSolicitationInfo } from '@/network/api/groups';
import { useRoute } from 'vue-router';

/**
 * @description: 征集令页面
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'solicitation',
  components: {
    BaseView,
    SolicitationLeft,
    SolicitationRight,
  },
  setup() {
    const route = useRoute(); // route
    const solicitationId = route.params.solicitationId; // 征集令id
    const solicitationData = reactive({
      // 征集令详细信息
      id: solicitationId,
      title: '',
      content: '',
      username: '',
      nickname: '',
      avatar: '',
      fans_count: 0,
      attention: 0,
      release_time: null,
      deadline: null,
      users: [],
    });

    // 初始化征集令信息
    getSolicitationInfo(solicitationId)
      .then((data) => {
        // console.log(data);
        solicitationData.title = data.title;
        solicitationData.title = data.title;
        solicitationData.content = data.content;
        solicitationData.username = data.username;
        solicitationData.nickname = data.nickname;
        solicitationData.avatar = data.avatar;
        solicitationData.fans_count = data.fans_count;
        solicitationData.attention = data.attention;
        solicitationData.release_time = data.release_time;
        solicitationData.deadline = data.deadline;
        solicitationData.users = data.users;
      })
      .catch((error) => {
        console.log(error);
      });

    /**
     * @description: 修改关注状态
     * @param {0 | 1} attention 是否关注 `必传参数`
     * @return {void}
     * @author: dreamy-xay
     */
    function changeAttention(attention) {
      solicitationData.attention = attention;
    }

    return {
      solicitationData,
      changeAttention,
    };
  },
});
</script>

<style lang="scss" scoped>
:deep(.solicitation) {
  @include flex(initial, center);

  .solicitation-inner {
    width: 1000px;
    margin-top: 16px;
    @include flex(flex-start, space-between);
  }
}
</style>
