<template>
  <div class="form-login">
    <div class="field">
      <label class="label has-text-left" v-t="'fields.email'"></label>
      <p class="control has-icons-left has-icons-right">
        <input autofocus="autofocus" class="input" :class="{ 'is-success': isSuccess('email'), 'is-danger': isDanger('email') }" type="text" placeholder="Email" v-model.trim="email" @blur="blurEmail">
        <span class="icon is-small is-left">
          <i class="fa fa-envelope"></i>
        </span>
        <span class="icon is-small is-right">
          <i v-if="isSuccess('email')" class="fa fa-check has-text-success"></i>
          <i v-if="isDanger('email')" class="fa fa-times has-text-danger"></i>
        </span>
      </p>
      <p v-if="isDanger('email')" class="help is-danger">
        <span v-if="validatorHasError('email', 'required')" v-t="validatorShowError('email', 'required')"></span>
        <span v-if="validatorHasError('email', 'email')" v-t="validatorShowError('email', 'email')"></span>
        <span v-if="validatorHasError('email', '_isUniqueError')" v-t="validatorShowError('email', '_isUniqueError')"></span>
      </p>
    </div>

    <div class="field">
      <label class="label has-text-left" v-t="'fields.username'"></label>
      <p class="control has-icons-left has-icons-right">
        <input autofocus="autofocus" class="input" :class="{ 'is-success': isSuccess('username'), 'is-danger': isDanger('username') }" type="text" :placeholder="$t('fields.usernamePlaceholder')" v-model.trim="username" @blur="blurUsername">
        <span class="icon is-small is-left">
          <i class="fa fa-envelope"></i>
        </span>
        <span class="icon is-small is-right">
          <i v-if="isSuccess('username')" class="fa fa-check has-text-success"></i>
          <i v-if="isDanger('username')" class="fa fa-times has-text-danger"></i>
        </span>
      </p>
      <p v-if="isSuccess('username')" class="help is-success">
        {{ profileUrl }}
      </p>
      <p v-if="isDanger('username')" class="help is-danger">
        <span v-if="validatorHasError('username', 'required')" v-t="validatorShowError('username', 'required')"></span>
        <span v-if="validatorHasError('username', 'minLength')" v-t="validatorShowError('username', 'minLength')"></span>
        <span v-if="validatorHasError('username', 'maxLength')" v-t="validatorShowError('username', 'maxLength')"></span>
        <span v-if="validatorHasError('username', 'validUsername')" v-t="validatorShowError('username', 'validUsername')"></span>
        <span v-if="validatorHasError('username', '_isUniqueError')" v-t="validatorShowError('username', '_isUniqueError')"></span>
      </p>
    </div>

    <label class="label has-text-left" v-t="'fields.password'"></label>
    <div class="field has-addons">
      <p class="control is-expanded has-icons-left has-icons-right">
        <input class="input" :class="{ 'is-success': isSuccess('password'), 'is-danger': isDanger('password') }" :type="passwordInputType" placeholder="Password" v-model.trim="password" @blur="$v.password.$touch()">
        <span class="icon is-small is-left">
          <i class="fa fa-lock"></i>
        </span>
        <span class="icon is-small is-right">
          <i v-if="isSuccess('password')" class="fa fa-check has-text-success"></i>
          <i v-if="isDanger('password')" class="fa fa-times has-text-danger"></i>
        </span>
      </p>

      <p class="control">
        <a class="button" :class="{'is-dark': this.passwordInputType === 'password', 'is-black': this.passwordInputType === 'text'}" @click="switchPasswordInputType">
          <i class="fa fa-eye"></i>
        </a>
      </p>
    </div>
    <p v-if="isDanger('password')" class="help help-underField is-danger">
      <span v-if="validatorHasError('password', 'required')" v-t="validatorShowError('password', 'required')"></span>
      <span v-if="validatorHasError('password', 'minLength')" v-t="validatorShowError('password', 'minLength')"></span>
    </p>

    <p class="control">
      <button @click="validateAndSubmit" class="button is-primary" type="submit">
        <span v-t="'registrationPage.register'"></span>
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
  import { required, minLength, maxLength, email} from 'vuelidate/lib/validators'
  import { regex } from 'vuelidate/lib/validators/common'
  import validator from '@/components/validator'
  // All these weird UTF codes here to support characters from Polish and Ukrainian languages as "ę", "ą", "є", "ї" etc.
  const validUsername = regex('alpha', /^[\-_0-9a-zA-Z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*$/)

  export default {
    name: 'form-login',
    extends: validator,
    data: () => ({
      submitStatus: '',
      email: '',
      username: '',
      password: '',
      passwordInputType: 'password',
    }),
    validations: {
      email: {
        required,
        email,
        _isUniqueError: false
      },
      username: {
        required,
        minLength: minLength(4),
        maxLength: maxLength(50),
        validUsername,
        _isUniqueError: false
      },
      password: {
        required,
        minLength: minLength(6)
      }
    },
    methods: {
      blurEmail() {
        this.$v.email.$touch();
        if (this.validatorHasAnyError('email')) {
          return;
        }

        if (!this.username) {
          this.username = this.email.split('@')[0];
          this.blurUsername();
        }

        let self = this;
        this.$http.get('/users/email/' + this.email)
          .then(function (response) {
            self.validatorAddError('email', '_isUniqueError');
          })
          .catch(function (error) {
            self.validatorRemoveError('email', '_isUniqueError');
          });
      },
      blurUsername() {
        this.$v.username.$touch();

        if (this.validatorHasAnyError('username')) {
          return;
        }

        let self = this;
        this.$http.get('/users/username/' + this.username)
          .then(function (response) {
            self.validatorAddError('username', '_isUniqueError');
          })
          .catch(function (error) {
            self.validatorRemoveError('username', '_isUniqueError');
          });
      },
      validateAndSubmit() {
        this.$v.$touch()
        if (this.$v.$invalid) {
          this.submitStatus = 'ERROR'
          return;
        }

        this.submitStatus = 'PENDING'
        //this.sendRequest();
      },
      switchPasswordInputType() {
        this.passwordInputType = this.passwordInputType === 'password' ? 'text' : 'password';
      }
    },
    computed: {
      profileUrl() {
        return window.location.hostname + '/u/' + this.username;
      }
    }
  };
</script>