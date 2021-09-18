<!--
 * @Description: 用户主页问答记录
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-09-07 16:24:57
 * @LastEditors: Z_Y_C
 * @LastEditTime: 2021-09-17 20:47:47
-->
<template>
  <div class="user-question">
    <div class="user-question-top">
      <div class="user-question-top-left">
        <div
          class="text"
          role="button"
          @click="changeQuestionSwitch(true)"
          :class="questionSwitch ? 'text-click ' :''"
        >回答的问题</div>
        <div class="line"></div>
        <div
          class="text"
          role="button"
          @click="changeQuestionSwitch(false)"
          :class="questionSwitch ? '' : 'text-click'"
        >发布的提问</div>
      </div>
      <user-sort @changeSort="Sort" />

    </div>

    <user-question-switch />
  </div>
</template>

<script>
import { defineComponent, reactive, ref } from 'vue';
import { mapState } from '@/util/store';
import { useRoute } from 'vue-router';
import UserSort from '@/views/user/childComps/UserSort.vue';
import UserQuestionSwitch from '@/views/user/childComps/pages/UserQuestion/childComps/UserQuestionSwitch.vue';

/**
 * @description: 用户主页问答记录
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'userQuestion',
  components: { UserSort, UserQuestionSwitch },
  setup() {
    const questionSwitch = ref(true);
    const answerData = reactive([]);
    const questionData = reactive([]);
    const route = useRoute(); // route
    const username = route.params.username; // 获取路由的username
    const { tokenInfo } = mapState('global', ['tokenInfo']);
    const isSelf = username === tokenInfo.value.username;

    function changeQuestionSwitch(data) {
      questionSwitch.value = data;
    }

    function Sort(index) {
      console.log(index);
    }
    return {
      ...mapState('user', ['privacySetting']),
      isSelf,
      questionSwitch,
      changeQuestionSwitch,
      Sort,
    };
  },
});
</script>

<style lang="scss" scoped>
.user-question {
  width: 100%;

  .user-question-top {
    @include flex(center, space-between);
    box-shadow: $shadow-0;
    border-radius: $border-radius-0;
    background-color: $grey-0;
    height: 36px;
    padding: 0 16px;
    margin-bottom: 16px;

    .user-question-top-left {
      @include flex(center);

      .text {
        font-size: 14px;
        color: $grey-7;
        transition: 0.25s;

        &:hover {
          color: $green-0;
        }
      }

      .line {
        margin: 0 16px;
        height: 14px;
        border-left: 1px solid $grey-4;
      }

      .text-click {
        color: $green-0;
      }
    }
  }
}
</style>
