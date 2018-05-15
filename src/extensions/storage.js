import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex);

export default new Vuex.Store({
    strict: true,
    plugins: [
        createPersistedState()
    ],
    state: {
        isUserLoggedIn: false,
        guest: {
            id: 0,
            token: null,
        },
        user: {
            id: 0,
            username: null,
            email: null,
            apiToken: null,
        }
    },
    mutations: {
        setApiToken(state, apiToken) {
          state.user.apiToken = apiToken;
          state.isUserLoggedIn = !!(apiToken);
        },
        setGuest(state, guestSession) {
          state.guest.id = guestSession.id;
          state.guest.token = guestSession.token;
        },
        setUser(state, user) {
          state.user.id = user.id;
          state.user.username = user.username;
          state.user.email = user.email;
        },
        logout(state) {
          state.user.apiToken = null;
          state.isUserLoggedIn = false;
          if (!state.guest.token) {
            // todo refresh guest session
          }
        },
    },
    actions: {
        setApiToken({commit}, apiToken) {
          commit('setApiToken', apiToken);
        },
        setGuest({commit}, guestSession) {
          commit('setGuest', guestSession);
        },
        setUser({commit}, user) {
          commit('setUser', user);
        },
        logout({commit}) {
          commit('logout');
        }
    }
});