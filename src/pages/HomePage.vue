<template>
  <section class="wrapper">
    <div class="movies columns is-multiline is-flex">
      <div class="column-movie column is-fullheight is-3-tablet is-2-desktop is-half-mobile" v-for="movie in movies">
        <movie :movie="movie" @openRateModal="openModal"></movie>
      </div>
    </div>

    <pagination
        :current="currentPage"
        :total="totalMovies"
        :per-page="perPage"
        @page-changed="getAllMovies"
    ></pagination>
    <!-- TODO rating actual value of modalMovie -->
    <rate-modal v-if="modalIsActive === true" @close="closeModal()" :rating="3"></rate-modal>
  </section>
</template>

<script>
  import Pagination from '@/components/pagination'
  import Movie from '@/movies/components/movie'
  import rateModal from '@/movies/components/rateModal'
  export default {
    components: {rateModal, Pagination, Movie},
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
      }
    },
    created() {
      this.currentPage = this.page;
      this.getAllMovies(this.page);
      this.isUserLoggedIn = this.$store.state.isUserLoggedIn;
    },
    methods: {
      getAllMovies(page = null) {
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
          })
          .catch(error => {
            console.log('-----error-------');
            console.log(error);
          })
      },
      openModal(movie) {
        this.modalMovie = movie
        this.modalIsActive = true
      },
      closeModal() {
        this.modalMovie = {}
        this.modalIsActive = false
      },
    }
  }
</script>

<style lang="scss">

</style>
