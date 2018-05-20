import Vue from 'vue'
import App from './App.vue'
import axios from './extensions/axios'
import { sync } from 'vuex-router-sync'
import store from './extensions/storage'
import router from './extensions/router'
import RouterComponent from 'vue-router'
// import VeeValidate from 'vee-validate'
import Vuelidate from 'vuelidate'
import { VueExtendLayout, layout } from 'vue-extend-layout'

require('./assets/sass/main.scss')

Vue.prototype.$http = axios
Vue.use(RouterComponent)
//Vue.use(VeeValidate)
Vue.use(Vuelidate)
Vue.use(VueExtendLayout)

sync(store, router)

new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store,
  ...layout
})