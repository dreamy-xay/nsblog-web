/*
 * @Description: 后台管理页面路由
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2022-02-21 20:01:40
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2022-02-26 22:02:01
 */
import { RouteRecordRaw } from 'vue-router';
import adminEmpty from '@/views/admin/childComps/AdminEmpty.vue';

const adminRouter: any = {
  path: '/admin',
  name: 'admin',
  component: () => import('@/views/admin/Admin.vue'),
  redirect: {
    name: 'adminHome'
  },
  children: [
    {
      path: 'home',
      name: 'adminHome',
      redirect: {
        name: 'adminDashboard'
      },
      component: adminEmpty,
      meta: {
        title: '首页',
        icon: 'iconfont blog-hot',
        super: false,
        menu: true
      },
      children: [
        {
          path: 'index',
          name: 'adminIndex',
          meta: {
            title: '首页',
            icon: 'iconfont blog-hot',
            super: false
          },
          component: () => import('@/views/admin/childComps/pages/adminDashboard/AdminDashboard.vue')
        },
        {
          path: 'dashboard',
          name: 'adminDashboard',
          meta: {
            title: '看板',
            icon: 'iconfont blog-hot',
            super: false
          },
          component: () => import('@/views/admin/childComps/pages/adminDashboard/AdminDashboard.vue')
        },
        {
          path: 'workbench',
          name: 'adminWorkbench',
          meta: {
            title: '工作台',
            icon: 'iconfont blog-hot',
            super: false
          },
          component: () => import('@/views/admin/childComps/pages/adminDashboard/AdminDashboard.vue')
        }
      ]
    },
    {
      path: 'component',
      name: 'adminComponent',
      redirect: {
        name: 'adminIcon'
      },
      component: adminEmpty,
      meta: {
        title: '组件',
        icon: 'iconfont blog-hot',
        super: false,
        menu: true
      },
      children: [
        {
          path: 'icon',
          name: 'adminIcon',
          meta: {
            title: '图标',
            icon: 'iconfont blog-hot',
            super: false
          },
          component: () => import('@/views/admin/childComps/pages/adminDashboard/AdminDashboard.vue')
        },
        {
          path: 'permission',
          name: 'adminPermission',
          meta: {
            title: '角色权限',
            icon: 'iconfont blog-hot',
            super: false
          },
          component: () => import('@/views/admin/childComps/pages/adminDashboard/AdminDashboard.vue')
        },
        {
          path: 'table',
          name: 'adminTable',
          meta: {
            title: '表格',
            icon: 'iconfont blog-hot',
            super: false
          },
          component: () => import('@/views/admin/childComps/pages/adminDashboard/AdminDashboard.vue')
        },
        {
          path: 'card',
          name: 'adminCard',
          meta: {
            title: '卡片',
            icon: 'iconfont blog-hot',
            super: false
          },
          component: () => import('@/views/admin/childComps/pages/adminDashboard/AdminDashboard.vue')
        },
        {
          path: 'list',
          name: 'adminList',
          meta: {
            title: '列表',
            icon: 'iconfont blog-hot',
            super: false
          },
          component: () => import('@/views/admin/childComps/pages/adminDashboard/AdminDashboard.vue')
        },
        {
          path: 'description',
          name: 'adminDescription',
          meta: {
            title: '描述',
            icon: 'iconfont blog-hot',
            super: false
          },
          component: () => import('@/views/admin/childComps/pages/adminDashboard/AdminDashboard.vue')
        },
        {
          path: 'calendar',
          name: 'adminCalendar',
          meta: {
            title: '日历',
            icon: 'iconfont blog-hot',
            super: false
          },
          component: () => import('@/views/admin/childComps/pages/adminDashboard/AdminDashboard.vue')
        },
        {
          path: 'editor',
          name: 'adminEditor',
          meta: {
            title: '编辑器',
            icon: 'iconfont blog-hot',
            super: false
          },
          component: () => import('@/views/admin/childComps/pages/adminDashboard/AdminDashboard.vue')
        },
        {
          path: 'form',
          name: 'adminForm',
          meta: {
            title: '表单',
            icon: 'iconfont blog-hot',
            super: false
          },
          component: () => import('@/views/admin/childComps/pages/adminDashboard/AdminDashboard.vue')
        }
      ]
    },
    {
      path: 'other',
      name: 'adminOther',
      redirect: {
        name: 'adminWorkflow'
      },
      component: adminEmpty,
      meta: {
        title: '其它',
        icon: 'iconfont blog-hot',
        super: false,
        menu: true
      },
      children: [
        {
          path: 'workflow',
          name: 'adminWorkflow',
          meta: {
            title: '工作流',
            icon: 'iconfont blog-hot',
            super: false
          },
          component: () => import('@/views/admin/childComps/pages/adminDashboard/AdminDashboard.vue')
        },
        {
          path: 'echarts',
          name: 'adminEcharts',
          meta: {
            title: '图表',
            icon: 'iconfont blog-hot',
            super: false
          },
          component: () => import('@/views/admin/childComps/pages/adminDashboard/AdminDashboard.vue')
        },
        {
          path: 'print',
          name: 'adminPrint',
          meta: {
            title: '打印',
            icon: 'iconfont blog-hot',
            super: false
          },
          component: () => import('@/views/admin/childComps/pages/adminDashboard/AdminDashboard.vue')
        },
        {
          path: 'cropper',
          name: 'adminCropper',
          meta: {
            title: '头像裁剪',
            icon: 'iconfont blog-hot',
            super: false
          },
          component: () => import('@/views/admin/childComps/pages/adminDashboard/AdminDashboard.vue')
        },
        {
          path: 'notice',
          name: 'adminNotice',
          meta: {
            title: '通知',
            icon: 'iconfont blog-hot',
            super: false
          },
          component: () => import('@/views/admin/childComps/pages/adminDashboard/AdminDashboard.vue')
        },
        {
          path: 'timeline',
          name: 'adminTimeline',
          meta: {
            title: '时间线',
            icon: 'iconfont blog-hot',
            super: false
          },
          component: () => import('@/views/admin/childComps/pages/adminDashboard/AdminDashboard.vue')
        },
        {
          path: 'count',
          name: 'adminCount',
          meta: {
            title: '数字自增长',
            icon: 'iconfont blog-hot',
            super: false
          },
          component: () => import('@/views/admin/childComps/pages/adminDashboard/AdminDashboard.vue')
        },
        {
          path: 'tabs',
          name: 'adminTabs',
          meta: {
            title: '多标签',
            icon: 'iconfont blog-hot',
            super: false
          },
          component: () => import('@/views/admin/childComps/pages/adminDashboard/AdminDashboard.vue')
        },
        {
          path: 'share',
          name: 'adminShare',
          meta: {
            title: '分享',
            icon: 'iconfont blog-hot',
            super: false
          },
          component: () => import('@/views/admin/childComps/pages/adminDashboard/AdminDashboard.vue')
        },
        {
          path: 'dynamicAnchor',
          name: 'adminDynamicAnchor',
          meta: {
            title: '动态锚点',
            icon: 'iconfont blog-hot',
            super: false
          },
          component: () => import('@/views/admin/childComps/pages/adminDashboard/AdminDashboard.vue')
        },
        {
          path: 'dynamicMeta',
          name: 'adminDynamicMeta',
          meta: {
            title: '动态Meta',
            icon: 'iconfont blog-hot',
            super: false
          },
          component: () => import('@/views/admin/childComps/pages/adminDashboard/AdminDashboard.vue')
        },
        {
          path: 'dynamicSegment',
          name: 'adminDynamicSegment',
          meta: {
            title: '动态路径参数',
            icon: 'iconfont blog-hot',
            super: false
          },
          component: () => import('@/views/admin/childComps/pages/adminDashboard/AdminDashboard.vue')
        },
        {
          path: 'drag',
          name: 'adminDrag',
          meta: {
            title: '拖拽',
            icon: 'iconfont blog-hot',
            super: false
          },
          component: () => import('@/views/admin/childComps/pages/adminDashboard/AdminDashboard.vue')
        },
        {
          path: 'player',
          name: 'adminPlayer',
          meta: {
            title: '视频播放器',
            icon: 'iconfont blog-hot',
            super: false
          }
        },
        {
          path: 'upload',
          name: 'adminUpload',
          meta: {
            title: '上传',
            icon: 'iconfont blog-hot',
            super: false
          },
          component: () => import('@/views/admin/childComps/pages/adminDashboard/AdminDashboard.vue')
        },
        {
          path: 'menu1',
          name: 'adminMenu1',
          meta: {
            title: '多级路由缓存',
            icon: 'iconfont blog-hot',
            super: false
          },
          component: () => import('@/views/admin/childComps/pages/adminDashboard/AdminDashboard.vue')
        },
        {
          path: 'log',
          name: 'adminLog',
          meta: {
            title: '错误日志模拟',
            icon: 'iconfont blog-hot',
            super: false
          },
          component: () => import('@/views/admin/childComps/pages/adminDashboard/AdminDashboard.vue')
        },
        {
          path: 'cssfx',
          name: 'adminCssfx',
          meta: {
            title: 'Css动画',
            icon: 'iconfont blog-hot',
            super: false
          },
          component: () => import('@/views/admin/childComps/pages/adminDashboard/AdminDashboard.vue')
        },
        {
          path: 'social',
          name: 'adminSocial',
          meta: {
            title: '第三方登录',
            icon: 'iconfont blog-hot',
            super: false
          },
          component: () => import('@/views/admin/childComps/pages/adminDashboard/AdminDashboard.vue')
        },
        {
          path: 'iframe',
          name: 'adminIframe',
          meta: {
            title: 'iframe',
            icon: 'iconfont blog-hot',
            super: false
          },
          component: () => import('@/views/admin/childComps/pages/adminDashboard/AdminDashboard.vue')
        },
        {
          path: 'excel',
          name: 'adminExcel',
          meta: {
            title: 'Excel',
            icon: 'iconfont blog-hot',
            super: false
          },
          component: () => import('@/views/admin/childComps/pages/adminDashboard/AdminDashboard.vue')
        }
      ]
    },
    {
      path: 'mall',
      name: 'adminMall',
      redirect: {
        name: 'adminGoods'
      },
      component: adminEmpty,
      meta: {
        title: '物料源',
        icon: 'iconfont blog-hot',
        super: false,
        menu: true
      },
      children: [
        {
          path: 'goods',
          name: 'adminGoods',
          meta: {
            title: '物料市场',
            icon: 'iconfont blog-hot',
            super: false
          },
          component: () => import('@/views/admin/childComps/pages/adminDashboard/AdminDashboard.vue')
        }
      ]
    },
    {
      path: 'noColumn',
      name: 'adminNoColumn',
      component: () => import('@/views/admin/childComps/pages/adminDashboard/AdminDashboard.vue'),
      meta: {
        title: '无分栏',
        icon: 'iconfont blog-hot',
        super: false,
        menu: true
      }
    },
    {
      path: 'setting',
      name: 'adminSetting',
      redirect: {
        name: 'adminPersonalCenter'
      },
      component: adminEmpty,
      meta: {
        title: '配置',
        icon: 'iconfont blog-hot',
        super: false,
        menu: true
      },
      children: [
        {
          path: 'personalCenter',
          name: 'adminPersonalCenter',
          meta: {
            title: '个人中心',
            icon: 'iconfont blog-hot',
            super: false
          },
          component: () => import('@/views/admin/childComps/pages/adminDashboard/AdminDashboard.vue')
        },
        {
          path: 'userManagement',
          name: 'adminUserManagement',
          meta: {
            title: '个人管理',
            icon: 'iconfont blog-hot',
            super: false
          },
          component: () => import('@/views/admin/childComps/pages/adminDashboard/AdminDashboard.vue')
        },
        {
          path: 'roleManagement',
          name: 'adminRoleManagement',
          meta: {
            title: '角色管理',
            icon: 'iconfont blog-hot',
            super: false
          },
          component: () => import('@/views/admin/childComps/pages/adminDashboard/AdminDashboard.vue')
        },
        {
          path: 'departmentManagement',
          name: 'adminDepartmentManagement',
          meta: {
            title: '部门管理',
            icon: 'iconfont blog-hot',
            super: false
          },
          component: () => import('@/views/admin/childComps/pages/adminDashboard/AdminDashboard.vue')
        },
        {
          path: 'menuManagement',
          name: 'adminMenuManagement',
          meta: {
            title: '菜单管理',
            icon: 'iconfont blog-hot',
            super: false
          },
          component: () => import('@/views/admin/childComps/pages/adminDashboard/AdminDashboard.vue')
        },
        {
          path: 'taskManagement',
          name: 'adminTaskManagement',
          meta: {
            title: '任务管理',
            icon: 'iconfont blog-hot',
            super: false
          },
          component: () => import('@/views/admin/childComps/pages/adminDashboard/AdminDashboard.vue')
        },
        {
          path: 'systemLog',
          name: 'adminSystemLog',
          meta: {
            title: '系统日志',
            icon: 'iconfont blog-hot',
            super: false
          },
          component: () => import('@/views/admin/childComps/pages/adminDashboard/AdminDashboard.vue')
        }
      ]
    },
    {
      path: 'tools',
      name: 'adminTools',
      redirect: {
        name: 'adminEyeDropper'
      },
      component: adminEmpty,
      meta: {
        title: '工具',
        icon: 'iconfont blog-hot',
        super: false,
        menu: true
      },
      children: [
        {
          path: 'eyeDropper',
          name: 'adminEyeDropper',
          meta: {
            title: '取色器',
            icon: 'iconfont blog-hot',
            super: false
          },
          component: () => import('@/views/admin/childComps/pages/adminDashboard/AdminDashboard.vue')
        }
      ]
    },
    {
      path: 'outsideChain',
      name: 'adminOutsideChain',
      component: () => import('@/views/admin/childComps/pages/adminDashboard/AdminDashboard.vue'),
      meta: {
        title: '外链',
        icon: 'iconfont blog-hot',
        super: false,
        menu: true
      }
    },
    {
      path: 'error',
      name: 'adminError',
      redirect: {
        name: 'admin403'
      },
      component: adminEmpty,
      meta: {
        title: '错误页',
        icon: 'iconfont blog-hot',
        super: false,
        menu: true
      },
      children: [
        {
          path: '403',
          name: 'admin403',
          meta: {
            title: '403',
            icon: 'iconfont blog-hot',
            super: false
          },
          component: () => import('@/views/admin/childComps/pages/adminDashboard/AdminDashboard.vue')
        },
        {
          path: '404',
          name: 'admin404',
          meta: {
            title: '404',
            icon: 'iconfont blog-hot',
            super: false
          },
          component: () => import('@/views/admin/childComps/pages/adminDashboard/AdminDashboard.vue')
        }
      ]
    }
  ]
};

export default adminRouter;
