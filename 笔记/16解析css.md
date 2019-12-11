## css-loader用于加载.css文件，并且转换成commonjs对象
## style-loader将样式通过<style>标签插入到head中

module: {
    rules: [
        {
            test: /\.css$/,
            use: [
                'style-loader',
                'css-loader'
            ]
        }
    ]
}

## less和Sass
less-loader用于将less转换为css

