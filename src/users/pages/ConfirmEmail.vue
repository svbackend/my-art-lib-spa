<template>
  <section class="section wrapper">
    <div v-if="status === 'PENDING'" class="preloader is-centered is-center">
      <span class="icon is-large is-centered is-center"><i class="fa fa-spinner fa-spin fa-3x"></i></span>
    </div>
    <div v-if="status === 'OK'" class="preloader is-centered is-center">
      <span class="icon is-large is-centered is-center has-text-success"><i class="fa fa-check fa-3x"></i></span>
    </div>
    <div v-if="status === 'ERROR'" class="preloader is-centered is-center">
      <span class="icon is-large is-centered is-center has-text-danger"><i class="fa fa-times fa-3x"></i></span>
      <hr>
      <p>{{ error }}</p>
    </div>
  </section>
</template>

<script>
  export default {
    props: ['token'],
    data() {
      return {
        status: 'PENDING',
        error: '',
      }
    },
    methods: {
      confirmEmail() {
        let token = this.token;

        this.$http.post('/confirmEmail', {token: token})
          .then(response => {
            this.status = 'OK';
            setTimeout(() => {
              this.$router.push({name: 'home'})
            }, 1000)
          })
          .catch(error => {
            this.status = 'ERROR';
            this.error = error.response.data.error;
            setTimeout(() => {
              this.$router.push({name: 'home'})
            }, 3000)
          })
      }
    },
    created() {
      this.confirmEmail();
    },
    watch: {
      '$route'() {
        this.confirmEmail();
      }
    }
  }
</script>
