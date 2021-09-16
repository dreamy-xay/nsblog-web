<!--
 * @Description: 文章头部背景组件
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-09-16 18:19:49
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2021-09-16 19:23:48
-->
<template>
  <div
    class="article-head-background"
    :style="{backgroundImage: `url(${backgroundImage})`}"
  >
    <ul class="circles">
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
    </ul>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';

/**
 * @description:
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'articleHeadBackground',
  setup() {
    const backgroundImage = ref('/article/background.jpg'); // 头部背景图片

    return {
      backgroundImage,
    };
  },
});
</script>

<style lang="scss" scoped>
.article-head-background {
  width: 100%;
  height: 100%;
  background-color: $grey-10;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  overflow: hidden;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;

  .circles {
    width: 100%;
    height: 100%;
    overflow: hidden;

    @keyframes nhBannerAnimation {
      0% {
        transform: translateY(0) rotate(0deg);
        opacity: 1;
        border-radius: 0;
      }

      to {
        transform: translateY(-1000px) rotate(2turn);
        opacity: 0;
        border-radius: 50%;
      }
    }

    li {
      position: absolute;
      display: block;
      list-style: none;
      width: 20px;
      height: 20px;
      background: hsla(0, 0%, 100%, 0.2);
      animation: nhBannerAnimation 25s linear infinite;
      bottom: -150px;

      &:first-child {
        left: 25%;
        width: 80px;
        height: 80px;
        animation-delay: 0s;
      }

      &:nth-child(2) {
        left: 10%;
        width: 20px;
        height: 20px;
        animation-delay: 2s;
        animation-duration: 12s;
      }

      &:nth-child(3) {
        left: 70%;
        width: 20px;
        height: 20px;
        animation-delay: 4s;
      }

      &:nth-child(4) {
        left: 40%;
        width: 60px;
        height: 60px;
        animation-delay: 0s;
        animation-duration: 18s;
      }

      &:nth-child(5) {
        left: 65%;
        width: 20px;
        height: 20px;
        animation-delay: 0s;
      }

      &:nth-child(6) {
        left: 75%;
        width: 110px;
        height: 110px;
        animation-delay: 3s;
      }

      &:nth-child(7) {
        left: 35%;
        width: 150px;
        height: 150px;
        animation-delay: 7s;
      }

      &:nth-child(8) {
        left: 50%;
        width: 25px;
        height: 25px;
        animation-delay: 15s;
        animation-duration: 45s;
      }

      &:nth-child(9) {
        left: 20%;
        width: 15px;
        height: 15px;
        animation-delay: 2s;
        animation-duration: 35s;
      }

      &:nth-child(10) {
        left: 85%;
        width: 150px;
        height: 150px;
        animation-delay: 0s;
        animation-duration: 11s;
      }
    }
  }
}
</style>
