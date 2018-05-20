<template>
  <section class="search-field is-centered is-center">

    <div class="container has-text-centered">
      <h1 class="title">
        My Art Lib
      </h1>
      <h2 class="subtitle">
        Collect your own library of watched movies
      </h2>
    </div>

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
  </section>
</template>

<script>
  export default {
    name: "search",
    data() {
      return {
        searchQuery: '',
        searchShowResults: false,
        searchResults: [],
      }
    },
    methods: {
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
            this.searchResults = response.data.data;
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

<style scoped>

</style>