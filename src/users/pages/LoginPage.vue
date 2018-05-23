<template>
  <div class="form-login">

    <div class="field">
      <label class="label has-text-left">Username</label>
      <p class="control has-icons-left has-icons-right">
        <input class="input" :class="{ 'is-success': $v.username.$dirty && !$v.username.$error, 'is-danger': $v.username.$dirty && $v.username.$error }" type="text" placeholder="Email or username" v-model.trim="username" @blur="$v.username.$touch()">
        <span class="icon is-small is-left">
          <i class="fa fa-envelope"></i>
        </span>
        <span class="icon is-small is-right">
          <i v-if="$v.username.$dirty && $v.username.$error" class="fa fa-times has-text-danger"></i>
          <i v-if="$v.username.$dirty && !$v.username.$error" class="fa fa-check has-text-success"></i>
        </span>
      </p>
      <!-- Example of success message: <p v-if="$v.username.$dirty && !$v.username.$error" class="help is-success">This username is available</p> -->
      <p v-if="$v.username.$dirty && $v.username.$error" class="help is-danger">
        <span v-if="!$v.username.required">This field is required</span>
        <span v-if="!$v.username.minLength">Username is too short</span>
      </p>
    </div>

    <div class="field">
      <label class="label has-text-left">Password</label>
      <p class="control has-icons-left has-icons-right">
        <input class="input" :class="{ 'is-success': $v.password.$dirty && !$v.password.$error, 'is-danger': $v.password.$dirty && $v.password.$error }" type="password" placeholder="Password" v-model.trim="password" @blur="$v.password.$touch()">
        <span class="icon is-small is-left">
          <i class="fa fa-lock"></i>
        </span>
        <span class="icon is-small is-right">
          <i v-if="$v.password.$dirty && $v.password.$error" class="fa fa-times has-text-danger"></i>
          <i v-if="$v.password.$dirty && !$v.password.$error" class="fa fa-check has-text-success"></i>
        </span>
      </p>
      <p v-if="validatorHasAnyError('password')" class="help is-danger">
        hello
        <span v-if="!$v.password.required">This field is required</span>
        <span v-if="!$v.password.minLength">Password is too short</span>
        <span v-if="validatorErrors.password._incorrect">Username or password is not correct</span>
        <span class="has-text-success" v-if="!validatorErrors.password._incorrect">Password is correct</span>
      </p>
    </div>

    <p class="control">
      <button @click="validateAndSubmit" class="button is-primary" type="submit">
        Login
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
    }),
    validations: {
      username: {
        required,
        minLength: minLength(3)
      },
      password: {
        required,
        minLength: minLength(4),
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
          validator.validatorClearErrors();
          this.submitStatus = 'OK'
          this.signIn(response.data.api_token);
        }).catch(error => {
          if (error.response.status === 500) {
            return this.showServerError();
          }
          return this.showErrors(error.response.data);
        });
      },
      signIn(apiToken) {
        this.$store.dispatch('setApiToken', apiToken);
        this.$router.push({name: 'home'});
      },
      showErrors(errors) {
        this.submitStatus = ''
        console.log('Some errors:');
        console.log(errors);
        this.validatorAddError('password', '_incorrect');
        this.$v.$touch()
        console.log(this.validatorErrors);
      },
      showServerError() {
        this.submitStatus = ''
        // todo 500 error handling
      }
    }
  };
</script>