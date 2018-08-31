import Router from 'vue-router'

import HomePage from './../pages/HomePage.vue'
import NotFoundPage from './../pages/NotFoundPage.vue'
import MoviePage from './../movies/pages/MoviePage.vue'
import ActorPage from './../actors/pages/ActorPage.vue'
import EditMoviePage from './../movies/pages/EditMoviePage.vue'
import LoginPage from './../users/pages/LoginPage.vue'
import LibraryPage from './../users/pages/LibraryPage.vue'
import RecommendationsPage from './../users/pages/RecommendationsPage.vue'
import ProfilePage from './../users/pages/ProfilePage.vue'
import RegistrationPage from './../users/pages/RegistrationPage.vue'

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
      meta: {
        layout: 'home'
      },
      props: (route) => ({
        page: route.query.page ? Number(route.query.page) : 1
      })
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
    {
      path: '/movie/:id/edit',
      name: 'movie.edit',
      component: EditMoviePage,
      props: true,
    },
    {
      path: '/actor/:id',
      name: 'actor',
      component: ActorPage,
      props: true,
    },
    {
      path: '/u/:username',
      name: 'library',
      component: LibraryPage,
      props: true,
    },
    {
      path: '/u/:username/profile',
      name: 'profile',
      component: ProfilePage,
      props: true,
    },
    {
      path: '/u/:username/recommendations',
      name: 'recommendations',
      component: RecommendationsPage,
      props: true,
    },
  ],
  mode: 'history'
});