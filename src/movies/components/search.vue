<template>
  <section class="search-field is-centered is-center">

    <div class="container has-text-centered">
      <h1 class="title">
        {{ $t('app.name') }}
      </h1>
      <h2 class="subtitle">
        {{ $t('app.shortDescription') }}
      </h2>
    </div>

    <div class="field has-addons">
      <div class="control has-icons-left is-large is-clearfix is-expanded">
        <input v-model="searchQuery"
               type="search"
               :placeholder="$t('common.search') + '...'"
               class="input is-large is-fullwidth"
               v-bind:class="{'search-field-withResults':(searchShowResults === true && searchResults.length > 0)}">

        <div v-if="searchShowResults" class="search-results columns is-gapless is-multiline">
          <div v-if="!searchResults.length" class="search-results-empty">
            {{ $t('common.searchNoResults', { 'query': searchQuery }) }}
          </div>
          <div v-else v-for="movie in searchResults" class="search-results__movie column is-12">
            <div class="box search-results__movieBox">

              <div v-if="$store.state.isUserLoggedIn === true" class="actions-buttons">
                <a v-if="!movie.isWatched" @click="addToLibrary(movie, $event)" :title="$t('movie.addToWatchedMovies')">
                  <i class="fa fa-plus has-text-success"></i>
                </a>
                <a v-else @click="removeFromLibrary(movie, $event)" :title="$t('movie.removeFromWatchedMovies')">
                  <i class="fa fa-times has-text-danger"></i>
                </a>
              </div>

              <router-link
                  active-class="is-active"
                  class="link"
                  :to="{ name: 'movie', params: { id: movie.id } }">
                {{ movie.title }} ({{ movie.releaseDate | year }})
              </router-link>
            </div>
          </div>
        </div>

        <span class="icon is-left"><i class="fa fa-search fa-lg"></i></span>
      </div>
      <p class="control">
        <button @click="findMovies()" class="button homepage-search-btn is-large">{{ $t('common.search') }}</button>
      </p>
    </div>
  </section>
</template>

<script>
  import {addToLibrary, removeFromLibrary} from '@/movies/helpers/index'
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
      addToLibrary(movie, e) { return addToLibrary(movie, e) },
      removeFromLibrary(movie, e) { return removeFromLibrary(movie, e) },
    }
  }
</script>

<style scoped>

</style>