<template>
  <div class="container">
    <div class="content has-text-centered">
      <a href="https://www.themoviedb.org/"><img src="/src/assets/tmdb_small.png" alt="TMDb"></a>
      <div class="level-item">
        <a v-if="$store.state.locale === 'ru'" class="network-icon" href="https://vk.com/mykinotop">
          <img height="57"
               src="/src/assets/networks/vk.png"
               alt="Наша группа ВК"/>
        </a>
        <a v-if="$store.state.locale === 'ru'" class="network-icon" href="https://instagram.com/mykino.top">
          <img height="57"
               src="/src/assets/networks/instagram.png"
               alt="Наш канал в Instagram">
        </a>
      </div>
      <div class="control level-item">
        <div class="tags has-addons">
                <span class="tag is-dark">
                  <a class="has-text-white" href="https://github.com/svbackend/my-art-lib" target="_blank">Backend</a>
                </span>
          <span class="tag is-primary">
                  <a class="has-text-white" href="https://github.com/svbackend/my-art-lib-android"
                     target="_blank">Android App</a>
                </span>
          <span class="tag is-info">
                  <a class="has-text-white" href="https://github.com/svbackend/my-art-lib-spa"
                     target="_blank">Frontend</a>
                </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "footer-content"
  }
</script>

<style scoped>

</style>
