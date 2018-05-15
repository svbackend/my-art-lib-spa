import Vue from 'vue'
import App from './App.vue'
import axios from './extensions/axios'
import { sync } from 'vuex-router-sync'
import store from './extensions/storage'
import VeeValidate from 'vee-validate'
import router from './extensions/router'
import RouterComponent from 'vue-router'
import Buefy from 'buefy'

import 'buefy/lib/buefy.css'
require('./assets/sass/main.scss');

Vue.prototype.$http = axios
Vue.use(RouterComponent)
Vue.use(VeeValidate)
Vue.use(Buefy)

sync(store, router)

new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store
})