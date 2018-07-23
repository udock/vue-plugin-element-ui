module.exports = {
  external: (id) => /^lodash\/.*$/.test(id),
  globals: {
    'lodash/isArray': '_.isArray',
    'lodash/isFunction': '_.isFunction',
    'lodash/set': '_.set'
  }
}
