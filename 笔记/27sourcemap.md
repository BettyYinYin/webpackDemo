## 使用source map
作用：通过source map定位到源代码
开发环境开启，线上环境关闭
线上排查问题的时候可以将sourcemap上传到错误监控系统

## source map关键字
eval: 使用eval包裹模块代码
source map: 产生.map文件
cheap: 不包含列信息
inline: 将.map作为DataURI嵌入，不单独生成.map文件
module: 包含loader的sourcemap

sourcemap类型......上网查阅


