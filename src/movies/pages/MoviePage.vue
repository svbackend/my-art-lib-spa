<template lang="html">
  <section class="section-movie-page">
    <div class="movie" v-if="movie.originalTitle">
      <div class="columns">
        <div class="movie-left column is-4">
          <img :src="posterUrl(movie.posterUrl ? movie.posterUrl : movie.originalPosterUrl, 420, 620)"
               :alt="movie.title">
          <div class="action-buttons">
            <p>
              <a v-if="$store.state.isUserLoggedIn === false || movie.isWatched === false" @click="addToLibrary" class="button is-success">
                <i class="fa fa-plus"></i>&nbsp;{{ $t('movie.addToWatchedMovies') }}
              </a>
              <a v-else-if="movie.isWatched === false" @click="removeFromLibrary" class="button is-danger">
                <i class="fa fa-times"></i>&nbsp;{{ $t('movie.removeFromWatchedMovies') }}
              </a>
              <a v-if="$store.state.isUserLoggedIn === true && movie.isWatched === true" @click="openModal" class="button">
                <template v-if="userVote">{{userVote}}&nbsp;</template>
                <i class="fa fa-star has-text-danger"></i>
              </a>
            </p>
            <p v-if="$store.state.isUserLoggedIn === false || movie.isWatched === false">
              <a v-if="$store.state.isUserLoggedIn === false || movie.userInterestedMovie === null" @click="addToInterested" class="button is-primary">
                <i class="fa fa-history"></i>&nbsp;{{ $t('movie.addToInterestedMovies') }}
              </a>
              <a v-else-if="movie.userInterestedMovie !== null" @click="removeFromInterested" class="button is-danger">
                <i class="fa fa-history"></i>&nbsp;{{ $t('movie.removeFromInterestedMovies') }}
              </a>
            </p>
            <p>
              <router-link
                v-if="isModerator()"
                class="button is-primary"
                :to="{ name: 'movie.edit', params: { id: movie.id } }">
                {{ $t('common.edit') }}
              </router-link>
              <a v-if="isAdmin()"
                 :href="'https://www.themoviedb.org/movie/' + movie.tmdb.id + '-title'"
                 class="button"
                 target="_blank">
                tmdb
              </a>
            </p>
          </div>
        </div>
        <div class="movie-right column">
          <h1 class="title">{{ movie.title }} ({{ movie.releaseDate | year }})</h1>
          <h2 class="subtitle" v-if="movie.title !== movie.originalTitle">{{ movie.originalTitle }}</h2>
          <div class="tags" v-if="releaseDate !== null">
            {{ $t('movie.releaseDate', {'country': releaseDate.country.name}) }}: {{ releaseDate.date | date }}
          </div>
          <div class="tags" v-else-if="movie.releaseDate">
            {{ $t('movie.releaseDate', {'country': 'USA'}) }}: {{ movie.releaseDate | date }}
          </div>
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
        <h3 class="subtitle" v-if="moviesRecommendationsTotal > 4">
          <router-link :to="{ name: 'movie.recommendations', params: {id: movie.id} }"
                       v-t="'common.more'"></router-link>
        </h3>
        <h3 v-if="$store.state.isUserLoggedIn === true" class="subtitle">{{ $t('movie.recommendations_description')
          }}</h3>
        <div v-if="$store.state.isUserLoggedIn === true" class="movie-recommendations-search search-field">
          <div class="field has-addons">
            <div class="control has-icons-left is-large is-clearfix is-expanded">
              <input v-model="searchQuery"
                     type="search"
                     :placeholder="$t('common.search') + '...'"
                     class="input search-field is-fullwidth"
                     :class="{'search-field-withResults':(searchShowResults === true && searchResults.length > 0)}">

              <div v-if="searchShowResults" class="search-results columns is-gapless is-multiline">
                <div v-if="!searchResults.length" class="search-results-empty">
                  {{ $t('common.searchNoResults', { 'query': searchQuery }) }}
                </div>
                <div v-else v-for="foundedMovie in searchResults" class="search-results__movie column is-12">
                  <div class="box search-results__movieBox">

                    <a v-if="foundedMovie.userRecommendedMovie === null" @click="addRecommendation(foundedMovie)"
                       :title="$t('movie.addRecommendation')">
                      <i class="fa fa-thumbs-up has-text-success"></i>
                    </a>
                    <a v-else @click="removeRecommendation(foundedMovie, $event)"
                       :title="$t('movie.removeRecommendation')">
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

              <span class="icon is-left search-left-icon"><i class="fa fa-search fa-lg"></i></span>
            </div>
            <p class="control">
              <button @click="findMovies()" class="button search-btn">{{ $t('common.search') }}</button>
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
          <div class="column-movie column is-fullheight is-3-tablet is-3-desktop is-half-mobile"
               v-for="(recommendedMovie, index) in recommendations">
            <div class="movie">
              <div class="poster">
                <img
                  :src="posterUrl(recommendedMovie.posterUrl ? recommendedMovie.posterUrl : recommendedMovie.originalPosterUrl, 260, 380)"
                  :alt="recommendedMovie.title"/>
                <div class="actions right">
                  <a v-if="!$store.state.isUserLoggedIn || recommendedMovie.userRecommendedMovie === null" @click="addRecommendation(recommendedMovie)"
                     class="addRecommendation button is-success is-small">{{ $t('movie.addRecommendation') }}
                    &nbsp;
                    <span class="icon is-medium"><i class="fa fa-thumbs-up"></i></span>
                  </a>
                  <a v-else @click="removeRecommendation(recommendedMovie)"
                     class="removeRecommendation button is-danger is-small">{{ $t('movie.removeRecommendation') }}
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
        <h3 class="subtitle" v-if="actorsTotal > 4">
          <router-link :to="{ name: 'movie.actors', params: {id: movie.id} }" v-t="'common.more'"></router-link>
        </h3>
        <div class="movie-actors columns is-multiline is-flex">
          <div class="column-actor column is-fullheight is-3-tablet is-3-desktop is-half-mobile"
               v-for="actor in movie.actors.slice(0, 4)">
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
      <rate-modal v-if="modalIsActive === true" @close="closeModal" @updateVote="updateVote"
                  :rating="userVote"></rate-modal>
    </div>
    <div v-else class="preloader is-centered is-center">
      <span class="icon is-large is-centered is-center"><i class="fa fa-spinner fa-spin fa-3x"></i></span>
    </div>
  </section>
</template>

<script>
  import {
    getImageUrl,
    addRecommendation,
    removeRecommendation,
    addToLibrary,
    removeFromLibrary,
    getUserVoteForMovie,
    setUserVoteForMovie,
    removeFromInterested
  } from "@/movies/helpers";
  import Movie from '@/movies/components/movie'
  import rateModal from '@/movies/components/rateModal'
  import moment from 'moment';
  export default {
    metaInfo() {
      let releaseDateFull = moment(String(this.movie.releaseDate)).format('DD.MM.YYYY');
      let releaseDateYear = moment(String(this.movie.releaseDate)).format('YYYY');
      return {
        title: this.$t('seo.movie.title', {t: this.movie.title, ot: this.movie.originalTitle, y: releaseDateYear}),
        meta: [
          {description: this.$t('seo.movie.description', {t: this.movie.title, ot: this.movie.originalTitle, y: releaseDateYear})},
          {keywords: this.$t('seo.movie.keywords', {t: this.movie.title, ot: this.movie.originalTitle, y: releaseDateYear})},
          {property: 'og:title', content: this.$t('seo.movie.title', {t: this.movie.title, ot: this.movie.originalTitle, y: releaseDateYear})},
          {property: 'og:type', content: 'video.movie'},
          {property: 'og:url', content: 'https://mykino.top' + this.$route.fullPath},
          {property: 'og:site_name', content: this.$t('seo.name')},
          {property: 'og:description', content: this.$t('seo.movie.description', {t: this.movie.title, ot: this.movie.originalTitle, y: releaseDateYear})},
          {property: 'video:duration', content: this.movie.runtime ? this.movie.runtime : 94*60},
          {property: 'video:release_date', content: releaseDateFull},
          {property: 'image', content: this.posterUrl(this.movie.posterUrl ? this.movie.posterUrl : this.movie.originalPosterUrl)},
        ],
      }
    },
    props: ['id'],
    components: {Movie, rateModal},
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
        modalIsActive: false,
        vote: 0,
        moviesRecommendationsTotal: 0,
        actorsTotal: 0,
        releaseDate: null,
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
            this.actorsTotal = this.actors.length
            this.vote = getUserVoteForMovie(this.movie)
          })
          .catch(error => {
            this.$router.push('/404');
          })
      },
      getRecommendations(id, timeout = 10000) {
        if (timeout <= 1000) {
          this.clearTimeouts()
          return;
        }

        this.recommendations = [];
        this.$http.get(this.endpoint + id + '/recommendations?limit=4')
          .then(response => {
            this.moviesRecommendationsTotal = response.data.paging.total;
            if (response.data.paging.total === 0) {
              this.timeToWait = timeout / 1000
              this.timeToWaitHandler = setInterval(() => {
                this.timeToWait -= 1;
                if (this.timeToWait <= 1) {
                  clearInterval(this.timeToWaitHandler);
                  this.timeToWaitHandler = null;
                }
              }, 1000)

              clearTimeout(this.loadRecommendationsHandler)
              this.loadRecommendationsHandler = null
              if (timeout < 5000) {
                this.clearTimeouts()
                return;
              }
              this.loadRecommendationsHandler = setTimeout(() => {
                this.getRecommendations(id, (timeout / 2))
              }, timeout);
            } else {
              this.clearTimeouts()
              this.recommendations = response.data.data
            }
          })
          .catch(error => {
            //this.$router.push('/404');
          })
      },
      posterUrl(imageUrl, width = null, height = null) {
        return getImageUrl(imageUrl, width, height);
      },
      loadData(id) {
        this.getMovie(id);
        this.getRecommendations(id);
        this.loadReleaseDate(id);
      },
      addRecommendation(recommendedMovie) {
        if (this.$store.state.isUserLoggedIn === false) {
          this.$router.push({name: 'registration'})
          return;
        }
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
      addToInterested() {
        if (this.$store.state.isUserLoggedIn === false) {
          this.$router.push({name: 'registration'})
          return;
        }
        this.$http.post('/users/interestedMovies', {
          movie_id: this.movie.id,
        })
          .then(response => {
            this.movie.userInterestedMovie = response.data;
          })
          .catch(error => {
            this.movie.userInterestedMovie = null;
          })
      },
      removeFromInterested() {
        removeFromInterested(this.movie)
      },
      addToLibrary() {
        if (this.$store.state.isUserLoggedIn === false) {
          this.$router.push({name: 'registration'})
          return;
        }
        return addToLibrary(this.movie);
      },
      removeFromLibrary() {
        this.vote = 0;
        return removeFromLibrary(this.movie);
      },
      openModal() {
        this.modalIsActive = true
      },
      closeModal() {
        this.modalIsActive = false
      },
      updateVote(vote) {
        if (this.userVote === vote) {
          return;
        }
        setUserVoteForMovie(this.movie, vote)
        this.vote = vote;
      },
      clearTimeouts() {
        this.timeToWait = 0
        if (this.timeToWaitHandler) {
          clearInterval(this.timeToWaitHandler);
        }
        if (this.loadRecommendationsHandler) {
          clearTimeout(this.loadRecommendationsHandler);
        }
      },
      loadReleaseDate(id) {
        if (this.$store.state.isUserLoggedIn === false) {
          return;
        }

        if (!this.$store.state.user.country_code) {
          return;
        }

        const countryCode = this.$store.state.user.country_code;
        this.$http.get(this.endpoint + id + "/releaseDate/" + countryCode)
          .then(response => {
            this.releaseDate = response.data;
          })
          .catch(error => {
            // todo
            console.log(error)
          })
      },
      isModerator() {
        return this.$store.state.user.roles.indexOf('ROLE_ADMIN') !== -1 || this.$store.state.user.roles.indexOf('ROLE_MODER') !== -1
      },
      isAdmin() {
        return this.$store.state.user.roles.indexOf('ROLE_ADMIN') !== -1
      }
    },
    computed: {
      userVote() {
        return this.vote;
      }
    },
    beforeDestroy() {
      this.clearTimeouts()
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
  .movie-recommendations {
    margin-top: 1.5rem;
  }
</style>
