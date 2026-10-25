# Sereindian 的个人博客

基于 [Twilight](https://github.com/Spr-Aachen/Twilight) 定制，使用 Astro、Svelte 和 Tailwind CSS，记录 Vibe Coding、游戏与日常学习。

**[访问博客](https://sereindian.xyz/)** · **[中文维护指南](docs/README_ZH.md)** · **[布局与配置索引](docs/LAYOUT_ZH.md)**

本仓库文档默认使用中文。以下说明对应本站实际配置，内容核对日期：**2026 年 10 月 25 日**。

## 当前站点

| 项目 | 当前情况 |
| --- | --- |
| 主域名 | [sereindian.xyz](https://sereindian.xyz/) |
| 界面与主题 | 简体中文、默认浅色，支持深色、主题色和页面翻译 |
| 字体 | 保留 Zen Maru Gothic 圆体及原回退顺序，400 / 500 / 700 字重使用站内资源 |
| 左侧栏 | 个人资料、社交链接、公告、日历、文章分类 |
| 右侧栏 | 标签、文章与相册目录、三个内容统计图表 |
| 文章分类 | Vibe Coding、游戏；分类与标签根据文章元数据自动汇总 |
| 内容统计 | 发文趋势、分类分布、标签分布，使用实际文章数据 |
| 壁纸与相册 | 春、夏、秋、冬四张壁纸轮播；相册支持放大浏览 |
| 网页图标 | 花朵头像经 SVG 圆形裁切，四角透明 |
| 内容维护 | Markdown / MDX、JSON 与 YAML，通过 Git 提交发布 |
| 部署 | Cloudflare Pages 与 GitHub Pages 自动构建 |

桌面采用三栏；平板合并侧栏；手机先展示文章，再展示侧栏。统计图在手机上也保留：发文趋势可切换年、月、天；分类不足三项时使用条形图，达到三项时使用雷达图；标签雷达显示使用最多的八项。

这些图表统计的是**文章内容与发布日期**。访客分析 `analytics.enabled` 当前为 `false`，评论、CMS OAuth 和看板娘也尚未启用。

<details>
<summary>查看当前首页布局</summary>

![本站首页：左侧资料与分类，右侧标签、目录与三个统计图](docs/assets/site-preview.png)

截图记录于 2026 年 10 月 25 日；实时内容以在线站点为准。

</details>

## 页面入口

| 页面 | 地址 | 维护位置 |
| --- | --- | --- |
| 首页 | `/` | `src/content/posts/` |
| 文章归档 | `/archive/` | 按文章日期、分类与标签自动生成 |
| 网页推荐 | `/recommendations/` | `src/content/recommendations.json` |
| 四季相册 | `/albums/seasons/` | `src/content/albums/seasons.json` |
| 相册列表 | `/albums/` | `src/content/albums/` |
| 关于 | `/about/` | `src/content/about.md` |
| 友链 | `/friends/` | `src/content/friends.md` 与 `src/content/friends/` |
| 订阅 | `/rss/`、`/atom/` | 自动生成；订阅文件为 `/rss.xml`、`/atom.xml` |

现有文章包括[制作人名片站开发记录](https://sereindian.xyz/posts/vibe/producer-profile-development/)和 [P5R 五维提升方法](https://sereindian.xyz/posts/game/p5r-five-stats-guide/)。

## 本地运行

建议使用 **Node.js 24**；包管理器版本由 `package.json` 固定为 **pnpm 9.14.4**。GitHub Pages 工作流使用的 Astro 构建 Action 默认采用 Node.js 24。

```bash
git clone https://github.com/Sereindian/twilight-blog.git
cd twilight-blog
npm install -g pnpm@9.14.4
pnpm install --frozen-lockfile
pnpm dev
```

打开终端输出的本地地址，默认是 `http://localhost:4321/`。

| 命令 | 用途 |
| --- | --- |
| `pnpm dev` | 生成图标代码并启动开发服务器 |
| `pnpm check` | 检查 Astro 与组件类型 |
| `pnpm build` | 生成图标、构建站点并生成 Pagefind 搜索索引 |
| `pnpm new-post vibe/my-new-post` | 在 `src/content/posts/vibe/` 创建文章 |
| `pnpm new-post game/my-game-note` | 在 `src/content/posts/game/` 创建文章 |

构建适配器会根据环境选择。本地检查 Cloudflare 版本、预览静态产物的方法见[中文维护指南](docs/README_ZH.md#构建与预览)。

## 发布文章

也可以直接在 GitHub 仓库中选择 **Add file → Create new file**，输入完整路径，例如：

```text
src/content/posts/vibe/my-new-post.md
```

填写以下内容，写完后提交到 `main`：

```yaml
---
title: "我的 Vibe Coding 记录"
published: 2026-10-25
description: "用一两句话说明这篇文章记录了什么。"
category: "Vibe Coding"
tags: ["Vibe Coding", "开发记录"]
author: "Sereindian"
cover: "/assets/images/my-new-post.jpg"
coverPosition: "center"
coverInContent: false
draft: false
lang: "zh_hans"
---
```

在元数据之后写 Markdown 正文。封面图片需先上传到 `public/assets/images/`；没有封面时可留空或不填 `cover`。

- Vibe Coding 文章放在 `posts/vibe/`；游戏文章放在 `posts/game/`，并设置 `category: "游戏"`。
- **文件夹决定右侧目录层级，`category` 决定文章分类。** 分类不会根据文件夹名称自动推断。
- 分类数量、标签、归档、目录和统计会在构建时自动更新，搜索索引与订阅也会随发布更新。
- 未写完时设置 `draft: true`，生产站点不会发布。创建脚本默认是 `draft: false`，写作前请按需调整。
- `coverPosition` 设置列表封面的裁切焦点，例如 `"18% center"`；不改变正文配图。

完整字段、图片引用和已有文章修改方法见[维护指南](docs/README_ZH.md#文章维护)。

## 部署

日常更新流程为：**修改内容 → 提交并推送 `main` → 自动构建 → 检查线上页面**。

### Cloudflare Pages

本站 Pages 项目为 `sereindian-blog`，主域名为 `sereindian.xyz`。部署使用仓库根目录、`main` 分支，构建命令为 `pnpm build`，输出目录为 `dist`。Cloudflare 构建环境通过 `CF_PAGES` 选择对应适配器。

Cloudflare 的旧链接跳转维护在 [`public/_redirects`](public/_redirects)。其中 `/exhibition/` 已跳转到 `/recommendations/`，下架示例文章的旧地址跳转到归档。

### GitHub Pages

工作流为 [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)，负责构建、上传产物和部署。仓库 **Settings → Pages → Source 必须选择 GitHub Actions**。

这项设置可避免 GitHub 将 Astro 源码当作 Jekyll 项目构建。`main` 更新或手动运行该工作流都会触发发布；`GITHUB_ACTIONS` 环境使用静态构建。

## 常用文件

```text
twilight.config.yaml                  站点、导航、侧栏、壁纸与功能开关
astro.config.mjs                      Astro 插件与部署适配器
src/content.config.ts                 文章字段与模板文章排除规则
src/content/posts/vibe/               Vibe Coding 文章
src/content/posts/game/               游戏文章
src/content/albums/seasons.json       四季相册
src/content/recommendations.json      网页推荐数据
src/components/sidebar/               侧栏组件与统计图表
public/assets/images/                 头像、壁纸与文章图片
public/favicon-avatar.svg             圆形头像网页图标
public/_redirects                     Cloudflare 旧链接跳转
docs/README_ZH.md                     内容、资源与部署维护指南
docs/LAYOUT_ZH.md                     当前布局及配置位置索引
```

模板中的示例文章、相册、项目、技能、历程、日记和友链已通过内容加载规则排除，原文件仍保留在仓库中。新增文章请使用新的文件名；具体排除位置见维护指南。

## 来源与致谢

- 主题基础：[Twilight](https://github.com/Spr-Aachen/Twilight)，保留上游 [MIT 许可证](LICENSE)。
- 页面布局参考：[云泽の小屋](https://zeyun.org/)。
- 上游主题文档：[Twilight 中文文档](https://docs.twilight.spr-aachen.com/)。通用功能以其说明为参考，本站已启用的功能以当前配置为准。
- 上游致谢项目：[Fuwari](https://github.com/saicaca/fuwari)、[Yukina](https://github.com/WhitePaper233/yukina)、[Mizuki](https://github.com/matsuzaka-yuki/Mizuki) 与 [translate](https://gitee.com/mail_osc/translate)。

文章页面默认展示的许可为 `CC BY-NC-SA 4.0`，配置位置是 `post.license`；具体文章及图片、音乐等素材的来源与声明以对应内容标注为准。
