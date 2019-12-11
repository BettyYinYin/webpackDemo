## css媒体查询实现响应式布局
缺陷：需要写多套适配代码
@media screen and (max-width:980px){
    .header{
        width:900px;
    }
}

@media screen and (max-width:480px){
    .header{
        width:400px;
    }
}

@media screen and (max-width:350px){
    .header{
        width:300px;
    }
}

## rem
font-size of the root element
rem和px的对比
rem是相对单位
px是绝对单位

## px -> rem
使用px2rem-loader
页面渲染时计算根元素的font-size值
结合手淘的lib-flexible库(动态计算根元素的font-size)
rules: [
    {
        test: /\.css$/,
        use: [
            'style-loader',
            'css-loader',
            'less-loader',
            {
                loader: 'px2rem-loader',
                options: {
                    remUnit: 75,
                    remPrecision: 8
                }
            }
        ]
    }
]




























