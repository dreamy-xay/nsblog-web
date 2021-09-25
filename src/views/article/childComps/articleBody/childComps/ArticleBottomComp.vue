<!--
 * @Description: 文章底部子组件
 * @Version:
 * @Autor: clq
 * @Date: 2021-09-20 19:56:13
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-09-24 20:09:58
-->
<template>
  <div class="article-bottom-comp">
    <div class="article-bottom-comp-body">
      <div class="category">
        <span class="label">分类 :</span>
        <span class="value">
          <base-tag
            :size="22"
            :color="styles.orange0"
            :hover-color="styles.orange1"
            :style="{borderRadius: '3px', letterSpacing: '1.5px'}"
            text="测试进阶知识系列 - Python "
          />
        </span>
      </div>

      <div class="tag">
        <span class="label">标签 :</span>
        <span class="value">
          <base-tag
            :size="22"
            :color="styles.blue0"
            :hover-color="styles.blue1"
            :style="{borderRadius: '3px', letterSpacing: '1.5px'}"
            text="python"
          />
        </span>
      </div>
      <article-bottom-sponsor :sponsors="data.sponsors" />
      <div class="btn-container">
        <div
          class="btn"
          role="button"
        >关注
        </div>
        <div
          class="btn"
          role="button"
        >推荐
        </div>
        <div
          class="btn"
          role="button"
        >收藏
        </div>
        <div
          class="btn"
          role="button"
        >反对
        </div>
      </div>
    </div>

    <div class="article-bottom-comp-footer">
      <div class="previous">
        <span class="label">上一篇 :</span>
        <span class="value">
          <article-link
            :href="`/blog/${'dreamy'}`"
            :target="`/blog/${'dreamy'}`"
          >python基础
          </article-link>
        </span>
      </div>
      <div class="next">
        <span class="label">下一篇 :</span>
        <span class="value">
          <article-link
            :href="`/blog/${'dreamy'}`"
            :target="`/blog/${'dreamy'}`"
          >机器学习与深度学习
          </article-link>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import BaseTag from '@/components/content/baseTag/BaseTag.vue';
import ArticleLink from '@/views/article/childComps/ArticleLink.vue';
import ArticleBottomSponsor from '@/views/article/childComps/articleBody/childComps/ArticleBottomSponsor.vue';
import styles from '@/assets/style/define.scss';
/**
 * @description: 文章底部子组件
 * @author: clq
 */

export default defineComponent({
  name: 'articleBottomComp',
  components: {
    BaseTag,
    ArticleLink,
    ArticleBottomSponsor,
  },
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  setup() {
    return {
      styles,
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
      }
      div:nth-child(1):hover {
        background-color: $red-1;
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
