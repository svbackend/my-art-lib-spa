<template lang="html">
  <section class="section wrapper">
      <h2 class="title">{{ $t('movie.recommendations') }}</h2>

      <div v-if="totalMovies === 0 && pageLoaded === false" class="movie-recommendations-loading">
        <hr>
        <i class="fa fa-spinner fa-spin"></i>
        {{ $t('movie.recommendations_loading') }}
        <hr>
      </div>

      <div class="movie-recommendations columns is-multiline is-flex">
        <div class="column-movie column is-fullheight is-3-tablet is-3-desktop is-half-mobile" v-for="(recommendedMovie, index) in recommendations">
          <div class="movie">
            <div class="poster">
              <img :src="posterUrl(recommendedMovie.posterUrl ? recommendedMovie.posterUrl : recommendedMovie.originalPosterUrl, 260, 380)" :alt="recommendedMovie.title"/>
              <div v-if="$store.state.isUserLoggedIn === true" class="actions right">
                <a v-if="recommendedMovie.userRecommendedMovie === null" @click="addRecommendation(recommendedMovie)" class="addRecommendation button is-success is-small">{{ $t('movie.addRecommendation') }}
                  &nbsp;
                  <span class="icon is-medium"><i class="fa fa-thumbs-up"></i></span>
                </a>
                <a v-else @click="removeRecommendation(recommendedMovie)" class="removeRecommendation button is-danger is-small">{{ $t('movie.removeRecommendation') }}
                  &nbsp;
                  <span class="icon is-medium"><i class="fa fa-thumbs-down"></i></span>
                </a>
              </div>

            </div>
            <div class="information">
              <div class="title">
                <router-link
                    active-class="is-active"
                    class="link"
                    :to="{ name: 'movie', params: { id: recommendedMovie.id } }">
                  {{ recommendedMovie.title }} ({{ recommendedMovie.releaseDate | year }})
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>

    <pagination
      :current="currentPage"
      :total="totalMovies"
      :per-page="perPage"
      @page-changed="getRecommendations"
    ></pagination>
  </section>
</template>

<script>
  import {getImageUrl, addRecommendation, removeRecommendation, addToLibrary, removeFromLibrary, getUserVoteForMovie, setUserVoteForMovie} from "@/movies/helpers";
  import Pagination from '@/components/pagination'

  export default {
    props: ['id'],
    components: {Pagination},
    data() {
      return {
        recommendations: [],
        totalMovies: 0,
        perPage: 20,
        currentPage: 1,
        pageLoaded: false,
      }
    },
    methods: {
      getRecommendations(page = null) {
        this.pageLoaded = false;
        this.recommendations = [];

        if (page !== null) {
          this.currentPage = page;
        }

        let offset = (this.currentPage * this.perPage) - this.perPage;
        let limit = this.perPage;
        let endpoint = '/movies/{id}/recommendations'

        this.$http.get(endpoint.replace('{id}', this.id), {params: {offset: offset, limit: limit}})
          .then(response => {
            this.recommendations = response.data.data
            this.totalMovies = response.data.paging.total
            this.pageLoaded = true
          })
          .catch(error => {
            console.log('-----error-------');
            console.log(error)
            //this.$router.push('/404');
          })
      },
      posterUrl(imageUrl, width = null, height = null) {
        return getImageUrl(imageUrl, width, height);
      },
      loadData() {
        this.getRecommendations();
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
  .movie-recommendations {
    margin-top: 1.5rem;
  }
</style>
