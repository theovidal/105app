import Vue from 'vue'
import App from './App.vue'

import router from './plugins/router'
import store from './store/index'
import vuetify from './plugins/vuetify'
import './registerServiceWorker'

import '@babel/polyfill'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
