<template lang="html">
  <div class="movie" v-if="movie.title">
    <div class="columns">
      <div class="movie-left column is-4">
        <img :src="posterUrl(movie.posterUrl ? movie.posterUrl : movie.originalPosterUrl, 420, 620)" :alt="movie.title">
        <div class="action-buttons">
          <a href="#!" class="button is-success">Add to my library</a>
        </div>
      </div>
      <div class="movie-right column">
        <h1 class="title">{{ movie.title }} ({{ movie.releaseDate | year }})</h1>
        <h2 class="subtitle" v-if="movie.title !== movie.originalTitle">{{ movie.originalTitle }}</h2>
        <div class="tags">
      <span class="tag is-dark" v-for="genre in movie.genres">
        {{ genre.name }}
      </span>
        </div>
        <p class="movie__body">{{ movie.overview }}</p>
      </div>
    </div>
    <div class="movie-full">
      <h2 class="title">Recommendations</h2>
      <h3 class="subtitle">You can recommend movies similar to this</h3>
      <div class="movie-recommendations columns is-multiline is-flex">
        <div class="column-movie column is-fullheight is-3-tablet is-3-desktop is-half-mobile" v-for="(movie, index) in recommendations">
          <movie :movie="movie" :index="index"></movie>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {getImageUrl} from "@/movies/helpers";
  import Movie from '@/movies/components/movie'

  export default {
    props: ['id'],
    components: {Movie},
    data() {
      return {
        movie: {},
        actors: [],
        recommendations: [],
        endpoint: '/movies/',
      }
    },
    methods: {
      getMovie(id) {
        this.$http.get(this.endpoint + id)
          .then(response => {
            console.log(response.data);
            this.movie = response.data
          })
          .catch(error => {
            console.log('-----error-------');
            console.log(error)
            this.$router.push('/404');
          })
      },
      getActors(id) {
        this.$http.get(this.endpoint + id + '/actors')
          .then(response => {
            console.log(response.data);
            this.actors = response.data
          })
          .catch(error => {
            console.log('-----error-------');
            console.log(error)
            this.$router.push('/404');
          })
      },
      getRecommendations(id) {
        this.$http.get(this.endpoint + id + '/recommendations')
          .then(response => {
            console.log(response.data);
            this.recommendations = response.data.slice(0, 4)
          })
          .catch(error => {
            console.log('-----error-------');
            console.log(error)
            this.$router.push('/404');
          })
      },
      posterUrl(imageUrl, width = null, height = null) {
        return getImageUrl(imageUrl, width, height);
      },
      loadData(id) {
        this.getMovie(id);
        this.getActors(id);
        this.getRecommendations(id);
      }
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
    padding: 50px 20px 70px;
    h1.movie__title {
      font-size: 140%;
    }
    &__body {
      position: relative;
      z-index: 1;
    }
  }
</style>
