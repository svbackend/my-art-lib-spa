<template lang="html">
  <div class="movie" v-if="actor.name">
    <div class="columns">
      <div class="movie-left column is-4">
        <img :src="photoUrl(actor.photo, 420, 620)" :alt="actor.name">
      </div>
      <div class="movie-right column">
        <h1 class="title">{{ actor.name }} ({{ actor.birthday | year }})</h1>
        <h2 class="subtitle" v-if="actor.name !== actor.originalName">{{ movie.originalName }}</h2>
        <p class="movie__body">{{ actor.biography }}</p>
      </div>
    </div>
    <div class="movie-full">
      <h2 class="title">{{ $t('actor.movies') }}</h2>
      <movies-list :movies="movies"></movies-list>
    </div>
  </div>
</template>

<script>
  import {getImageUrl} from "@/movies/helpers";

  import moviesList from '@/movies/components/moviesList'

  export default {
    props: ['id'],
    components: {moviesList},
    data() {
      return {
        actor: {},
        movies: [],
      }
    },
    methods: {
      getActor(id) {
        this.$http.get('/actors/' + id)
          .then(response => {
            this.actor = response.data
          })
          .catch(error => {
            this.$router.push('/404');
          })
      },
      getActorMovies(id) {
        this.$http.get('/actors/' + id + '/movies')
          .then(response => {
            this.movies = response.data.data.slice(0, 4).map(actorMovies => {
              return actorMovies.movie;
            })
          })
          .catch(error => {
            console.log('error...')
            console.log(error)
            this.$router.push('/404');
          })
      },
      photoUrl(imageUrl, width = null, height = null) {
        return getImageUrl(imageUrl, width, height);
      },
      loadData(id) {
        this.getActor(id);
        this.getActorMovies(id);
      },
    },

    created() {
      this.loadData(this.id)
    },
    watch: {
      '$route'() {
        this.loadData(this.id)
      }
    }
  }
</script>

<style lang="scss">
  @import "~bulma";

  .movie {
    position: relative;
    margin: 0 auto;
    padding: 50px 20px 20px;
    h1.movie__title {
      font-size: 140%;
    }
    &__body {
      position: relative;
      z-index: 1;
    }
  }
</style>
