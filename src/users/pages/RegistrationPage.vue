<template>
  <div class="form-login">
    <div class="field">
      <label class="label has-text-left" v-t="'fields.email'"></label>
      <p class="control has-icons-left has-icons-right">
        <input autofocus="autofocus" class="input" :class="{ 'is-success': $validator.isSuccess('email'), 'is-danger': $validator.isDanger('email') }" type="text" placeholder="Email" v-model.trim="email" @blur="blurEmail">
        <span class="icon is-small is-left">
          <i class="fa fa-envelope"></i>
        </span>
        <span class="icon is-small is-right">
          <i v-if="$validator.isSuccess('email')" class="fa fa-check has-text-success"></i>
          <i v-if="$validator.isDanger('email')" class="fa fa-times has-text-danger"></i>
        </span>
      </p>
      <p v-if="$validator.isDanger('email')" class="help is-danger">
        <span v-if="$validator.hasError('email', 'required')" v-t="$validator.showError('email', 'required')"></span>
        <span v-if="$validator.hasError('email', 'email')" v-t="$validator.showError('email', 'email')"></span>
        <span v-if="$validator.hasError('email', '_isUniqueError')" v-t="$validator.showError('email', '_isUniqueError')"></span>
      </p>
    </div>

    <div class="field">
      <label class="label has-text-left" v-t="'fields.username'"></label>
      <p class="control has-icons-left has-icons-right">
        <input autofocus="autofocus" class="input" :class="{ 'is-success': $validator.isSuccess('username'), 'is-danger': $validator.isDanger('username') }" type="text" :placeholder="$t('fields.usernamePlaceholder')" v-model.trim="username" @blur="blurUsername">
        <span class="icon is-small is-left">
          <i class="fa fa-user"></i>
        </span>
        <span class="icon is-small is-right">
          <i v-if="usernameIsLoading === false && $validator.isSuccess('username')" class="fa fa-check has-text-success"></i>
          <i v-if="usernameIsLoading === false && $validator.isDanger('username')" class="fa fa-times has-text-danger"></i>
          <i v-if="usernameIsLoading === true" class="fa fa-spin fa-spinner has-text-dark"></i>
        </span>
      </p>
      <p v-if="$validator.isSuccess('username')" class="help is-success">
        {{ profileUrl }}
      </p>
      <p v-if="$validator.isDanger('username')" class="help is-danger">
        <span v-if="$validator.hasError('username', 'required')" v-t="$validator.showError('username', 'required')"></span>
        <span v-if="$validator.hasError('username', 'minLength')" v-t="$validator.showError('username', 'minLength')"></span>
        <span v-if="$validator.hasError('username', 'maxLength')" v-t="$validator.showError('username', 'maxLength')"></span>
        <span v-if="$validator.hasError('username', 'validUsername')" v-t="$validator.showError('username', 'validUsername')"></span>
        <span v-if="$validator.hasError('username', '_isUniqueError')" v-t="$validator.showError('username', '_isUniqueError')"></span>
      </p>
    </div>

    <label class="label has-text-left" v-t="'fields.password'"></label>
    <div class="field has-addons">
      <p class="control is-expanded has-icons-left has-icons-right">
        <input class="input" :class="{ 'is-success': $validator.isSuccess('password'), 'is-danger': $validator.isDanger('password') }" :type="passwordInputType" placeholder="Password" v-model.trim="password" @blur="$v.password.$touch()">
        <span class="icon is-small is-left">
          <i class="fa fa-lock"></i>
        </span>
        <span class="icon is-small is-right">
          <i v-if="$validator.isSuccess('password')" class="fa fa-check has-text-success"></i>
          <i v-if="$validator.isDanger('password')" class="fa fa-times has-text-danger"></i>
        </span>
      </p>

      <p class="control">
        <a class="button" :class="{'is-dark': this.passwordInputType === 'password', 'is-black': this.passwordInputType === 'text'}" @click="switchPasswordInputType">
          <i class="fa fa-eye"></i>
        </a>
      </p>
    </div>
    <p v-if="$validator.isDanger('password')" class="help help-underField is-danger">
      <span v-if="$validator.hasError('password', 'required')" v-t="$validator.showError('password', 'required')"></span>
      <span v-if="$validator.hasError('password', 'minLength')" v-t="$validator.showError('password', 'minLength')"></span>
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

  // All these weird UTF codes here to support characters from Polish and Ukrainian languages as "ę", "ą", "є", "ї" etc.
  const validUsername = regex('alpha', /^[\-_0-9a-zA-Z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*$/)

  export default {
    name: 'form-login',
    data: () => ({
      submitStatus: '',
      email: '',
      username: '',
      usernameIsLoading: false,
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
      sendRequest() {
        this.$http.post('/users', {
          registration: {
            email: this.email,
            username: this.username,
            password: this.password,
          }
        }).then(response => {
          this.sendAuthRequest(response);
          this.$validator.clearErrors();
          this.$v.$touch()
          this.submitStatus = 'OK'
          this.$router.push({name: 'home'});
        }).catch(error => {
          if (error.response.status === 500) {
            return this.showServerError();
          }
          return this.showErrors(error.response.data);
        })
      },
      sendAuthRequest(registrationResponse) {
        this.$http.post('/auth/login', {
          credentials: {
            username: this.username,
            password: this.password,
          }
        }).then(response => {
          this.$store.dispatch('setUser', response.data);
          this.$store.dispatch('setApiToken', response.data.api_token);
        }).catch(error => {
          if (error.response.status === 500) {
            return this.showServerError();
          }
          return this.showErrors(error.response.data);
        })
      },
      showErrors(errors) {
        this.submitStatus = ''

        console.log(errors);
        this.$validator.loadServerErrors(errors.errors);

        this.$v.$touch()
      },
      blurEmail() {
        this.$v.email.$touch();
        this.$validator.removeError('email', '_isUniqueError');

        if (this.$validator.hasAnyError('email')) {
          return;
        }

        if (!this.username) {
          this.username = this.email.split('@')[0];
          this.blurUsername();
        }

        this.$http.get('/users/email/' + this.email)
          .then(response => {
            this.$validator.addError('email', '_isUniqueError');
          })
          .catch(error => {
            this.$validator.removeError('email', '_isUniqueError');
          }).finally(e => {
          this.$v.email.$touch();
        });
      },
      blurUsername() {
        this.usernameIsLoading = true;

        this.$http.get('/users/username/' + this.username)
          .then(response => {
            this.$validator.addError('username', '_isUniqueError');
          })
          .catch(error => {
            this.$validator.removeError('username', '_isUniqueError');
          }).finally(e => {
          this.usernameIsLoading = false;
          this.$v.username.$touch();
        });
      },
      validateAndSubmit() {
        this.$v.$touch()
        if (this.$v.$invalid) {
          this.submitStatus = 'ERROR'
          return;
        }

        this.submitStatus = 'PENDING'
        this.sendRequest();
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