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
          {{ movie.title }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
  import {getUserVoteForMovie} from '@/movies/helpers/index'

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
        if (posterUrl === 'https://image.tmdb.org/t/p/original' || posterUrl === 'http://placehold.it/480x320') {
          posterUrl = 'http://placehold.it/320x480'
        }

        return posterUrl
      },
      addToLibrary(movie) {
        let movieId = movie.id

        let endpoint = '';

        if (this.$store.state.isUserLoggedIn === true) {
          endpoint = '/users/watchedMovies';
        } else {
          endpoint = '/guests/{token}/watchedMovies';
          endpoint = endpoint.replace('{token}', this.$store.state.guest.token);
        }
        this.$http.post(endpoint, {
          movie: {
            id: movieId,
            tmdbId: null,
            vote: null,
            watchedAt: null,
          }
        })
          .then(response => {
            movie.isWatched = true
          })
      },
      removeFromLibrary(movie, event) {
        console.log(movie)
        let movieId = movie.id

        if (movie.userWatchedMovie && typeof movie.userWatchedMovie.id !== 'undefined') {
          movieId = movie.userWatchedMovie.id;
        }

        let endpoint = '';

        if (this.$store.state.isUserLoggedIn === true) {
          endpoint = '/users/{user}/watchedMovies/{movie}';
          endpoint = endpoint.replace('{user}', this.$store.state.user.id);
        } else {
          endpoint = '/guests/{token}/watchedMovies/{movie}';
          endpoint = endpoint.replace('{token}', this.$store.state.guest.token);
        }
        endpoint = endpoint.replace('{movie}', movieId);

        this.$http.delete(endpoint)
          .then(response => {
            movie.isWatched = false
          })
          .catch(error => {
            console.log('-----error-------');
            console.log(error);
          })
      },
      openRateModal(movie) {
        this.$emit('openRateModal', movie, this.index)
      },
      getVote(movie) {
        return getUserVoteForMovie(movie)
      }
    }
  }
</script>

<style scoped>

</style>