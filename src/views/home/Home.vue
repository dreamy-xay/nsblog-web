<!--
 * @Description: 博客主页
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-06-09 08:19:13
 * @LastEditors: clq
 * @LastEditTime: 2022-01-19 17:55:10
-->
<template>
  <base-view
    :background="true"
    :top-bar="true"
    :top-bar-scroll="true"
    bind-class="home"
  >
    <template #top-bar-bottom>
      <base-topic-bar />
    </template>

    <div class="home-container">

      <div class="home-bottom">
        <div class="home-bottom-left">
          <home-left />
        </div>
        <div class="home-bottom-right">
          <home-right />
        </div>
      </div>
    </div>
    <!-- <div style="width:100%; height: 3000px; background: #fff;">
      <button @click="gotoNewDialogue">前往新的对话</button><br />
      1 Test <br />2 Test<br />3 Test<br />4 Test<br />5 Test<br />6 Test<br />7 Test<br />8 Test<br />9 Test
      <div style="width: 50%; margin: 20px;">
        <base-content-loading />
      </div>
    </div> -->
    <BaseSearchStudyGroup></BaseSearchStudyGroup>
    <base-content-loading />
  </base-view>
</template>

<script>
import { defineComponent, reactive, ref } from 'vue';
import BaseView from '@/components/content/baseView/BaseView.vue';
import BaseTopicBar from '@/components/common/baseTopicBar/BaseTopicBar.vue';
import BaseContentLoading from '@/components/content/baseContentLoading/BaseContentLoading.vue';
import router from '@/router';
import HomeLeft from '@/views/home/childComps/HomeLeft';
import HomeRight from '@/views/home/childComps/HomeRight.vue';

/**
 * @description: 博客主页
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'Home',
  components: {
    BaseView,
    BaseTopicBar,
    HomeLeft,
    HomeRight,
  },
  setup() {
    // 仅供参考，测试私信
    function gotoNewDialogue() {
      router.push({
        name: 'messageMy',
        params: {
          dialogue: JSON.stringify({
            username: 'dreamy-test',
            nickname: '测试账号',
            avatar: 'https://dummyimage.com/150x150/234567/FFFFFF.png?text=dreamy-test',
          }),
        },
      });
    }

    return {
      gotoNewDialogue,
    };
  },
});
</script>

<style lang="scss" scoped>
:deep(.home) {
  // height: 100%;
  // width: 1000px;
  // @include flex(initial, space-between);
  width: 100%;
  @include flex(initial, initial, column);
  .home-container {
    width: 100%;
    // @include flex(center, center);

    .home-top {
      width: 1142px;
    }
    .home-bottom {
      @include flex(initial, space-between);
      .home-bottom-left {
        width: 758px;
        background: #ffffff;
        border-radius: 8px;
        box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.16);
      }

      .home-bottom-right {
        margin-left: 16px;
        width: 384px;
      }
    }
  }
}
</style>
