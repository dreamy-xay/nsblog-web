<!--
 * @Description:
 * @Version:
 * @Autor: continue-hs
 * @Date: 2022-01-17 10:18:16
 * @LastEditors: continue-hs
 * @LastEditTime: 2022-01-18 19:37:27
-->
<template>
  <div class="home-left">
    <div class="home-left-top">
      <div
        class="home-left-top-list"
        v-for="(item,index) in topList"
        :key="index"
        :class="{active:index === listIndex}"
        role="button"
      >
        {{item.name}}
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive, ref } from 'vue';
import { mapGetters, mapState } from '@/util/store';
import getArticles from '@/network/api/articles';

export default defineComponent({
  name: 'homeLeft',
  props: {},
  setup() {
    const topList = reactive([
      {
        name: '热门',
      },
      {
        name: '最新',
      },
      {
        name: '排行',
      },
    ]);
    const listIndex = ref(0);
    const { isLogin } = mapGetters('global', ['isLogin']);
    const { tokenInfo } = mapState('global', ['tokenInfo']); // 获取tokenInfo
    const username = tokenInfo.value.username; // 登录用户名

    // getArticles(username,).then((data) => {

    // })

    return {
      topList,
      listIndex,
    };
  },
});
</script>

<style lang="scss" scoped>
.home-left {
  width: 700px;
  .home-left-top {
    height: 46px;
    @include flex(center);

    .home-left-top-list {
      margin: 16px;
      font-size: 14px;
      font-weight: 400;
      &.active {
        color: #4bd8aa;
      }
    }
  }
}
</style>
