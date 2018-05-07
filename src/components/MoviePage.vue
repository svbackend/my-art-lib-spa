<template lang="html">
  <div class="movie" v-if="movie.title">
    <h1 class="movie__title">{{ movie.title }}</h1>
    <p class="movie__body">{{ movie.overview }}</p>
    <p  class="movie__id">{{ movie.id }}</p>
  </div>
</template>

<script>
  export default {
    props: ['id'],
    data() {
      return {
        movie: {},
        endpoint: '/movies/',
      }
    },
    methods: {
      getMovie(id) {
        this.$http.get(this.endpoint + id)
          .then(response => {
            this.movie = response.data
          })
          .catch( error => {
            console.log('-----error-------');
            console.log(error)
            this.$router.push('/404');
          })
      }
    },

    created() {
      this.getMovie(this.id);
    },
    watch: {
      '$route'() {
        this.getMovie(this.id);
      }
    }
  }
</script>

<style lang="scss" scoped>
  .post {
    position: relative;
    max-width: 500px;
    margin: 0 auto;
    padding: 50px 20px 70px;
    &__title {
      position: relative;
      text-transform: uppercase;
      z-index: 1;
    }
    &__body {
      position: relative;
      z-index: 1;
    }
    &__id {
      position: absolute;
      font-size: 280px;
      bottom: -50px;
      margin: 0;
      color: #eeeeee;
      right: -20px;
      line-height: 1;
      font-weight: 900;
      z-index: 0;
    }
  }
</style>
