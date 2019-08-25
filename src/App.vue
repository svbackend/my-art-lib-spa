<script>
  import {apiHost} from "@/config";

  export default {
    metaInfo: {
      title: 'Movie Catalog with crowd based recommendations',
      titleTemplate: '%s | MyKino.top',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ],
      link: [
        { rel: 'dns-prefetch', href: apiHost }
      ]
    },
    data () {
      return {
        user: {},
      }
    },
    created() {
      const html = document.documentElement;
      html.setAttribute('lang', this.$t('seo.lang'));
      this.loadUser()
    },
    methods: {
      loadUser() {
        let user = this.$store.state.user;

        if (typeof user === 'undefined' || user === null) {
          return false;
        }

        if (typeof user.apiToken  === 'undefined' || user.apiToken === null || user.apiToken.length < 32) {
          return false;
        }

        this.user.apiToken = user.apiToken;

        this.$http.get('/users/me')
          .then(response => {
            this.$store.dispatch('setUser', response.data);
          })
          .catch(error => {
            console.log('-----error-------');
            console.log(error);
          })
        return true;
      }
    }
  }
</script>
