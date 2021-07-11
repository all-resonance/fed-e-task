const common = require('./webpack.common')
const { DefinePlugin } = require('webpack')

const { merge } = require('webpack-merge')

module.exports = merge(common, {
  mode: 'development',
  // 开发环境下，只记录代码行对应的位置，做到最小可用，提升编译速度
  devtool: '#@cheap-module-source-map',
  // 本地服务配置，需配合 webpack-dev-server
  devServer: {
    port: 3000,
  },
  module: {
    rules: [
      // 处理less文件
      // 按从后向前的顺序处理
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader'],
      },
      // 处理css文件
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    // 定义全局环境变量
    new DefinePlugin({
      BASE_URL: '/public/',
    }),
  ],
})
