<template lang="html">
  <div class="movies columns is-multiline">
    <div class="movie column is-4" v-for="movie in movies">
      <div class="title">
        <router-link
            active-class="is-active"
            class="link"
            :to="{ name: 'movie', params: { id: movie.id } }">
          {{ movie.title }}
        </router-link>
      </div>
      <div class="poster">
        <img :src="movie.posterUrl ? movie.posterUrl : movie.originalPosterUrl" :alt="movie.title"/>
      </div>
      <div class="actions">
        <a v-if="!movie.isWatched" class="link" @click.once="addToLibrary(movie.id, $event)" v-t="'movie.addToWatchedMovies'"></a>
        <a v-else class="link" v-t="'movie.addedToWatchedMovies'"></a>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['username'],
    data() {
      return {
        user: {},
        movies: {},
      }
    },
    methods: {
      getUserWatchedMovies(id) {
        let endpoint = '/users/{id}/watchedMovies'
        this.$http.get(endpoint.replace('{id}', id))
          .then(response => {
            this.movies = response.data.data
            console.log(response)
          })
          .catch( error => {
            console.log('-----error-------');
            console.log(error)
            this.$router.push('/404');
          })
      }
    },
    created() {
      // todo if username !== current user username then load use by it
      this.getUserWatchedMovies(this.$store.state.user.id);
    },
    watch: {
      '$route'() {
        this.getUserWatchedMovies(this.username);
      }
    }
  }
</script>

<style lang="scss" scoped>
  .movie {
    position: relative;
    max-width: 500px;
    margin: 0 auto;
    padding: 50px 20px 70px;
    &__title {
      position: relative;
      text-transform: uppercase;
      z-index: 1;
    }
    &__body {
      position: relative;
      z-index: 1;
    }
    &__id {
      position: absolute;
      font-size: 280px;
      bottom: -50px;
      margin: 0;
      color: #eeeeee;
      right: -20px;
      line-height: 1;
      font-weight: 900;
      z-index: 0;
    }
  }
</style>
