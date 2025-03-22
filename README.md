# AI知识库与场景实战

一个全面的AI知识学习平台，包含AI基础知识普及与实际应用场景演示。

## 项目内容

- **AI基础知识**：AI科普、发展趋势、学习意义
- **AI应用场景**：实战指南，包括AI对话、多工具对比、任务拆解、PPT制作、AI辅助阅读、批判性思维
- **场景训练任务**：实践练习，将所学知识应用到实际任务中

## 技术栈

- HTML5
- CSS3 (TailwindCSS)
- JavaScript
- Swiper.js (轮播图组件)

## 本地开发

由于本项目是纯静态网站，您可以直接在浏览器中打开HTML文件进行查看。

对于更好的开发体验，建议使用本地服务器：

```bash
# 如果安装了Node.js，可以使用http-server
npx http-server

# 或者使用Python的简易服务器
python -m http.server
```

## 部署到Vercel

1. 安装Vercel CLI (需要Node.js)：

```bash
npm install -g vercel
```

2. 在项目根目录登录Vercel：

```bash
vercel login
```

3. 部署项目：

```bash
# 开发环境部署
vercel

# 生产环境部署
vercel --prod
```

也可以直接通过GitHub仓库连接Vercel进行自动部署。

## 文件结构

- `index.html`: 主页
- `ai-knowledge-hub.html`: 知识导航页
- `ai-scenarios-week1.html`: 第一周场景实战
- `ai-tools.html`: AI工具介绍
- `static/`: 静态资源目录
  - `css/`: 样式文件
  - `js/`: JavaScript文件
  - `images/`: 图片资源

## 注意事项

- 确保在不同设备和浏览器上测试网站兼容性
- 图片资源已优化以提高加载速度
- 使用相对路径引用资源，确保在不同部署环境下正常工作 