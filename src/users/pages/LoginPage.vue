<template>
  <div class="form-login">
    <div class="field">
      <label class="label has-text-left" v-t="'fields.username'"></label>
      <p class="control has-icons-left has-icons-right">
        <input autofocus="autofocus" class="input" :class="{ 'is-success': isDirty('username') && !validatorHasAnyError('username'), 'is-danger': isDirty('username') && validatorHasAnyError('username') }" type="text" placeholder="Email or username" v-model.trim="username" @blur="$v.username.$touch()">
        <span class="icon is-small is-left">
          <i class="fa fa-envelope"></i>
        </span>
        <span class="icon is-small is-right">
          <i v-if="isDirty('username') && validatorHasAnyError('username')" class="fa fa-times has-text-danger"></i>
          <i v-if="isDirty('username') && !validatorHasAnyError('username')" class="fa fa-check has-text-success"></i>
        </span>
      </p>
      <p v-if="isDirty('username') && validatorHasAnyError('username')" class="help is-danger">
        <span v-if="validatorHasError('username', 'required')" v-t="validatorShowError('username', 'required')"></span>
        <span v-if="validatorHasError('username', 'minLength')" v-t="validatorShowError('username', 'minLength')"></span>
      </p>
    </div>

    <label class="label has-text-left" v-t="'fields.password'"></label>
    <div class="field has-addons">
      <p class="control is-expanded has-icons-left has-icons-right">
        <input class="input" :class="{ 'is-success': isDirty('password') && !validatorHasAnyError('password'), 'is-danger': isDirty('password') && validatorHasAnyError('password') }" :type="passwordInputType" placeholder="Password" v-model.trim="password" @blur="$v.password.$touch()">
        <span class="icon is-small is-left">
          <i class="fa fa-lock"></i>
        </span>
        <span class="icon is-small is-right">
          <i v-if="isDirty('password') && validatorHasAnyError('password')" class="fa fa-times has-text-danger"></i>
          <i v-if="isDirty('password') && !validatorHasAnyError('password')" class="fa fa-check has-text-success"></i>
        </span>
      </p>

      <p class="control">
        <a class="button" :class="{'is-dark': this.passwordInputType === 'password', 'is-black': this.passwordInputType === 'text'}" @click="switchPasswordInputType">
          <i class="fa fa-eye"></i>
        </a>
      </p>
    </div>
    <p v-if="isDirty('password') && validatorHasAnyError('password')" class="help help-underField is-danger">
      <span v-if="validatorHasError('password', 'required')" v-t="validatorShowError('password', 'required')"></span>
      <span v-if="validatorHasError('password', 'minLength')" v-t="validatorShowError('password', 'minLength')"></span>
      <span v-if="validatorHasError('password', '_incorrect')" v-t="validatorShowError('password', '_incorrect')"></span>
    </p>

    <p class="control">
      <button @click="validateAndSubmit" class="button is-primary" type="submit">
        <span v-t="'loginPage.authorize'"></span>
        <span v-if="submitStatus">
            &nbsp;
            <i v-if="submitStatus === 'PENDING'" class="fa fa-spin fa-spinner"></i>
            <i v-if="submitStatus === 'OK'" class="fa fa-check"></i>
          </span>
      </button>
    </p>

  </div>
</template>

<script>
  import {required, minLength} from 'vuelidate/lib/validators'
  import validator from '@/components/validator'

  export default {
    name: 'form-login',
    extends: validator,
    data: () => ({
      submitStatus: '',
      username: '',
      password: '',
      passwordInputType: 'password',
    }),
    validations: {
      username: {
        required,
        minLength: minLength(4)
      },
      password: {
        required,
        minLength: minLength(6),
        _incorrect: false
      }
    },
    methods: {
      validateAndSubmit() {
        this.$v.$touch()
        if (this.$v.$invalid) {
          this.submitStatus = 'ERROR'
          return;
        }

        this.submitStatus = 'PENDING'
        this.sendRequest();
      },
      sendRequest() {
        this.$http.post('/auth/login', {
          credentials: {
            username: this.username,
            password: this.password,
          }
        }).then(response => {
          this.validatorClearErrors();
          this.$v.$touch()
          this.submitStatus = 'OK'
          this.signIn(response.data.api_token);
        }).catch(error => {
          if (error.response.status === 500) {
            return this.showServerError();
          }
          return this.showErrors(error.response.data);
        })
      },
      signIn(apiToken) {
        this.$store.dispatch('setApiToken', apiToken);
        this.$router.push({name: 'home'});
      },
      mergeGuestMovies() {
        if (this.$store.state.guest.token) {
          let guestSessionToken = this.$store.state.guest.token;
          this.$http.post('/users/mergeWatchedMovies', {
            token: guestSessionToken
          }).then(response => {
            // I think nothing should be here
          }).catch(error => {
            // todo
          })
        }
      },
      showErrors(errors) {
        this.submitStatus = ''
        this.validatorAddError('password', '_incorrect');
        this.$v.$touch()
      },
      showServerError() {
        this.submitStatus = ''
        // todo 500 error handling
      },
      switchPasswordInputType() {
        this.passwordInputType = this.passwordInputType === 'password' ? 'text' : 'password';
      }
    }
  };
</script>