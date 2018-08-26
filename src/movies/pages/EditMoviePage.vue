<template lang="html">

</template>

<script>
  export default {
    props: ['id'],
    data() {
      return {
        movie: {},
      }
    },
    methods: {
      loadData() {

      },
      created() {
        this.loadData(this.id)
      },
      watch: {
        '$route'() {
          this.loadData(this.id)
        }
      }
    }
  }
</script>

<style lang="scss">

</style>
