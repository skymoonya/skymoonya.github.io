// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

Vue.config.productionTip = false


axios.interceptors.request.use(config => {
  store.ajaxLoading += 1
  return config
})

axios.interceptors.response.use(res => {
  store.ajaxLoading -= 1
  return res
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
