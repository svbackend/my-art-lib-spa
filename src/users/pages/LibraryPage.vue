<template lang="html">
  <section class="wrapper">
    <div class="movies columns is-multiline">
      <div class="column-movie column is-3-tablet is-2-desktop is-half-mobile" v-for="movie in movies">
        <div class="movie">
          <div class="poster">
            <img :src="movie.posterUrl ? movie.posterUrl : movie.originalPosterUrl" :alt="movie.title"/>
            <div class="actions buttons">
              <a v-if="!movie.isWatched" class="button is-success is-small"
                 @click.once="addToLibrary(movie.id, $event)">
                <span class="icon is-medium"><i class="fa fa-plus"></i></span>
              </a>
              <a v-else class="button is-danger is-small">
                <span class="icon is-medium"><i class="fa fa-times"></i></span>
              </a>
            </div>
          </div>
          <div class="information">
            <div class="title">
              <router-link
                  active-class="is-active"
                  class="link"
                  :to="{ name: 'movie', params: { id: movie.id } }">
                {{ movie.title }}
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
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
          .catch(error => {
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

<style lang="scss">

</style>
