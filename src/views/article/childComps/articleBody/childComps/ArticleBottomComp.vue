<!--
 * @Description: 文章底部子组件
 * @Version:
 * @Autor: clq
 * @Date: 2021-09-20 19:56:13
 * @LastEditors: xiao
 * @LastEditTime: 2022-01-25 18:55:19
-->
<template>
  <div class="article-bottom-comp">
    <div class="article-bottom-comp-body">
      <div
        class="category"
        v-if="data.categories.length !== 0"
      >
        <span class="label">分类 :</span>
        <span class="value">
          <base-tag
            v-for="(item, index) in data.categories"
            :key="index"
            :size="22"
            :color="styles.orange0"
            :hover-color="styles.orange1"
            :style="{borderRadius: '3px', letterSpacing: '1.5px',marginRight: '4px', marginBottom: '4px'}"
            :text="item.name"
          >
            <template #text-pre>
              <i class="iconfont blog-marketing_fill"></i>
            </template>
          </base-tag>
        </span>
      </div>

      <div
        class="tag"
        v-if="data.tags.length != 0"
      >
        <span class="label">标签 :</span>
        <span class="value">
          <base-tag
            v-for="(item, index) in data.tags"
            :key="index"
            :size="22"
            :color="styles.blue0"
            :hover-color="styles.blue1"
            :style="{borderRadius: '3px', letterSpacing: '1.5px', marginRight: '4px',marginBottom: '4px'}"
            :text="item.name"
          >
            <template #text-pre>
              <i class="iconfont blog-label_fill"></i>
            </template>
          </base-tag>
        </span>
      </div>

      <article-bottom-sponsor :sponsors="data.sponsors" />

      <base-favorite
        v-model:isShow="show"
        ref="b"
      >
      </base-favorite>
      <div class="btn-container">
        <div
          class="btn"
          role="button"
          @click="onAttention"
        >
          {{data.attention === 1 ? "已关注" : "关注"}}
        </div>
        <div
          class="btn"
          role="button"
          @click="onRecommend"
        >
          {{data.evaluation === 1 ? "已推荐" : "推荐"}}
        </div>
        <div
          class="btn"
          role="button"
          @click="onCollect"
        >
          {{data.collection != null ? "已收藏" : "收藏"}}
        </div>
        <div
          class="btn"
          role="button"
          @click="onOppose"
        >
          {{data.evaluation === 0 ? "已反对" : "反对"}}
        </div>
      </div>
    </div>

    <div class="article-bottom-comp-footer">
      <div class="previous">
        <span class="label">上一篇 :</span>
        <span class="value">
          <article-link
            :href="`/article/${data.last_article.article_id}`"
            :target="`/article/${data.last_article.article_id}`"
          >{{data.last_article.title}}
          </article-link>
        </span>
      </div>
      <div class="next">
        <span class="label">下一篇 :</span>
        <span class="value">
          <article-link
            :href="`/article/${data.next_article.article_id}`"
            :target="`/article/${data.next_article.article_id}`"
          >{{data.next_article.title}}
          </article-link>
        </span>
      </div>
    </div>
  </div>
  <base-modal
    content="确定要取消收藏嘛"
    :show="modalShow"
    @confirm="delCollection"
    @cancel="close"
  />
</template>

<script>
import { defineComponent, ref } from 'vue';
import BaseTag from '@/components/content/baseTag/BaseTag.vue';
import ArticleLink from '@/views/article/childComps/ArticleLink.vue';
import ArticleBottomSponsor from '@/views/article/childComps/articleBody/childComps/ArticleBottomSponsor.vue';
import styles from '@/assets/style/define.scss';
import { useMessage } from 'naive-ui';
import { mapGetters } from '@/util/store';
import events from '@/events';
import BaseFavorite from '@/components/common/baseFavorite/BaseFavorite.vue';
import BaseModal from '@/components/content/baseModal/BaseModal.vue';

/**
 * @description: 文章底部子组件
 * @param {Object} data 文章信息
 * @emits ArticleBottomComp-changeEvaluation 修改 evaluation, (newValue: number) => void, newValue=>0:反对 1:推荐 2:不反对,不推荐
 * @emits ArticleBottomComp-changeCollection 修改 collection, (newValue: number) => void, newValue=>0:未收藏 1:已收藏
 * @emits ArticleBottomComp-changeAttention 修改 attention, (newValue: number) => void, newValue=>0:未关注 1:已关注
 * @author: clq
 */

export default defineComponent({
  name: 'articleBottomComp',
  components: {
    BaseTag,
    ArticleLink,
    ArticleBottomSponsor,
    BaseFavorite,
    BaseModal,
  },
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  setup(props, context) {
    const msg = useMessage(); // naive-ui mssage
    const { isLogin } = mapGetters('global', ['isLogin']);
    const show = ref(false);
    const b = ref(b);
    const modalShow = ref(false); //取消收藏提示

    /**
     * @description: 判断用户是否登录
     * @return {Boolean} true:已登录 false:未登录
     * @author: clq
     */
    function isUserLogin() {
      if (isLogin.value) {
        console.log('isLogin');
        return true;
      } else {
        msg.error('请先登录', { duration: 2000, closable: true });
        return false;
      }
    }

    /**
     * @description: 关注文章
     * @return {void}
     * @author: clq
     */
    function onAttention() {
      if (!isUserLogin()) return;
      console.log('onAttention');
      if (props.data.attention === 0) {
        events.emit('ArticleBottomComp-changeAttention', 1); // 关注
      } else {
        events.emit('ArticleBottomComp-changeAttention', 0); // 取消关注
      }
    }

    /**
     * @description: 收藏文章
     * @return {void}
     * @author: clq
     */
    function onCollect() {
      if (!isUserLogin()) return;
      console.log('onCollect', props.data.collection);
      if (props.data.collection == null) {
        show.value = true;
      } else {
        modalShow.value = true;
      }
    }

    /**
     * @description: 取消收藏
     * @return {void}
     * @author: xiao
     */
    function delCollection() {
      b.value.delCollection(props.data.collection);
    }

    /**
     * @description: 关闭提示框
     * @param {*}
     * @return {*}
     * @author: xiao
     */
    function close() {
      modalShow.value = false;
    }

    /**
     * @description: 推荐文章
     * @return {void}
     * @author: clq
     */
    function onRecommend() {
      if (!isUserLogin()) return;
      console.log('onRecommend');
      if (props.data.evaluation === 1) {
        events.emit('ArticleBottomComp-changeEvaluation', 2); //取消推荐
      } else {
        events.emit('ArticleBottomComp-changeEvaluation', 1); //推荐
      }
    }

    /**
     * @description: 反对文章
     * @return {void}
     * @author: clq
     */
    function onOppose() {
      if (!isUserLogin()) return;
      console.log('onOppose');
      if (props.data.evaluation === 0) {
        events.emit('ArticleBottomComp-changeEvaluation', 2); //取消反对
      } else {
        events.emit('ArticleBottomComp-changeEvaluation', 0); //反对
      }
    }

    return {
      styles,
      onAttention,
      onRecommend,
      onCollect,
      onOppose,
      show,
      b,
      modalShow,
      delCollection,
      close,
    };
  },
});
</script>

<style lang="scss" scoped>
.article-bottom-comp {
  width: 100%;
  .article-bottom-comp-body {
    .category,
    .tag {
      .label {
        height: 21px;
        margin-right: 10px;
        font-family: Arial;
        font-size: 16px;
        line-height: 21px;
        color: $grey-9;
      }
    }

    .category {
      margin-bottom: 12px;
    }

    .btn-container {
      width: 100%;
      margin-top: 60px;
      @include flex(center, space-around, row);

      .btn {
        width: 68px;
        height: 31px;
        font-family: Arial;
        font-size: 16px;
        line-height: 31px;
        text-align: center;
        color: $grey-0;
        border-radius: $border-radius-1;
        box-shadow: $shadow-0;
        transition: 0.25s;
      }

      div:nth-child(1) {
        background-color: $red-0;

        &:hover {
          background-color: $pink-0;
        }
      }

      div:nth-child(2) {
        background-color: $green-0;
      }

      div:nth-child(2):hover {
        background-color: $green-1;
      }

      div:nth-child(3) {
        background-color: $blue-0;
      }
      div:nth-child(3):hover {
        background-color: $blue-1;
      }

      div:nth-child(4) {
        background-color: $orange-0;
      }
      div:nth-child(4):hover {
        background-color: $orange-1;
      }
    }
  }

  .article-bottom-comp-footer {
    width: 100%;
    margin-top: 19.5px;
    border-top: 1px solid $grey-4;

    .previous,
    .next {
      height: 21px;
      font-family: Arial;
      font-size: 16px;
      line-height: 21px;
      color: $grey-7;

      .label {
        margin-right: 8px;
      }

      .value {
        @include ellipsis(1);
      }
    }

    .previous {
      margin-top: 18.5px;
    }

    .next {
      margin: 16px 0 27px 0;
    }
  }
}
</style>

<style lang="scss">
.article-bottom-comp {
  .article-bottom-comp-body {
    .value {
      .iconfont {
        margin-right: 5px;
      }
    }
  }
}
</style>
