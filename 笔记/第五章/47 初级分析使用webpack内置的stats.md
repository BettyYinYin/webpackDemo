## 初级分析: 使用webpack内置的stats
stats: 构建的统计信息

### package.json 中使用stats
{
  "scripts": {
    "build:stats": "webpack --env production --json > stats.json"
  }
}

### nodejs中使用
const webpack = require('webpack')
const config = require('./webpack.prod.js')('production')

webpack(config, (err, stats) => {
  if(err){
    return console.error(err)
  }
  if(stats.hasErrors()){
    return console.error(stats.toString('errors-only))
  }
  console.log(stats)
})

stats只能看到最终的一个构建大小，无法看到具体是哪个文件导致的，颗粒度太粗，看不出问题所在