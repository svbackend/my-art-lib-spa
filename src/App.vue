<template>
  <div id="app">
    <header>
      <h1>My Art Lib</h1>
    </header>
    <main>
      <aside class="sidebar">
        <div v-if="this.$store.state.isUserLoggedIn" class="user-buttons">
          <a class="logout-button" @click="logout()">
            Logout
          </a>
        </div>
        <div v-else class="guest-buttons">
          <router-link class="login-button" :to="{ name: 'login' }">
            Login
          </router-link>
          <router-link class="registration-button" :to="{ name: 'registration' }">
            Registration
          </router-link>
        </div>
      </aside>
      <div class="content">
        <router-view></router-view>
      </div>
    </main>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        endpoint: '/guests',
        guest: {},
        user: {},
      }
    },
    created() {
      if (this.loadUser() === false) {
        this.loadGuestSession();
      }
      console.log(this.guest.id);
    },
    methods: {
      loadGuestSession() {
        let guest = this.$store.state.guest;

        if (guest.token !== null) {
            console.log('guestToken: ' + guest.token);
            console.log('guestId: ' + guest.id);
          this.guest = guest;
          return;
        }

        this.$http.post(this.endpoint)
          .then(response => {
              console.log('request end: ');
              console.log(response.data);
            this.guest = response.data;
            this.$store.dispatch('setGuest', this.guest);
          })
          .catch(error => {
            console.log('-----error-------');
            console.log(error);
          })
      },
      loadUser() {
        let user = this.$store.state.user;

        if (typeof user === 'undefined' || user === null) {
          return false;
        }

        if (typeof user.apiToken  === 'undefined' || user.apiToken === null || user.apiToken.length < 32) {
          return false;
        }

        this.user.apiToken = user.apiToken;
        return true;
      },
      logout() {
        this.$store.dispatch('logout');
        this.$router.go({
          path: this.$router.path,
          query: {
            t: + new Date()
          }
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
