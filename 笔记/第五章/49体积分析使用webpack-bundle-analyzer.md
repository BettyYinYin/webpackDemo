## 体积分析: webpack-bundle-analyzer
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = {
  plugins: [
    new BundleAnalyzerPlugin()
  ]
}

### 可以分析哪些问题
  1. 依赖的第三方模块文件大小
  2. 业务里面的组件代码大小