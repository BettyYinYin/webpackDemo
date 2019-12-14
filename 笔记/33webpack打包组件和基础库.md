webpack打包组件和库
webpack除了用来打包应用，也可以用来打包js库
实现一个大整数加法库的打包
  .需要打包压缩版本和非压缩版本
  .支持AMD、CJS、ESM 模块引用

库的目录结构和打包要求
打包输出的库名称
  .未压缩版 large-number.js
  .压缩版large-number.min.js

支持的使用方式
  支持ES module 
    ```
      import * as largeNumber from 'large-number'
      largeNumber.add('999', '1')
    ```
  支持CJS
    ```
      const largeNumer = require('large-number')
      largeNumber.add('999', '1')
    ```
  支持AMD
    ```
      require(['large-number'], function(large-number) {
        largeNumber.add('999', '1')
      })
    ```
  可以直接通过script引入
  <script src="https://unpkg.com/large-number"></script>

## 配置 如何将库暴露出去
library: 指定库的全局变量
libraryTarget: 支持库引入的方式
module.exports = {
  mode: "production",
  entry: {
    "large-number": "./src/index.js",
    "large-number-min": "./src/index.js"
  },
  output: {
    filename: "[name].js",
    library: "largeNumber",
    libraryExport: "defaut",
    libraryTarget: "umd"
  }
}

## 打包出来的两份文件都是压缩版的，如何只对.min压缩

通过terser-webpack-plugin插件的include设置只压缩min.js结尾的文件
terser-webpack-plugin是基于uglifyjs-webpack-plugin改造的，uglifyjs-webpack-plugin遇到es6语法会报错，terser-webpack-plugin则不会
module.exports = {
  mode: 'none',
  entry: {
    'large-number': './src/index.js',
    'large-number.min': './src/index.js'
  },
  output: {
    filename: '[name].js',
    library: 'largeNumber',
    libraryExport: 'default',
    libraryTarget: 'umd'
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        include: /\.min\.js$/
      })
    ]
  }
}

## 设置入口文件
package.json的main字段为index.js
if(process.env.NODE_ENV === 'production'){
  module.exports = require('./dist/large-number.min.js')
}else {
  module.exports = require('./dist/large-number.js')
}
