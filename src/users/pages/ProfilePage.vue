<template lang="html">
  <div class="movie" v-if="user.profile">
    <div class="columns">
      <div class="movie-left column is-2">
        <img src="//placehold.it/256x256" class="is-rounded">
        <div class="action-buttons">
          <router-link class="button is-primary" :to="{ name: 'profile.edit', params: {username: user.username} }" v-t="'common.edit'"></router-link>
        </div>
      </div>
      <div class="movie-right column">
        <h1 class="title">{{ profile.first_name }} {{ profile.last_name }}</h1>
        <h2 class="subtitle">{{ user.username }} ({{ profile.public_email }})</h2>
        <p class="movie__body">{{ profile.about }}</p>
      </div>
    </div>
    <div class="movie-full">
      <h2 class="title">{{ $t('profilePage.watchedMovies') }}</h2>
      <h3 class="subtitle">
        <router-link :to="{ name: 'library', params: {username: user.username} }" v-t="'common.more'"></router-link>
      </h3>
      <movies-list :movies="watchedMovies"></movies-list>

      <h2 class="title">{{ $t('profilePage.recommendations') }}</h2>
      <h3 class="subtitle">
        <router-link :to="{ name: 'recommendations', params: {username: user.username} }" v-t="'common.more'"></router-link>
      </h3>
      <movies-list :movies="recommendations"></movies-list>
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
        recommendations: [],
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
          })
          .catch(error => {
            this.$router.push('/404');
          })
      },
      getUserRecommendations(id) {
        this.$http.get('/users/' + id + '/recommendations?limit=4')
          .then(response => {
            this.recommendations = response.data.data
          })
          .catch(error => {
            this.$router.push('/404');
          })
      },
      loadData(username) {
        this.getUser(username);
      },
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
  @import "~bulma";

  .movie {
    position: relative;
    margin: 0 auto;
    padding: 50px 20px 20px;
    h1.movie__title {
      font-size: 140%;
    }
    &__body {
      position: relative;
      z-index: 1;
    }
  }
</style>
