import Vue from 'vue'
import Router from 'vue-router'
import App from './App.vue'
import axios from 'axios'
import { apiHost } from './config.js'
import { sync } from 'vuex-router-sync'
import store from './storage/storage'
import VeeValidate from 'vee-validate';

// Components
import HomePage from './components/HomePage.vue'
import NotFoundPage from './components/NotFoundPage.vue'
import MoviePage from './components/MoviePage.vue'
import LoginPage from './components/LoginPage.vue'

// Configuration
const axiosConfig = {
  baseURL: apiHost,
  timeout: 3000,
  headers: {
    'Content-Type': 'application/json',
  }
};

if (store.state.user.apiToken) {
  axiosConfig.params = {
    api_token: store.state.user.apiToken
  };
}

Vue.prototype.$http = axios.create(axiosConfig);

// Modules
Vue.use(Router);
Vue.use(VeeValidate);

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
      path: '/login',
      name: 'login',
      component: LoginPage,
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

sync(store, router);

new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store
});
