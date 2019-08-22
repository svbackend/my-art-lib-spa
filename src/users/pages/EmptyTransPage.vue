<template>
  <section class="section-library">
    <div v-if="pageLoaded === false" class="preloader is-centered is-center">
      <span class="icon is-large is-centered is-center"><i class="fa fa-spinner fa-spin fa-3x"></i></span>
    </div>
    <div class="notification is-warning" v-if="pageLoaded === true">
      Total: {{ totalMovies }}
    </div>
    <movies-list :movies="movies"></movies-list>
    <pagination
        :current="currentPage"
        :total="totalMovies"
        :per-page="perPage"
        @page-changed="getMovies"
    ></pagination>
  </section>
</template>

<script>
  import MoviesList from '@/movies/components/moviesList'
  import Pagination from '@/components/pagination'
  export default {
    components: {MoviesList, Pagination},
    data() {
      return {
        movies: [],
        totalMovies: 0,
        perPage: 20,
        currentPage: 1,
        pageLoaded: false,
      }
    },
    methods: {
      getMovies(page = null) {
        this.movies = [];
        this.pageLoaded = false;

        if (page !== null) {
          this.currentPage = page;
        }

        let offset = (this.currentPage * this.perPage) - this.perPage;
        let limit = this.perPage;
        let endpoint = '/empty/movies/{locale}'
        let locale = this.$store.state.locale

        this.movies = [];

        this.$http.get(endpoint.replace('{locale}', locale), {params: {offset: offset, limit: limit}})
          .then(response => {
            this.movies = response.data.items
            this.totalMovies = response.data.total
            this.pageLoaded = true;
          })
          .catch(error => {
            console.log('-----error-------');
            console.log(error)
            //this.$router.push('/404');
          })
      },
    },
    created() {
      this.currentPage = this.$router.currentRoute.query.page ? Number(this.$router.currentRoute.query.page) : 1;
      this.getMovies();
    },
    watch: {
      '$route'() {
        this.currentPage = this.$router.currentRoute.query.page ? Number(this.$router.currentRoute.query.page) : 1;
        this.getMovies()
      }
    }
  }
</script>

<style lang="scss">

</style>
