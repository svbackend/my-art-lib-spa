<template>
  <section class="wrapper">
    <pagination
        :current="page"
        :total="totalMovies"
        :per-page="perPage"
        @page-changed="getAllMovies"
    ></pagination>
    <!-- Movies -->
    <div class="movies columns is-multiline">
      <div class="column-movie column is-3-tablet is-3-desktop is-half-mobile" v-for="movie in movies">
        <div class="movie">
          <div class="poster">
            <img :src="movie.posterUrl ? movie.posterUrl : movie.originalPosterUrl" :alt="movie.title"/>
            <div class="actions buttons">
              <a v-if="!movie.isWatched" class="button is-success is-small"
                 @click.once="addToLibrary(movie.id, $event)">
                <span class="icon is-medium"><i class="fa fa-plus"></i></span>
              </a>
              <a v-else class="button is-danger is-small"
                 @click.once="removeFromLibrary(movie.id, $event)">
                <span class="icon is-medium"><i class="fa fa-times"></i></span>
              </a>
            </div>
          </div>
          <div class="information">
            <div class="title">
              <router-link
                  active-class="is-active"
                  class="link"
                  :to="{ name: 'movie', params: { id: movie.id } }">
                {{ movie.title }}
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import Pagination from '@/components/pagination'
  export default {
    components: {Pagination},
    props: {
      page: {
        default: 1,
        type: Number
      }
    },
    data() {
      return {
        movies: [],
        endpoint: '/movies',
        isUserLoggedIn: false,
        totalMovies: 0,
        perPage: 20,
        currentPage: 1
      }
    },
    created() {
      this.currentPage = this.page;
      this.getAllMovies(this.page);
      this.isUserLoggedIn = this.$store.state.isUserLoggedIn;
    },
    methods: {
      getAllMovies(page = null) {
        this.movies = [];
        if (page !== null) {
          this.currentPage = page;
        }
        let offset = (this.currentPage * this.perPage) - this.perPage;
        let limit = this.perPage;
        this.$http.get(this.endpoint, {params: {offset: offset, limit: limit}})
          .then(response => {
            this.movies = response.data.data;
            this.totalMovies = response.data.paging.total;
          })
          .catch(error => {
            console.log('-----error-------');
            console.log(error);
          })
      },
      addToLibrary(movieId, event) {
        // Todo move to movie component but learn more about events before
        event.target.innerHTML = '<span class="icon is-medium"><i class="fa fa-spin fa-spinner"></i></span>';

        let endpoint = '';

        if (this.$store.state.isUserLoggedIn === true) {
          endpoint = '/users/watchedMovies';
        } else {
          endpoint = '/guests/{token}/watchedMovies';
          endpoint = endpoint.replace('{token}', this.$store.state.guest.token);
        }

        this.$http.post(endpoint, {
          movie: {
            id: movieId,
            tmdbId: null,
            vote: null,
            watchedAt: null,
          }
        })
          .then(response => {
            event.target.innerHTML = '<span class="icon is-medium"><i class="fa fa-plus"></i></span>';
          })
          .catch(error => {
            event.target.innerHTML = '<span class="icon is-medium"><i class="fa fa-times"></i></span>';
            console.log('-----error-------');
            console.log(error);
          })
      },
      removeFromLibrary(movieId, event) {
        // Todo move to movie component but learn more about events before
        event.target.innerHTML = '<span class="icon is-medium"><i class="fa fa-spin fa-spinner"></i></span>';

        let endpoint = '';

        if (this.$store.state.isUserLoggedIn === true) {
          endpoint = '/users/{user}/watchedMovies/{movie}';
          endpoint = endpoint.replace('{user}', this.$store.state.user.id);
        } else {
          endpoint = '/guests/{token}/watchedMovies/{movie}';
          endpoint = endpoint.replace('{token}', this.$store.state.guest.token);
        }
        endpoint = endpoint.replace('{movie}', movieId);

        this.$http.delete(endpoint)
          .then(response => {
            event.target.innerHTML = '<span class="icon is-medium"><i class="fa fa-times"></i></span>';
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

</style>
