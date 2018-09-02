<template>
  <section class="wrapper">
    <div v-if="pageLoaded === false" class="preloader is-centered is-center">
      <span class="icon is-large is-centered is-center"><i class="fa fa-spinner fa-spin fa-3x"></i></span>
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
        this.$http.get(this.endpoint, {params: {offset: offset, limit: limit}})
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
