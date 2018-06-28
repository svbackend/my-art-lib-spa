<template>
  <section class="section wrapper">
    <movies-list :movies="movies"></movies-list>
    <pagination
        :current="currentPage"
        :total="totalMovies"
        :per-page="perPage"
        @page-changed="getUserWatchedMovies"
    ></pagination>
  </section>
</template>

<script>
  import MoviesList from '@/movies/components/moviesList'
  import Pagination from '@/components/pagination'
  export default {
    components: {MoviesList, Pagination},
    props: ['username'],
    data() {
      return {
        user: {},
        movies: [],
        totalMovies: 0,
        perPage: 20,
        currentPage: 1
      }
    },
    methods: {
      getUserWatchedMovies(page = null) {
        let id;

        if (this.username === this.$store.state.user.username) {
          id = this.$store.state.user.id
        } else {
          id = this.username
        }

        this.movies = [];

        if (page !== null) {
          this.currentPage = page;
        }

        let offset = (this.currentPage * this.perPage) - this.perPage;
        let limit = this.perPage;
        let endpoint = '/users/{id}/watchedMovies'

        this.$http.get(endpoint.replace('{id}', id), {params: {offset: offset, limit: limit}})
          .then(response => {
            this.movies = response.data.data
            this.totalMovies = response.data.paging.total
            console.log(response)
          })
          .catch(error => {
            console.log('-----error-------');
            console.log(error)
            this.$router.push('/404');
          })
      }
    },
    created() {
      this.currentPage = this.$router.currentRoute.query.page ? Number(this.$router.currentRoute.query.page) : 1;
      this.getUserWatchedMovies();
    },
    watch: {
      '$route'() {
        this.currentPage = this.$router.currentRoute.query.page ? Number(this.$router.currentRoute.query.page) : 1;
        this.getUserWatchedMovies()
      }
    }
  }
</script>

<style lang="scss">

</style>
