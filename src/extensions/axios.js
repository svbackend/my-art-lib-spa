import axios from 'axios'
import store from './storage'
import { apiHost } from './../config.js'

let axiosConfig = {
  baseURL: apiHost,
  timeout: 3000,
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

export default axios.create(axiosConfig);