import isArray from 'lodash/isArray'
import isFunction from 'lodash/isFunction'
import set from 'lodash/set'

const install = function (Vue, options) {
  if (install.installed) return
  let resolvedOptions = {
    langs: options.langs,
    components: {}
  }
  options.components.forEach((component) => {
    if (!isArray(component)) {
      component = [component]
    }
    const opts = component[1] || {}
    component = component[0]
    component = component && component.hasOwnProperty('default') ? component['default'] : component
    if (!opts.implicit) {
      if (isFunction(component.install)) {
        Vue.use(component, opts)
      }
      if (opts.global) {
        Vue.prototype[opts.global] = component
        const children = opts.children
        if (children) {
          for (let key in children) {
            const global = children[key].global
            if (global) {
              Vue.prototype[global] = component[key]
            }
          }
        }
      }
    }
    if (opts.id) {
      resolvedOptions.components[opts.id] = opts
    }
  })
  set(Vue, 'udock.plugins.element-ui.opts', resolvedOptions)
}

export default {
  install
}
