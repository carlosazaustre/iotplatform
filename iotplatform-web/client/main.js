'use strict'

const Vue = require('vue')
const App = require('./app.vue')

// eslint-disable-next-line no-unused-vars
const vm = new Vue({
  el: '#app',
  render: function (createElement) {
    return createElement(App)
  }
})
