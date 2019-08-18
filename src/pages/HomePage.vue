<template>
  <section class="section-homepage">
    <div class="filters columns">
      <div class="filter-year column" :class="{ 'is-hidden-mobile': !isFilterVisible }">
        <label class="label">Release year (from - to)</label>
        <div class="field has-addons">
          <div class="control">
            <input v-model="filters.yf" class="input" placeholder="From" type="text">
          </div>
          <div class="control">
            <input v-model="filters.yt" class="input" placeholder="To" type="text">
          </div>
        </div>
      </div>

      <div class="filter-rating column" :class="{ 'is-hidden-mobile': !isFilterVisible }">
        <label class="label">Rating (min - max)</label>
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
        <label class="label">Actors</label>
        <multiselect
          v-model="selectedActors"
          :options="actors"
          :searchable="true"
          :multiple="true" :limit="1" :limit-text="limitText"
          :clear-on-select="false"
          :loading="isLoadingActors"
          :internal-search="false"
          :close-on-select="false" placeholder="Type to search" label="actor_name"
          track-by="actor_id" :preselect-first="false" @search-change="findActors">
        </multiselect>
        <p class="help">
          <bswitch v-model="filters.at" :true-value="'AND'" :false-value="'OR'"></bswitch>
          <label v-if="actorsFilterType === 'OR'">At least 1 in list</label>
          <label v-else>Every in list</label>
        </p>
      </div>

      <div class="filter-genres column">
        <label class="label">Genres</label>
        <multiselect
          v-model="selectedGenres"
          :options="genres"
          :multiple="true" :limit="1" :limit-text="limitText"
          :clear-on-select="false" :searchable="false"
          :close-on-select="false" :custom-label="genreLabel" placeholder="Genres" label="genre_name"
          track-by="genre_id" :preselect-first="false">
        </multiselect>
        <p class="help">
          <bswitch v-model="filters.gt" :true-value="'AND'" :false-value="'OR'"></bswitch>
          <label v-if="genresFilterType === 'OR'">At least 1 in list</label>
          <label v-else>Every in list</label>

          <span class="pull-right is-hidden-tablet">
            <bswitch v-model="isFilterVisible"></bswitch>
            <label>Show all filters</label>
          </span>
        </p>
      </div>

    </div>

    <div v-if="pageLoaded === false" class="preloader is-centered is-center">
      <span class="icon is-large is-centered is-center"><i class="fa fa-spinner fa-spin fa-3x"></i></span>
    </div>

    <div v-if="pageLoaded === true && !movies.length" class="notification is-warning">
      {{ $t('homePage.empty', {
          filters: filters,
          actors: selectedActors.reduce((list, actor) => { list + (actor.actor_name + ", ") }, ''),
          genres: selectedGenres.reduce((list, genre) => { list + (genre.genre_name + ", ") }, '')
        })
      }}
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
        filters: {}
      }
    },
    created() {
      this.filters = Object.assign({}, this.$store.state.filters);
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
        return `${count} more..`
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
      clearAll() {
        this.actors = []
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
          this.$store.dispatch('setFilters', this.filters);
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
