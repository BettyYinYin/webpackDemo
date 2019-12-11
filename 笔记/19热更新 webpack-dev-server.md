## WDS 不刷新浏览器
### WDS 不输出文件，而是放在内存中
和 HotModuleReplacementPlugin 插件配合使用

在 package.json 中配置一个新的命令
"dev": "webpack-dev-server --open"

webpack.config.js 中配置 mode 为 development(热更新只存在于开发环境中)
const webpack = require('webpack')
module.exports = {
    mode: 'development'
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        contentBase: './dist',
        hot: true
    }
}

## 使用webpack-dev-middleware
WDM将webpack输出的文件传输给服务器
适用于灵活的定制场景
const express = require('express')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')

const app = express()
const config = require('./webpack.config.js')
const compiler = webpack(config)

app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath
}))

app.listen(3000, function() {
    console.log('Example app listen on port 3000!\n')
})

## 热更新原理分析
Webpack compiler 将js编译成bundle
HMR Server(服务端)将热更新的文件输出给HMR Runtime(客户端)
Bundle Server提供文件在浏览器的访问(也就是一个服务器)

HMR Runtime 会被注入到浏览器，更新文件的变化(和服务器构成一个链接通常是websocket)

bundle.js构建输出的文件







