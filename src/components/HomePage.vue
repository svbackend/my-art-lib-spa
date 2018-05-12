<template>
  <div class="movies">
    <h4>Movies</h4>
    <div v-for="movie in movies">
      <div class="movie">
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
            <a class="link" @click.once="addToLibrary(movie.id, $event)">Add to library</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        movies: [],
        endpoint: '/movies',
      }
    },
    created() {
      this.getAllMovies();
    },
    methods: {
      getAllMovies() {
        this.$http.get(this.endpoint)
          .then(response => {
            this.movies = response.data;
          })
          .catch(error => {
            console.log('-----error-------');
            console.log(error);
          })
      },
      addToLibrary(movieId, event) {
        event.target.text = '...';

        let endpoint = '/guests/{token}/watchedMovies';

        if (this.$store.state.isUserLoggedIn === true) {
          endpoint = '/users/watchedMovies';
        }

        endpoint = endpoint.replace('{token}', this.$store.state.guest.token);

        this.$http.post(endpoint, {movie: {
          id: movieId,
          tmdbId: null,
          vote: null,
          watchedAt: null,
        }})
          .then(response => {
            event.target.text = 'Added';
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
