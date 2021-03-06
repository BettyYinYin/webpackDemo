## Scope Hoisting使用和原理分析
### 现象: 构建后的代码存在大量闭包代码
### 会导致什么问题
大量函数闭包包裹代码，导致体积增大(模块越多越明显)
运行代码时创建的函数作用域变多，内存开销变大.

## 模块转换分析
模块初始化函数
(function(module, __ webpack_exports__,__webpack_require__) {
    .....
})
结论: 被webpack转换后的模块会带上一层包裹;import会被转换成__webpack_require__
## 进一步分析
    .打包出来的是一个IIFE(匿名闭包)
    .modules是一个数组，每一项是一个模块初始化函数
    .__webpack_require__用来加载模块，返回module.exports
    .通过WEBPACK_REQUIRE_METHOD(0)启动程序

## scope hoisting原理
原理: 将所有模块的代码按照引用顺序放在一个函数作用域里，然后适当的重命名一些变量以防止变量名冲突
对比: 通过scope hoisting可以减少函数声明代码和内存开销

## 使用
webpack mode为production默认开启(moduleContatenationPlugin)
注意: 必须是ES6语法,CJS不支持
