'use strict'

const _ = require('lodash')
const parseComponentConfig = require('@udock/vue-plugin-ui/lib/component-config-parser')
const getStylesCode = require('@udock/vue-plugin-ui/lib/get-styles-code')
const getComponentsCode = require('@udock/vue-plugin-ui/lib/get-components-code')
const dependency = require('./components-dependency')
const defaultOptions = require('./components-options')
const path = require('path')
const pify = require('pify')

module.exports = function (loader, options) {
  const loaderResolve = pify(loader.resolve)
  const langs = '{}'
  return loaderResolve(loader.context, 'element-ui/lib/theme-chalk/base.css').then(
    () => 'chalk',
    () => 'default'
  ).then((defaultThemeName) => {
    options = _.merge({
      theme: `element-ui/lib/theme-${defaultThemeName}/base.css`,
      local: ['zh-CN'],
      'pre-styles': [],
      'post-styles': [],
      components: []
    }, options)
    return loaderResolve(loader.context, options.theme)
  }).then(
    (filePath) => {
      const tasks = []
      options.components = parseComponentConfig(options.components, {defaults: defaultOptions, dependency: dependency})
      options.theme = filePath
      tasks.push(getStylesCode(options.components, options, {
        isCssMode: /\.css$/i.test(filePath),
        pathHandler: path.resolve(__dirname, 'path-handler.js')
      }))
      tasks.push(getComponentsCode(options.components, {loader: loader, prefix: 'element-ui/lib/'}))
      return Promise.all(tasks)
    },
    () => []
  ).then((results) => {
    const styles = results[0]
    const components = results[1]
    return {
      install: `Vue.use(
        ${options.$plugin},
        {
          langs: ${langs},
          components: [${components}]
        },
        [${styles}]
      )`
    }
  })
}
