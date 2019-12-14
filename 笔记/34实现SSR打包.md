## 服务端渲染是什么
渲染: HTML + CSS + JS + DATA -> 渲染后的HTML

服务端
  所有模板等资源都存储在服务端
  内网机器拉取数据更快
  一个HTML返回所有数据

## 浏览器和服务器交互流程
请求开始 -> server -> html template && data -> server render -> 浏览器解析并渲染 -> 加载并执行js和其他资源 -> 页面完全可交互
## 客户端渲染 vs 服务端渲染
            客户端渲染 | 服务端渲染
请求         多个请求(html,data等)    1个请求
加载过程      HTML&数据串并行加载      1个请求返回html&数据
渲染          前端渲染                服务端渲染
可交互        图片等静态资源加载完成，JS逻辑执行完成可交互

总结: 服务端渲染(SSR)的核心是减少请求

SSR的优势
减少白屏时间
对于SEO更加友好

## SSR代码实现思路
### 服务端
  .使用react-dom/server的renderToString方法将React组件渲染成字符串
  .服务端路由返回对应的模板

### 客户端
  .打包出针对服务端的组件

const express =require('express')
const {renderToString} = require('react-dom/server')
const SSR = require('../dist/search-server')

server(process.env.PORT || 3000)

function server(port){
  const app = express()

  app.use(express.static('dist'))
  app.get('/search', (req, res) => {
    console.log('Server response template', renderToString(SSR))
    res.status(200).send(renderMarkup(renderToString(SSR)))
  })

  app.listen(port, () => {
    console.log('server is running on port: ' + port)
  })
}

function renderMarkup(html){
  return `<!DOCTYPE html>
<html lang="en">
<head>
</head>
<body>
    <div id="app">${html}</div>
</body>
</html>`
}

webpack ssr 打包存在的问题
浏览器的全局变量(node.js中没有document,window)
  .组件适配: 将不兼容的组件根据打包环境进行适配
  .请求适配: 将fetch或者ajax发送请求的写法改成isomorphic-fetch或者axios

样式问题(Nodejs无法解析css)
  .方案一: 服务端打包通过ignore-loader忽略掉CSS的解析
  .方案二: 将style-loader替换成isomorphic-style-loader

## 如何解决样式不显示的问题
使用打包出来的浏览器端html为模板
设置占位符，动态插入组件
<!DOCTYPE html>
<html lang="en">
<head>
    <title>Search</title>
</head>
<body>
    <div id="app"><!-- HTML_PLACEHOLDER --></div>
</body>
</html>






