## 代码分割的意义
对于大的web应用来讲，讲所有的代码都放在一个文件中显然是不够有效的，特别是当你的某些代码块是在某些特殊的时候才会被用到，
webpack有一个功能就是将你的代码块分割成chunks(语块)，当代码运行到需要他们的时候再进行加载。

### 适用的场景
    .抽离相同代码到一个共享块
    .脚本懒加载，使得初始下载的代码更小

### 懒加载JS脚本的方式
CommonJS:require.ensure
ES6:动态import(目前还没有原生支持,需要babel转换)(和CommonJS比较像)

#### 安装babel插件 @babel/plugin-syntax-dynamic-import -D
#### 配置.babelrc
    {
        plugins: [
            '@babel/plugin-syntax-dynamic-import'
        ]
    }

通过JSONP


