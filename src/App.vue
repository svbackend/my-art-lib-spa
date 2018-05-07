<template>
  <div id="app">
    <header>
      <h1>My Art Lib</h1>
    </header>
    <main>
      <aside class="sidebar">
        sidebar
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
      console.log('guest:');
      console.log(this.$localStorage.get('guest', {}));
      console.log('user:');
      console.log(this.$localStorage.get('user', {}));
    },
    methods: {
      loadGuestSession() {
        let guest = this.$localStorage.get('guest', null);

        if (guest !== null && guest.token !== null) {
          this.guest = guest;
          return;
        }

        this.$http.post(this.endpoint)
          .then(response => {
            this.guest = response.data;
            this.$localStorage.set('guest', this.guest);
          })
          .catch(error => {
            console.log('-----error-------');
            console.log(error);
          })
      },
      loadUser() {
        let user = this.$localStorage.get('user', null);

        console.log('user');
        console.log(user);
        return true;

        if (user === null) {
          return false;
        }

        if (user.apiToken === null || user.apiToken.length < 32) {
          return false;
        }

        this.user.apiToken = apiToken;
        return true;
      }
    }
  }
</script>

<style lang="scss">

</style>
