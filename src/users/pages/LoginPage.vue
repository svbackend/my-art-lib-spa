<template>
  <div class="form-login">
    <div class="field">
      <label class="label has-text-left" v-t="'fields.username'"></label>
      <p class="control has-icons-left has-icons-right">
        <input autofocus="autofocus" class="input" :class="{ 'is-success': this.validator.isSuccess('username'), 'is-danger': this.validator.isDanger('username') }" type="text" placeholder="Email or username" v-model.trim="username" @blur="$v.username.$touch()">
        <span class="icon is-small is-left">
          <i class="fa fa-envelope"></i>
        </span>
        <span class="icon is-small is-right">
          <i v-if="this.validator.isSuccess('username')" class="fa fa-check has-text-success"></i>
          <i v-if="this.validator.isDanger('username')" class="fa fa-times has-text-danger"></i>
        </span>
      </p>
      <p v-if="this.validator.hasAnyError()" class="help is-danger">
        <span v-if="this.validator.hasError('username', 'required')" v-t="this.validator.getErrorMessage('username', 'required')"></span>
        <span v-if="this.validator.hasError('username', 'minLength')" v-t="this.validator.getErrorMessage('username', 'minLength')"></span>
      </p>
    </div>

    <label class="label has-text-left" v-t="'fields.password'"></label>
    <div class="field has-addons">
      <p class="control is-expanded has-icons-left has-icons-right">
        <input class="input" :class="{ 'is-success': this.validator.isSuccess('password'), 'is-danger': this.validator.isDanger('password') }" :type="passwordInputType" placeholder="Password" v-model.trim="password" @blur="$v.password.$touch()">
        <span class="icon is-small is-left">
          <i class="fa fa-lock"></i>
        </span>
        <span class="icon is-small is-right">
          <i v-if="this.validator.isSuccess('password')" class="fa fa-check has-text-success"></i>
          <i v-if="this.validator.isDanger('password')" class="fa fa-times has-text-danger"></i>
        </span>
      </p>

      <p class="control">
        <a class="button" :class="{'is-dark': this.passwordInputType === 'password', 'is-black': this.passwordInputType === 'text'}" @click="switchPasswordInputType">
          <i class="fa fa-eye"></i>
        </a>
      </p>
    </div>
    <p v-if="this.validator.isDanger('password')" class="help help-underField is-danger">
      <span v-if="this.validator.hasError('password', 'required')" v-t="this.validator.getErrorMessage('password', 'required')"></span>
      <span v-if="this.validator.hasError('password', 'minLength')" v-t="this.validator.getErrorMessage('password', 'minLength')"></span>
      <span v-if="this.validator.hasError('password', '_incorrect')" v-t="this.validator.getErrorMessage('password', '_incorrect')"></span>
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
    components: {
      validator
    },
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
        if (this.validator.hasAnyError()) {
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
          this.removeAllErrors();
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
      showErrors(errors) {
        this.submitStatus = ''
        this.validator.addError('password', '_incorrect');
        this.$v.$touch()
      },
      showServerError() {
        this.submitStatus = ''
        // todo 500 error handling
      },
      switchPasswordInputType() {
        this.passwordInputType = this.passwordInputType === 'password' ? 'text' : 'password';
      }
    },
    created() {
      console.log('created');
      //console.log(validator.hasAnyError());
      console.log(validator.methods.hasAnyError());
    },
  };
</script>