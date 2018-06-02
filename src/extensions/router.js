import Router from 'vue-router'

import HomePage from './../pages/HomePage.vue'
import NotFoundPage from './../pages/NotFoundPage.vue'
import MoviePage from './../movies/pages/MoviePage.vue'
import LoginPage from './../users/pages/LoginPage.vue'
import RegistrationPage from './../users/pages/RegistrationPage.vue'

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
      meta: {
        layout: 'home'
      }
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
      path: '/registration',
      name: 'registration',
      component: RegistrationPage,
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