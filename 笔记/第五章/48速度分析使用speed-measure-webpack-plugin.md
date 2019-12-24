## 速度分析: 使用speed-measure-webpack-plugin
代码示例
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
const smp = new SpeedMeasurePlugin()
const webpackConfig = smp.wrap({
  plugins: [
    new MyPlugin(),
    new MyOtherPlugin()
  ]
})

可以看到每个loader和插件执行耗时
速度分析插件作用
  1. 分析整个打包总耗时
  2. 每个插件和loader的耗时情况