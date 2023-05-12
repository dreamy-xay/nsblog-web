<!--
 * @Description: 用户主页动态记录
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-09-07 16:24:57
 * @LastEditors: Z_Y_C
 * @LastEditTime: 2022-02-16 20:44:28
-->
<template>
  <div
    class="user-dynamic"
    v-if="(privacySetting.view_dynamic || isSelf) && dynamicData.length  "
  >
    <div
      v-for="(item , index) in dynamicData"
      :key="index"
      class="user-dynamic-context"
    >
      <div class="markdown">
        <v-md-preview :text="item.content" />
      </div>

      <div>{{dateGetText(new Date(item.time),null,'YY-mm-dd')}}</div>
    </div>

    <div
      role="button"
      class="user-dynamic-button"
      v-if="loading"
      @click="add"
    >加载更多...</div>
  </div>
  <user-null
    v-else
    :select="isSelf ? true : Boolean(privacySetting.view_dynamic)"
  />

</template>

<script>
import { defineComponent, reactive, ref } from 'vue';
import { mapState } from '@/utils/store';
import UserNull from '@/views/user/childComps/UserNull.vue';
import { useRoute } from 'vue-router';
import { getDynamic } from '@/network/api/dynamic';
import { useMessage } from 'naive-ui';
import { dateGetText } from '@/utils/date';

/**
 * @description: 用户主页动态记录
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'userDynamic',
  components: {
    UserNull,
  },
  setup() {
    const msg = useMessage(); // naive-ui
    const dynamicData = reactive([]); // 保存动态数据
    const route = useRoute(); // 路由
    const username = route.params.username; // 获取用户名
    const loading = ref(false); // 查看数据是否加载完
    const { tokenInfo } = mapState('global', ['tokenInfo']);
    const isSelf = username === tokenInfo.value.username; // 是否是本人
    const limit = 10; // 获取数据条数

    /**
     * @description: 获取初始数据
     * @return {void}
     * @author: Z_Y_C
     */
    function getData() {
      getDynamic(username, dynamicData.length, limit)
        .then((data) => {
          loading.value = data.dynamic.length === limit;
          dynamicData.splice(dynamicData.length, 0, ...data.dynamic);
        })
        .catch((error) => {
          console.log(error);
          msg.error('获取动态失败');
        });
    }

    // 获取数据
    getData();

    /**
     * @description: 加载更多数据
     * @return {void}
     * @author: Z_Y_C
     */
    function add() {
      getData();
    }

    return { dynamicData, ...mapState('user', ['privacySetting']), isSelf, add, loading, dateGetText };
  },
});
</script>

<style lang="scss" scoped>
.user-dynamic {
  width: 100%;
  @include flex(center, center, column);
  .user-dynamic-context {
    width: 858px;
    box-shadow: $shadow-0;
    border-radius: $border-radius-0;
    background-color: $grey-0;
    margin-bottom: 16px;
    padding: 16px;
    @include flex(center, space-between);
    @include word-break;

    .markdown {
      width: 763px;
      :deep(.v-md-editor-preview > div) {
        padding: 0;

        & > p {
          margin-bottom: 0;
        }
      }
    }
  }

  .user-dynamic-button {
    @include flex(center, center, column);
    width: 300px;
    height: 30px;
    box-shadow: $shadow-0;
    border-radius: $border-radius-0;
    background-color: $grey-0;
    font-size: 14px;
    color: $grey-9;

    &:hover {
      color: $grey-10;
      background-color: $grey-1;
    }
  }
}
</style>
