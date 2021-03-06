<template lang="html">
  <div class="movie" v-if="user.profile">
    <div class="columns">
      <div class="movie-left column is-2">
        <img src="/src/assets/user/default.png" class="is-rounded" alt="Default profile photo">
      </div>
      <div class="movie-right column">
        <h1 class="title">{{ profile.first_name }} {{ profile.last_name }}</h1>
        <h2 class="subtitle">{{ user.username }} {{ profile.public_email ? '(' + profile.public_email + ')' : '' }}</h2>
        <p class="movie__body">
          <template v-if="profile.about">
            {{ profile.about }}
          </template>
          <template v-else>
            <span class="has-text-danger">{{ $t('profilePage.emptyAbout', {username: username}) }}</span>
          </template>
        </p>
        <div class="action-buttons hero-buttons is-pulled-left" v-if="$store.state.isUserLoggedIn">
          <router-link v-if="$store.state.user.id === user.id" class="button is-primary" :to="{ name: 'profile.edit', params: {username: user.username} }" v-t="'common.edit'"></router-link>
          <router-link v-if="isModerator()" class="button is-primary" :to="{ name: 'empty.movies' }" v-t="'common.translations'"></router-link>
          <a v-if="isAdmin()" class="button is-primary" @click="switchModer">Switch role ({{ user.roles.toString() }})</a>
        </div>
      </div>
    </div>
    <div class="movie-full">
      <h2 class="title">{{ $t('profilePage.watchedMovies') }}</h2>
      <h3 class="subtitle" v-if="watchedMoviesTotal > 4">
        <router-link :to="{ name: 'library', params: {username: user.username} }" v-t="'common.more'"></router-link>
      </h3>
      <div class="notification is-warning" v-if="watchedMoviesTotal === 0">
        {{ $t('userLibraryPage.empty') }}
      </div>
      <movies-list :movies="watchedMovies"></movies-list>

      <h2 class="title">{{ $t('profilePage.recommendations') }}</h2>
      <h3 class="subtitle" v-if="recommendationsTotal > 4">
        <router-link :to="{ name: 'recommendations', params: {username: user.username} }" v-t="'common.more'"></router-link>
      </h3>
      <div class="notification is-warning" v-if="recommendationsTotal === 0">
        {{ $t('userRecommendationsPage.empty') }}
      </div>
      <movies-list :movies="recommendations"></movies-list>

      <h2 class="title">{{ $t('profilePage.wishlist') }}</h2>
      <h3 class="subtitle" v-if="wishlistTotal > 4">
        <router-link :to="{ name: 'wishlist', params: {username: user.username} }" v-t="'common.more'"></router-link>
      </h3>
      <div class="notification is-warning" v-if="wishlistTotal === 0">
        {{ $t('userWishlistPage.empty') }}
      </div>
      <movies-list :movies="wishlist"></movies-list>
    </div>
  </div>
</template>

<script>
  import moviesList from '@/movies/components/moviesList'

  export default {
    props: ['username'],
    components: {moviesList},
    metaInfo() { return { title: this.title } },
    data() {
      return {
        title: 'Profile',
        user: {},
        profile: {},
        watchedMovies: [],
        watchedMoviesTotal: 0,
        recommendations: [],
        recommendationsTotal: 0,
        wishlist: [],
        wishlistTotal: 0,
      }
    },
    methods: {
      getUser(username) {
        this.$http.get('/users/byUsername/' + username)
          .then(response => {
            this.user = response.data
            this.profile = this.user.profile
            this.getUserWatchedMovies(this.user.id)
            this.getUserRecommendations(this.user.id)
            this.getWishlist(this.user.id)
            this.title = this.$t('users.profile', { username: this.user.username })
          })
          .catch(error => {
            this.$router.push('/404');
          })
      },
      getUserWatchedMovies(id) {
        this.$http.get('/users/' + id + '/watchedMovies?limit=4')
          .then(response => {
            this.watchedMovies = response.data.data
            this.watchedMoviesTotal = response.data.paging.total
          })
          .catch(error => {
            //this.$router.push('/404');
          })
      },
      getUserRecommendations(id) {
        this.$http.get('/users/' + id + '/recommendations?limit=4')
          .then(response => {
            this.recommendations = response.data.data
            this.recommendationsTotal = response.data.paging.total
          })
          .catch(error => {
            //this.$router.push('/404');
          })
      },
      getWishlist(id) {
        this.$http.get('/users/' + id + '/interestedMovies?limit=4')
          .then(response => {
            this.wishlist = response.data.data
            this.wishlistTotal = response.data.paging.total
          })
          .catch(error => {
            //this.$router.push('/404');
          })
      },
      switchModer() {
        if (this.user.roles.indexOf('ROLE_MODER') === -1) {
          this.user.roles.push('ROLE_MODER')
        } else {
          this.user.roles = ['ROLE_USER']
        }
        this.$http.post('/users/' + this.user.id + '/roles', {roles: this.user.roles})
          .then(response => {

          })
          .catch(error => {
            alert(error)
            //this.$router.push('/404');
          })
      },
      loadData(username) {
        this.getUser(username);
      },
      isModerator() {
        return this.$store.state.user.roles.indexOf('ROLE_ADMIN') !== -1 || this.$store.state.user.roles.indexOf('ROLE_MODER') !== -1
      },
      isAdmin() {
        return this.$store.state.user.roles.indexOf('ROLE_ADMIN') !== -1
      }
    },
    created() {
      this.loadData(this.username)
    },
    watch: {
      '$route'() {
        this.loadData(this.username)
      }
    }
  }
</script>

<style lang="scss">

</style>
