<script>
  export default {
    metaInfo: {
      title: 'Default Title',
      titleTemplate: '%s | My Awesome Webapp',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ]
    },
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
