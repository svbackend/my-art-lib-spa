<template>
  <div class="movies">
    <h4>Movies</h4>
    <div v-for="movie in movies">
      <div class="movie">
        <div class="title">
          <router-link
            active-class="is-active"
            class="link"
            :to="{ name: 'movie', params: { id: movie.id } }">
            {{ movie.title }}
          </router-link>
        </div>
        <div class="poster">
          <img :src="movie.posterUrl ? movie.posterUrl : movie.originalPosterUrl" :alt="movie.title"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        movies: [],
        endpoint: '/movies',
      }
    },
    created() {
      this.getAllMovies();
    },
    methods: {
      getAllMovies() {
        this.$http.get(this.endpoint)
          .then(response => {
            this.movies = response.data;
          })
          .catch(error => {
            console.log('-----error-------');
            console.log(error);
          })
      }
    }
  }
</script>

<style lang="scss">
  body { background: #f1f1f1; }

  .movie {
    float: left;
    max-width: 350px;
    border: 1px solid rgba(0,0,0,.5);
    .poster {
      max-width: 100%;
      img {
        max-width: 100%;
      }
    }

  }
</style>
