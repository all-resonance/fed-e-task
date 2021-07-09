# 一、简答题

#### 1、Webpack 的构建流程主要有哪些环节？如果可以请尽可能详尽的描述 Webpack 打包的整个过程。
1. 初始化配置。
	- 结合用户在命令行传递的参数和webpack.config.js中的配置，得到最后的配置对象。
	- webpack可以零配置使用，如果用户没有配置，内部会有一个默认的配置。
2. 实例化compiler。
	- 通过配置好的对象实例化compiler对象，通过初始化NodeEnvironmentPlugin插件让它具备文件读写的能力。
	- 然后依次挂载配置中的plugins到compiler身上，根据用户监听的钩子，在指定的时机执行。
	- 挂载webpack内置的插件，其中就有EntryOptionsPlugin插件，它的作用是解析入口模块。单入口和多入口都对应不同的插件进行解析。
	- compiler是贯穿整个打包过程的，它在不同的时机都发射了钩子。
3. 编译阶段。
	- 调用compiler.run -> compiler.compile, 创建compilation对象
	- 调用compilation.addEntry, 根据配置的入口递归解析模块。
	- 先创建一个模块，将读取的模块放进去
	- 调用模块的build方法，将读取的内容转换为AST，通过修改AST替换require等字符串，最后修改好了再转回代码。
	- 对于不是js的模块，在此时可以调用对应的loader进行解析，最终返回js模块
	- 可能会有plugin在这个阶段被执行。
	- 解析完成后保存所有的entries和modules等到compilation身上，以备后续使用。
4. 封装Chunk。
	- 调用compilation.seal，依次遍历entries创建Chunk
	- 每一个入口都对应一个chunk，将这个入口依赖的所有模块打包到一起，最终生成一个chunk。
	- 在chunk获取完毕后，遍历chunks，将预先准备好的模版，通过模版引擎和当前chunk数据渲染出来
	- 将渲染好的代码保存到assets中，以备后续使用。
5. 打包输出
	- 在compiler.compile的完成回调中，得到配置中的输出目录并创建目录
	- 遍历assets，然后通过拼接输出目录和每个chunk文件名得到绝对路径
	- 从assets中取出内容，写入文件到指定的路径。
	- 打包完成。

　

　

#### 2、Loader 和 Plugin 有哪些不同？请描述一下开发 Loader 和 Plugin 的思路。

　

　

　

# 二、编程题

#### 1、使用 Webpack 实现 Vue 项目打包任务

具体任务及说明：

1. 在 code/vue-app-base 中安装、创建、编辑相关文件，进而完成作业。
2. 这是一个使用 Vue CLI 创建出来的 Vue 项目基础结构
3. 有所不同的是这里我移除掉了 vue-cli-service（包含 webpack 等工具的黑盒工具）
4. 这里的要求就是直接使用 webpack 以及你所了解的周边工具、Loader、Plugin 还原这个项目的打包任务
5. 尽可能的使用上所有你了解到的功能和特性


**提示：(开始前必看)**

在视频录制后，webpack 版本以迅雷不及掩耳的速度升级到 5，相应 webpack-cli、webpack-dev-server 都有改变。

项目中使用服务器的配置应该是改为下面这样：

```json
// package.json 中部分代码
"scripts": {
	"serve": "webpack serve --config webpack.config.js"
}
```

vue 文件中 使用 style-loader 即可

**其它问题, 可先到 https://www.npmjs.com/ 上搜索查看相应包的最新版本的配置示例, 可以解决大部分问题.**



#### 作业要求

本次作业中的编程题要求大家完成相应代码后

- 提交一个项目说明文档，要求思路流程清晰。
- 或者简单录制一个小视频介绍一下实现思路，并演示一下相关功能。
- 最终将录制的视频或说明文档和代码统一提交至作业仓库。