import Vue from 'vue'
import Router from 'vue-router'
//import Meta from 'vue-meta'
import App from './App.vue'
import axios from 'axios'
import VueLocalStorage from 'vue-localstorage'
import { apiHost } from './config.js'

// Components
import HomePage from './components/HomePage.vue'
import NotFoundPage from './components/NotFoundPage.vue'
import MoviePage from './components/MoviePage.vue'

// Configuration
const axiosConfig = {
  baseURL: apiHost,
  timeout: 30000
};

Vue.prototype.$http = axios.create(axiosConfig);

// Modules
Vue.use(Router);
Vue.use(VueLocalStorage);
//Vue.use(Meta)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
    },
    {
      path: '/404',
      name: '404',
      component: NotFoundPage,
    },
    {
      path: '/movie/:id',
      name: 'movie',
      component: MoviePage,
      props: true,
    },
  ],
  mode: 'history'
});

new Vue({
  el: '#app',
  render: h => h(App),
  router,
  localStorage: {
    guest: {
      type: Object,
      default: {
        id: 0,
        token1: null
      }
    },
    user: {
      type: Object,
      default: {
        apiToken2: null
      }
    }
  }
});
