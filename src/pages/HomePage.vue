<template>
  <section class="section-homepage">
    <div class="filters columns">
      <div class="filter-year column" :class="{ 'is-hidden-mobile': !isFilterVisible }">
        <label class="label">{{ $t('filters.movieYear') }}</label>
        <div class="field has-addons">
          <div class="control">
            <input v-model="filters.yf" class="input" :placeholder="$t('filters.from')" type="text">
          </div>
          <div class="control">
            <input v-model="filters.yt" class="input" :placeholder="$t('filters.to')" type="text">
          </div>
        </div>
      </div>

      <div class="filter-rating column" :class="{ 'is-hidden-mobile': !isFilterVisible }">
        <label class="label">{{ $t('filters.movieRating') }}</label>
        <div class="field has-addons">
          <div class="control">
            <input v-model="filters.rf" class="input" placeholder="Min (1)" type="text">
          </div>
          <div class="control">
            <input v-model="filters.rt" class="input" placeholder="Max (10)" type="text">
          </div>
        </div>
      </div>

      <div class="filter-actors column" :class="{ 'is-hidden-mobile': !isFilterVisible }">
        <label class="label">{{ $t('filters.movieActors') }}</label>
        <multiselect
          v-model="selectedActors"
          :options="actors"
          :searchable="true"
          :multiple="true" :limit="1" :limit-text="limitText" :noResult="$t('filters.noResult')"
          :noOptions="$t('filters.noOptions')"
          :clear-on-select="false"
          :loading="isLoadingActors"
          :internal-search="false"
          :close-on-select="false" :placeholder="$t('filters.typeToSearch')" label="actor_name"
          track-by="actor_id" :preselect-first="false" @search-change="findActors">
        </multiselect>
        <p class="help">
          <bswitch v-model="filters.at" :true-value="'AND'" :false-value="'OR'"></bswitch>
          <label v-if="actorsFilterType === 'OR'">{{ $t('filters.atLeastOneInList') }}</label>
          <label v-else>{{ $t('filters.everyInList') }}</label>
        </p>
      </div>

      <div class="filter-genres column">
        <label class="label">{{ $t('filters.movieGenres') }}</label>
        <multiselect
          v-model="selectedGenres"
          :options="genres"
          :multiple="true" :limit="1" :limit-text="limitText"
          :clear-on-select="false" :searchable="false"
          :close-on-select="false" :custom-label="genreLabel" :placeholder="$t('filters.movieGenres')"
          label="genre_name"
          track-by="genre_id" :preselect-first="false">
        </multiselect>
        <p class="help">
          <bswitch v-model="filters.gt" :true-value="'AND'" :false-value="'OR'"></bswitch>
          <label v-if="genresFilterType === 'OR'">{{ $t('filters.atLeastOneInList') }}</label>
          <label v-else>{{ $t('filters.everyInList') }}</label>

          <span class="pull-right is-hidden-tablet">
            <bswitch v-model="isFilterVisible"></bswitch>
            <label>{{ $t('filters.showAllFilters') }}</label>
          </span>
        </p>
      </div>

    </div>

    <div v-if="pageLoaded === false" class="preloader is-centered is-center">
      <span class="icon is-large is-centered is-center"><i class="fa fa-spinner fa-spin fa-3x"></i></span>
    </div>

    <div v-if="pageLoaded === true && !movies.length" class="notification is-warning">
      {{ $t('homePage.empty') }}
      {{ $t('homePage.emptySuggestion') }} <a href="#!" @click="resetFilter">{{ $t('homePage.emptyResetFilter') }}</a>
    </div>

    <movies-list :movies="movies"></movies-list>
    <pagination
      :current="currentPage"
      :total="totalMovies"
      :per-page="perPage"
      @page-changed="getAllMovies"
    ></pagination>
  </section>
</template>

<script>
  import Pagination from '@/components/pagination'
  import moviesList from '@/movies/components/moviesList'
  import Multiselect from 'vue-multiselect'
  import bswitch from '@/components/bswitch'

  export default {
    metaInfo() {
      return {
        title: this.$t('seo.title'),
        meta: [
          {description: this.$t('seo.description')},
          {keywords: this.$t('seo.keywords')},
          {property: 'og:title', content: this.$t('seo.title')},
          {property: 'og:type', content: 'website'},
          {property: 'og:url', content: 'https://mykino.top'},
          {property: 'og:site_name', content: this.$t('seo.name')},
          {property: 'og:description', content: this.$t('seo.description')},
        ],
      }
    },
    components: {bswitch, moviesList, Pagination, Multiselect},
    props: {
      page: {
        default: 1,
        type: Number
      }
    },
    data() {
      return {
        movies: [],
        genres: [],
        selectedGenres: [],
        actors: [],
        selectedActors: [],
        isLoadingActors: false,
        loadingActorsTimer: null,
        isFilterVisible: false,
        totalMovies: 0,
        perPage: 20,
        currentPage: 1,
        modalMovie: {},
        pageLoaded: false,
        filters: {
          yf: Number,
          yt: Number,
          rf: Number,
          rt: Number,
          g: Array,
          gt: 'AND',
          a: Array,
          at: 'AND',
        }
      }
    },
    created() {
      this.filters = Object.assign({}, this.$store.state.filters)
      this.selectedActors = this.filters.selectedActors
      delete this.filters['selectedActors'];

      this.currentPage = this.page;
      this.getAllMovies(this.page);
      this.getGenres();
    },
    methods: {
      getGenres() {
        if (this.genres.length) {
          return;
        }
        this.$http.get('/genres')
          .then(response => {
            this.genres = response.data.data.map((genre) => {
              return {
                genre_id: genre.id,
                genre_name: genre.name
              }
            });

            this.selectedGenres = [];
            for (let genre of this.genres) {
              if (this.filters.g.indexOf(genre.genre_id) !== -1) {
                this.selectedGenres.push(genre)
              }
            }
          })
          .catch(error => {
          })
      },
      getAllMovies(page = null) {
        this.pageLoaded = false;
        this.movies = [];
        if (page !== null) {
          this.currentPage = page;
        }
        let offset = (this.currentPage * this.perPage) - this.perPage;
        let limit = this.perPage;
        this.$http.get('/movies', {params: {offset: offset, limit: limit, ...this.filters}})
          .then(response => {
            this.movies = response.data.data;
            this.totalMovies = response.data.paging.total;
            this.pageLoaded = true;
          })
          .catch(error => {
            console.log('-----error-------');
            console.log(error);
          })
      },
      genreLabel(option) {
        return option.genre_name
      },
      limitText(count) {
        return this.$t('filters.andMore', {n: count})
      },
      findActors(query) {
        if (query && query.length < 3) {
          return;
        }

        this.isLoadingActors = true

        if (this.loadingActorsTimer !== null) {
          clearTimeout(this.loadingActorsTimer)
          this.loadingActorsTimer = null
        }

        this.loadingActorsTimer = setTimeout(() => {
          this.isLoadingActors = true
          this.$http.get('/actors/search', {params: {n: query}})
            .then(response => {
              this.actors = response.data.data.map((actor) => {
                let name = actor.originalName
                if (actor.hasOwnProperty('name') && actor.name !== actor.originalName) {
                  name = actor.name
                }
                return {
                  actor_id: actor.id,
                  actor_name: name
                }
              })
            })
            .catch(err => {
              console.log('findActors error:')
              console.log(err)
            })
            .finally(() => {
              this.isLoadingActors = false;
              clearTimeout(this.loadingActorsTimer);
              this.loadingActorsTimer = null;
            })
        }, 750)
      },
      resetFilter() {
        this.selectedGenres = []
        this.selectedActors = []
        this.filters = {
          yf: null,
          yt: null,
          rf: null,
          rt: null,
          g: [],
          gt: 'AND',
          a: [],
          at: 'AND',
        }
        let filtersCopy = Object.assign({}, this.filters)
        this.$store.dispatch('setFilters', filtersCopy);
        this.$forceUpdate()
      }
    },
    computed: {
      genresFilterType: function () {
        return this.filters.gt
      },
      actorsFilterType: function () {
        return this.filters.at
      }
    },
    watch: {
      filters: {
        handler: function (val, oldVal) {
          if (this.pageLoaded === false) return
          this.filters.selectedActors = this.selectedActors
          let filtersCopy = Object.assign({}, this.filters)
          this.$store.dispatch('setFilters', filtersCopy);
          delete this.filters['selectedActors']
          this.getAllMovies()
        },
        deep: true
      },
      selectedGenres: {
        handler: function (val, oldVal) {
          this.filters.g = val.map((genre) => {
            return genre.genre_id
          })
        }
      },
      selectedActors: {
        handler: function (val, oldVal) {
          this.filters.a = val.map((actor) => {
            return actor.actor_id
          })
        }
      },
    },
  }
</script>

<style lang="scss">
  .filters .input {
    height: 2.70em;
  }
</style>
