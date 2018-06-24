<template lang="html">
  <section class="wrapper">
    <section>
      <pagination
          :current="page"
          :total="totalMovies"
          :per-page="perPage"
          @page-changed="getUserWatchedMovies"
      ></pagination>
    </section>
    <div class="movies columns is-multiline">
      <div class="column-movie column is-3-tablet is-2-desktop is-half-mobile" v-for="movie in movies">
        <movie :movie="movie"></movie>
      </div>
    </div>
  </section>
</template>

<script>
  import Movie from '@/movies/components/movie'
  import Pagination from '@/components/pagination'
  export default {
    components: {Pagination, Movie},
    props: ['username', 'page'],
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
      getUserWatchedMovies(id = null) {
        let page = this.page
        if (id === null) {
          id = this.$store.state.user.id
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
      // todo if username !== current user username then load use by it
      console.log(this.username);
      console.log(this.username);
      console.log(this.username);
      console.log(this.username);
      console.log(this.username);
      console.log(this.username);
      console.log(this.username);
      this.getUserWatchedMovies();
    },
    watch: {
      '$route'() {
        if (this.username === this.$store.state.user.username) {
          this.getUserWatchedMovies(this.$store.state.user.id)
        } else {
          this.getUserWatchedMovies(this.username)
        }
      }
    }
  }
</script>

<style lang="scss">

</style>
