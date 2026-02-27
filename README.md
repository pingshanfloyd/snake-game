# Snake Game - Vercel 部署指南

## 项目结构
```
snake-game/
├── index.html              # 前端游戏页面
├── package.json            # 项目配置
├── vercel.json             # Vercel 路由配置
├── api/
│   ├── submit-score.js     # 提交分数 API
│   └── get-scores.js       # 获取排行榜 API
└── README.md               # 本文件
```

## 部署步骤

### 1. 创建 GitHub 仓库
- 在 GitHub 创建新仓库（如 `snake-game`）
- 把上面所有文件 push 到仓库

### 2. 导入 Vercel
- 登录 [vercel.com](https://vercel.com)
- 点击 "Add New Project"
- 导入你的 GitHub 仓库
- 点击 "Deploy"

### 3. 设置环境变量
部署完成后，进入项目设置：
- Settings → Environment Variables
- 添加以下变量：
  - `FIREBASE_DATABASE_URL`: `https://snake-game-a7783-default-rtdb.asia-southeast1.firebasedatabase.app`
  - `FIREBASE_SECRET`: 你的 Firebase 数据库密钥

#### 获取 Firebase Secret:
1. 去 Firebase Console → 项目设置 → 服务账号
2. 点击 "数据库密钥" → 显示
3. 复制密钥值

### 4. 重新部署
- 添加环境变量后，Vercel 会自动重新部署
- 访问分配的域名即可使用

## 注意事项
- API key 现在藏在服务器端，用户看不到
- 排行榜数据仍存储在 Firebase
- 免费额度应该够用