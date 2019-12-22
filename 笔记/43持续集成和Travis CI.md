## 持续集成的作用
优点:
  . 快速发现错误
  . 防止分支大幅偏离主干

核心措施是，代码集成到主干之前，必须通过自动化测试。只要有一个测试用例失败，就不能集成。

Github最流行的CI
1. Travis CI
2. Circle CI 
3. Jenkins

接入Travis CI
1. https://travis.org/ 使用github账号登录
2. 在https://travis-ci.org/account/repositories为项目开启
3. 项目根目录下新增 .travis.yml

