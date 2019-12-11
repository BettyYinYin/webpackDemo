## CSS3的属性为什么要前缀
浏览器实现不一样
ie: trident(-ms)
firefox: Gecko(-moz)
chrome: Webkit(-webkit)
opera: Presto(-o)

## 使用PostCss插件autoprefixer自动补齐CSS3前缀
根据can I use规则
rules:[
    {
        test: /\.less$/,
        use: [
            'style-loader',
            'css-loader',
            'less-loader',
            {
                loader: 'postcss-loader',
                options: {
                    plugins: () => {
                        require('autoprefixer')({
                            browsers: ['last 2 version', '>1%', 'iOS 7']
                        })
                    }
                }
            }
        ]
    }
]

info: postcss-loader还可以做css module，stylelint







