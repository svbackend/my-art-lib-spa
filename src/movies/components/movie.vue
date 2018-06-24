<template>
  <div class="movie">
    <div class="poster">
      <img :src="movie.posterUrl ? movie.posterUrl : movie.originalPosterUrl" :alt="movie.title"/>
      <div class="actions buttons">
        <a v-if="!movie.isWatched" class="addToLibrary button is-success is-small"
           @click="addToLibrary(movie, $event)">Add to library
          &nbsp;
          <span class="icon is-medium"><i class="fa fa-plus"></i></span>
        </a>
        <a v-else class="removeFromLibrary button is-danger is-small"
           @click="removeFromLibrary(movie, $event)">Remove from library
          &nbsp;
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
</template>

<script>
  export default {
    name: "movie",
    props: {
      movie: {
        type: Object
      }
    },
    data() {
      return {}
    },
    methods: {
      addToLibrary(movie, event) {
        let movieId = movie.id
        // Todo move to movie component but learn more about events before
        let oldInnerHtml = event.target.innerHTML
        //event.target.innerHTML = '<span class="icon is-medium"><i class="fa fa-spin fa-spinner"></i></span>'

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
            movie.isWatched = true
          })
          .catch(error => {

          })
          .finally(() => {
            //event.target.innerHTML = oldInnerHtml
          })
      },
      removeFromLibrary(movie, event) {
        console.log(movie)
        let movieId = movie.id

        if (movie.userWatchedMovie && typeof movie.userWatchedMovie.id !== 'undefined') {
          movieId = movie.userWatchedMovie.id;
        }

        let endpoint = '';

        if (this.$store.state.isUserLoggedIn === true) {
          endpoint = '/users/{user}/watchedMovies/{movie}';
          endpoint = endpoint.replace('{user}', this.$store.state.user.id);
        } else {
          endpoint = '/guests/{token}/watchedMovies/{movie}';
          endpoint = endpoint.replace('{token}', this.$store.state.guest.token);
        }
        endpoint = endpoint.replace('{movie}', movieId);

        this.$http.delete(endpoint)
          .then(response => {
            movie.isWatched = false
          })
          .catch(error => {
            console.log('-----error-------');
            console.log(error);
          })
      }
    }
  }
</script>

<style scoped>

</style>