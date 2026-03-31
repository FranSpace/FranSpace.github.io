# Personal Site Starter (React + Vite + GitHub Pages)

## 1. 本地运行

```bash
npm install
npm run dev
```

浏览器打开终端里显示的本地地址，例如：

```text
http://localhost:5173/
```

## 2. 生产构建

```bash
npm run build
npm run preview
```

## 3. 改内容

主要改这两个文件：

- `src/siteData.js`：改文字和卡片数据
- `src/styles.css`：改颜色、字体、圆角、hover 动效

## 4. 部署到 GitHub Pages

### 推荐仓库名

```text
你的用户名.github.io
```

如果你使用这个仓库名，`vite.config.js` 里的：

```js
base: '/'
```

保持不变即可。

### 如果你使用普通仓库名

例如：

```text
my-site
```

则需要把 `vite.config.js` 改成：

```js
base: '/my-site/'
```

## 5. 推送到 GitHub

```bash
git init
git add .
git commit -m "init personal site"
git branch -M main
git remote add origin https://github.com/你的用户名/你的仓库名.git
git push -u origin main
```

## 6. 打开 Pages

进入 GitHub 仓库：

- Settings
- Pages
- Build and deployment
- Source 选择 **GitHub Actions**

项目已经自带 `.github/workflows/deploy.yml`，推送后会自动部署。
