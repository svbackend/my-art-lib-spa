<template>
  <div class="movie">
    <div class="poster">
      <img :src="getPosterUrl(movie)" :alt="movie.title"/>
      <div class="actions right">
        <a v-if="!movie.isWatched" class="addToLibrary button is-success is-small"
           @click="addToLibrary(movie, $event)">{{ $t('movie.addToWatchedMovies') }}
          &nbsp;
          <span class="icon is-medium"><i class="fa fa-plus"></i></span>
        </a>
        <a v-else class="removeFromLibrary button is-danger is-small"
           @click="removeFromLibrary(movie, $event)">{{ $t('movie.removeFromWatchedMovies') }}
          &nbsp;
          <span class="icon is-medium"><i class="fa fa-times"></i></span>
        </a>
      </div>
      <div class="actions left">
        <a v-show="movie.isWatched" class="addToLibrary button is-small"
           @click="openRateModal(movie, $event)">
          <span v-if="getVote(movie) > 0">{{ getVote(movie) }}</span>
          <span v-else>{{ $t('movie.rate') }}</span>
          <span class="icon is-medium"><i class="fa fa-star has-text-danger"></i></span>
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
      </div>
    </div>
  </div>
</template>

<script>
  import {getUserVoteForMovie, addToLibrary, removeFromLibrary} from '@/movies/helpers/index'
  import { apiHost } from './../../config.js'
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
        let newPosterUrl = posterUrl;
        // todo remove when backend will provide own urls to images
        if (posterUrl === 'https://image.tmdb.org/t/p/original' || posterUrl === 'http://placehold.it/480x320') {
          return 'http://placehold.it/320x480'
        }

        if (posterUrl[0] === '/') {
          newPosterUrl = posterUrl.substring(0, posterUrl.length - 3);
          newPosterUrl += '320x480.' + posterUrl.substr(posterUrl.length - 3);
          newPosterUrl = apiHost + newPosterUrl;
        }

        return newPosterUrl
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