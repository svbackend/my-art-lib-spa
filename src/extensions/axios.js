import axios from 'axios'
import store from './storage'
import { apiHost } from './../config.js'
import VueInstance from '@/main'
import router from '@/extensions/router'

let axiosConfig = {
  baseURL: apiHost + '/api',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  }
};

if (store.state.guest.token !== null) {
  axiosConfig.params = {
    guest_api_token: store.state.guest.token
  };
}

if (store.state.user.apiToken !== null) {
  axiosConfig.params = {
    api_token: store.state.user.apiToken
  };
}

let axiosInstance = axios.create(axiosConfig);

axiosInstance.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  if (401 === error.response.status && router.currentRoute.name !== 'login') {
    // user need to re-login so we need to clear api token and redirect him to Sign In page
    VueInstance.$store.dispatch('setApiToken', null)
    // todo redirect instead of alert
    alert('You need to Sign In again')
  }

  return Promise.reject(error);
});

export default axiosInstance;