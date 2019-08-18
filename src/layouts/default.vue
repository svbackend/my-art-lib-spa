<template>
  <div id="app">
    <section class="body">
      <section class="hero is-medium is-bold">
        <div class="hero-head">
          <navigation></navigation>
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
  import FooterContent from "@/components/footer"
  import App from "@/App"
  export default {
    name: 'default',
    extends: App,
    components: {Navigation, FooterContent},
  }
</script>
