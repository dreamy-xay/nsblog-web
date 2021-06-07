<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
@import 'assets/style/normalize';
@import 'assets/front/iconfont';
@import 'assets/style/base';
@import 'assets/style/define';

#app {
  height: 100%;
  width: 100%;
  // font-family: Avenir, Helvetica, Arial, sans-serif;
  // -webkit-font-smoothing: antialiased;
  // -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  // color: #2c3e50;
}

body {
  height: 100vh;
  width: 100vw;
  box-sizing: border-box;
  overflow-x: hidden;

  &::-webkit-scrollbar {
    width: 0;
  }
}
</style>
