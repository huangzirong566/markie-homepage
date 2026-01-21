# Markie 个人主页 - 使用指南

这是一个基于 React + Vite + Tailwind CSS 的高级个人主页模板。

## 1. 快速开始

你需要先安装 Node.js (推荐 v18 或更高版本)。

1. 解压文件
2. 在终端进入项目目录:
   ```bash
   cd markie-homepage
   ```
3. 安装依赖:
   ```bash
   npm install
   # 或者使用 pnpm
   pnpm install
   ```
4. 启动开发服务器:
   ```bash
   npm run dev
   ```
   然后在浏览器打开显示的地址 (通常是 http://localhost:5173)。

## 2. 如何替换内容

### 替换照片
所有图片都存放在 `src/assets/` 目录下。你可以直接用你的同名文件覆盖它们，或者修改代码引用新的文件名。

- **头像**: `src/assets/avatar.jpg` (建议 1:1 比例)
- **背景大图**: `src/assets/hero-bg.jpg` (建议 16:9 高清图)
- **作品集图片**: `src/assets/gallery-1.jpg`, `src/assets/gallery-2.jpg`

### 替换简历
简历文件位于 `public/resume.pdf`。
直接用你的 PDF 简历文件覆盖该文件即可。网站上的"Download Resume"按钮会自动下载这个文件。

### 修改文字
网站的文字内容分散在各个组件中，位于 `src/components/` 目录：

- **名字/Slogan**: 编辑 `src/components/Hero.tsx`
- **关于我**: 编辑 `src/components/About.tsx`
- **作品列表**: 编辑 `src/components/Gallery.tsx` (在 `works` 数组中修改)
- **工作经历**: 编辑 `src/components/Experience.tsx` (在 `history` 数组中修改)
- **联系方式**: 编辑 `src/components/Contact.tsx`

## 3. 打包发布

当你完成所有修改后，运行以下命令打包网站：

```bash
npm run build
```

打包完成后，会生成一个 `dist` 文件夹。你可以将这个文件夹里的所有文件上传到任何静态网站托管服务 (如 Vercel, Netlify, GitHub Pages)。
