<template>
  <nav class="navbar">
    <div class="container">
      <div class="navbar-brand">
        <router-link :to="{ name: 'home' }" class="navbar-item">
          <img src="http://bulma.io/images/bulma-type-white.png" alt="Logo">
        </router-link>
        <span class="navbar-burger burger" data-target="navbarMenu">
                                <span></span>
                                <span></span>
                                <span></span>
                            </span>
      </div>
      <div id="navbarMenu" class="navbar-menu">
        <div class="navbar-end">
          <div class="tabs is-right">
            <ul>
              <li class="is-active">
                <router-link :to="{ name: 'home' }">Home</router-link>
              </li>
              <li v-if="this.$store.state.isUserLoggedIn">
                <a @click="logout()">Logout</a>
              </li>
              <li v-if="!this.$store.state.isUserLoggedIn">
                <router-link :to="{ name: 'login' }">Login</router-link>
              </li>
              <li v-if="!this.$store.state.isUserLoggedIn">
                <router-link :to="{ name: 'registration' }">Registration</router-link>
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
    name: "navigation"
  }
</script>

<style scoped>

</style>