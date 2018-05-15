<template>
    <div class="form-login">
        <div class="column is-12">
            <label class="label">Username</label>
            <p class="control has-icon has-icon-right">
                <input name="username" v-model="username" v-validate="{ required: true, min: 3 }" :class="{'input': true, 'is-danger': errors.has('username') }" data-vv-delay="500" type="text" placeholder="Email or username">
                <i v-show="errors.has('username')" class="fa fa-warning"></i>
                <span v-show="errors.has('username')" class="help is-danger">{{ errors.first('username') }}</span>
            </p>
        </div>
        <div class="column is-12">
            <label class="label">Password</label>
            <p class="control has-icon has-icon-right">
                <input name="password" v-model="password" v-validate="{ required: true, min: 6 }" :class="{'input': true, 'is-danger': errors.has('password') }" data-vv-delay="500" type="password">
                <i v-show="errors.has('password')" class="fa fa-warning"></i>
                <span v-show="errors.has('password')" class="help is-danger">{{ errors.first('password') }}</span>
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
  export default {
    name: 'form-login',
    data: () => ({
      username: '',
      password: '',
    }),
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