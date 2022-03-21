<!--
 * @Description: admin头部
 * @Version:
 * @Autor: Z_Y_C
 * @Date: 2022-02-22 10:20:59
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2022-03-21 17:53:38
-->
<template>
  <div class="admin-head">
    <admin-navigation :breadcrumb-data="breadcrumbData" />
    <admin-tab
      :editable-tabs='editableTabs'
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

/**
 * @description:头部
 * @param {Array} routesMenu  获取所有路由菜单列表
 * @author: Z_Y_C
 */

export default defineComponent({
  name: 'adminHead',
  components: {
    AdminNavigation,
    AdminTab,
  },
  props: {
    routesMenu: {
      type: Array,
      required: true,
    },
  },
  setup(props) {
    const route = useRoute();
    const router = useRouter();
    const breadcrumbData = reactive([]); // 面包屑数据

    const editableTabs = reactive([]); // 缓存页面数据

    // 绑定值，选中选项卡的 name 缓存页面数据中id属性
    const editableTabsValue = ref('');

    // 面包屑显示数据
    if (route.matched[1].name == props.routesMenu[0].name) {
      breadcrumbData.splice(breadcrumbData.length, 0, {
        icon: route.matched[2].meta.icon,
        content: route.matched[2].meta.title,
        name: route.matched[2].name,
      });
    } else {
      for (let i = 1; i < route.matched.length; i++) {
        breadcrumbData.splice(breadcrumbData.length, 0, {
          icon: route.matched[i].meta.icon,
          content: route.matched[i].meta.title,
          name: route.matched[i].name,
        });
      }
    }

    // 页面缓存数据
    editableTabs.splice(editableTabs.length, 0, {
      icon: props.routesMenu[0].children[0].icon,
      content: props.routesMenu[0].children[0].title,
      name: props.routesMenu[0].children[0].name,
    });

    // 选择缓存页面数据
    editableTabsValue.value = route.name;

    // 页面缓存数据
    if (props.routesMenu[0].children[0].name != route.name) {
      editableTabs.splice(editableTabs.length, 0, {
        icon: route.meta.icon,
        content: route.meta.title,
        name: route.name,
      });
      editableTabsValue.value = route.name;
    }

    // 监听路由变化
    watch(
      () => route.path,
      () => {
        let i = 0;
        for (; i < editableTabs.length; i++) {
          if (route.name == editableTabs[i].name) break;
        }
        if (i == editableTabs.length) {
          editableTabs.splice(editableTabs.length, 0, {
            icon: route.meta.icon,
            content: route.meta.title,
            name: route.name,
          });
        }
        editableTabsValue.value = route.name;

        breadcrumbData.splice(0, breadcrumbData.length);
        if (route.matched[1].name == props.routesMenu[0].name) {
          breadcrumbData.splice(breadcrumbData.length, 0, {
            icon: route.matched[2].meta.icon,
            content: route.matched[2].meta.title,
            name: route.matched[2].name,
          });
        } else {
          for (let i = 1; i < route.matched.length; i++) {
            breadcrumbData.splice(breadcrumbData.length, 0, {
              icon: route.matched[i].meta.icon,
              content: route.matched[i].meta.title,
              name: route.matched[i].name,
            });
          }
        }
      }
    );

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
