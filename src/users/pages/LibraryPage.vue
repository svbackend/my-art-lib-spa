<template lang="html">
  <section class="wrapper">
    <div class="movies columns is-multiline">
      <div class="column-movie column is-3-tablet is-2-desktop is-half-mobile" v-for="movie in movies">
        <movie :movie="movie"></movie>
      </div>
    </div>
  </section>
</template>

<script>
  import Movie from '@/movies/components/movie'
  export default {
    components: {Movie},
    props: ['username'],
    data() {
      return {
        user: {},
        movies: {},
      }
    },
    methods: {
      getUserWatchedMovies(id) {
        let endpoint = '/users/{id}/watchedMovies'
        this.$http.get(endpoint.replace('{id}', id))
          .then(response => {
            this.movies = response.data.data
            console.log(response)
          })
          .catch(error => {
            console.log('-----error-------');
            console.log(error)
            this.$router.push('/404');
          })
      }
    },
    created() {
      // todo if username !== current user username then load use by it
      this.getUserWatchedMovies(this.$store.state.user.id);
    },
    watch: {
      '$route'() {
        this.getUserWatchedMovies(this.username);
      }
    }
  }
</script>

<style lang="scss">

</style>
