const path = require("path");

const VueLoaderPlugin = require("vue-loader/lib/plugin");

const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/main.js",
  output: {
    path: path.resolve(__dirname, "dist")
  },
  module: {
    rules: [
      // 检查代码规范化
      {
        test: /\.(vue|js)$/,
        loader: "eslint-loader",
        exclude: /node_modules/,
        enforce: "pre"
      },
      // vue文件解析
      {
        test: /\.vue$/,
        use: ["vue-loader"]
      },
      // js语法兼容处理
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      },
      // 小图片转base64
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 10 * 1024,
          esModule: false
        }
      }
    ]
  },
  plugins: [
    // 解析vue文件所需要使用到的
    new VueLoaderPlugin(),
    // 根据模版输出html文件
    // 插件会自动将打包好的js注入到html中
    new HtmlWebpackPlugin({
      template: "./public/index.html"
    })
  ]
};
