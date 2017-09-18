// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'

import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'

import router from './router'
import store from './store'

import App from './App'
import toast from './components/common/Toast'

Vue.use(MintUI)

if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function() {
    FastClick.attach(document.body);
  }, false);
}

Vue.config.productionTip = false
Vue.component('toast', toast);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
