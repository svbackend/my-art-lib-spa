<template lang="html">
  <section class="section wrapper">
      <h2 class="title">{{ $t('movie.actors') }}</h2>

    <div v-if="pageLoaded === false" class="preloader is-centered is-center">
      <span class="icon is-large is-centered is-center"><i class="fa fa-spinner fa-spin fa-3x"></i></span>
    </div>

      <div class="actor-movies columns is-multiline is-flex">
        <div class="column-actor column is-fullheight is-3-tablet is-3-desktop is-half-mobile"
             v-for="actor in actors">
          <div class="actor movie">
            <div class="poster">
              <img :src="posterUrl(actor.actor.photo, 260, 380)" :alt="actor.actor.name"/>
            </div>
            <div class="information">
              <div class="title">
                <router-link
                  active-class="is-active"
                  class="link"
                  :to="{ name: 'actor', params: { id: actor.actor.id } }">
                  {{ actor.actor.name }}
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>

    <pagination
      :current="currentPage"
      :total="totalActors"
      :per-page="perPage"
      @page-changed="getActors"
    ></pagination>
  </section>
</template>

<script>
  import {getImageUrl} from "@/movies/helpers";
  import Pagination from '@/components/pagination'

  export default {
    props: ['id'],
    components: {Pagination},
    data() {
      return {
        actors: [],
        totalActors: 0,
        perPage: 20,
        currentPage: 1,
        pageLoaded: false,
      }
    },
    methods: {
      getActors(page = null) {
        this.pageLoaded = false;
        this.actors = [];

        if (page !== null) {
          this.currentPage = page;
        }

        let offset = (this.currentPage * this.perPage) - this.perPage;
        let limit = this.perPage;
        let endpoint = '/movies/{id}/actors'

        this.$http.get(endpoint.replace('{id}', this.id), {params: {offset: offset, limit: limit}})
          .then(response => {
            this.actors = response.data.data
            this.totalActors = response.data.paging.total
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
        this.getActors();
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
