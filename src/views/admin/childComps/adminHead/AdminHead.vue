<!--
 * @Description: admin头部
 * @Version:
 * @Autor: Z_Y_C
 * @Date: 2022-02-22 10:20:59
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2023-03-12 18:44:17
-->
<template>
  <div class="admin-head">
    <admin-navigation
      :breadcrumb-data="breadcrumbData"
      :user-data="userData"
    />
    <admin-tab
      :editable-tabs="editableTabs"
      v-model:editable-tabs-value="editableTabsValue"
      @remove-tab="removeTab"
      @handle-command="handleCommand"
    />
  </div>
</template>
<script>
import { defineComponent, reactive, ref, watch } from 'vue';
import AdminNavigation from '@/views/admin/childComps/adminHead/childComps/AdminNavigation.vue';
import AdminTab from '@/views/admin/childComps/adminHead/childComps/AdminTab.vue';
import { useRoute, useRouter } from 'vue-router';
import { mapState } from '@/util/store';

/**
 * @description: 头部
 * @param {Object} userData  用户数据 `必传参数`
 * @author: dreamy-xay
 */

export default defineComponent({
  name: 'adminHead',
  components: {
    AdminNavigation,
    AdminTab,
  },
  props: {
    userData: {
      type: Object,
      required: true,
    },
  },
  setup() {
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
      // 如果缓存tab里没有该路径则添加
      if (editableTabs.findIndex((editableTab) => editableTab.name === route.name) == -1) {
        editableTabs.splice(editableTabs.length, 0, {
          icon: route.meta.icon,
          content: route.meta.title,
          name: route.name,
        });
      }

      editableTabsValue.value = route.name; // 更新激活值

      // 处理面包屑
      breadcrumbData.splice(0, breadcrumbData.length); // 清空面包屑
      for (let i = 1; i < route.matched.length; ++i) {
        breadcrumbData.splice(breadcrumbData.length, 0, {
          icon: route.matched[i].meta.icon,
          content: route.matched[i].meta.title,
          name: route.matched[i].name,
        });
      }
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
      if (adminRoutes.value[0].children[0].name != route.name)
        editableTabs.splice(0, 0, {
          icon: adminRoutes.value[0].children[0].icon,
          content: adminRoutes.value[0].children[0].title,
          name: adminRoutes.value[0].children[0].name,
        });

      checkAndUpdate();
    }

    /**
     * @description: 移除缓存页面
     * @param {string} name 被删除的标签的name
     * @return {void}
     * @author: Z_Y_C
     */
    function removeTab(name) {
      let j = 0;
      for (let i = 1; i < editableTabs.length; ++i) {
        if (name == editableTabs[i].name) {
          editableTabs.splice(i, 1);
          j = i - 1;
        }
      }
      if (editableTabsValue.value == name) {
        editableTabsValue.value = editableTabs[j].name;
        router.push({ name: editableTabs[j].name });
      }
    }

    /**
     * @description: 点击关闭发生事件
     * @param {number} index 关闭类型 0:关闭其他，1:关闭左侧，2:关闭右侧，3:关闭全部
     * @return {void}
     * @author: Z_Y_C
     */
    function handleCommand(index) {
      if (index === 0) {
        for (let i = 0; i < editableTabs.length; ++i) {
          if (editableTabsValue.value == editableTabs[i].name) {
            editableTabs.splice(i + 1, editableTabs.length);
            editableTabs.splice(1, i - 1);
          }
        }
      } else if (index === 1) {
        for (let i = 0; i < editableTabs.length; ++i) {
          if (editableTabsValue.value == editableTabs[i].name) {
            editableTabs.splice(1, i - 1);
          }
        }
      } else if (index === 2) {
        for (let i = 0; i < editableTabs.length; ++i) {
          if (editableTabsValue.value == editableTabs[i].name) {
            editableTabs.splice(i + 1, editableTabs.length);
          }
        }
      } else {
        editableTabs.splice(1, editableTabs.length);
        editableTabsValue.value = editableTabs[0].name;
        router.push({ name: editableTabs[0].name });
      }
    }
    return {
      editableTabs,
      editableTabsValue,
      breadcrumbData,
      removeTab,
      handleCommand,
    };
  },
});
</script>

<style lang="scss" scoped>
.admin-head {
  box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
  background-color: $grey-0;
}
</style>
