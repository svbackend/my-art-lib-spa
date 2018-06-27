<template>
  <section class="wrapper">
    <div class="movies columns is-multiline is-flex">
      <div class="column-movie column is-fullheight is-3-tablet is-2-desktop is-half-mobile" v-for="(movie, index) in movies">
        <movie :movie="movie" :index="index" @openRateModal="openModal"></movie>
      </div>
    </div>

    <pagination
        :current="currentPage"
        :total="totalMovies"
        :per-page="perPage"
        @page-changed="getAllMovies"
    ></pagination>
    <rate-modal v-if="modalIsActive === true" @close="closeModal()" @updateVote="updateVote" :rating="getUserVoteForMovie(modalMovie)"></rate-modal>
  </section>
</template>

<script>
  import {getUserVoteForMovie} from '@/movies/helpers/index'
  import {setUserVoteForMovie} from '@/movies/helpers/index'
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
      openModal(movie, index) {
        this.modalMovieIndex = index
        this.modalMovie = movie
        this.modalIsActive = true
      },
      closeModal() {
        this.modalMovie = {}
        this.modalIsActive = false
      },
      getUserVoteForMovie,
      setUserVoteForMovie,
      updateVote(vote) {
        console.log(vote)
        setUserVoteForMovie(this.modalMovie, vote)
        if (this.$store.state.isUserLoggedIn === true) {

          if (this.movies[this.modalMovieIndex].userWatchedMovie === null) {
            this.movies[this.modalMovieIndex].userWatchedMovie = {};
          }

          this.movies[this.modalMovieIndex].userWatchedMovie.vote = vote;
        } else {

          if (this.movies[this.modalMovieIndex].guestWatchedMovie === null) {
            this.movies[this.modalMovieIndex].guestWatchedMovie = {};
          }

          this.movies[this.modalMovieIndex].guestWatchedMovie.vote = vote;
        }
      },
    }
  }
</script>

<style lang="scss">

</style>
