<template>
  <section class="section wrapper">
    <nav v-if="user.username" class="breadcrumb is-large">
      <ul>
        <li>
          <router-link :to="{ name: 'profile', params: {username: user.username} }">
            {{ $t('users.profile', { username: user.username }) }}
          </router-link>
        </li>
        <li class="is-active">
          <a>{{ $t('profilePage.watchedMovies') }}</a>
        </li>
      </ul>
    </nav>
    <div class="notification is-warning" v-if="totalMovies === 0">
      {{ $t('userLibraryPage.empty') }}
    </div>
    <movies-list :movies="movies"></movies-list>
    <pagination
        :current="currentPage"
        :total="totalMovies"
        :per-page="perPage"
        @page-changed="getUserWatchedMovies"
    ></pagination>
  </section>
</template>

<script>
  import MoviesList from '@/movies/components/moviesList'
  import Pagination from '@/components/pagination'
  export default {
    components: {MoviesList, Pagination},
    props: ['username'],
    data() {
      return {
        user: {},
        movies: [],
        totalMovies: 0,
        perPage: 20,
        currentPage: 1
      }
    },
    methods: {
      getUserWatchedMovies(page = null) {
        this.movies = [];

        if (page !== null) {
          this.currentPage = page;
        }

        if (this.username === this.$store.state.user.username) {
          this.getUserWatchedMoviesByUserId(this.$store.state.user.id)
        } else {
          this.getUserWatchedMoviesByUsername(this.username)
        }
      },
      getUserWatchedMoviesByUserId(id) {
        this.user = this.$store.state.user;
        this.loadMovies();
      },
      getUserWatchedMoviesByUsername(username) {
        this.$http.get('/users/byUsername/' + username)
          .then(response => {
            this.user = response.data
            this.loadMovies();
          })
          .catch(error => {
            console.log('-----error-------');
            console.log(error)
            this.$router.push('/404');
          })
      },
      loadMovies() {
        let offset = (this.currentPage * this.perPage) - this.perPage;
        let limit = this.perPage;
        let endpoint = '/users/{id}/watchedMovies'

        let id = this.user.id;

        this.$http.get(endpoint.replace('{id}', id), {params: {offset: offset, limit: limit}})
          .then(response => {
            this.movies = response.data.data
            this.totalMovies = response.data.paging.total
          })
          .catch(error => {
            console.log('-----error-------');
            console.log(error)
            this.$router.push('/404');
          })
      }
    },
    created() {
      this.currentPage = this.$router.currentRoute.query.page ? Number(this.$router.currentRoute.query.page) : 1;
      this.getUserWatchedMovies();
    },
    watch: {
      '$route'() {
        this.currentPage = this.$router.currentRoute.query.page ? Number(this.$router.currentRoute.query.page) : 1;
        this.getUserWatchedMovies()
      }
    }
  }
</script>

<style lang="scss">

</style>
