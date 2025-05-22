<p align="center">
  <img width="320" src="https://s2.loli.net/2025/05/21/amFx9soItRqhTDb.png" >
</p>

<p align="center">
  <a href="https://github.com/vuejs/core">
    <img src="https://img.shields.io/badge/vue-3.0.0-green.svg" alt="vue">
  </a>
  <a href="https://github.com/element-plus/element-plus">
    <img src="https://img.shields.io/badge/element--plus-1.0.2-blue.svg" alt="element-plus">
  </a>
  <a href="https://github.com/tusen-ai/naive-ui">
    <img src="https://img.shields.io/badge/naive--ui-2.25.2-brightgreen.svg" alt="naive-ui">
  </a>
  <a href="https://github.com/apache/echarts">
    <img src="https://img.shields.io/badge/echarts-5.2.0-yellow.svg" alt="echarts">
  </a>
  <a href="https://github.com/dreamy-xay/nsblog-web/blob/develop/LICENSE">
    <img src="https://img.shields.io/github/license/mashape/apistatus.svg?color=5470c6" alt="license">
  </a>
</p>

## 介绍

nsblog-web  是一个类似于掘金、知乎和 CSDN 等内容分享平台，它基于 Vue 实现。它使用了最新的前端技术栈，包括动态路由和权限验证，它可以帮助你快速搭建个人知识体系，无论是学习笔记、技术总结还是生活感悟，都能在这里轻松记录和分享，同时还能与其他用户交流互动，拓展视野，提升自我。

- [在线预览](https://dreamy-xay.github.io/nsblog-web/)
- [API 服务](https://github.com/dreamy-xay/nsblog-api/)

<p align="center">
  <img src="https://s2.loli.net/2025/05/22/cxY4X8ywVhpSdEO.png">
</p>

<p align="center">
  <img src="https://s2.loli.net/2025/05/22/ueiCZxQErhRIjvX.png">
</p>

## 准备

你需要在本地环境中安装 [Node](https://nodejs.org/) 和 [Git](https://git-scm.com/)。该项目基于 [ES6](https://es6.ruanyifeng.com/)、[Vue](https://cn.vuejs.org/index.html)、[Vuex](https://vuex.vuejs.org/zh-cn/)、[Vue Router](https://router.vuejs.org/zh-cn/)、[Vue CLI](https://github.com/vuejs/vue-cli)、[Axios](https://github.com/axios/axios)、[Element Plus](https://github.com/element-plus/element-plus)、[Naive UI](https://www.naiveui.com/) 和 [Echarts](https://echarts.apache.org/)，所有请求数据均使用 [Mock.js](https://github.com/nuysoft/Mock) 进行模拟。

## 功能

部分功能尚未实现，有待后续开发完善...

| 功能     | 子功能                                                     |
| :-----: | :------------------------------------------------------: |
| 首页预览   | 登录注册功能、平台首页、文章详情预览                                      |
| 消息中心   | 消息通知、私信、消息设置                                            |
| 专题标签   | 显示专题标签基本信息、展示部分文章信息、显示关注接口                              |
| 疑难问答   | 问答主页、问答详情预览                                             |
| 学习小组   | 学习小组主页、学习小组详情预览                                         |
| 内容搜索   | 展示搜索结果、显示热门搜索、显示相关搜索                                    |
| 历史记录   | 展示用户浏览文章和问答的部分历史记录、历史记录设置                               |
| 用户详情   | 展示用户基本信息、展示用户的成就信息、展示用户关注信息、数据可视化、展示用户各模块内容             |
| 资源分享   | 展示部分享的资源信息、显示下载排行、查看资源详情                                |
| 征集令    | 显示征集令信息、提供多个接口                                          |
| 个人博客   | 显示博客基本信息、展示部分博客文章、查看标签详情、查看分类详情、查看友链详情                  |
| 内容收藏   | 显示部分收藏信息、收藏夹设置、修改收藏内容                                   |
| 个人中心   | 编辑个人资料、隐私设置、账号安全                                        |
| 用户后台 | 文章管理、智能创作、评论管理、用户数据统计、博客管理、资源管理、学习小组管理、后台空间管理、问答管理、系统管理 |
| 超管后台 | 网站数据统计、网站管理、用户管理                                        |


## 开始使用

```bash
# 克隆项目
git clone https://github.com/dreamy-xay/nsblog-web.git

# 进入项目目录
cd nsblog-web

# 安装依赖
npm install --force

# 开发
npm run serve
```

这将自动打开 http://localhost:8888。

## 构建

```bash
# 为测试环境构建
npm run build:mock

# 为开发环境构建
npm run build:server
# 或者
npm run build
```

## 部署

执行 [depoly.sh](depoly.sh) 部署项目至 GitHub 前，需先设置用户名 `<username>` 和目标仓库 `<repository>`（仓库需提前创建）。

## 检查和测试

```bash
# 检查并修复文件问题
npm run lint

# 运行单元测试
npm run test:unit

# 运行端到端测试
npm run test:e2e
```

## 在线演示

[在线 Demo](https://dreamy-xay.github.io/nsblog-web/)

## 浏览器支持

现代浏览器和 Internet Explorer 10 及以上版本。

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](https://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](https://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](https://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](https://godban.github.io/browsers-support-badges/)</br>Safari |
| --------- | --------- | --------- | --------- |
| IE10, IE11, Edge | last 2 versions | last 2 versions | last 2 versions |
