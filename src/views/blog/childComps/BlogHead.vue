<!--
 * @Description: 博客头部
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-09-30 16:27:56
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-10-04 11:31:35
-->
<template>
  <div class="blog-head">
    <div
      class="blog-head-cover"
      ref="blogHeadCoverRef"
      :style="{backgroundColor: data.blog_home_image ? null : styles.grey10}"
    >
      <base-image
        v-if="data.blog_home_image"
        :loading="2"
        :src="data.blog_home_image"
        :style="{backgroundColor: `rgba(${colorHexToDec(styles.green0).rgb}, 0.5)`}"
      />
    </div>
    <div class="blog-head-inner">
      <h1 class="title">
        <span>{{data.nickname}}</span>
      </h1>
      <h2 class="signature">{{data.signature}}</h2>
    </div>
    <div
      class="blog-head-arrow"
      role="button"
      @click="toContent"
    >
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, inject, onMounted } from 'vue';
import BaseImage from '@/components/content/baseImage/BaseImage.vue';
import circleMagic from '@/util/animation/circleMagic';
import styles from '@/assets/style/define.scss';
import { colorHexToDec } from '@/util/util';

/**
 * @description: 博客头部
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'blogHead',
  components: {
    BaseImage,
  },
  props: {
    data: {
      type: Object,
      default() {
        return {
          username: 'us1',
          nickname: '小菠萝测试笔记',
          signature: '未来的你，会感谢今天仍在努力奋斗的你',
          blog_home_image: Math.random() >= 0.5 ? 'https://s3.bmp.ovh/imgs/2021/09/7fc65c1d3e881ea5.jpg' : null,
        };
      },
    },
  },
  setup() {
    const blogHeadCoverRef = ref(null); // 博客首页头部 ref
    const blogPage = inject('blogPage'); // 博客首页绑定滚动 ref

    // dom 渲染完成
    onMounted(() => {
      circleMagic(blogHeadCoverRef.value, { scrollElement: blogPage.value });
    });

    /**
     * @description: 滚动到内容部分
     * @return {void}
     * @author: dreamy-xay
     */
    function toContent() {
      blogPage.value.scrollTo({ top: document.body.offsetHeight, behavior: 'smooth' });
    }

    return {
      styles,
      colorHexToDec,
      blogHeadCoverRef,
      toContent,
    };
  },
});
</script>

<style lang="scss" scoped>
.blog-head {
  height: 100vh;
  width: 100%;
  position: relative;
  @include flex(center, center);
  background-color: $grey-0;
  box-shadow: 0 1px 3px rgba($grey-11, 0.4);

  .blog-head-cover {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
  }

  .blog-head-inner {
    width: 100%;
    z-index: 9;
    @include flex(center, center, column);

    .title {
      text-shadow: 0 3px 6px rgba($grey-11, 0.3);
      font-weight: 700;
      font-size: 50px;
      color: $grey-0;
      animation: fade-in-down 1s both;
      mix-blend-mode: screen;
      font-family: Playball, cursive;
      margin: 0;

      ::selection {
        background-color: rgba($grey-0, 0.5);
      }

      span:hover {
        animation: pageTitleText 2s infinite;
      }

      @keyframes pageTitleText {
        0% {
          text-shadow: 2px 0 0 tomato;
        }
        10% {
          text-shadow: -2px -2px 0 gold;
        }
        100%,
        20% {
          text-shadow: 2px 0 0 #0f0;
        }
        30%,
        70% {
          text-shadow: 2px 0 0 #40e0d0;
        }
        40% {
          text-shadow: 2px 2px 0 tomato;
        }
        50% {
          text-shadow: 0 -2px 0 gold;
        }
        60% {
          text-shadow: 0 2px 0 #0f0;
        }
        80% {
          text-shadow: 2px -4px 0 tomato;
        }
        90% {
          text-shadow: 2px 2px 0 gold;
        }
      }
    }

    .signature {
      font-size: 22px;
      font-weight: 400;
      font-family: '华文行楷', cursive;
      margin-top: 10px;
      @include ellipsis(1);
      text-align: center;
      width: 46%;
      color: rgba($grey-0, 0.9);
      text-shadow: 0 3px 6px rgba($grey-11, 0.5);
      font-weight: 400;
      animation: fade-in-down 0.9s both;
      animation-delay: 0.3s;
      overflow: hidden;
    }

    @keyframes fade-in-down {
      0% {
        opacity: 0;
        transform: translateY(-10px);
      }

      100% {
        opacity: 1;
        transform: translateY(0);
      }
    }
  }

  .blog-head-arrow {
    animation-duration: 2s;
    animation-name: blink;
    height: 30px;
    width: 30px;
    display: inline-block;
    animation-iteration-count: infinite;
    bottom: 6%;
    left: calc(50% - 15px);
    margin-left: -15px;
    position: absolute;
    z-index: 10;

    &::after,
    &::before {
      background-color: $grey-1;
      content: '';
      height: 4px;
      left: 50%;
      margin-left: -11px;
      margin-top: -1px;
      position: absolute;
      top: 50%;
      border-radius: 2px;
      width: 22px;
    }

    &::before {
      transform: translateX(-7px) rotate(45deg);
    }

    &::after {
      transform: translateX(7px) rotate(-45deg);
    }
  }

  @keyframes blink {
    0% {
      transform: translateY(-5px);
    }
    50% {
      transform: translateY(0px);
    }
    100% {
      transform: translateY(-5px);
    }
  }
}
</style>
