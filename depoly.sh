#!/bin/bash

# 拉取部署分支
git clone -b deploy https://github.com/dreamy-xay/nsblog-web.git

# 进入项目目录
cd nsblog-web

# 安装依赖
npm install --force

# 构建（此处选择模拟API接口）
npm run build:mock

# cd 到构建输出的目录下 
cd dist

git init
git add -A
git commit -m 'deploy'

# 部署到 https://<username>.github.io/<repository>
git push -f git@github.com:<username>/<repository>.git master:gh-pages

cd ..