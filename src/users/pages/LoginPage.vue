<template>
  <div class="form-login">

    <div class="field">
      <p class="control has-icons-left has-icons-right">
        <input class="input" :class="{ 'is-success': $v.username.$dirty && !$v.username.$error, 'is-danger': $v.username.$dirty && $v.username.$error }" type="text" placeholder="Email or username" v-model.trim="username" @input="$v.username.$touch()">
        <span class="icon is-small is-left">
          <i class="fa fa-envelope"></i>
        </span>
        <span class="icon is-small is-right">
          <i v-if="$v.username.$dirty && $v.username.$error" class="fa fa-times has-text-danger"></i>
          <i v-if="$v.username.$dirty && !$v.username.$error" class="fa fa-check has-text-success"></i>
        </span>
      </p>
      <p v-if="$v.username.$dirty && !$v.username.$error" class="help is-success">This username is available</p>
      <p v-if="$v.username.$dirty && $v.username.$error" class="help is-danger">
        <span v-if="!$v.username.required">This field is required</span>
        <span v-if="!$v.username.minLength">Username is too short</span>
      </p>
    </div>


    <div class="field">
      <p class="control has-icons-left">
        <input class="input" type="password" placeholder="Password">
        <span class="icon is-small is-left">
      <i class="fa fa-lock"></i>
    </span>
      </p>
    </div>

    <div class="column is-12">
      <p class="control">
        <button @click="validateAndSubmit" class="button is-primary" type="submit">Login</button>
      </p>
    </div>
  </div>
</template>

<script>
  import {required, minLength} from 'vuelidate/lib/validators'

  export default {
    name: 'form-login',
    data: () => ({
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
        minLength: minLength(4)
      }
    },
    methods: {
      validateAndSubmit() {
        this.$validator.validateAll().then((result) => {
          if (result) {
            return this.sendRequest();
          }

          // Need to fix form errors
        });
      },
      sendRequest() {
        this.$http.post('/auth/login', {
          credentials: {
            username: this.username,
            password: this.password,
          }
        }).then(response => {
          this.signIn(response.data.api_token);
        }).catch(error => {
          if (error.response.status === 500) {
            return this.showServerError();
          }
          return this.showError();
        });
      },
      signIn(apiToken) {
        this.$store.dispatch('setApiToken', apiToken);
        this.$router.push({name: 'home'});
      },
      showError() {
        this.errors.add('username', 'Username or password is incorrect, try again');
      },
      showServerError() {
        // todo 500 error handling
      }
    }
  };
</script>