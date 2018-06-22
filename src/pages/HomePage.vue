<template>
  <section class="wrapper">
    <!-- Movies -->
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
    data() {
      return {
        movies: [],
        endpoint: '/movies',
        isUserLoggedIn: false,
      }
    },
    created() {
      this.getAllMovies();
      this.isUserLoggedIn = this.$store.state.isUserLoggedIn;
    },
    methods: {
      getAllMovies() {
        this.$http.get(this.endpoint)
          .then(response => {
            this.movies = response.data.data;
          })
          .catch(error => {
            console.log('-----error-------');
            console.log(error);
          })
      },
      addToLibrary(movieId, event) {
        // Todo move to movie component but learn more about events before
        event.target.innerHTML = '<span class="icon is-medium"><i class="fa fa-spin fa-spinner"></i></span>';

        let endpoint = '';

        if (this.$store.state.isUserLoggedIn === true) {
          endpoint = '/users/watchedMovies';
        } else {
          endpoint = '/guests/{token}/watchedMovies';
          endpoint = endpoint.replace('{token}', this.$store.state.guest.token);
        }

        this.$http.post(endpoint, {
          movie: {
            id: movieId,
            tmdbId: null,
            vote: null,
            watchedAt: null,
          }
        })
          .then(response => {
            event.target.innerHTML = '<span class="icon is-medium"><i class="fa fa-times"></i></span>';
          })
          .catch(error => {
            console.log('-----error-------');
            console.log(error);
          })
      }
    }
  }
</script>

<style lang="scss">

</style>
