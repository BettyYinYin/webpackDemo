## 代码压缩
### html压缩
html-webpack-plugin
plugins: [
    new HtmlWebpackPlugin({
        template: path.join(__dirname, 'src/search.html'),
        filename: 'search.html',
        chunks:['search'],
        inject: true,
        minify: {
            html5: true,
            collapseWhitespace: true,
            preserveLineBreaks: false,
            minifyCSS: true,
            minifyJS: true,
            removeComments: false
        }
    })
]

### css压缩
使用optimize-css-assets-webpack-plugin同时使用cssnano
plugins: [
    new OptimizeCssAssetsPlugin({
        assetNameRegExp: /\.css$/g,
        cssProcessor: require('cssnano')
    })
]
### js压缩
webpack4内置了uglifyjs-webpack-plugin。所以默认打包的js是已经压缩过的
