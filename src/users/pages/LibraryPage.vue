<template lang="html">
  <section class="section wrapper">
    <div class="movies columns is-multiline is-flex">
      <div class="column-movie column is-3-tablet is-2-desktop is-half-mobile" v-for="movie in movies">
        <movie :movie="movie"></movie>
      </div>
    </div>

    <pagination
        :current="currentPage"
        :total="totalMovies"
        :per-page="perPage"
        @page-changed="getUserWatchedMovies"
    ></pagination>
  </section>
</template>

<script>
  import Movie from '@/movies/components/movie'
  import Pagination from '@/components/pagination'
  export default {
    components: {Pagination, Movie},
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
