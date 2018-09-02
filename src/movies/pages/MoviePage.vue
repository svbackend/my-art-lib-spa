<template lang="html">
  <div class="movie" v-if="movie.originalTitle">
    <div class="columns">
      <div class="movie-left column is-4">
        <img :src="posterUrl(movie.posterUrl ? movie.posterUrl : movie.originalPosterUrl, 420, 620)" :alt="movie.title">
        <div class="action-buttons" v-if="$store.state.isUserLoggedIn === true">
          <a v-if="movie.isWatched === false" @click="addToLibrary" class="button is-success">
            <i class="fa fa-plus"></i>&nbsp;{{ $t('movie.addToWatchedMovies') }}
          </a>
          <a v-else @click="removeFromLibrary" class="button is-danger">
            <i class="fa fa-times"></i>&nbsp;{{ $t('movie.removeFromWatchedMovies') }}
          </a>
          <router-link
              v-if="$store.state.user.roles.indexOf('ROLE_ADMIN') !== -1"
              class="button is-primary"
              :to="{ name: 'movie.edit', params: { id: movie.id } }">
            {{ $t('common.edit') }}
          </router-link>
        </div>
      </div>
      <div class="movie-right column">
        <h1 class="title">{{ movie.title }} ({{ movie.releaseDate | year }})</h1>
        <h2 class="subtitle" v-if="movie.title !== movie.originalTitle">{{ movie.originalTitle }}</h2>
        <div class="tags">
      <span class="tag is-dark" v-for="genre in movie.genres">
        {{ genre.name }}
      </span>
        </div>
        <p class="movie__body">{{ movie.overview }}</p>
      </div>
    </div>
    <div class="movie-full">
      <h2 class="title">{{ $t('movie.recommendations') }}</h2>
      <h3 v-if="$store.state.isUserLoggedIn === true" class="subtitle">{{ $t('movie.recommendations_description') }}</h3>
      <div v-if="$store.state.isUserLoggedIn === true" class="movie-recommendations-search">
        <div class="field has-addons">
          <div class="control has-icons-left is-large is-clearfix is-expanded">
            <input v-model="searchQuery"
                   type="search"
                   :placeholder="$t('common.search') + '...'"
                   class="input is-large is-fullwidth"
                   :class="{'search-field-withResults':(searchShowResults === true && searchResults.length > 0)}">

            <div v-if="searchShowResults" class="search-results columns is-gapless is-multiline">
              <div v-if="!searchResults.length" class="search-results-empty">
                {{ $t('common.searchNoResults', { 'query': searchQuery }) }}
              </div>
              <div v-else v-for="foundedMovie in searchResults" class="search-results__movie column is-12">
                <div class="box search-results__movieBox">

                  <a v-if="foundedMovie.userRecommendedMovie === null" @click="addRecommendation(foundedMovie)" :title="$t('movie.addRecommendation')">
                    <i class="fa fa-thumbs-up has-text-success"></i>
                  </a>
                  <a v-else @click="removeRecommendation(foundedMovie, $event)" :title="$t('movie.removeRecommendation')">
                    <i class="fa fa-thumbs-down has-text-danger"></i>
                  </a>

                  <span v-if="foundedMovie.id !== null">
                    <router-link
                        active-class="is-active"
                        class="link"
                        :to="{ name: 'movie', params: { id: foundedMovie.id } }">
                      {{ foundedMovie.title }} ({{ foundedMovie.releaseDate | year }})
                    </router-link>
                  </span>
                  <span v-else>
                    {{ foundedMovie.title }} ({{ foundedMovie.releaseDate | year }})
                  </span>
                </div>
              </div>
            </div>

            <span class="icon is-left"><i class="fa fa-search fa-lg"></i></span>
          </div>
          <p class="control">
            <button @click="findMovies()" class="button homepage-search-btn is-large">{{ $t('common.search') }}</button>
          </p>
        </div>
      </div>

      <div v-if="recommendations.length === 0" class="movie-recommendations-loading">
        <hr>
        <i class="fa fa-spinner fa-spin"></i>
        {{ $t('movie.recommendations_loading') }}
        <span v-if="timeToWait">({{ timeToWait }} secs)</span>
        <hr>
      </div>

      <div class="movie-recommendations columns is-multiline is-flex">
        <div class="column-movie column is-fullheight is-3-tablet is-3-desktop is-half-mobile" v-for="(recommendedMovie, index) in recommendations">
          <div class="movie">
            <div class="poster">
              <img :src="posterUrl(recommendedMovie.posterUrl ? recommendedMovie.posterUrl : recommendedMovie.originalPosterUrl, 260, 380)" :alt="recommendedMovie.title"/>
              <div v-if="$store.state.isUserLoggedIn === true" class="actions right">
                <a v-if="recommendedMovie.userRecommendedMovie === null" @click="addRecommendation(recommendedMovie)" class="addRecommendation button is-success is-small">{{ $t('movie.addRecommendation') }}
                  &nbsp;
                  <span class="icon is-medium"><i class="fa fa-thumbs-up"></i></span>
                </a>
                <a v-else @click="removeRecommendation(recommendedMovie)" class="removeRecommendation button is-danger is-small">{{ $t('movie.removeRecommendation') }}
                  &nbsp;
                  <span class="icon is-medium"><i class="fa fa-thumbs-down"></i></span>
                </a>
              </div>

            </div>
            <div class="information">
              <div class="title">
                <router-link
                    active-class="is-active"
                    class="link"
                    :to="{ name: 'movie', params: { id: recommendedMovie.id } }">
                  {{ recommendedMovie.title }} ({{ recommendedMovie.releaseDate | year }})
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <h2 class="title">{{ $t('movie.actors') }}</h2>
      <div class="movie-actors columns is-multiline is-flex">
        <div class="column-actor column is-fullheight is-3-tablet is-3-desktop is-half-mobile" v-for="actor in movie.actors.slice(0, 4)">
          <div class="actor">
            <div class="poster">
              <img :src="posterUrl(actor.photo, 260, 380)" :alt="actor.name"/>
            </div>
            <div class="information">
              <div class="title">
                <router-link
                    active-class="is-active"
                    class="link"
                    :to="{ name: 'actor', params: { id: actor.id } }">
                  {{ actor.name }}
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import {getImageUrl, addRecommendation, removeRecommendation, addToLibrary, removeFromLibrary} from "@/movies/helpers";
  import Movie from '@/movies/components/movie'

  export default {
    props: ['id'],
    components: {Movie},
    data() {
      return {
        movie: {},
        actors: [],
        recommendations: [],
        searchQuery: '',
        searchResults: [],
        searchShowResults: false,
        endpoint: '/movies/',
        timeToWait: 0,
        timeToWaitHandler: null,
        loadRecommendationsHandler: null,
      }
    },
    methods: {
      getMovie(id) {
        this.movie = {};
        this.actors = [];
        this.$http.get(this.endpoint + id)
          .then(response => {
            this.movie = response.data
            this.actors = this.movie.actors.reverse()
          })
          .catch(error => {
            this.$router.push('/404');
          })
      },
      getRecommendations(id, timeout = 10000) {
        this.recommendations = [];
        this.$http.get(this.endpoint + id + '/recommendations')
          .then(response => {
            if (response.data.length === 0) {
              this.timeToWait = timeout / 1000
              this.timeToWaitHandler = setInterval(() => {
                this.timeToWait -= 1;
                if (this.timeToWait === 0) {
                  this.timeToWaitHandler = null;
                }
              }, 1000)

              this.loadRecommendationsHandler = null
              this.loadRecommendationsHandler = setTimeout(() => {
                this.getRecommendations(id, (timeout/2))
              }, timeout);
            } else {
              this.timeToWait = 0
              this.recommendations = response.data.slice(0, 4)
            }
          })
          .catch(error => {
            this.$router.push('/404');
          })
      },
      posterUrl(imageUrl, width = null, height = null) {
        return getImageUrl(imageUrl, width, height);
      },
      loadData(id) {
        this.getMovie(id);
        this.getRecommendations(id);
      },
      addRecommendation(recommendedMovie) {
        addRecommendation(this.movie, recommendedMovie)

        for (let recommendation of this.recommendations) {
          if (recommendation.tmdb.id === recommendedMovie.tmdb.id) {
            return;
          }
        }

        this.recommendations.splice(-1, 1);
        this.recommendations.unshift(recommendedMovie);
      },
      removeRecommendation(recommendedMovie) {
        removeRecommendation(this.movie, recommendedMovie)
      },
      findMovies() {
        this.$http.post('/movies/' + this.id + '/recommendations/search', {
          query: this.searchQuery,
        })
          .then(response => {
            this.searchResults = response.data.data;
            this.searchShowResults = true;
          })
          .catch(error => {

          })
      },
      addToLibrary() { return addToLibrary(this.movie); },
      removeFromLibrary() { return removeFromLibrary(this.movie); }
    },

    created() {
      this.loadData(this.id)
    },
    watch: {
      '$route'() {
        this.loadData(this.id)
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
