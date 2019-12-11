const path = require('path')

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'dist')
    },
    module: {
        rules: [
            {test: '.js$', use: 'babel-loader'}
        ]
    }
}

## 解析es6
使用babel-loader，
babel的配置文件是.babelrc
安装@babel/core @babel/preset-env babel-loader
{
    "presets": [
        "@babel/preset-env"
    ],
    "plugins": [
        "@babel/proposal-class-properties"
    ]
}


## 解析react jsx
再presets中增加@babel/preset-react