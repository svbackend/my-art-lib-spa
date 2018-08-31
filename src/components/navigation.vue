<template>
  <nav class="navbar">
    <div class="container">
      <div class="navbar-brand">
        <router-link :to="{ name: 'home' }" class="navbar-item">
          <svg width="300" height="26.342058312066673" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs"><defs id="SvgjsDefs1002"></defs><g id="SvgjsG1008" transform="scale(0.6775220759276407)" opacity="1"><g id="SvgjsG1009" class="text" transform="translate(-3.430000066757202, 38.880001068115234)" light-content="false" fill="#FFF" fill-opacity="0.65"><path d="M3.46 -38.88L26.51 0L35.86 -16.08L35.86 -35.65L27.66 -21.59L17.23 -38.88ZM37.76 0L50.71 0L50.71 -38.88L37.76 -38.88ZM3.43 0L15.53 0L15.53 -14.97L3.43 -35.27Z M72.56 -12.36L72.56 0L85.54 0L85.54 -11.46L72.09 -38.88L59.38 -38.88ZM86.36 -14.18L98.9 -38.88L86.45 -38.88L80.06 -26.95Z"></path></g><g id="SvgjsG1010" class="text" transform="translate(105.5399999332428, 38.880001068115234)" light-content="false" fill="#fff"><path d="M3.43 0L16.38 0L16.38 -38.88L3.43 -38.88ZM18.37 -5.51L40.93 -38.88L27.45 -38.85L18.37 -24.4ZM41.54 0L30.82 -20.57L23.14 -9.05L27.54 0Z M48.98 -8.29L48.98 0L69.72 0L69.72 -8.29L65.82 -8.29L65.82 -30.62L69.72 -30.62L69.72 -38.88L48.98 -38.88L48.98 -30.62L52.88 -30.62L52.88 -8.29Z M119.31 0L95.67 -38.88L81.99 -38.88L105.54 0ZM81.99 0L93.27 0L93.27 -16.7L81.99 -35.19ZM119.31 -38.88L108.04 -38.88L108.04 -22.27L119.31 -3.69Z M144.24 -7.91L144.24 -31L149.1 -31L149.1 -38.88L139.14 -38.88L131.26 -31.11L131.26 -7.76L139.14 0L149.1 0L149.1 -7.91ZM156.11 -31L156.11 -7.91L151.15 -7.91L151.15 0L161.2 0L169.05 -7.76L169.05 -31.11L161.2 -38.88L151.15 -38.88L151.15 -31Z M181.91 -9.05L181.91 0L194.86 0L194.86 -9.05Z M216.83 -28.39L216.83 0L230.3 0L230.3 -28.39ZM206.69 -38.88L206.69 -30.41L240.44 -30.41L240.44 -38.88Z M263.46 -7.91L263.46 -31L268.32 -31L268.32 -38.88L258.36 -38.88L250.48 -31.11L250.48 -7.76L258.36 0L268.32 0L268.32 -7.91ZM275.33 -31L275.33 -7.91L270.38 -7.91L270.38 0L280.42 0L288.28 -7.76L288.28 -31.11L280.42 -38.88L270.38 -38.88L270.38 -31Z M300.19 0L312.91 0L312.91 -38.88L300.19 -38.88ZM314.96 -31.11L324.36 -31.11L324.36 -17.78L314.96 -17.78L314.96 -9.99L329.49 -9.99L337.25 -17.78L337.25 -31.11L329.49 -38.88L314.96 -38.88Z"></path></g></g></svg>
        </router-link>
        <span class="navbar-burger burger" :class="{'is-active': menuIsOpen}" data-target="navbarMenu" @click="menuIsOpen = !menuIsOpen">
          <span></span>
          <span></span>
          <span></span>
        </span>
      </div>
      <div id="navbarMenu" class="navbar-menu" :class="{'is-active': menuIsOpen}">
        <div class="navbar-end">
          <div class="tabs is-right">
            <ul>
              <li class="is-active">
                <router-link :to="{ name: 'home' }"><i class="fa fa-home"></i>&nbsp;{{ $t('common.home') }}</router-link>
              </li>
              <li v-if="this.$store.state.isUserLoggedIn === true">
                <router-link :to="{ name: 'library', params: {username: this.$store.state.user.username} }" v-t="'users.my_library'"></router-link>
              </li>
              <li v-if="this.$store.state.isUserLoggedIn === true">
                <router-link :to="{ name: 'recommendations', params: {username: this.$store.state.user.username} }" v-t="'users.my_recommendations'"></router-link>
              </li>
              <li v-if="this.$store.state.isUserLoggedIn === true">
                <a @click="logout()" v-t="'users.logout'"></a>
              </li>
              <li v-if="this.$store.state.isUserLoggedIn === false">
                <router-link :to="{ name: 'login' }" v-t="'users.login'"></router-link>
              </li>
              <li v-if="this.$store.state.isUserLoggedIn === false">
                <router-link :to="{ name: 'registration' }" v-t="'users.registration'"></router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
  export default {
    name: "navigation",
    data() {
      return {
        menuIsOpen: false,
      }
    },
    methods: {
      logout() {
        this.$store.dispatch('logout');
        this.$router.go({
          path: this.$router.path,
          query: {
            t: +new Date()
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>