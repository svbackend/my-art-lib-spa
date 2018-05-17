<template>
  <section>
    <div class="search-field">
      <section class="hero is-dark">
        <div class="hero-body">
          <div class="container">
            <h1 class="title">
              My Art Lib
            </h1>
            <h2 class="subtitle">
              Collect your own library of watched movies
            </h2>
          </div>
        </div>
      </section>
      <div class="field has-addons">
        <div class="control has-icons-left is-large is-clearfix is-expanded">
          <input v-model="searchQuery"
                 @keyup="setSearchQuery"
                 type="search"
                 placeholder="Search..."
                 class="input is-large is-fullwidth"
                 v-bind:class="{'search-field-withResults':(searchShowResults === true && searchResults.length > 0)}">

          <div v-if="searchShowResults" class="search-results columns is-gapless is-multiline">
            <div v-if="!searchResults.length" class="search-results-empty">
              Looks like we have'nt found any movies by your query "{{ searchQuery }}"
            </div>
            <div v-else v-for="movie in searchResults" class="search-results__movie column is-12">
              <div class="box search-results__movieBox">
                <i class="fa fa-plus"></i>
                {{ movie.title }}
              </div>
            </div>
          </div>

          <span class="icon is-left"><i class="fa fa-search fa-lg"></i></span>
        </div>
        <p class="control">
          <button @click="findMovies()" class="button is-primary is-large">Search</button>
        </p>
      </div>
    </div>

    <!-- Movies -->
    <div class="movies columns">
      <div class="movie column" v-for="movie in movies">
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
        <div v-if="isUserLoggedIn" class="actions">
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
        searchQuery: '',
        searchShowResults: false,
        searchResults: [],
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
      },
      findMovies() {
        this.$http.post('/movies/search', {
          query: this.searchQuery
        })
          .then(response => {
            this.searchResults = response.data;
            this.searchShowResults = true;
          })
          .catch(error => {
            console.log('-----error-------');
            console.log(error);
          })
      },
      setSearchQuery(e) {
        if (this.searchQuery.length > 1) {
          return this.findMovies();
        }
        this.searchShowResults = false;
      },
    }
  }
</script>

<style lang="scss">

</style>
