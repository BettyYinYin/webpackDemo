开源项目版本信息案例
软件的版本通常由三位组成，形如: X.Y.Z

版本是严格递增的

发布重要版本时，可以发布alpha,rc等先行版本

## 遵守semver规范的优势
  . 避免出现循环依赖
  . 依赖冲突减少

## 语义化版本(Semantic Versioning)规范格式
  . 主版本号: 当你做了不兼容的API修改
  . 此版本号: 当你做了向下兼容的功能性新增
  . 修订号: 当你做了向下兼容的问题修正

## 先行版本号
先行版本号可以作为发布正式版之前的版本,格式是在修订版本号后面加上一个连接号(-),再加上一连串以点(.)分割的标识符,标识符可以由英文、数字和连接号([0-9A-Aa-z-])组成
  1. alpha: 是内不测试版,一般不向外部发布,会有很多bug.一般只有测试人员使用
  2. beta: 也是测试版,这个阶段的版本会一直加入新的功能. 在Alpha版之后推出
  3. rc: Release Candidate系统平台上就是发行候选版本. RC版不会再推入新的功能了, 主要着重于除错
