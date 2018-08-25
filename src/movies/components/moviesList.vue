<template>
  <div class="movies-list">
    <div class="movies columns is-multiline is-flex">
      <div class="column-movie column is-fullheight is-3-tablet is-3-desktop is-half-mobile" v-for="(movie, index) in movies">
        <movie :movie="movie" :index="index" @openRateModal="openModal"></movie>
      </div>
    </div>
    <rate-modal v-if="modalIsActive === true" @close="closeModal" @updateVote="updateVote" :rating="getUserVoteForMovie(modalMovie)"></rate-modal>
  </div>
</template>

<script>
  import {getUserVoteForMovie} from '@/movies/helpers/index'
  import {setUserVoteForMovie} from '@/movies/helpers/index'
  import Movie from '@/movies/components/movie'
  import rateModal from '@/movies/components/rateModal'
  export default {
    name: 'moviesList',
    components: {rateModal, Movie},
    props: {
      movies: {
        default: [],
        type: Array
      }
    },
    data() {
      return {
        isUserLoggedIn: false,
        modalMovie: {},
        modalIsActive: false,
      }
    },
    created() {
      this.isUserLoggedIn = this.$store.state.isUserLoggedIn;
    },
    methods: {
      openModal(movie, index) {
        this.modalMovieIndex = index
        this.modalMovie = movie
        this.modalIsActive = true

        if (this.movies[this.modalMovieIndex].userWatchedMovie === null) {
          this.movies[this.modalMovieIndex].userWatchedMovie = {};
        }

        if (this.movies[this.modalMovieIndex].guestWatchedMovie === null) {
          this.movies[this.modalMovieIndex].guestWatchedMovie = {};
        }
      },
      closeModal() {
        this.modalMovie = {}
        this.modalIsActive = false
      },
      getUserVoteForMovie,
      setUserVoteForMovie,
      updateVote(vote) {
        setUserVoteForMovie(this.modalMovie, vote)
        if (this.$store.state.isUserLoggedIn === true) {
          this.movies[this.modalMovieIndex].userWatchedMovie.vote = vote;
        } else {
          this.movies[this.modalMovieIndex].guestWatchedMovie.vote = vote;
        }
      },
    }
  }
</script>

<style lang="scss">

</style>
