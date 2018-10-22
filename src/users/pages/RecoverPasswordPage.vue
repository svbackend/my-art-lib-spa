<template lang="html">
  <div class="form-password-edit page-content">

    <div v-if="submitStatus === 'OK'" class="notification is-success">
      <button @click="submitStatus=null" class="delete"></button>
      {{ $t('recoverPasswordPage.success') }}
    </div>

    <div v-if="submitStatus === 'ERROR'" class="notification is-danger">
      <button @click="submitStatus=null" class="delete"></button>
      {{ $t('recoverPasswordPage.error') }}
    </div>

    <div class="field">
      <label class="label has-text-left" v-t="'fields.user.new_password'"></label>
      <p class="control">
        <input autofocus="autofocus" class="input" :class="{ 'is-success': $validator.isSuccess('new_password'), 'is-danger': $validator.isDanger('new_password') }" type="password" placeholder="New password" v-model.trim="new_password" @blur="$v.new_password.$touch()">
      </p>
      <p v-if="$validator.isDanger('new_password')" class="help is-danger">
        <span v-if="$validator.hasError('new_password', 'minLength')" v-t="$validator.showError('new_password', 'minLength')"></span>
      </p>
    </div>

    <p class="control">
      <button @click="validateAndSubmit" class="button is-primary" type="submit">
        <span v-t="'common.save'"></span>
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
  import { minLength, maxLength } from 'vuelidate/lib/validators'

  export default {
    props: ['token'],
    data() {
      return {
        submitStatus: '',
        new_password: '',
      }
    },
    validations: {
      new_password: {
        minLength: minLength(4),
        maxLength: maxLength(4096),
      },
    },
    methods: {
      validateAndSubmit() {
        this.$v.$touch();
        if (this.$v.$invalid) {
          this.submitStatus = 'ERROR';
          return;
        }

        this.submitStatus = 'PENDING';
        this.sendRequest();
      },
      sendRequest() {
        this.$http.post('/passwordRecovery', {
          password: this.new_password,
          token: this.token,
        }).then(response => {
          this.$validator.clearErrors();
          this.$v.$touch();
          this.submitStatus = 'OK'
          setTimeout(() => {
            this.submitStatus = null;
            this.$router.push('/login')
          }, 3000)
        }).catch(error => {
          this.submitStatus = 'ERROR'
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
    }
  }
</script>

<style lang="scss">

</style>
