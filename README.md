# vue-plugin-element-ui

## 概述

## 安装使用

```bash
npm i @udock/vue-plugin-element-ui element-ui
```

## 基本配置

```js
module.exports = {
  framework: 'vue',
  plugins:[
    // 启用 element-ui 插件
    ['element-ui', {
      components: [
        // 按需加载组件
        'grid',
        'form',
        'icon',
        'table',
        'input',
        'button'
      ]
    }]
  ]
}
```

## 样式定制

在项目 ``src/themes/`` 目录下创建 ``var.scss`` 文件，可从 ``element-ui/packages/theme-chalk/src/common/var.scss`` 拷贝

```js
module.exports = {
  framework: 'vue',
  plugins:[
    ['element-ui', {
      // 使用 scss 源文件
      theme: `element-ui/packages/theme-chalk/src/base.scss`,
      // 进行 scss 变量覆盖
      'pre-styles': [
        `~@/themes/var.scss`, // 在 base.scss 前使用 @import 的形式加载 var.scss，用于变量覆盖
        `@/themes/common.scss`, // 在 base.scss 前加载 common.scss，单独文件形式引入
      ],
      'post-styles': [
        `@/themes/common-post.scss`, // 在 base.scss 后加载 common-post.scss，单独文件形式引入，用于样式覆盖
      ],
      components: [
        // 按需加载组件
        'grid',
        'form',
        'icon',
        'table',
        'input|style:@/themes/my-button.scss', // 使用自定义样式替换原版样式
        'button|style:false' // 禁用原版样式引入
      ]
    }]
  ]
}
```
