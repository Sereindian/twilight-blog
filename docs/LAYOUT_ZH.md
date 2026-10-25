# 博客内容与布局

## 页面布局

- 左侧：花朵头像、社交入口、公告、日历和文章分类；有文章标签时显示标签。
- 分类预设为 Vibe Coding、游戏；没有文章时显示 0 篇。配置位置：twilight.config.yaml 的 post.categories。
- 右侧：仅保留目录，根节点只有文章与相册。点击名称进入列表，点击箭头展开子项。
- 首页没有文章时显示空状态与相册入口。发布新文章后自动显示文章列表。
- 手机先显示正文，再显示侧栏内容；默认浅色，保留深色与壁纸切换功能。

## 发布文章

在 src/content/posts/ 新建 Markdown 文件，并填写 front matter。例如：

```yaml
---
title: "我的 Vibe Coding 记录"
published: 2026-10-25
category: "Vibe Coding"
tags: []
draft: false
---
```

游戏文章使用 category: "游戏"。示例文件名已列入构建排除项，发布自己的文章请使用新的文件名。

## 相册与壁纸

- 相册数据：src/content/albums/seasons.json，包含用户上传的春、夏、秋、冬四张壁纸。
- 相册地址：/albums/seasons/，所有相册列表：/albums/。
- 壁纸文件：public/assets/images/wallpaper-spring.jpg、wallpaper-summer.jpg、wallpaper-autumn.jpg、wallpaper-winter.jpg。
- 桌面与手机共享四张轮播图；原始上传文件不变。

## 模板示例处理

遵循用户的文件删除安全规则，没有批量删除文件。原模板示例通过文章 collection 和各内容 loader 的排除列表退出构建；文章、标签、分类、目录、RSS、站点地图与搜索索引均使用有效内容。

已排除：模板文章、示例相册、Twilight 项目、示例技能、示例历程、示例日记和默认友链。关于页与友链说明已替换为本站的实际信息。若需要物理删除保留的示例文件，需由用户手动执行。

## 联系方式与推荐页

- 头像与链接配置：twilight.config.yaml。
- X：https://x.com/_Allchemilla_（开头和结尾各有一个下划线）。
- Telegram：https://t.me/Sereindian。
- 邮箱：mailto:hugaohuang@gmail.com。
- 网页推荐：/recommendations/；数据：src/content/recommendations.json。
- 旧 /exhibition/ 地址跳转到 /recommendations/。

## 部署

提交到 main 后，Cloudflare Pages 与 GitHub Actions 自动构建发布。GitHub 仓库 Settings → Pages → Source 应选择 GitHub Actions，避免 Jekyll 误读 Astro 源码。
