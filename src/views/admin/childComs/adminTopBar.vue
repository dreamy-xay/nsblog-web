<template>
  <div class="admin-top-bar">
    <div class="admin-top-bar-left">
      <div
        class="left-menu"
        role="button"
        @click="$emit('mainMenuClick')"
      >
        <i class="iconfont blog-caidan1"></i>
      </div>
    </div>
    <div class="admin-top-bar-right">

    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'adminTopBar',
  data() {},
  methods: {
    menuClick() {},
  },
};
</script>

<style lang="scss" scoped>
.admin-top-bar {
  width: 100%;
  height: 70px;
  background-color: #6f6486;
  position: sticky;
  overflow: hidden;

  .admin-top-bar-left {
    height: 100%;
    overflow: hidden;
    display: flex;
    align-items: center;

    .left-menu {
      width: 50px;
      height: 50px;
      text-align: center;
      line-height: 50px;
      border-radius: 2px;
      overflow: hidden;
      transition: all 0.3s;
      margin-left: 20px;

      &:hover {
        background-color: #5e4d81;
      }

      .iconfont {
        font-size: 35px;
        font-weight: 600;
        color: white;
      }
    }
  }

  .admin-top-bar-right {
    height: 100%;
    float: yellow;
  }
}
</style>
