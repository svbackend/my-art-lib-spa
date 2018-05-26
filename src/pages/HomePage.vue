<template>
  <section>
    <!-- Movies -->
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
          <a v-if="!movie.isWatched" class="link" @click.once="addToLibrary(movie.id, $event)">Add to library</a>
          <a v-else class="link">Added</a>
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
        event.target.text = '...';

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
