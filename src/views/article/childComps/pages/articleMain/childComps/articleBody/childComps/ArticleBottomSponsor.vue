<!--
 * @Description: 文章页面打赏组件
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-09-24 20:04:12
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-10-01 21:35:26
-->
<template>
  <div class="article-bottom-sponsor">
    <div
      class="article-bottom-sponsor-inner"
      :class="{'sponsor-blur': showBox}"
      role="button"
    >
      <div class="img">
        Sponsor
      </div>
      <div
        class="item"
        @click="openSponsor('paypal')"
      >
        <i class="iconfont blog-paypal"></i>
      </div>
      <div
        class="item"
        @click="openSponsor('alipay')"
      >
        <i class="iconfont blog-zhifubao"></i>
      </div>
      <div
        class="item"
        @click="openSponsor('weixin')"
      >
        <i class="iconfont blog-tianjiaweixinzhifu"></i>
      </div>
    </div>
    <div
      class="article-bottom-sponsor-box"
      :class="{'box-show': showBox}"
    >
      <div
        class="main"
        role="button"
        :style="{backgroundImage: `url(${qrCodeImage})`}"
        :class="mainClass"
        @click="closeQRCode"
      ></div>
    </div>
  </div>
</template>

<script>
import { useMessage } from 'naive-ui';
import { defineComponent, ref } from 'vue';

/**
 * @description: 文章页面打赏组件
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'articleBottomSponsor',
  props: {
    sponsors: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  setup(props) {
    const msg = useMessage(); // naive-ui message
    const qrCodeImage = ref(null); // 二维码图片
    const mainClass = ref(null); // box类
    const showBox = ref(false); // 是否展示二维码

    /**
     * @description: 显示二维码
     * @param {string} src 二维码图片路径 `必传参数`
     * @return {void}
     * @author: dreamy-xay
     */
    function showQRCode(src) {
      qrCodeImage.value = src;
      showBox.value = true;
      setTimeout(() => {
        mainClass.value = 'show-qr';
      }, 300);
    }

    /**
     * @description: 关闭二维码
     * @return {void}
     * @author: dreamy-xay
     */
    function closeQRCode() {
      mainClass.value = 'hide-qr';
      setTimeout(() => {
        showBox.value = false;
        setTimeout(() => {
          mainClass.value = null;
        }, 300);
      }, 600);
    }

    /**
     * @description: 打开捐赠选项展示
     * @param {string} key 捐助选项 `必传参数`
     * @return {void}
     * @author: dreamy-xay
     */
    function openSponsor(key) {
      if (key === 'paypal')
        props.sponsors['paypal']
          ? window.open(props.sponsors.paypal, '_blank')
          : msg.info('博主忘记设置 PayPal 收款地址', { duration: 2000, closable: true });
      else if (key === 'alipay')
        props.sponsors['alipay']
          ? showQRCode(props.sponsors.alipay)
          : msg.info('博主忘记设置支付宝收款二维码', { duration: 2000, closable: true });
      else if (key === 'weixin')
        props.sponsors['weixin']
          ? showQRCode(props.sponsors.weixin)
          : msg.info('博主忘记设置微信收款二维码', { duration: 2000, closable: true });
    }

    return {
      openSponsor,
      closeQRCode,
      qrCodeImage,
      showBox,
      mainClass,
    };
  },
});
</script>

<style lang="scss" scoped>
.article-bottom-sponsor {
  width: 100%;
  height: 33px;
  margin-top: 54px;
  @include flex(center, center);
  position: relative;

  .article-bottom-sponsor-inner {
    height: 100%;
    width: 276px;
    @include flex(center, center);
    position: relative;
    transition: filter 0.3s;

    &.sponsor-blur {
      filter: blur(3px);
    }

    .item {
      width: 92px;
      height: 100%;
      transition: 0.25s;
      background-color: $grey-0;
      box-shadow: $shadow-0;
      z-index: 1;
      @include flex(center, center);

      .iconfont {
        font-size: 50px;
      }

      &:hover {
        z-index: 3;
      }

      &:nth-child(2) {
        color: $green-0;
        border-radius: 4px 0 0 4px;

        &:hover {
          color: $green-1;
          box-shadow: 0 0 6px $green-1;
        }
      }

      &:nth-child(3) {
        color: $blue-0;
        box-shadow: $shadow-0;
        z-index: 2;

        &:hover {
          color: $blue-1;
          box-shadow: 0 0 6px $blue-1;
        }
      }

      &:nth-child(4) {
        color: $orange-0;
        border-radius: 0 4px 4px 0;

        &:hover {
          color: $orange-1;
          box-shadow: 0 0 6px $orange-1;
        }
      }
    }

    .img {
      cursor: default;
      position: absolute;
      left: 30px;
      top: -54px;
      font-size: 12px;
      width: 70px;
      height: 70px;
      line-height: 70px;
      color: $grey-0;
      z-index: 0;
      background: $yellow-0 url('/article/o_like.png') no-repeat center 10px;
      background-size: 20px;
      border-radius: 35px;
      text-align: center;
      transform: rotatez(-15deg);
    }
  }

  .article-bottom-sponsor-box {
    position: absolute;
    top: -54px;
    left: 0;
    z-index: 3;
    background-color: rgba($grey-0, 0.3);
    opacity: 0;
    pointer-events: none;
    perspective: 400px;
    width: 100%;
    height: calc(100% + 108px);
    transition: 0.3s;

    &.box-show {
      opacity: 1;
      pointer-events: auto;
    }

    .main {
      position: absolute;
      text-align: center;
      width: 200px;
      height: 200px;
      left: calc(50% - 100px);
      top: calc(50% - 100px);
      background: $grey-0 no-repeat center center;
      background-size: 190px;
      border-radius: 6px;
      box-shadow: 0 2px 7px rgba($grey-11, 0.3);
      opacity: 0;
      transition: opacity 1s ease-in-out;
      transform-style: preserve-3d;
      transform-origin: center center;
      overflow: hidden;

      @keyframes showQR {
        from {
          transform: rotateX(90deg);
        }

        8% {
          opacity: 1;
          transform: rotateX(-60deg);
        }

        18% {
          opacity: 1;
          transform: rotateX(40deg);
        }

        34% {
          opacity: 1;
          transform: rotateX(-28deg);
        }

        44% {
          opacity: 1;
          transform: rotateX(18deg);
        }

        58% {
          opacity: 1;
          transform: rotateX(-12deg);
        }

        72% {
          opacity: 1;
          transform: rotateX(9deg);
        }

        88% {
          opacity: 1;
          transform: rotateX(-5deg);
        }

        96% {
          opacity: 1;
          transform: rotateX(2deg);
        }

        to {
          opacity: 1;
        }
      }

      &.show-qr {
        opacity: 1;
        animation-name: showQR;
        animation-duration: 3s;
        animation-timing-function: ease-in-out;
        animation-iteration-count: 1;
        animation-fill-mode: forwards;
      }

      @keyframes hideQR {
        20%,
        50% {
          transform: scale(1.08, 1.08);
          opacity: 1;
        }

        to {
          opacity: 0;
          transform: rotateZ(40deg) scale(0.6, 0.6);
        }
      }

      &.hide-qr {
        opacity: 0.2;
        animation-name: hideQR;
        animation-duration: 0.5s;
        animation-timing-function: ease-in-out;
        animation-iteration-count: 1;
        animation-fill-mode: forwards;
      }
    }
  }
}
</style>
