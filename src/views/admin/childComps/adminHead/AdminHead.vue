<!--
 * @Description: admin头部
 * @Version:
 * @Autor: Z_Y_C
 * @Date: 2022-02-22 10:20:59
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2023-03-19 17:11:20
-->
<template>
  <div class="admin-head">
    <admin-navigation
      v-show="showNavigation"
      :breadcrumb-data="breadcrumbData"
      :user-data="userData"
    />
    <admin-tab
      :editable-tabs="editableTabs"
      v-model:editable-tabs-value="editableTabsValue"
      @remove-tab="removeTab"
      @click-tab="clickTab"
      @handle-command="handleCommand"
      @zoomToggle="$emit('zoomToggle', $event)"
    />
  </div>
</template>
<script>
import { defineComponent, reactive, ref, watch } from 'vue';
import AdminNavigation from '@/views/admin/childComps/adminHead/childComps/AdminNavigation.vue';
import AdminTab from '@/views/admin/childComps/adminHead/childComps/AdminTab.vue';
import { useRoute, useRouter } from 'vue-router';
import { mapState } from '@/utils/store';
import { searchMenuRoute, searchMenuRoutes } from '@/utils/router';

/**
 * @description: 头部
 * @param {Object} userData  用户数据 `必传参数`
 * @param {Boolean} showNavigation 是否显示navigation `默认为true`
 * @events tagsChange 缓存列表的状态改变 (routeName: string, isAdd: boolean) => void
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'adminHead',
  components: {
    AdminNavigation,
    AdminTab,
  },
  emits: ['tagsChange', 'zoomToggle'],
  props: {
    userData: {
      type: Object,
      required: true,
    },
    showNavigation: {
      type: Boolean,
      default: true,
    },
  },
  setup(_, context) {
    const route = useRoute();
    const router = useRouter();
    const breadcrumbData = reactive([]); // 面包屑数据
    const editableTabs = reactive([]); // 缓存页面数据

    // 绑定值，选中选项卡的 name 缓存页面数据中id属性
    const editableTabsValue = ref('');

    const { adminRoutes } = mapState('global', ['adminRoutes']); // 获取adminRoutes

    tabInit(); // 初始化

    /**
     * @description: 根据路由更改检查并更新tab和面包屑
     * @return {void}
     * @author: dreamy-xay
     */
    function checkAndUpdate() {
      // 处理面包屑（使用动态属性，而不是route.matched）
      const matchedRoutes = searchMenuRoutes((r) => r.name === route.name, adminRoutes.value)[0];
      breadcrumbData.splice(0, breadcrumbData.length, ...matchedRoutes);

      // 如果缓存tab里没有该路径则添加
      if (editableTabs.findIndex((editableTab) => editableTab.name === route.name) == -1) {
        // 查询路由信息（使用动态属性，而不是route.meta）
        // 此处可省略查询，因为 matchedRoutes 就是查询结果，面包屑先查了一遍
        // 添加进tabs（matchedRoutes 数组的最后一个）
        editableTabs.splice(editableTabs.length, 0, matchedRoutes[matchedRoutes.length - 1]);
        // 增加tabs改变
        context.emit('tagsChange', route.name, true);
      }

      editableTabsValue.value = route.name; // 更新激活值
    }

    // 监听路由变化
    watch(() => route.name, checkAndUpdate);

    /**
     * @description: tab 初始化函数
     * @return {void}
     * @author: dreamy-xay
     */
    function tabInit() {
      // 如果跳转页面不是首页，则将首页加入 tab 列表
      if (adminRoutes.value[0].children[0].name != route.name) {
        editableTabs.splice(0, 0, adminRoutes.value[0].children[0]);
        // 添加首页tabs改变
        context.emit('tagsChange', adminRoutes.value[0].children[0].name, true);
      }

      checkAndUpdate();
    }

    /**
     * @description: 移除tab页面
     * @param {string} name 被删除的标签的name
     * @return {void}
     * @author: Z_Y_C
     */
    function removeTab(name) {
      // 获取移除标签索引
      const removeTabIndex = editableTabs.findIndex((editableTab) => editableTab.name === name);

      // 如果移除标签是当前标签
      if (editableTabsValue.value === name) {
        // 获取当前路由全部参数
        const currentRoute = searchMenuRoute((r) => r.name === name, adminRoutes.value);
        // 下一步操作函数
        const next = () => {
          editableTabs.splice(removeTabIndex, 1); // 删除该标签
          context.emit('tagsChange', editableTabsValue.value, false); // 添加tabs改变
          editableTabsValue.value = editableTabs[removeTabIndex - 1].name; // 更新激活标签name
          router.push({ name: editableTabs[removeTabIndex - 1].name }); // 前往路由
        };
        // 如果当前路由存在关闭前执行函数则执行 beforeClose
        if (currentRoute['beforeClose']) currentRoute.beforeClose(next);
        else next();
      } // 否则直接移除
      else {
        context.emit('tagsChange', editableTabs[removeTabIndex].name, false); // 添加tabs改变
        editableTabs.splice(removeTabIndex, 1); // 移除它
      }
    }

    /**
     * @description: 切换tab页面
     * @param {string} name 被删除的标签的name
     * @return {void}
     * @author: dreamy-xay
     */
    function clickTab(name) {
      const preRouteName = editableTabsValue.value; // 切换前路由名称
      // 获取切换前路由全部参数
      const preRoute = searchMenuRoute((r) => r.name === preRouteName, adminRoutes.value);
      // 下一步操作函数
      const next = () => {
        editableTabsValue.value = name;
        router.push({ name: name });
      };
      // 如果切换前路由存在切换前执行函数则执行 beforeToggle
      if (preRoute['beforeToggle']) preRoute.beforeToggle(next);
      else next();
    }

    /**
     * @description: 点击关闭发生事件
     * @param {number} index 关闭类型 0:关闭其他，1:关闭左侧，2:关闭右侧，3:关闭全部
     * @return {void}
     * @author: Z_Y_C
     */
    function handleCommand(index) {
      const currentTabIndex = editableTabs.findIndex((editableTab) => editableTab.name === editableTabsValue.value); // 当前tab 索引
      if (index === 0) {
        const currentTab = editableTabs[currentTabIndex]; // 当前tab

        // 添加tabs改变
        for (let i = 1; i < editableTabs.length; ++i)
          if (i !== currentTabIndex) context.emit('tagsChange', editableTabs[i].name, false);

        editableTabs.splice(1, editableTabs.length - 1, currentTab);
      } else if (index === 1) {
        // 添加tabs改变
        for (let i = 1; i < currentTabIndex; ++i)
          if (i !== currentTabIndex) context.emit('tagsChange', editableTabs[i].name, false);

        editableTabs.splice(1, currentTabIndex - 1);
      } else if (index === 2) {
        // 添加tabs改变
        for (let i = currentTabIndex + 1; i < editableTabs.length; ++i)
          if (i !== currentTabIndex) context.emit('tagsChange', editableTabs[i].name, false);

        editableTabs.splice(currentTabIndex + 1, editableTabs.length);
      } else {
        // 下一步（关闭全部）的执行函数
        const next = () => {
          // 添加tabs改变
          for (let i = 1; i < editableTabs.length; ++i) context.emit('tagsChange', editableTabs[i].name, false);

          editableTabs.splice(1, editableTabs.length);
          editableTabsValue.value = editableTabs[0].name;
          router.push({ name: editableTabs[0].name });
        };
        // 如果当前激活菜单不是第一个不可关闭的菜单
        if (editableTabsValue.value != editableTabs[0].name) {
          // 获取当前路由全部参数
          const currentRoute = searchMenuRoute((r) => r.name === editableTabsValue.value, adminRoutes.value);
          // 如果当前路由存在关闭前执行函数则执行 beforeClose
          if (currentRoute['beforeClose']) currentRoute.beforeClose(next);
          else next();
        } else next();
      }
    }

    return {
      editableTabs,
      editableTabsValue,
      breadcrumbData,
      removeTab,
      clickTab,
      handleCommand,
    };
  },
});
</script>

<style lang="scss" scoped>
.admin-head {
  box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
  background-color: $grey-0;
  z-index: 1;
  position: relative;
}
</style>
