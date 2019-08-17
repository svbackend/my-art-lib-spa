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
        <div class="container">
          <div class="content has-text-centered">
            <a href="https://www.themoviedb.org/"><img src="/src/assets/tmdb_small.png" alt="TMDb"></a>
            <div class="control level-item">
              <div class="tags has-addons">
                <span class="tag is-dark">
                  <a class="has-text-white" href="https://github.com/svbackend/my-art-lib" target="_blank">Backend</a>
                </span>
                <span class="tag is-info">
                  <a class="has-text-white" href="https://github.com/svbackend/my-art-lib-spa" target="_blank">Frontend</a>
                </span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </section>
  </div>
</template>

<script>
  import Navigation from "@/components/navigation"
  import App from "@/App"
  export default {
    name: 'default',
    extends: App,
    components: {Navigation},
  }
</script>
