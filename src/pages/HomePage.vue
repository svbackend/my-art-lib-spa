<template>
  <section class="wrapper">
    <div v-if="pageLoaded === false" class="preloader is-centered is-center">
      <span class="icon is-large is-centered is-center"><i class="fa fa-spinner fa-spin fa-3x"></i></span>
    </div>
    <div class="filters columns">
      <div class="filter-year column columns">
        <div class="field column">
          <div class="control">
            <input type="number" v-model="filters.yf" class="input">
          </div>
        </div>
        <div class="field column">
          <div class="control">
            <input type="number" v-model="filters.yt" class="input">
          </div>
        </div>
      </div>
      <div class="filter-genres column">
        <div class="select is-multiple">
          <select multiple size="3">
            <option value="Argentina">Argentina</option>
            <option value="Bolivia">Bolivia</option>
            <option value="Brazil">Brazil</option>
            <option value="Brazil">Brazil</option>
            <option value="Brazil">Brazil</option>
            <option value="Brazil">Brazil</option>
          </select>
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
  export default {
    components: {moviesList, Pagination},
    props: {
      page: {
        default: 1,
        type: Number
      }
    },
    data() {
      return {
        movies: [],
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
    },
    methods: {
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
    }
  }
</script>

<style lang="scss">

</style>
