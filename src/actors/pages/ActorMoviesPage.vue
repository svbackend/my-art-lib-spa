<template lang="html">
  <section class="section-actor-movies">
    <h2 class="title">{{ $t('actorPage.movies') }}</h2>

    <div v-if="pageLoaded === false" class="preloader is-centered is-center">
      <span class="icon is-large is-centered is-center"><i class="fa fa-spinner fa-spin fa-3x"></i></span>
    </div>

    <movies-list :movies="movies"></movies-list>

    <pagination
      :current="currentPage"
      :total="totalMovies"
      :per-page="perPage"
      @page-changed="getMovies"
    ></pagination>
  </section>
</template>

<script>
  import Pagination from '@/components/pagination'
  import MoviesList from '@/movies/components/moviesList'

  export default {
    props: ['id'],
    components: {Pagination, MoviesList},
    data() {
      return {
        movies: [],
        perPage: 20,
        currentPage: 1,
        pageLoaded: false,
        totalMovies: 0,
      }
    },
    methods: {
      getMovies(page = null) {
        this.pageLoaded = false;
        this.movies = [];

        if (page !== null) {
          this.currentPage = page;
        }

        let offset = (this.currentPage * this.perPage) - this.perPage;
        let limit = this.perPage;
        let endpoint = '/actors/{id}/movies'

        this.$http.get(endpoint.replace('{id}', this.id), {params: {offset: offset, limit: limit}})
          .then(response => {
            this.movies = response.data.data;
            this.totalMovies = response.data.paging.total;
            this.pageLoaded = true
          })
          .catch(error => {
            console.log('-----error-------');
            console.log(error)
            //this.$router.push('/404');
          })
      },
      loadData() {
        this.getMovies();
      },
    },
    created() {
      this.loadData()
    },
    watch: {
      '$route'() {
        this.currentPage = this.$router.currentRoute.query.page ? Number(this.$router.currentRoute.query.page) : 1;
        this.loadData()
      }
    }
  }
</script>

<style lang="scss">
  .actor-movies {
    margin-top: 1.5rem;
  }
</style>
