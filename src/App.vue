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
        guest: {},
        user: {},
      }
    },
    created() {
      if (this.loadUser() === false) {
        this.loadGuestSession();
      }
    },
    methods: {
      loadGuestSession() {
        let guest = this.$store.state.guest;

        if (guest.token !== null) {
          //todo somehow check is guest session not expired yet and maybe load new one
          this.guest = guest;
          return;
        }

        this.$http.post('/guests')
          .then(response => {
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
      }
    }
  }
</script>
