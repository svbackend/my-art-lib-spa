import Vue from 'vue'
import Router from 'vue-router'
//import Meta from 'vue-meta'
import App from './App.vue'
import { apiHost } from './config.js'
import axios from 'axios'

// Configuration
const axiosConfig = {
  baseURL: apiHost,
  timeout: 30000
};

Vue.prototype.$http = axios.create(axiosConfig)

// Modules
Vue.use(Router)
//Vue.use(Meta)

new Vue({
  el: '#app',
  render: h => h(App)
})
