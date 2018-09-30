<template>
  <div class="movie">
    <div class="poster">
      <img :src="getPosterUrl(movie)" :alt="movie.title"/>
      <div v-if="$store.state.isUserLoggedIn === true" class="actions right">
        <a v-if="!movie.isWatched" class="addToLibrary button is-success is-small"
           @click="addToLibrary(movie, $event)">{{ $t('movie.addToWatchedMovies') }}
          &nbsp;
          <span class="icon is-medium"><i class="fa fa-plus"></i></span>
        </a>
        <a v-else class="removeFromLibrary button is-danger is-small" @click="removeFromLibrary(movie, $event)">
          <span class="is-hidden-mobile">{{ $t('movie.removeFromWatchedMovies') }}</span>
          <span class="is-hidden-tablet">{{ $t('movie.removeFromWatchedMoviesShort') }}</span>
          <span class="icon is-medium"><i class="fa fa-times"></i></span>
        </a>
      </div>
      <div v-if="$store.state.isUserLoggedIn === true" class="actions left">
        <a v-show="movie.isWatched" class="addToLibrary button is-small" @click="openRateModal(movie)">
          <span class="is-hidden-mobile">
            <span v-if="getVote(movie) > 0">
              {{ getVote(movie) }}&nbsp;<span class="icon is-medium"><i class="fa fa-star has-text-danger"></i></span>
            </span>
            <span v-else>
              {{ $t('movie.rate') }}
              <span class="icon is-medium"><i class="fa fa-star has-text-danger"></i></span>
            </span>
          </span>
          <span class="is-hidden-tablet">
            <span v-if="getVote(movie) > 0">
              <span>{{ getVote(movie) }}</span>
              <span class="icon is-medium"><i class="fa fa-star has-text-danger"></i></span>
            </span>
            <span v-else>
              <span class="icon is-medium"><i class="fa fa-star has-text-danger"></i></span>
            </span>
          </span>
        </a>
      </div>

    </div>
    <div class="information">
      <div class="title">
        <router-link
            active-class="is-active"
            class="link"
            :to="{ name: 'movie', params: { id: movie.id } }">
          {{ movie.title }} ({{ movie.releaseDate | year }})
        </router-link>
        <div class="owner-rating" v-if="movie.ownerWatchedMovie && movie.ownerWatchedMovie.vote > 0">
            {{ movie.ownerWatchedMovie.vote }}<span class="icon"><i class="fa fa-star has-text-orange"></i></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {getUserVoteForMovie, addToLibrary, removeFromLibrary, getImageUrl} from '@/movies/helpers/index'
  export default {
    name: "movie",
    props: {
      movie: {
        type: Object
      },
      index: Number
    },
    data() {
      return {}
    },
    methods: {
      getPosterUrl(movie) {
        let posterUrl = movie.posterUrl ? movie.posterUrl : movie.originalPosterUrl
        return getImageUrl(posterUrl, 320, 480);
      },
      openRateModal(movie) {
        this.$emit('openRateModal', movie, this.index)
      },
      getVote(movie) {
        return getUserVoteForMovie(movie)
      },
      addToLibrary(movie, e) { return addToLibrary(movie, e) },
      removeFromLibrary(movie, e) { return removeFromLibrary(movie, e) },
    }
  }
</script>

<style scoped>

</style>
