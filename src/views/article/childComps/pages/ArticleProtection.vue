<!--
 * @Description: 文章密码保护页面
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2022-01-26 17:50:38
 * @LastEditors: Z_Y_C
 * @LastEditTime: 2022-02-13 12:26:05
-->
<template>
  <div class="article-protection">
    <base-background :mask="false" />
    <div class="article-protection-inner">
      <div class="title">
        <h1>验证文章密码</h1>
      </div>
      <input
        type="password"
        placeholder="Password"
        v-model="password"
        @keydown.enter="submit"
      />
      <button
        class="red"
        role="button"
        @click="submit"
      ><i class="iconfont blog-md-lock"></i>提交</button>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import BaseBackground from '@/components/content/baseBackground/BaseBackground.vue';
import { verifyArticlePassword } from '@/network/api/articles';
import router from '@/router';
import { useMessage } from 'naive-ui';
import { useRoute } from 'vue-router';

/**
 * @description: 文章密码保护页面
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'articleProtection',
  components: {
    BaseBackground,
  },
  beforeRouteEnter(to, from, next) {
    if (to.params['articleId']) next();
    else next({ path: from.path });
  },
  setup() {
    const msg = useMessage(); // naive-ui message
    const route = useRoute(); // route
    const articleId = route.params.articleId; // 文章id
    const password = ref(''); // 文章密码
    let prePassword = ''; // 先前提交的密码

    /**
     * @description: 提交密码验证
     * @return {void}
     * @author: dreamy-xay
     */
    function submit() {
      if (password.value === '') return;
      if (prePassword === password.value) msg.info('请勿重复提交错误密码', { duration: 2000, closable: true });
      else {
        prePassword = password.value;
        verifyArticlePassword(articleId, password.value)
          .then(() => {
            router.replace({ path: route.params.back, params: { articlePassword: password.value } });
          })
          .catch((error) => {
            console.log(error);
            if (error.response.status === 403) msg.error('文章密码错误', { duration: 2000, closable: true });
            else msg.error('网路异常，请重试', { duration: 2000, closable: true });
          });
      }
    }

    return {
      password,
      submit,
    };
  },
});
</script>

<style lang="scss" scoped>
.article-protection {
  width: 100%;
  height: 100%;
  overflow: hidden;
  @include flex(center, center);

  .article-protection-inner {
    width: 320px;
    margin-top: -5%;
    @include flex(center, center, column);

    .title {
      padding: 16px 0;
      text-align: center;
      color: $grey-6;

      h1 {
        text-shadow: 1px 1px 1px $grey-0;
      }
    }

    button,
    input {
      color: $grey-8;
      border: 0;
      outline: 0;
      font-size: 16px;
      letter-spacing: 2px;
      border-radius: 16px * 20;
      padding: 16px;
      background-color: $grey-4;
      text-shadow: 1px 1px 0 $grey-0;
    }

    input {
      box-shadow: inset 2px 2px 5px $grey-6, inset -5px -5px 10px $grey-2;
      width: 100%;
      box-sizing: border-box;
      transition: all 0.2s ease-in-out;
      appearance: none;
      -webkit-appearance: none;

      &:focus {
        box-shadow: inset 1px 1px 2px $grey-6, inset -1px -1px 2px $grey-2;
      }
    }

    button {
      font-weight: bold;
      box-shadow: -5px -5px 20px $grey-3, 5px 5px 20px $grey-6;
      transition: all 0.2s ease-in-out;
      font-weight: 600;
      display: block;
      width: 100%;
      color: $green-1;
      margin-top: 30px;

      &:hover {
        box-shadow: -2px -2px 5px $grey-0, 2px 2px 5px $grey-6;
      }

      &:active {
        box-shadow: inset 1px 1px 2px $grey-6, inset -1px -1px 2px $grey-0;
      }

      .icon {
        margin-right: 8px;
      }
    }
  }
}
</style>
