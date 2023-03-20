<!--
 * @Description: 工作台页面
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2022-02-26 19:56:18
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2023-03-20 19:02:33
-->
<template>
  <admin-view class="admin-home-workbench">
    <div class="home-workbench-head">
      <div class="workbench-head-left">

      </div>
      <div class="workbench-head-right">

      </div>
    </div>
    <div class="home-workbench-body">
      <div class="workbench-body-left">

      </div>
      <div class="workbench-body-right">

      </div>
    </div>
  </admin-view>
</template>

<script>
import { defineComponent, inject } from 'vue';
import AdminView from '@/views/admin/childComps/AdminView.vue';
// import { XinZhiWeather, HeFengWeather } from '@/network/api/tools/weather';

/**
 * @description: 工作台页面
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'adminHomeWorkbench',
  components: {
    AdminView,
  },
  setup() {
    const userData = inject('userData');

    // XinZhiWeather.getWeather()
    //   .then((res) => console.log(res))
    //   .catch((err) => console.log(err));

    // HeFengWeather.getWeather()
    //   .then((res) => console.log(res))
    //   .catch((err) => console.log(err));

    return {};
  },
});
</script>

<style lang="scss" scoped>
.admin-home-workbench {
  @include flex(center, center, column);

  .home-workbench-head {
    width: 100%;
    padding: 22px 16px;
    height: 116px;
    box-sizing: border-box;
    background-color: $grey-0;
    border-radius: $border-radius-1;
    overflow: hidden;
    @include flex;
  }
}
</style>
