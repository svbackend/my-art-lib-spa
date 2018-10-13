<template lang="html">
  <div class="form-password-edit page-content">

    <h4 class="title">
      <router-link :to="{ name: 'profile.edit', paramrs: { username: this.username } }">
        {{ $t('editProfilePage.title') }}
      </router-link>
      &nbsp;/&nbsp;
      <i class="fa fa-key"></i>&nbsp;{{ $t('editPasswordPage.title') }}
    </h4>

    <div v-if="submitStatus === 'OK'" class="notification is-success">
      <button @click="submitStatus=null" class="delete"></button>
      {{ $t('editPasswordPage.success') }}
    </div>

    <div v-if="submitStatus === 'ERROR'" class="notification is-danger">
      <button @click="submitStatus=null" class="delete"></button>
      {{ $t('editPasswordPage.error') }}
    </div>

    <div class="field">
      <label class="label has-text-left" v-t="'fields.user.old_password'"></label>
      <p class="control">
        <input autofocus="autofocus" class="input" :class="{ 'is-success': $validator.isSuccess('old_password'), 'is-danger': $validator.isDanger('old_password') }" type="password" placeholder="Old password" v-model.trim="old_password" @blur="$v.old_password.$touch()">
      </p>
      <p v-if="$validator.isDanger('old_password')" class="help is-danger">
        <span v-if="$validator.hasError('old_password', 'minLength')" v-t="$validator.showError('old_password', 'minLength')"></span>
      </p>
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
    props: ['username'],
    data() {
      return {
        submitStatus: '',
        id: 0,
        old_password: '',
        new_password: '',
      }
    },
    validations: {
      old_password: {
        minLength: minLength(4),
        maxLength: maxLength(4096),
      },
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
        this.$http.post('/users/' + this.id + '/password', {
          old_password: this.old_password,
          new_password: this.new_password,
        }).then(response => {
          this.$validator.clearErrors();
          this.$v.$touch();
          this.submitStatus = 'OK'
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
      if (this.$store.state.isUserLoggedIn === false) {
        this.$router.push('/404')
      }
      this.id = this.$store.state.user.id
    }
  }
</script>

<style lang="scss">

</style>
