<template>
  <div id="app">
    <section class="body">
      <section class="hero homepage-bg is-medium is-bold">
        <div class="hero-head">
          <navigation></navigation>
        </div>
        <div class="hero-body">
          <search></search>
        </div>
      </section>

      <section class="section">
        <div class="container">
          <router-view></router-view>
        </div>
      </section>

      <footer class="footer">
        <footer-content></footer-content>
      </footer>
    </section>
  </div>
</template>

<script>
  import Navigation from "@/components/navigation"
  import Search from "@/movies/components/search"
  import FooterContent from "@/components/footer"
  import App from "@/App"
  export default {
    name: 'home',
    extends: App,
    components: {FooterContent, Navigation, Search},
  }
</script>
