<template>
  <section class="wrapper">
    <div v-if="pageLoaded === false" class="preloader is-centered is-center">
      <span class="icon is-large is-centered is-center"><i class="fa fa-spinner fa-spin fa-3x"></i></span>
    </div>
    <div class="filters columns">
      <div class="filter-year column">
        <label class="label">Release year (from - to)</label>
        <div class="field has-addons">
          <div class="control">
            <input v-model="filters.yf" class="input" placeholder="placeholder" type="text">
          </div>
          <div class="control">
            <input v-model="filters.yt" class="input" placeholder="placeholder" type="text">
          </div>
        </div>
      </div>

      <div class="filter-rating column">
        <label class="label">Rating (from - to)</label>
        <div class="field has-addons">
          <div class="control">
            <input v-model="filters.rf" class="input" placeholder="placeholder" type="text">
          </div>
          <div class="control">
            <input v-model="filters.rt" class="input" placeholder="placeholder" type="text">
          </div>
        </div>
      </div>

      <div class="filter-genres column">
        <label class="label">Genres</label>
        <multiselect
          v-model="filters.g"
          :options="genres"
          :multiple="true"
          :clear-on-select="false" :searchable="false"
          :close-on-select="false" :custom-label="genreLabel" placeholder="Genres" label="genre_name" track-by="genre_id" :preselect-first="false">
        </multiselect>
      </div>

      <div class="filter-buttons column">
        <div class="field">
          <div class="control">
            <button id="doublebutton-0" name="doublebutton-0" class="button is-success">Apply filter</button>
            <button id="doublebutton2-0" name="doublebutton2-0" class="button is-danger">Reset</button>
          </div>
        </div>
      </div>
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

  export default {
    components: {moviesList, Pagination, Multiselect},
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
        endpoint: '/movies',
        isUserLoggedIn: false,
        totalMovies: 0,
        perPage: 20,
        currentPage: 1,
        modalMovie: {},
        modalIsActive: false,
        pageLoaded: false,
        filters: {
          yf: 2008,
          yt: 2050,
          rf: 7,
          rt: 10,
          g: [5, 7, 17],
          gt: 'AND'
        }
      }
    },
    created() {
      this.currentPage = this.page;
      this.getAllMovies(this.page);
      this.isUserLoggedIn = this.$store.state.isUserLoggedIn;
      this.getGenres();
    },
    methods: {
      getGenres() {
        if (this.genres.length) {
          return;
        }
        this.$http.get('/genres')
          .then(response => {
            this.genres = response.data.map((genre) => {
              return {
                genre_id: genre.id,
                genre_name: genre.name
              }
            });
          })
          .catch(error => {})
      },
      getAllMovies(page = null) {
        this.pageLoaded = false;
        this.movies = [];
        if (page !== null) {
          this.currentPage = page;
        }
        let offset = (this.currentPage * this.perPage) - this.perPage;
        let limit = this.perPage;
        this.$http.get(this.endpoint, {params: {offset: offset, limit: limit, ...this.filters}})
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
        console.log(option.genre_name)
        return option.genre_name
      }
    }
  }
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style lang="scss">

</style>
