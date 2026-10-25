# 中文维护指南

[返回项目首页](../README.md) · [布局与配置索引](LAYOUT_ZH.md)

本文按本站当前源码整理，最后核对于 **2026 年 10 月 25 日**。主站地址为 [sereindian.xyz](https://sereindian.xyz/)。

## 文章维护

### 新建文章

常用目录：

| 内容 | 文件夹 | `category` |
| --- | --- | --- |
| 开发过程与工具实践 | `src/content/posts/vibe/` | `Vibe Coding` |
| 游戏攻略与记录 | `src/content/posts/game/` | `游戏` |

本地可以运行：

```bash
pnpm new-post vibe/my-new-post
pnpm new-post game/my-game-note
```

脚本会补上 `.md` 后缀，创建不存在的父目录，并拒绝覆盖已有同名文件。**它不会根据目录填写分类或标签，且默认 `draft: false`**，创建后需要编辑元数据。

也可以在 GitHub 网页端新建对应路径的 Markdown 文件。已有文章使用文件页面的编辑按钮修改，完成后提交至 `main`。

### 元数据示例

```yaml
---
title: "我的游戏记录"
published: 2026-10-25
updated: 2026-10-25
description: "简要说明游戏、主题与这篇文章的内容。"
category: "游戏"
tags: ["游戏名称", "攻略"]
author: "Sereindian"
cover: "/assets/images/my-game-note.jpg"
coverPosition: "center"
coverInContent: false
pinned: false
draft: true
lang: "zh_hans"
---
```

下方直接写正文。准备发布时，把 `draft` 改成 `false`。

| 字段 | 实际作用 |
| --- | --- |
| `title` | 文章标题 |
| `published` | 原始发布日期，参与首页排序、归档与发文统计 |
| `updated` | 更新日期，适合修订或从其他平台同步旧文时填写 |
| `description` | 首页文章摘要 |
| `category` | 分类；当前预设为 Vibe Coding、游戏 |
| `tags` | 标签数组，自动进入标签列表和统计 |
| `cover` | 封面路径；为空时不展示封面区域 |
| `coverPosition` | 列表封面的 CSS 裁切焦点，默认 `center` |
| `coverInContent` | 是否将封面同时放在文章正文顶部 |
| `pinned` | 是否置顶；置顶优先于日期排序 |
| `draft` | `true` 时不进入生产发布；开发环境可读取草稿 |
| `author` | 作者名称 |
| `sourceLink` | 原始来源链接，适合转载或跨平台同步 |
| `directoryTitle` | 右侧目录中单独使用的简短标题，未填时使用文章标题 |
| `lang` | 文章语言，本站通常使用 `zh_hans` |
| `licenseName`、`licenseUrl` | 可覆盖文章页面默认展示的许可名称与链接 |

建议显式填写 `published`。从 B 站等平台同步旧文时，保留原发布日期，用 `updated` 记录本次更新，并填写 `sourceLink`。

文件夹与分类分别维护。例如 `posts/game/example.md` 会进入目录树的 `game` 文件夹，但仍需填写 `category: "游戏"`。通常对应链接为 `/posts/game/example/`。

`draft: true` 用于控制站点发布；文章提交到公开仓库后，源文件仍可在 GitHub 查看。

### 图片与封面

图片放在 `public/assets/images/`，页面中使用省略 `public` 的路径：

```markdown
![图片说明](/assets/images/my-game-note.jpg)
```

首页封面默认使用 `object-fit: cover`，会根据卡片尺寸裁切。可以设置焦点：

```yaml
coverPosition: "18% center"
```

开发记录文章使用这个设置保留名片站左侧头像和名称；正文里的完整截图不受影响。`coverInContent: false` 时，如需在正文展示截图，应另外插入 Markdown 图片。

文章元数据的标签支持换行，避免长标签伸入封面区域。分类、标签、目录、搜索和订阅由构建生成，无需逐项手动添加。

## 壁纸、相册与推荐

### 四季壁纸

在 `twilight.config.yaml` 的 `site.wallpaper` 中配置：

- `src.desktop`、`src.mobile`：桌面和手机图片列表。
- `carousel.interval`：轮播间隔，当前为 3.6 秒。
- `mode`：默认 `banner`；也支持 `fullscreen` 与 `none`。

当前使用 `wallpaper-spring.jpg`、`wallpaper-summer.jpg`、`wallpaper-autumn.jpg`、`wallpaper-winter.jpg`，均位于 `public/assets/images/`。

### 四季相册

编辑 `src/content/albums/seasons.json`。`cover` 是相册封面，`photos` 是照片数组，每张照片可以填写 `src`、`alt`、`title`、`width` 与 `height`。当前为两列网格、四张照片，地址为 `/albums/seasons/`。

替换壁纸不会自动改写相册 JSON；如果更换了文件名，两处引用都需要同步。

### 网页推荐与友链

- 推荐分组和网站信息：`src/content/recommendations.json`，页面支持搜索。
- 友链页面文字：`src/content/friends.md`；友链条目：`src/content/friends/` 下的 JSON。
- 关于页面：`src/content/about.md`。
- 导航文字和入口：`twilight.config.yaml` 的 `navbar.links`。

## 头像、图标与侧栏

个人资料与社交链接位于 `twilight.config.yaml` 的 `profile`。头像当前使用本地花朵照片，社交入口包括 GitHub、X、Telegram 和邮箱。

浏览器图标在 `public/favicon-avatar.svg`。它嵌入头像图像，并通过圆形 SVG 裁切保持四角透明。**仅替换头像 JPG 不会更新已嵌入的图标**，需要同步更新 SVG。

`sidebar.components` 当前配置为：

| 区域 | 从上到下 |
| --- | --- |
| 左侧 | 资料、公告、日历、分类 |
| 右侧 | 标签、文章与相册目录、统计 |

平板将侧栏合并到左侧，手机将侧栏安排在正文之后。手机规则使用 `width < 768px`，与平板起始断点分开，避免恰好 768px 时侧栏与正文重叠。

三个统计图由 `src/components/sidebar/statistics.svelte` 绘制：

- 发文趋势：按年、最近 12 个月或最近 30 天汇总原始发布日期。
- 分类分布：少于三项使用条形图，三项及以上使用雷达图。
- 标签分布：显示使用最多的八个标签，长标签分行展示。

它们使用有效文章数据，不是访问量统计。预设分类在 `post.categories` 中维护，暂无文章时也会显示 0 篇。右侧目录根节点由 `src/utils/directory.ts` 限定为文章和相册。

## 模板示例的处理

原模板示例通过加载规则退出站点，原文件仍在仓库中。排除位置如下：

| 内容 | 加载或排除规则 |
| --- | --- |
| 示例文章 | `src/content.config.ts` |
| 示例相册 | `src/utils/albums.ts` |
| 示例日记 | `src/utils/diary.ts` |
| 示例项目 | `src/utils/projects.ts` |
| 示例技能 | `src/utils/skills.ts` |
| 示例历程 | `src/utils/timeline.ts` |
| 示例友链 | `src/utils/friends.ts` |

不要直接复用被排除的示例文件名作为新文章，例如 `videos.md`、`mermaids.md`、`draft.md` 或原有 `guide/` 示例。新内容使用新的文件名。

旧示例文章和相册的跳转规则在 `public/_redirects`；它由 Cloudflare Pages 使用。其他托管平台需要按各自规则处理跳转。

## 构建与预览

常规内容预览使用 `pnpm dev`。上线前可运行 `pnpm check`。

`pnpm build` 依次执行图标生成、Astro 构建与 Pagefind 索引生成。适配器由 `astro.config.mjs` 根据环境选择：GitHub Actions 使用静态构建，Cloudflare 使用 Cloudflare 适配器；未命中平台环境时会回退到 Vercel 适配器。因此本地验证本站 Cloudflare 版本时，应显式设置环境。

PowerShell：

```powershell
$env:CF_PAGES = "1"
pnpm build
$env:CF_PAGES = $null
```

Bash：

```bash
CF_PAGES=1 pnpm build
```

只检查生成的静态页面时，可以启动静态服务器：

```bash
python -m http.server 4321 --bind 127.0.0.1 --directory dist
```

访问 `http://127.0.0.1:4321/`，按 `Ctrl+C` 停止。这种方式不运行 Cloudflare Functions。`pnpm preview` 只是调用 `astro preview`，是否适用取决于所选适配器。

## 发布与排查

提交并推送至 `main` 后，分别检查 GitHub Actions 与 Cloudflare Pages 的构建结果。成功后，再访问主域名确认文章、分类、图片和页面交互。

### GitHub Pages 出现 Jekyll 日志

如果日志中出现 `github-pages`、`jekyll`、`jekyll-theme-primer` 等信息，检查仓库 **Settings → Pages → Source** 是否误选了分支发布。本站应选择 **GitHub Actions**，使用 `.github/workflows/deploy.yml` 构建 Astro。

### 文章没有出现

依次检查：文件是否在 `src/content/posts/`，扩展名是否为 `.md` 或 `.mdx`，是否设置了 `draft: true`，是否复用了被排除的文件名，以及最新提交的构建是否成功。

### 分类或标签不对

检查文章的 `category` 与 `tags`，不要只修改文件夹名称。当前分类名是 `Vibe Coding` 与 `游戏`。

### 图片不显示或封面裁切不合适

确认文件已提交、路径大小写一致，且以 `/assets/images/` 引用 `public/assets/images/` 下的文件。裁切问题调整 `coverPosition`；正文需要完整图片时单独插入 Markdown 图片。

### 首页统计与访客统计的区别

右侧三个图表统计文章内容。Umami 访客分析当前未启用；要开启，需要单独配置服务和凭据。评论、CMS OAuth、看板娘也尚未启用，保留的模板代码不代表服务已经配置完成。

站点保留原字体 Zen Maru Gothic 和原有回退顺序。字体改为 `public/assets/fonts/zen-maru-gothic/` 下的站内 WOFF2，分别声明 400、500、700 字重，避免外部字体样式表失效和字重缺失。字体不包含的字符仍使用原回退字体；没有替换字体家族或修改字形。资源来源与转换校验记录见该目录下的说明和清单。

播放器当前启用，使用 Meting 外部歌单；页面翻译和音乐接口依赖外部服务，网络状态可能影响加载。自动播放是否生效还受浏览器策略影响。
