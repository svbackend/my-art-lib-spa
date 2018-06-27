<template>
  <div class="modal is-active">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Modal title</p>
        <button @click="close" class="delete" aria-label="close"></button>
      </header>
      <section class="modal-card-body">
        Lorem Ipsum Sit Doler Amet
      </section>
      <footer class="modal-card-foot">
        <button @click="close" class="button">Close</button>
      </footer>
    </div>
  </div>
</template>

<script>
  export default {
    name: "rateModal",
    props: {
      movie: {
        type: Object
      }
    },
    data() {
      return {}
    },
    methods: {
      close: function() {
        this.$emit('close')
      }
    }
  }
</script>

<style scoped>

</style>