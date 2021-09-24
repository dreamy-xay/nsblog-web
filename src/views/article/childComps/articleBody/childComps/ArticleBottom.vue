<!--
 * @Description: 文章底部
 * @Version:
 * @Autor: clq
 * @Date: 2021-09-20 12:06:41
 * @LastEditors: clq
 * @LastEditTime: 2021-09-20 21:18:23
-->
<template>
  <div class="article-bottom">
    <div class="article-bottom-header">
      <div class="eof">__EOF__</div>
      <div class="article-info">
        <svg
          class="svg"
          width="148"
          height="156"
        >
          <g transform="translate(-.049)">
            <path
              fill="#d9d9d9"
              d="M10.5 99.81a1.9 1.9 0 0 0-.53-.09 1.66 1.66 0 0 0-1.64 1.65A1.64 1.64 0 0 0 10 103a1.57 1.57 0 0 0 .87-.25l26.76 26.82.45-1.08-26.56-26.58a1.65 1.65 0 0 0-1.02-2.1zm-.13 2a.57.57 0 0 1-.8 0 .573.573 0 0 1 .4-.98.57.57 0 0 1 .56.58.55.55 0 0 1-.16.36z"
            />
            <path
              fill="#d9d9d9"
              d="M56.15 117.58H39.06v-.09a1.65 1.65 0 0 0-1.36-1h-.2a1.65 1.65 0 1 0 1.56 2.19H55.7L92.92 156h41.44v-1.08h-41zm-18.25.94a.56.56 0 0 1-.79 0 .58.58 0 0 1-.17-.41.57.57 0 0 1 .56-.57.58.58 0 0 1 .57.58.54.54 0 0 1-.17.4z"
              transform="translate(.269)"
            />
            <path
              fill="#d9d9d9"
              d="M23.524 50.32a1.654 1.654 0 0 0 1.554-1.11H55.36l48.114-48.13h31.134V0h-31.565L54.929 48.13H25.078a1.663 1.663 0 1 0-1.554 2.2zm0-2.21a.57.57 0 1 1-.557.258.57.57 0 0 1 .557-.258z"
            />
            <path
              fill="#d9d9d9"
              d="M102.86 0z"
              transform="translate(.187)"
            />
            <path
              fill="#d9d9d9"
              d="M107.935 12.14h26.693v-1.07h-27.144L57.515 61H3.1a1.664 1.664 0 0 0-1.453-.86h-.12A1.651 1.651 0 1 0 2.816 63a1.589 1.589 0 0 0 .451-.87h54.7zM2.054 62.23a.572.572 0 0 1-.8 0 .579.579 0 0 1-.17-.41.571.571 0 0 1 .561-.57h.09a.57.57 0 0 1 .321 1z"
            />
            <path
              fill="#d9d9d9"
              d="M134.36 43.22v-1.08h-22.3l-9.62 9.63a1.64 1.64 0 0 0-2.19.77 1.61 1.61 0 0 0-.17.71 1.65 1.65 0 1 0 3.29 0 1.61 1.61 0 0 0-.16-.72l9.3-9.32zm-32.64 10.6a.57.57 0 1 1 .495-.565.57.57 0 0 1-.495.565z"
              transform="translate(.269)"
            />
            <path
              fill="#d9d9d9"
              d="m147 52.3-9 9h-26.52a1.64 1.64 0 0 0-1.61-1.33h-.14a1.65 1.65 0 1 0 1.6 2.41h27.19l9.26-9.29zm-37.15 9.85a.56.56 0 0 1-.56-.57.56.56 0 0 1 .56-.56.57.57 0 1 1 0 1.13z"
              transform="translate(.269)"
            />
            <path
              fill="#d9d9d9"
              d="m66.79 75.35 11 11.06h56.53v-1.08H78.27l-11-11.06H49.49l-12.37 12.4a1.64 1.64 0 0 0-2.09 1 1.61 1.61 0 0 0-.09.54 1.65 1.65 0 0 0 3.29 0 1.68 1.68 0 0 0-.26-.89l12-12zM36.58 88.79a.57.57 0 1 1 .57-.56.57.57 0 0 1-.57.56z"
              transform="translate(.269)"
            />
            <path
              fill="#d9d9d9"
              d="M110.61 95.55 92.8 113.4a1.62 1.62 0 1 0 .77.76l17.49-17.53h23.31v-1.08zm-18.12 19.73a.56.56 0 0 1-.8 0 .58.58 0 0 1-.17-.41.57.57 0 0 1 .57-.57.58.58 0 0 1 .56.58.55.55 0 0 1-.16.4z"
              transform="translate(.269)"
            />
            <path
              fill="#d9d9d9"
              d="M97.89 122.3H76.62L64.2 109.85a1.65 1.65 0 0 0-.77-2.2 1.77 1.77 0 0 0-.72-.17h-.14a1.65 1.65 0 0 0 .15 3.29 1.58 1.58 0 0 0 .71-.17l12.74 12.77h22.17l17.48-17.52h18.54v-1.08h-19zm-34.77-12.77a.56.56 0 0 1-.8 0 .58.58 0 0 1-.17-.41.57.57 0 0 1 1.14 0 .54.54 0 0 1-.17.41z"
              transform="translate(.269)"
            />
          </g>
        </svg>
        <div class="avatar">
          <base-avatar
            shape="square"
            src="999"
            :size="134"
            :href="`/blog/${'dreamy'}`"
            :target="`/blog/${'dreamy'}`"
          ></base-avatar>
        </div>

        <div class="info">
          <div class="item">
            <div class="item-label">本文作者</div>
            <div class="item-value">
              <article-link
                :href="`/blog/${'dreamy'}`"
                :target="`/blog/${'dreamy'}`"
              >dreamy
              </article-link>
            </div>
          </div>
          <div class="item">
            <div class="item-label">本文链接</div>
            <div class="item-value">
              <article-link
                href="https://www.cnblogs.com/poloyy/p/15255670.html"
                target="_blank"
              >
                https://www.cnblogs.com/poloyy/p/15255670.html
              </article-link>
            </div>
          </div>
          <div class="item">
            <div class="item-label">版权声明</div>
            <div class="item-value">本站使用
              <article-link
                :href="`/blog/${'dreamy'}`"
                :target="`/blog/${'dreamy'}`"
              >「CC BY 4.0」
              </article-link>
              <!-- 「CC BY 4.0」 -->
              创作共享协议，转载请在文章明显位置注明作者及出处！
            </div>
          </div>
          <div class="item">
            <div class="item-label">声援博主</div>
            <div class="item-value">如果您觉得文章对您有帮助，可以点击文章下方【支持】并【推荐】一下。</div>
          </div>
        </div>
      </div>
    </div>

    <article-bottom-comp />
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import BaseAvatar from '@/components/content/baseAvatar/BaseAvatar.vue';
import ArticleLink from '@/views/article/childComps/ArticleLink.vue';
import ArticleBottomComp from '@/views/article/childComps/articleBody/childComps/ArticleBottomComp.vue';
import styles from '@/assets/style/define.scss';

/**
 * @description: 文章底部
 * @author: clq
 */

export default defineComponent({
  name: 'article-bottom',
  components: {
    BaseAvatar,
    ArticleLink,
    ArticleBottomComp,
  },
  setup() {
    return {
      styles,
    };
  },
});
</script>

<style lang="scss" scoped>
.article-bottom {
  box-sizing: border-box;
  width: 100%;
  padding: 0 16px;

  .article-bottom-header {
    .eof {
      margin-top: 40px;
      text-align: center;
      font-family: Arial;
      font-size: 16px;
      font-weight: 700;
      color: $grey-8;
    }

    .article-info {
      box-sizing: border-box;
      width: 856px;
      height: 166px;
      margin: 15px 0 20px;
      @include flex(center, flex-start, row);
      border-radius: $border-radius-0;
      box-shadow: $shadow-0;
      background-image: linear-gradient(to bottom, $grey-0, $grey-3, $grey-2);
      position: relative;

      .avatar {
        margin: 0 16px;
      }

      .info {
        box-sizing: border-box;
        height: inherit;
        padding: 16px 0;
        @include flex(initial, initial, column);

        .item {
          height: 21px;
          margin-bottom: 17px;
          @include flex(center, flex-start, row);

          .item-label {
            margin-right: 4px;
            line-height: 21px;
            font-size: 16px;
            font-weight: bold;
            color: $grey-9;

            &:after {
              content: ' : ';
            }
          }

          .item-value {
            line-height: 21px;
            font-size: 16px;
            color: $grey-7;
          }
        }
      }

      .svg {
        position: absolute;
        right: 0;
        top: 5px;
      }
    }
  }
}
</style>
