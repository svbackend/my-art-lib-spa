<template>
  <nav class="navbar">
    <div class="container">
      <div class="navbar-brand">
        <router-link :to="{ name: 'home' }" class="navbar-item">
          <img src="http://bulma.io/images/bulma-type-white.png" alt="Logo">
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
                <router-link :to="{ name: 'home' }"><i class="fa fa-home"></i>&nbsp;Home</router-link>
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