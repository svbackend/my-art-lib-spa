import Vue from 'vue'
import VueInstance from '@/main'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import {mergeGuestMovies} from '@/movies/helpers/index'

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  plugins: [
    createPersistedState()
  ],
  state: {
    isUserLoggedIn: false,
    locale: null,
    guest: {
      id: 0,
      token: null,
    },
    user: {
      id: 0,
      username: null,
      email: null,
      apiToken: null,
      roles: [],
      country_code: null,
    },
    filters: {
      yf: (new Date()).getFullYear() - 5,
      yt: null,
      rf: 7,
      rt: null,
      g: [5, 7, 17],
      gt: 'AND',
      a: [],
      at: 'AND',
      selectedActors: [],
    },
  },
  mutations: {
    setFilters(state, filters) {
      state.filters = filters
    },
    setApiToken(state, apiToken) {
      state.user.apiToken = apiToken;
      state.isUserLoggedIn = apiToken ? true : false;

      if (state.isUserLoggedIn) {
        delete VueInstance.$http.defaults.params.guest_api_token;
        VueInstance.$http.defaults.params.api_token = apiToken;
        mergeGuestMovies();
      } else {
        delete VueInstance.$http.defaults.params.api_token;
        // todo reload VueInstance.$http.defaults.params.guest_api_token
      }

    },
    setGuest(state, guestSession) {
      state.guest.id = guestSession.id;
      state.guest.token = guestSession.token;
    },
    setUser(state, user) {
      state.user.id = user.id;
      state.user.username = user.username;
      state.user.email = user.email;
      state.user.roles = user.roles ? user.roles : [];
      state.user.country_code = user.profile.country_code;
    },
    setLocale(state, locale) {
      state.locale = locale;
      VueInstance.$http.defaults.params.language = locale;
      if (locale === null) {
        delete VueInstance.$http.defaults.params.language;
      }
    },
    logout(state) {
      state.user.apiToken = null;
      state.user.id = 0;
      state.user.username = null;
      state.user.country_code = null;

      state.guest.token = null;
      state.guest.id = 0;

      state.isUserLoggedIn = false;
    },
  },
  actions: {
    setFilters({commit}, filters) {
      commit('setFilters', filters);
    },
    setApiToken({commit}, apiToken) {
      commit('setApiToken', apiToken);
    },
    setGuest({commit}, guestSession) {
      commit('setGuest', guestSession);
    },
    setUser({commit}, user) {
      commit('setUser', user);
    },
    setLocale({commit}, locale) {
      commit('setLocale', locale);
    },
    logout({commit}) {
      commit('logout');
    }
  }
});
