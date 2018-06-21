<template>
  <div class="form-login">
    <div class="field">
      <label class="label has-text-left" v-t="'fields.username'"></label>
      <p class="control has-icons-left has-icons-right">
        <input autofocus="autofocus" class="input" :class="{ 'is-success': $validator.isDirty('username') && !$validator.hasAnyError('username'), 'is-danger': $validator.isDirty('username') && $validator.hasAnyError('username') }" type="text" placeholder="Email or username" v-model.trim="username" @blur="$v.username.$touch()">
        <span class="icon is-small is-left">
          <i class="fa fa-envelope"></i>
        </span>
        <span class="icon is-small is-right">
          <i v-if="$validator.isDirty('username') && $validator.hasAnyError('username')" class="fa fa-times has-text-danger"></i>
          <i v-if="$validator.isDirty('username') && !$validator.hasAnyError('username')" class="fa fa-check has-text-success"></i>
        </span>
      </p>
      <p v-if="$validator.isDirty('username') && $validator.hasAnyError('username')" class="help is-danger">
        <span v-if="$validator.hasError('username', 'required')" v-t="$validator.showError('username', 'required')"></span>
        <span v-if="$validator.hasError('username', 'minLength')" v-t="$validator.showError('username', 'minLength')"></span>
      </p>
    </div>

    <label class="label has-text-left" v-t="'fields.password'"></label>
    <div class="field has-addons">
      <p class="control is-expanded has-icons-left has-icons-right">
        <input class="input" :class="{ 'is-success': $validator.isDirty('password') && !$validator.hasAnyError('password'), 'is-danger': $validator.isDirty('password') && $validator.hasAnyError('password') }" :type="passwordInputType" placeholder="Password" v-model.trim="password" @blur="$v.password.$touch()">
        <span class="icon is-small is-left">
          <i class="fa fa-lock"></i>
        </span>
        <span class="icon is-small is-right">
          <i v-if="$validator.isDirty('password') && $validator.hasAnyError('password')" class="fa fa-times has-text-danger"></i>
          <i v-if="$validator.isDirty('password') && !$validator.hasAnyError('password')" class="fa fa-check has-text-success"></i>
        </span>
      </p>

      <p class="control">
        <a class="button" :class="{'is-dark': this.passwordInputType === 'password', 'is-black': this.passwordInputType === 'text'}" @click="switchPasswordInputType">
          <i class="fa fa-eye"></i>
        </a>
      </p>
    </div>
    <p v-if="$validator.isDirty('password') && $validator.hasAnyError('password')" class="help help-underField is-danger">
      <span v-if="$validator.hasError('password', 'required')" v-t="$validator.showError('password', 'required')"></span>
      <span v-if="$validator.hasError('password', 'minLength')" v-t="$validator.showError('password', 'minLength')"></span>
      <span v-if="$validator.hasError('password', '_incorrect')" v-t="$validator.showError('password', '_incorrect')"></span>
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

  export default {
    name: 'form-login',
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
          this.$validator.clearErrors();
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
        this.$validator.addError('password', '_incorrect');
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