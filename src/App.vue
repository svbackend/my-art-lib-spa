<template>
  <div id="app">
    <nav class="navbar is-dark" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <router-link class="navbar-item" :to="{ name: 'home' }">
          <img src="https://bulma.io/images/bulma-logo.png" alt="Bulma: a modern CSS framework based on Flexbox" width="112" height="28">
        </router-link>
      </div>
      <a v-if="this.$store.state.isUserLoggedIn" class="navbar-item" @click="logout()">
        Logout
      </a>
      <router-link v-if="!this.$store.state.isUserLoggedIn" class="navbar-item" :to="{ name: 'login' }">
        Login
      </router-link>
      <router-link v-if="!this.$store.state.isUserLoggedIn" class="navbar-item" :to="{ name: 'registration' }">
        Registration
      </router-link>

      <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </nav>

    <section class="section">
      <div class="container">
        <router-view></router-view>
      </div>
    </section>
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
