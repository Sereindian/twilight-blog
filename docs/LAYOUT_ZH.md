# 博客布局与网页推荐

本次排版参考 https://zeyun.org/，沿用 Twilight 的横幅、波浪和主题色。

- 桌面左侧：头像、公告、日历、分类和标签；文章与相册页另显示站内目录。
- 中间：文章列表或当前页面内容；列表封面在卡片宽度达到 512px 时放在右侧。
- 桌面右侧：页面目录；首页和归档页显示文章统计。
- 手机：先显示正文，侧栏内容收在正文之后，沿用主题的响应式布局。
- 默认使用浅色，导航栏仍可切换深色或跟随系统。
- `/recommendations/` 是网页推荐；旧 `/exhibition/` 地址跳转到新页面。

## 修改内容

- 导航、侧栏顺序、公告、头像路径：根目录 `twilight.config.yaml`。
- 网站推荐分类与链接：`src/content/recommendations.json`。
- 推荐页面排版：`src/pages/recommendations.astro`。
- 日历按 `site.timeZone` 在浏览器更新日期；不需要每天重新部署。

推荐列表提供名称、说明、网址、分类关键词的即时筛选，支持无结果提示；禁用 JavaScript 时仍能浏览全部链接。

提交到 `main` 后，现有 Cloudflare Pages Git 集成会自动构建部署。站点原有示例文章与关于页内容可后续自行替换。

## GitHub Pages 构建源

仓库使用 Astro。GitHub 仓库的 `Settings → Pages → Build and deployment → Source` 应选择 `GitHub Actions`，由已有 `.github/workflows/deploy.yml` 构建和发布。

不要将 `main / (root)` 直接交给 Jekyll 构建；Jekyll 会把 `.astro` 文件中的代码误当成 YAML front matter，导致 `pages build and deployment` 报错。

当前头像使用 `public/assets/images/EEDB3A0FE22E42DF15C35AB4FFEC399B.jpg`（上传的黄色花朵照片）。

## 壁纸与联系方式

- 桌面和手机的壁纸均按春、夏、秋、冬顺序轮播，图片位于 `public/assets/images/wallpaper-*.jpg`；原始上传文件保持不变。
- 左侧头像下方显示 GitHub、X、Telegram 和邮箱图标，悬停可查看联系方式。
- X：`https://x.com/_Allchemilla_`，用户名的开头和结尾各有一个下划线。
- Telegram：`https://t.me/Sereindian`，点击可打开 Telegram 个人主页。
- 邮箱：`mailto:hugaohuang@gmail.com`，点击唤起邮件客户端。
