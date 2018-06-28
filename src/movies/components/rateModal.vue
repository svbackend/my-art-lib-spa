<template>
  <transition name="modal">
    <div class="modal is-active">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">{{ $t('movie.rate') }}</p>
          <button @click="close" class="delete" aria-label="close"></button>
        </header>
        <section class="modal-card-body">
          {{ $t('rateModal.yourVote') }}
          <stars :value="rating ? rating : null" @updateValue="updateVote"></stars>
        </section>
        <footer class="modal-card-foot">
          <button @click="close" class="button">{{ $t('common.close') }}</button>
        </footer>
      </div>
    </div>
  </transition>
</template>

<script>
  import Stars from '@/components/stars'
  export default {
    name: "rateModal",
    components: {Stars},
    props: {
      rating: {
        type: Number
      }
    },
    data() {
      return {}
    },
    methods: {
      close: function () {
        this.$emit('close')
      },
      updateVote(value) {
        this.$emit('updateVote', value)
      }
    }
  }
</script>

<style scoped>

</style>