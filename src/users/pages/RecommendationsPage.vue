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
          <a>{{ $t('profilePage.recommendations') }}</a>
        </li>
      </ul>
    </nav>
    <div v-if="pageLoaded === false" class="preloader is-centered is-center">
      <span class="icon is-large is-centered is-center"><i class="fa fa-spinner fa-spin fa-3x"></i></span>
    </div>
    <div class="notification is-warning" v-if="pageLoaded && totalMovies === 0">
      {{ $t('userRecommendationsPage.empty') }}
    </div>
    <movies-list :movies="movies"></movies-list>
    <pagination
        :current="currentPage"
        :total="totalMovies"
        :per-page="perPage"
        @page-changed="getUserRecommendations"
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
        currentPage: 1,
        pageLoaded: false,
      }
    },
    methods: {
      getUserRecommendations(page = null) {
        this.pageLoaded = false
        let id = this.user.id;

        this.movies = [];

        if (page !== null) {
          this.currentPage = page;
        }

        let offset = (this.currentPage * this.perPage) - this.perPage;
        let limit = this.perPage;
        let endpoint = '/users/{id}/recommendations'

        this.$http.get(endpoint.replace('{id}', id), {params: {offset: offset, limit: limit}})
          .then(response => {
            this.movies = response.data.data
            this.totalMovies = response.data.paging.total
            this.pageLoaded = true
          })
          .catch(error => {
            console.log('-----error-------');
            console.log(error)
            //this.$router.push('/404');
          })
      },
      loadData() {
        if (typeof this.user.username !== 'undefined' && this.user.username === this.username) {
          return;
        }

        if (this.username === this.$store.state.user.username) {
          this.user = this.$store.state.user;
          this.getUserRecommendations();
          return;
        }

        this.$http.get('/users/byUsername/' + this.username)
          .then(response => {
            this.user = response.data;
            this.getUserRecommendations();
          })
          .catch(exception => {
            this.$router.push('/404')
          })
      }
    },
    created() {
      this.currentPage = this.$router.currentRoute.query.page ? Number(this.$router.currentRoute.query.page) : 1;
      this.loadData();
    },
    watch: {
      '$route'() {
        this.currentPage = this.$router.currentRoute.query.page ? Number(this.$router.currentRoute.query.page) : 1;

        if (this.user.username !== this.username) {
          this.loadData()
          return;
        }

        this.getUserRecommendations();
      }
    }
  }
</script>

<style lang="scss">

</style>
