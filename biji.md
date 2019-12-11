模块打包器
依赖树

## entry
### 单入口：字符串
module.exports = {
    entry: './src/index.js'
}

### 多入口：对象
module.exports = {
    entry: {
        app: './src/app.js',
        adminApp: './src/adminApp.js'
    }
}


## output
### 单入口配置
module.exports = {
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js'
    }
}

### 多入口配置
module.exports = {
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js'   // 多个入口时通过占位符确保文件名称的唯一
    }
}

## loaders
### 常见的loaders
babel-loader：转换es6、es7等JS新特性语法
css-loader：支持.css文件的加载和解析
less-loader：将less文件转换为css
ts-loader：将ts文件转换为js
file-loader：进行图片、字体等的打包
raw-loader：将文件以字符串的形式导入
thread-loader：多进程打包js和css

### loaders的用法
module.exports = {
    output: {
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /.txt$/,
                use: 'raw-loader'
            }
        ]
    }
}


## plugins
用于bundle文件的优化，资源管理和环境变量注入，作用于整个构建过程(任何loaders没法做的事，通过plugin完成)
### 常见的plugins
CommonsChunkPlugin(splitchunksplugin)：将chunks相同的代码提取为公共的js
CleanWebpackPlugin:清理构建目录
ExtractTextWebpackPlugin(mini-css-extract-plugin)：将css从bundle文件里提取成一个独立的css文件
CopyWebpackPlugin：将文件或文件夹拷贝到构建的输出目录
HtmlWebpackPlugin：创建html文件去承载输出的bundle
UglifyjsWebpackPlugin：压缩js
ZipWebpackPlugin：将打包的资源生成一个zip包

### 用法
module.exports = {
    output: {
        filename: 'bundle.js'
    },
    plugins: [  //数组
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ]
}

## mode
用来指定当前的构建环境：production、development还是none
设置mode可以使用webpack内置的函数，默认值为production
development：设置process.env.NODE_ENV为development，开启NamedChunksPlugin和NamedModulesPlugin
production：设置process.env.NODE_ENV为production，开启FlagDependencyUsagePlugin，FluIncludedChunksPlugin，
moduleConcatenationPlugin，NoEmitOnErrorsPlugin，OccurrenceOrderPlugin，SideEffectsFlagPlugin和TerserPlugin
none：不开启任何优化选项




