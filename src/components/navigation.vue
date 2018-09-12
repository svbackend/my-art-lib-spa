<template>
  <nav class="navbar">
    <div class="container">
      <div class="navbar-brand">
        <router-link :to="{ name: 'home' }" class="navbar-item">
          <span class="logo">
            <span class="my">my</span>
            <span class="kinotop">kino.top</span>
          </span>
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
              <li class="is-active is-hidden-mobile">
                <router-link :to="{ name: 'home' }"><i class="fa fa-home"></i>&nbsp;{{ $t('common.home') }}</router-link>
              </li>
              <li v-if="this.$store.state.isUserLoggedIn === false">
                <router-link :to="{ name: 'login' }" v-t="'users.login'"></router-link>
              </li>
              <li v-if="this.$store.state.isUserLoggedIn === false">
                <router-link :to="{ name: 'registration' }" v-t="'users.registration'"></router-link>
              </li>
              <li v-if="this.$store.state.isUserLoggedIn === true">
                <router-link :to="{ name: 'library', params: {username: this.$store.state.user.username} }" v-t="'users.my_library'"></router-link>
              </li>
              <li v-if="this.$store.state.isUserLoggedIn === true">
                <router-link :to="{ name: 'recommendations', params: {username: this.$store.state.user.username} }" v-t="'users.my_recommendations'"></router-link>
              </li>
              <li v-if="this.$store.state.isUserLoggedIn === true">
                <router-link :to="{ name: 'wishlist', params: {username: this.$store.state.user.username} }" v-t="'users.my_wishlist'"></router-link>
              </li>
              <li v-if="this.$store.state.isUserLoggedIn === true">
                <router-link :to="{ name: 'profile', params: {username: this.$store.state.user.username} }" v-t="'users.my_profile'"></router-link>
              </li>

              <template v-if="langMenuIsOpen">
                <li v-for="locale in locales">
                  <a class="image-shadow" v-if="locale !== getCurrentLocale()" @click="switchLocale(locale)">
                    <img width="32px" :src="getLocaleFlagImageUrl(locale)" :alt="locale" />
                  </a>
                </li>
              </template>

              <li>
                <a class="image-shadow" @click="langMenuIsOpen = !langMenuIsOpen">
                  <img width="32px" :src="getLocaleFlagImageUrl(getCurrentLocale())" :alt="getCurrentLocale()" />
                </a>
              </li>

              <li v-if="this.$store.state.isUserLoggedIn === true">
                <a @click="logout()" v-t="'users.logout'"></a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
  import {locales, getCurrentLocale} from '@/translations'

  export default {
    name: "navigation",
    data() {
      return {
        menuIsOpen: false,
        langMenuIsOpen: false,
        locales: locales,
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
      },
      getCurrentLocale,
      switchLocale(locale) {
        this.$store.dispatch('setLocale', locale);
        location.reload();
      },
      getLocaleFlagImageUrl(locale) {
        return '/src/assets/flags/' + locale + '.png'
      }
    }
  }
</script>

<style scoped>

</style>