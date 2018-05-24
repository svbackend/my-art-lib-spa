import Vue from 'vue'
import App from './App.vue'
import axios from './extensions/axios'
import { sync } from 'vuex-router-sync'
import store from './extensions/storage'
import router from './extensions/router'
import RouterComponent from 'vue-router'
import Vuelidate from 'vuelidate'
import Meta from 'vue-meta'
import { VueExtendLayout, layout } from 'vue-extend-layout'
import i18n from './translations'

require('./assets/sass/main.scss')

Vue.prototype.$http = axios
Vue.use(RouterComponent)
Vue.use(Vuelidate)
Vue.use(VueExtendLayout)
Vue.use(Meta)

sync(store, router)

new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store,
  i18n,
  ...layout
})