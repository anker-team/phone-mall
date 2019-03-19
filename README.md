# phone-mall

> 基于vue2.0、vue-cli、vuex、vue-router、vue-resource实现的简单商场
> 基于vue2.0、vue-cli、vuex、vue-router、vue-resource实现的简单商场。由于是没有进行数据交互，只是用mock来模拟数据生成动态结构。该项目只是简单的一个购物流程，首页->列表->商品详情->选择规格->加入购物车->提交订单

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

## 使用的库

``` bash
vue-cli（vue-cli+webpack脚手架）
vue-router（路由跳转）
vuex（状态管理）
vue-resource（ajax请求）
mock.js（mock模拟后台数据）
swiper（轮播图插件）
```
## 样式效果前端布局

``` bash
HTML5
CSS3
Less
rem(限定html最大的fontsize为64px)
Flex(弹性布局)
动画（vue原生transition）
```
## 数据交互

``` bash
Mock(模拟后台数据)
vue-resource(请求数据)
```

## 实现过程心得

``` bash
对于新手来说，vue-cli脚手架傻瓜式一键搭建vue环境是很nice的，因为那些配置文件是在是难和麻烦，先弄懂vue文件里面的实现
vue里面相对路径的问题也是一个比较心酸的问题，比如链接一张图片，css，js都会根据不同的vue组件的位置而不同
实现过程中表单radio或checkbox的选中状态会有些bug，比如表单的checked根据数据的一个属性来设置是否选中，当改变这个属性的时候会出现组件渲染的bug，例如我这里的地址默认的改变，解决方法是在标签上用:checked来进行绑定checked
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
