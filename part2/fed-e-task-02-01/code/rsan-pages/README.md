## 介绍
一套用于静态Web应用的自动化构建工作流。

## 如何使用
`rsan-pages`基于`gulp`构建，它提供了以下工作流:

|  命令   | 作用  |
|  ----  | ----  |
| clean  | 清除之前构建的产物 |
| build  | 开始构建用于部署生产环境的文件 |
| develop | 编译项目并启动一个本地服务器，会自动打开游览器 |

### 安装
```sh
yarn add rsan-pages -D
```
### 添加工作流
在你的项目中`package.json`，修改：
```json
{
    "scripts": {
        "clean": "rsan-pages clean",
        "build": "rsan-pages build",
        "develop": "rsan-pages develop",
    }
}
```

### 配置项目
在你的项目中新增`pages.config.js`文件，并配置内容，例如：
```javascript
module.exports = {
  build: {
    src: 'src',
    dist: 'release',
    temp: '.tmp',
    public: 'public',
    paths: {
      styles: 'assets/styles/*.scss',
      scripts: 'assets/scripts/*.js',
      pages: '*.html',
      images: 'assets/images/**',
      fonts: 'assets/fonts/**'
    }
  },
  data: {
    menus: [
      {
        name: 'Home',
        icon: 'aperture',
        link: 'index.html'
      },
      {
        name: 'Features',
        link: 'features.html'
      },
      {
        name: 'About',
        link: 'about.html'
      },
      {
        name: 'Contact',
        link: '#',
        children: [
          {
            name: 'Twitter',
            link: 'https://twitter.com/w_zce'
          },
          {
            name: 'About',
            link: 'https://weibo.com/zceme'
          },
          {
            name: 'divider'
          },
          {
            name: 'About',
            link: 'https://github.com/zce'
          }
        ]
      }
    ],
    pkg: require('./package.json'),
    date: new Date()
  }
}
```
|  选项   | 作用  |
|  ----  | ----  |
| build  | 构建路径配置 |
| data  | 模版引擎渲染数据 |
---
最后，祝使用愉快！
