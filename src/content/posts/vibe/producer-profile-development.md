---
title: "从个人主页到制作人名片：我的 Vibe Coding 开发记录"
published: 2026-10-25
description: "回顾制作人名片站从个人主页到响应式双栏布局的迭代，记录原生前端、自动主题、字体资源与 GitHub Pages 部署中的取舍。"
cover: "/assets/images/producer-profile-development.png"
coverPosition: "18% center"
coverInContent: false
category: "Vibe Coding"
tags: ["Vibe Coding", "个人网站", "响应式设计", "原生 JavaScript", "GitHub Pages", "偶像大师"]
author: "Sereindian"
draft: false
lang: "zh_hans"
---

一张制作人名片能放下的信息有限。扫码之后，如果对方还能看到我喜欢的偶像、常听的歌曲、游戏进度和联系方式，这张名片就可以继续展开。

这就是现在这个 [Producer Profile 制作人名片站](https://sereindian.github.io/)的用途。它的前身是一个个人介绍与社交主页，后来逐步改成了围绕《偶像大师》的扩列名片。这篇文章根据[公开仓库](https://github.com/Sereindian/sereindian.github.io)的 README 和提交记录，回顾这段开发过程。

> 记录截至 `dd94849`，时间按北京时间整理。本文讨论的是制作人名片站；当前承载文章的 Twilight 博客是另一个项目。

![制作人名片站的桌面布局：左侧个人信息，右侧担当偶像档案](/assets/images/producer-profile-development.png)

## 起点：先做一个可以介绍自己的主页

项目最初的形态很直接：一份自我介绍，加上几个社交平台入口。

10 月 18 日的提交主要围绕这些内容展开：建立首页、调整个人介绍、补齐社交账号、修改图标排列，以及为链接补充可访问名称和键盘焦点效果。这里也出现了很具体的小问题，例如 X 用户名首尾的下划线必须保留，否则页面能打开，跳转的却不是预期账号。

手机上的社交图标也经过多次调整，最后旧版采用了三列排列，让六个入口拥有一致的点击区域。这个阶段的重点，是把真实内容和基本交互做好。

旧版最终保留在 [`archive-old-site` 分支](https://github.com/Sereindian/sereindian.github.io/tree/archive-old-site)。它提供了一个参照：后续重做之后，仍然可以回看最初的页面。

## 转折：把通用主页改成制作人名片

10 月 23 日，[`6f4e464`](https://github.com/Sereindian/sereindian.github.io/commit/6f4e4645d244083a1bc2e7e4f180fdb9717fae35) 将主页换成了制作人名片版本，同时加入头像和六个企划的本地图标。

内容结构也随之明确起来：

- 个人资料负责介绍“我是谁”，并展示关注的企划与扩列偏好。
- 担当档案按六个企划切换，展示偶像、组合、印象色和相关歌曲。
- 游戏进度与好友码方便同好找到共同话题。
- 音乐推荐与社交入口负责把浏览延伸到收听和联系。

六个企划分别是 765PRO ALLSTARS、Cinderella Girls、Million Live!、SideM、Shiny Colors 和 Gakuen。切换入口除了支持点击，也加入了键盘操作。

这个调整让页面有了更具体的使用场景：拿到名片的人，可以先认出我的担当，再决定从哪个话题聊起。页面的布局和交互，也开始围绕这个顺序组织。

## 技术选择：一份 HTML 就能运行

这个项目目前的核心仍然是 `index.html`，样式和交互主要写在同一份文件里，使用原生 JavaScript，搭配通过 CDN 加载的 Tailwind CSS、Font Awesome 和字体资源。

仓库没有前端打包步骤，也不依赖服务端接口。头像、企划图标和歌曲封面放在本地资源目录中，用相对路径引用。下载仓库之后，启动一个静态服务器就能查看：

```bash
git clone https://github.com/Sereindian/sereindian.github.io.git
cd sereindian.github.io
python -m http.server 4173 --bind 127.0.0.1
```

然后访问 `http://127.0.0.1:4173`。

对于这种内容规模不大、交互也比较集中的名片站，这种结构便于直接定位和修改。代价同样清楚：随着内容增加，一份 HTML 会越来越长；个人信息还同时出现在静态文字、资料对象和复制摘要中，修改时需要逐处核对。

如果以后继续扩展，值得优先处理的是把这些重复信息收拢为同一份数据。当前版本先保持了简单的静态部署方式。

## 响应式布局：断点需要考虑屏幕方向

10 月 24 日的 [`7fc4ac7`](https://github.com/Sereindian/sereindian.github.io/commit/7fc4ac7d978146d03232b2b923f246522babad3c) 集中完善了桌面和竖屏布局。

这里的一个关键决定，是把屏幕方向也纳入判断。竖屏设备即使宽度较大，仍保留适合纵向阅读的单栏；桌面双栏只在横屏且宽度足够时启用。

| 使用环境 | 页面安排 |
| --- | --- |
| 竖屏，或宽度小于 768px | 单栏，内容最大宽度 480px；企划导航三列两行 |
| 横屏，宽度 768–1023px | 较宽的单栏；企划导航六列一行 |
| 横屏，宽度至少 1024px | 桌面双栏，左侧 320px，右侧自适应；整体最大宽度 1248px |

桌面布局的核心可以概括为下面这条规则：

```css
@media (min-width: 1024px) and (orientation: landscape) {
  #siteLayout {
    display: grid;
    grid-template-columns: 320px minmax(0, 1fr);
    max-width: 1248px;
    padding: 24px;
    gap: 24px;
    align-items: start;
  }
}
```

`minmax(0, 1fr)` 让右侧内容能够在网格中正常收缩。左侧个人资料与联系方式集中展示，右侧则留给担当档案、游戏和音乐内容。侧栏随页面正常滚动，避免出现需要分别操作的内层滚动区域。

不同企划的担当数量不一样，卡片也做了相应排布：三张卡片时，第一张占满一行，后两张并排；两张卡片时则并排展示。

### CSS 和内容顺序要一起调整

联系方式在桌面适合放进左栏，在手机上又需要回到正文后面的阅读顺序。项目通过 `matchMedia` 移动同一个区块，让 CSS 与 JavaScript 使用一致的条件：

```js
const desktopLayoutQuery = window.matchMedia(
  '(min-width: 1024px) and (orientation: landscape)'
);

function syncContactPlacement() {
  const parent = document.querySelector(
    desktopLayoutQuery.matches ? '.desktop-sidebar' : '.desktop-main'
  );
  parent.appendChild(document.getElementById('connectSection'));
}

desktopLayoutQuery.addEventListener('change', syncContactPlacement);
syncContactPlacement();
```

这样只需要维护一套联系方式，也能响应窗口缩放和设备旋转。做响应式页面时，除了看“有没有横向溢出”，还需要检查阅读顺序和操作顺序是否合理。

## 主题切换：让自动与手动有清楚的优先级

制作人名片里有三套配色：混色、水色和玫瑰。配色之外，页面还提供浅色、深色以及自动切换方式。

10 月 23 日的 [`1ae4dd6`](https://github.com/Sereindian/sereindian.github.io/commit/1ae4dd6b14e3acd37dc08b97928fbacb48bfd7c7) 加入了按系统、按时间和手动选择的主题逻辑。它们分别解决不同场景：

- 按系统：跟随设备的 `prefers-color-scheme` 设置。
- 按时间：以访问者设备的本地时间为准，7:00 至 19:00 使用浅色，其余时间使用深色。
- 手动选择：由访问者直接决定，直到重新选择自动模式。

这里最容易出问题的是优先级。用户刚切到深色，如果定时检查马上又把它切回浅色，按钮即使能点击，实际体验也会让人困惑。因此，系统变化和时间检查只应在对应自动模式下生效。

页面把主题选择保存在 `localStorage`，并对存储访问做了异常处理。按时间模式还会定期检查，并在页面恢复可见时更新，避免长时间打开后仍停留在旧状态。

另一个细节是首次加载：主题初始化放在 `<head>` 中，先于外部资源执行，让页面尽早应用正确的明暗状态。这是对闪白问题的处理思路；仓库没有提供性能测试数据，因此这里也不把它写成量化的速度提升。

## 字体与图片：视觉细节也会留下维护成本

页面需要同时展示中文、日文和数字标识。当前字体安排包括 Noto Sans SC、Noto Serif JP、Shippori Mincho 和 JetBrains Mono，分别用于正文、日文文案和需要辨识的标识信息。

字体资源改用了镜像域名，并采用异步加载方式，保留 `noscript` 回退。Shippori Mincho 还使用了按文字裁剪的 `text=` 参数。

这带来一个容易遗漏的维护点：如果新增日文介绍，需要同步更新字体请求中的文字子集，或者取消子集限制。否则，新加入的文字可能回退到另一种字体，形成同一段落里字形不一致的情况。

头像和 favicon 也有类似问题。现在的圆形 favicon 使用 SVG，并把头像图像嵌入其中；只替换 `my-avatar.jpg`，不会让 favicon 自动更新。静态二维码同样需要在目标变化后重新生成。

这些依赖关系后来都补进了 README。相比只写“修改头像路径”，说明哪些资源需要一起更新，更能减少下一次修改时的遗漏。

## 小交互：让看过页面之后更容易联系

名片站里的一些交互不需要后台，也能完成实际用途。

好友码和联系方式可以复制；“一键扩列”根据资料对象和六个企划的信息，组合成可复制的自我介绍；音乐卡片链接到 Apple Music，使用本地封面帮助辨认歌曲。

通讯录导出则在浏览器内生成 vCard 3.0 文本，通过 `Blob` 创建下载链接，保存为 `.vcf` 文件。文件生成和下载不需要额外的服务端接口。

这些功能都围绕同一个使用过程：浏览资料、找到共同兴趣、留下联系入口。后续修改个人信息时，也要同时检查复制摘要和通讯录内容是否仍然准确。

## 一次回调：保留布局改进，恢复原有明暗主题

桌面响应式改动之后，紧接着还有一次 [`dd94849`](https://github.com/Sereindian/sereindian.github.io/commit/dd948491299ffec194de4d3012365f49171380a3) 提交：恢复原本的桌面浅色主题表现，同时保留新的响应式结构和紧凑社交入口。

这次调整给这段开发记录留下了一个很好的提醒：布局是否合适，与配色是否合适，需要分别判断。双栏结构解决了宽屏上的信息安排，但新增的桌面视觉覆盖规则还需要回看和修正。

从提交记录来看，项目一直在用小范围改动逐步收敛：先完成内容，再调整布局，发现视觉偏差后再修正。对 Vibe Coding 来说，可描述、可观察的验收标准很有帮助，例如“横屏桌面两栏、竖屏保持单栏”“手动切换后不被自动模式覆盖”，都比一句“再好看一点”更容易检查结果。

## 发布与下一次维护

这个名片站使用 GitHub Pages 静态托管，对应分支是 `main`、目录是仓库根目录。更新 HTML 或资源文件并提交后，由 Pages 发布。这里没有 Astro 构建，也不需要安装 Node.js 依赖。

现阶段，README 已经覆盖个人资料、企划面板、歌曲、主题、字体和资源更新等位置。以后继续开发时，我会优先检查三件事：

1. 新内容能否在手机竖屏和桌面横屏下保持清楚的阅读顺序。
2. 修改资料后，页面文字、复制摘要和导出内容是否同步。
3. 改动资源后，路径、字体子集、favicon 和二维码是否仍然对应当前内容。

从个人主页到制作人名片，这个项目最有价值的变化，是让页面逐渐围绕一个具体场景展开。功能不必一次堆满；每次改动能解决一个实际问题，并留下清楚的提交和维护说明，就能继续迭代下去。

---

项目入口：[在线名片](https://sereindian.github.io/) · [GitHub 仓库](https://github.com/Sereindian/sereindian.github.io) · [本文对应版本的 README](https://github.com/Sereindian/sereindian.github.io/blob/dd948491299ffec194de4d3012365f49171380a3/README.md)。
