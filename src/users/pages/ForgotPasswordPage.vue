<template lang="html">
  <div class="form-password-edit page-content">

    <div v-if="submitStatus === 'OK'" class="notification is-success">
      <button @click="submitStatus=null" class="delete"></button>
      {{ $t('forgotPasswordPage.success') }}
      <span v-if="responseStatus === 'success'" v-t="'forgotPasswordPage.emailSent'"></span>
      <span v-if="responseStatus === 'token_already_sent'" v-t="'forgotPasswordPage.tokenAlreadySent'"></span>
    </div>

    <div v-if="submitStatus === 'ERROR'" class="notification is-danger">
      <button @click="submitStatus=null" class="delete"></button>
      {{ $t('forgotPasswordPage.error') }}
    </div>

    <div class="field">
      <label class="label has-text-left" v-t="'fields.email'"></label>
      <p class="control">
        <input autofocus="autofocus" class="input" :class="{ 'is-success': $validator.isSuccess('email'), 'is-danger': $validator.isDanger('email') }" type="email" v-model.trim="email" @blur="$v.email.$touch()">
      </p>
      <p v-if="$validator.isDanger('email')" class="help is-danger">
        <span v-if="$validator.hasError('email', 'email')" v-t="$validator.showError('email', 'email')"></span>
        <span v-if="$validator.hasError('email', 'required')" v-t="$validator.showError('email', 'required')"></span>
      </p>
    </div>

    <p class="control">
      <button @click="validateAndSubmit" class="button is-primary" type="submit">
        <span v-t="'forgotPasswordPage.sendRecoveryEmail'"></span>
        <span v-if="submitStatus">
            &nbsp;
            <i v-if="submitStatus === 'PENDING'" class="fa fa-spin fa-spinner"></i>
            <i v-if="submitStatus === 'OK'" class="fa fa-check"></i>
            <i v-if="submitStatus === 'ERROR'" class="fa fa-times"></i>
        </span>
      </button>
    </p>
  </div>
</template>

<script>
  import { required, email} from 'vuelidate/lib/validators'

  export default {
    props: ['username'],
    data() {
      return {
        submitStatus: '',
        responseStatus: '',
        id: 0,
        email: '',
      }
    },
    validations: {
      email: {
        required,
        email,
      },
    },
    methods: {
      validateAndSubmit() {
        this.$v.$touch();
        if (this.$v.$invalid) {
          return;
        }

        this.submitStatus = 'PENDING';
        this.sendRequest();
      },
      sendRequest() {
        this.$http.get('/users/' + this.email + '/recoverPassword')
          .then(response => {
          this.$validator.clearErrors();
          this.$v.$touch();
          this.submitStatus = 'OK'
          this.responseStatus = response.data.status
        }).catch(error => {
          this.submitStatus = 'ERROR'
        }).finally(() => {
          setTimeout(() => {
            this.submitStatus = null;
          }, 3000)
        })
      }
    },
    created() {
      if (this.$store.state.isUserLoggedIn === true) {
        this.$router.push('/404')
      }
      this.email = this.username;
    }
  }
</script>

<style lang="scss">

</style>
