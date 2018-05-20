<template>
  <div id="app">
    <section class="body">
      <section class="hero is-info is-medium is-bold">
        <div class="hero-head">
          <navigation></navigation>
        </div>
        <div class="hero-body">
          <search></search>
        </div>
      </section>

      <section class="container">
        <router-view></router-view>
      </section>

      <footer class="footer">
        <div class="container">
          <div class="content has-text-centered">
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
  import Navigation from "@/components/navigation";
  import Search from "@/movies/components/search"
  export default {
    name: 'home',
    components: {Navigation, Search},
  }
</script>