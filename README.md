# 山·诗 Mountain Verses — 部署说明 / Deployment Guide

## 文件结构 File Structure
```
poetry-site/
├── index.html          ← 主页（二维码列表）Main page with QR codes
└── poems/
    ├── poem-1.html     ← 望岳 (Du Fu)
    ├── poem-2.html     ← 题西林壁 (Su Shi)
    ├── poem-3.html     ← 山居秋暝 (Wang Wei)
    ├── poem-4.html     ← 登高 (Du Fu)
    ├── poem-5.html     ← 独坐敬亭山 (Li Bai)
    ├── poem-6.html     ← 终南山 (Wang Wei)
    ├── poem-7.html     ← 登鹳雀楼 (Wang Zhihuan)
    ├── poem-8.html     ← 早发白帝城 (Li Bai)
    ├── poem-9.html     ← 江雪 (Liu Zongyuan)
    └── poem-10.html    ← 行路难·其一 (Li Bai)
```

## 免费部署推荐 / Free Hosting Options

### 方法一：GitHub Pages（推荐）
1. 在 GitHub 创建新仓库（如 `mountain-verses`）
2. 上传所有文件，保持目录结构
3. 进入 Settings → Pages → Source: main branch → /root
4. 网址格式：`https://你的用户名.github.io/mountain-verses/`
5. 将此网址配置到 QR 码中（在 index.html 的 QRCode 生成部分修改 text 参数）

### 方法二：Netlify（最简单）
1. 访问 netlify.com，注册账号
2. 将整个 poetry-site 文件夹拖拽到 Netlify 部署区
3. 立即获得一个公网 URL，手机可直接扫码访问

### 方法三：Vercel
1. 访问 vercel.com，连接 GitHub 仓库
2. 自动部署，支持自定义域名

## QR 码与部署 URL 关联
网站上线后，QR 码会自动使用当前页面的域名生成正确链接。
不需要手动修改，只需确保 index.html 和 poems/ 文件夹在同一目录即可。

## 功能说明
- 双语切换：中文 / English，记忆用户选择
- 10首山水古诗，每首含原文、英译、背景三个标签页
- 诗歌间可前后导航
- 移动端友好，手机扫码直达
- 山峦水墨风格视觉设计
