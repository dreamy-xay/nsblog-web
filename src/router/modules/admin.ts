/*
 * @Description: 后台管理页面路由
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2022-02-21 20:01:40
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2022-03-21 11:14:29
 */
import { RouteRecordRaw } from 'vue-router';
import adminEmpty from '@/views/admin/childComps/AdminEmpty.vue';

const adminRouter: RouteRecordRaw = {
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
        name: 'adminHomeDashboard'
      },
      component: adminEmpty,
      meta: {
        title: '首页',
        icon: 'blog-homepage',
        super: false,
        menu: true
      },
      children: [
        {
          path: 'dashboard',
          name: 'adminHomeDashboard',
          meta: {
            title: '看板',
            icon: 'blog-shujukanban',
            super: false
          },
          component: () => import('@/views/admin/childComps/pages/adminDashboard/AdminDashboard.vue')
        },
        {
          path: 'workbench',
          name: 'adminHomeWorkbench',
          meta: {
            title: '工作台',
            icon: 'blog-gongzuotai',
            super: false,
            badge: 'New'
          },
          component: () => import('@/views/admin/childComps/pages/adminDashboard/AdminDashboard.vue')
        }
      ]
    },
    {
      path: 'creation',
      name: 'adminCreation',
      redirect: {
        name: 'adminCreationArticle'
      },
      component: adminEmpty,
      meta: {
        title: '创作',
        icon: 'blog-chuangzuo',
        super: false,
        menu: true
      },
      children: [
        {
          path: 'article',
          name: 'adminCreationArticle',
          meta: {
            title: '我的文章',
            icon: 'blog-wodewenzhang',
            super: false
          },
          redirect: {
            name: 'adminCreationArticleRelease'
          },
          component: adminEmpty,
          children: [
            {
              path: 'release',
              name: 'adminCreationArticleRelease',
              meta: {
                title: '文章发布',
                icon: 'blog-fabu',
                super: false
              },
              component: () => import('@/views/admin/childComps/pages/adminDashboard/AdminDashboard.vue')
            },
            {
              path: 'manage',
              name: 'adminCreationArticleManage',
              meta: {
                title: '文章管理',
                icon: 'blog-ziyuan',
                super: false
              },
              component: () => import('@/views/admin/childComps/pages/adminDashboard/AdminDashboard.vue')
            },
            {
              path: 'preview',
              name: 'adminCreationArticlePreview',
              meta: {
                title: '文章预览',
                icon: 'blog-preview',
                super: false
              },
              component: () => import('@/views/admin/childComps/pages/adminDashboard/AdminDashboard.vue')
            }
          ]
        },
        {
          path: 'question',
          name: 'adminCreationQuestion',
          meta: {
            title: '我的问答',
            icon: 'blog-wenda',
            super: false,
            badge: 7
          },
          component: () => import('@/views/admin/childComps/pages/adminDashboard/AdminDashboard.vue')
        },
        {
          path: 'group',
          name: 'adminCreationGroup',
          meta: {
            title: '学习小组管理',
            icon: 'blog-xiaozu1',
            super: true
          },
          component: () => import('@/views/admin/childComps/pages/adminDashboard/AdminDashboard.vue')
        }
      ]
    },
    {
      path: 'blog',
      name: 'adminBlog',
      redirect: {
        name: 'adminBlogVisitor'
      },
      component: adminEmpty,
      meta: {
        title: '博客',
        icon: 'blog-icon',
        super: false,
        menu: true
      },
      children: [
        {
          path: 'visitor',
          name: 'adminBlogVisitor',
          meta: {
            title: '访客',
            icon: 'blog-guanzhuderen2',
            super: false
          },
          component: () => import('@/views/admin/childComps/pages/adminDashboard/AdminDashboard.vue')
        },
        {
          path: 'category',
          name: 'adminBlogCategory',
          meta: {
            title: '分类',
            icon: 'blog-fenlei2',
            super: false
          },
          component: () => import('@/views/admin/childComps/pages/adminDashboard/AdminDashboard.vue')
        },
        {
          path: 'tag',
          name: 'adminBlogTag',
          meta: {
            title: '标签',
            icon: 'blog-tag',
            super: false
          },
          component: () => import('@/views/admin/childComps/pages/adminDashboard/AdminDashboard.vue')
        },
        {
          path: 'friendChain',
          name: 'adminBlogFriendChain',
          meta: {
            title: '友链',
            icon: 'blog-lianjie',
            super: false
          },
          component: () => import('@/views/admin/childComps/pages/adminDashboard/AdminDashboard.vue')
        },
        {
          path: 'settings',
          name: 'adminBlogSettings',
          meta: {
            title: '博客设置',
            icon: 'blog-shezhi',
            super: false
          },
          component: () => import('@/views/admin/childComps/pages/adminDashboard/AdminDashboard.vue')
        }
      ]
    },
    {
      path: 'upload',
      name: 'adminUpload',
      redirect: {
        name: 'adminUploadPicture'
      },
      component: adminEmpty,
      meta: {
        title: '上传',
        icon: 'blog-shangchuan',
        super: false,
        menu: true
      },
      children: [
        {
          path: 'picture',
          name: 'adminUploadPicture',
          meta: {
            title: '本地图库',
            icon: 'blog-image',
            super: false
          },
          component: () => import('@/views/admin/childComps/pages/adminDashboard/AdminDashboard.vue')
        },
        {
          path: 'file',
          name: 'adminUploadFile',
          meta: {
            title: '上传文件',
            icon: 'blog-wenjianshangchuan',
            super: false
          },
          component: () => import('@/views/admin/childComps/pages/adminDashboard/AdminDashboard.vue')
        },
        {
          path: 'resource',
          name: 'adminUploadResource',
          meta: {
            title: '资源分享',
            icon: 'blog-fenxiang',
            super: false
          },
          component: () => import('@/views/admin/childComps/pages/adminDashboard/AdminDashboard.vue')
        }
      ]
    },
    {
      path: 'comment',
      name: 'adminComment',
      component: () => import('@/views/admin/childComps/pages/adminDashboard/AdminDashboard.vue'),
      meta: {
        title: '评论',
        icon: 'blog-interactive',
        super: false,
        menu: true
      }
    },
    {
      path: 'system',
      name: 'adminSystem',
      redirect: {
        name: 'adminSystemLog'
      },
      component: adminEmpty,
      meta: {
        title: '系统',
        icon: 'blog-xitong',
        super: false,
        menu: true
      },
      children: [
        {
          path: 'log',
          name: 'adminSystemLog',
          meta: {
            title: '系统日志',
            icon: 'blog-rizhifenxi',
            super: false
          },
          component: () => import('@/views/admin/childComps/pages/adminDashboard/AdminDashboard.vue')
        },
        {
          path: 'status',
          name: 'adminSystemStatus',
          meta: {
            title: '系统状态',
            icon: 'blog-xitongzhuangtai',
            super: true
          },
          component: () => import('@/views/admin/childComps/pages/adminDashboard/AdminDashboard.vue')
        },
        {
          path: 'settings',
          name: 'adminSystemSettings',
          meta: {
            title: '系统设置',
            icon: 'blog-shezhi',
            super: false
          },
          component: () => import('@/views/admin/childComps/pages/adminDashboard/AdminDashboard.vue')
        },
        {
          path: 'notice',
          name: 'adminSystemNotice',
          meta: {
            title: '系统通知',
            icon: 'blog-ri-notification-line',
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
        icon: 'blog-gongju',
        super: false,
        menu: true
      },
      children: [
        {
          path: 'eyeDropper',
          name: 'adminEyeDropper',
          meta: {
            title: '取色器',
            icon: 'blog-xiguan',
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
        icon: 'blog-fenxiang1',
        super: false,
        menu: true
      }
    },
    {
      path: 'maintain',
      name: 'adminMaintain',
      redirect: {
        name: 'adminMaintainStatistics'
      },
      component: adminEmpty,
      meta: {
        title: '程序坞',
        icon: 'blog-wangluo',
        super: true,
        menu: true
      },
      children: [
        {
          path: 'statistics',
          name: 'adminMaintainStatistics',
          meta: {
            title: '数据统计',
            icon: 'blog-shujutongji',
            super: true
          },
          component: () => import('@/views/admin/childComps/pages/adminDashboard/AdminDashboard.vue')
        },
        {
          path: 'websiteManage',
          name: 'adminMaintainWebsiteManage',
          meta: {
            title: '网站管理',
            icon: 'blog-wangzhanguanli',
            super: true
          },
          component: () => import('@/views/admin/childComps/pages/adminDashboard/AdminDashboard.vue')
        },
        {
          path: 'userManage',
          name: 'adminMaintainUserManage',
          meta: {
            title: '用户管理',
            icon: 'blog-yonghuguanli',
            super: true
          },
          component: () => import('@/views/admin/childComps/pages/adminDashboard/AdminDashboard.vue')
        }
      ]
    }
  ]
};

export default adminRouter;
