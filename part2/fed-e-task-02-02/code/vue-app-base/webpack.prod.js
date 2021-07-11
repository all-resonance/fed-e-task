const { merge } = require("webpack-merge");
const common = require("./webpack.common");
const { DefinePlugin } = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const path = require("path");

module.exports = merge(common, {
  mode: "production",
  // 去掉生产环境的sourcemap
  devtool: "none",
  output: {
    filename: "js/[name].[hash:8].js",
    publicPath: "./"
  },
  module: {
    rules: [
      // 处理less
      // 和开发环境不同的是，我们需要将样式全部抽离出来，生成单独的css样式文件
      // 当样式内容比较多的时候，只需要请求一次样式就可以了，否则样式太多需要频繁的注入
      {
        test: /\.less$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "less-loader"]
      },
      // 处理css文件
      // 同上
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"]
      }
    ]
  },
  plugins: [
    // 根据模版生成html文件
    // 压缩了生产环境中的html
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      favicon: "./public/favicon.ico",
      //对html代码进行压缩
      minify: {
        removeComments: true, //去注释
        collapseWhitespace: true, //压缩空格
        removeAttributeQuotes: true //去除属性引用
      }
    }),
    // 定义全局变量
    new DefinePlugin({
      BASE_URL: process.env.NODE_ENV
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "css/[name].[hash:7].css",
      chunkname: path.posix.join("static", "css/[id].[chunkhash:7].css")
    }),
  ],
  // 代码优化配置
  optimization: {
    //代码分包
    splitChunks: {
      chunks: "all"
    },
    minimize: true,
    minimizer: [
      // 压缩css
      new OptimizeCSSAssetsPlugin({
        cssProcessorOptions: {
          discardComments: { remove: true } //移除注释
        }
      }),
      // 压缩js
      new TerserPlugin({
        parallel: true, //开启多线程来提高构建速度
        sourceMap: false,
        terserOptions: {
          warnings: false, //不展示warning
          compress: {
            unused: true, //去除未使用的
            drop_debugger: true, //移除debugger
            drop_console: true //去除console
          },
          output: {
            comments: false //去除注释
          }
        }
      })
    ]
  }
});
