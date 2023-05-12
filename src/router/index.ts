/*
 * @Description: router
 * @Version:
 * @Autor: dreamy-xay
 * @Date: 2021-07-06 12:02:59
 * @LastEditors: dreamy-xay
 * @LastEditTime: 2022-02-21 20:04:25
 */
import {
  createRouter,
  createWebHistory,
  createWebHashHistory,
  RouteRecordRaw,
  RouteLocationNormalized,
  NavigationGuardNext
} from 'vue-router';
import { handleKeepAlive } from '@/utils/router';
import loginRouter from './modules/login';
import messageRouter from './modules/message';
import userCenterRouter from './modules/userCenter';
import userRouter from './modules/user';
import blogRouter from './modules/blog';
import searchRouter from './modules/search';
import questionRouter from './modules/question';
import homeRouter from './modules/home';
import historyRouter from './modules/history';
import articleRouter from './modules/article';
import groupRouter from './modules/group';
import resourceRouter from './modules/resource';
import tagRouter from './modules/tag';
import solicitationRouter from './modules/solicitation';
import adminRouter from './modules/admin';

const routes: Array<RouteRecordRaw> = [
  // 主页
  homeRouter,
  // 专题标签页面
  tagRouter,
  // 登录页面
  loginRouter,
  // 消息页面
  messageRouter,
  // 用户中心页面
  userCenterRouter,
  // 用户主页页面
  userRouter,
  // 用户博客主页面
  blogRouter,
  // 搜索主页页面
  searchRouter,
  // 问答页面
  questionRouter,
  // 学习小组页面
  groupRouter,
  // 历史记录页面
  historyRouter,
  // 文章页面
  articleRouter,
  // 资源页面
  resourceRouter,
  // 征集令页面
  solicitationRouter,
  // 后台管理界面
  adminRouter,
  // 404 not find pages
  {
    path: '/404',
    name: '404',
    meta: {
      title: '对不起！您访问的页面不存在'
    },
    component: () => import('@/views/Error.vue')
  },
  // 路由匹配重定向 404
  {
    path: '/:catchAll(.*)',
    redirect: '/404'
  }
];

const router = createRouter({
  history:
    process.env.VUE_APP_ROUTER_MODE !== 'false'
      ? createWebHistory(process.env.BASE_URL)
      : createWebHashHistory(process.env.BASE_URL),
  routes
});

// admin 后台管理清除多层 adminEmpty
router.beforeEach((to: RouteLocationNormalized, _, next: NavigationGuardNext) => {
  handleKeepAlive(to, 'adminEmpty');
  next();
});

export default router;
