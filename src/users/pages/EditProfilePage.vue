<template lang="html">
  <div class="form-movie-edit">

    <div class="field">
      <label class="label has-text-left" v-t="'fields.user.first_name'"></label>
      <p class="control">
        <input autofocus="autofocus" class="input" :class="{ 'is-success': $validator.isSuccess('first_name'), 'is-danger': $validator.isDanger('first_name') }" type="text" placeholder="First name" v-model.trim="first_name" @blur="$v.first_name.$touch()">
      </p>
      <p v-if="$validator.isDanger('first_name')" class="help is-danger">
        <span v-if="$validator.hasError('first_name', 'minLength')" v-t="$validator.showError('first_name', 'minLength')"></span>
      </p>
    </div>

    <div class="field">
      <label class="label has-text-left" v-t="'fields.user.last_name'"></label>
      <p class="control">
        <input class="input" :class="{ 'is-success': $validator.isSuccess('last_name'), 'is-danger': $validator.isDanger('last_name') }" type="text" placeholder="Last name" v-model.trim="last_name" @blur="$v.last_name.$touch()">
      </p>
      <p v-if="$validator.isDanger('last_name')" class="help is-danger">
        <span v-if="$validator.hasError('last_name', 'minLength')" v-t="$validator.showError('last_name', 'minLength')"></span>
      </p>
    </div>

    <div class="field">
      <label class="label has-text-left" v-t="'fields.user.birth_date'"></label>
      <p class="control">
        <input class="input" :class="{ 'is-success': $validator.isSuccess('birth_date'), 'is-danger': $validator.isDanger('birth_date') }" type="text" placeholder="YYYY-MM-DD" v-model.trim="birth_date" @blur="$v.birth_date.$touch()">
      </p>
      <p v-if="$validator.isDanger('birth_date')" class="help is-danger">
        <span v-if="$validator.hasError('birth_date', 'minLength')" v-t="$validator.showError('birth_date', 'minLength')"></span>
        <span v-if="$validator.hasError('birth_date', 'validDate')" v-t="$validator.showError('birth_date', 'validDate')"></span>
      </p>
    </div>

    <div class="field">
      <label class="label has-text-left" v-t="'fields.user.public_email'"></label>
      <p class="control">
        <input class="input" :class="{ 'is-success': $validator.isSuccess('public_email'), 'is-danger': $validator.isDanger('public_email') }" type="text" placeholder="Public email" v-model.trim="public_email" @blur="$v.public_email.$touch()">
      </p>
      <p v-if="$validator.isDanger('public_email')" class="help is-danger">
        <span v-if="$validator.hasError('public_email', 'email')" v-t="$validator.showError('public_email', 'email')"></span>
      </p>
    </div>

    <div class="field">
      <label class="label has-text-left" v-t="'fields.user.about'"></label>
      <p class="control">
        <textarea class="textarea" :class="{ 'is-success': $validator.isSuccess('about'), 'is-danger': $validator.isDanger('about') }" v-model="about" @blur="$v.about.$touch()" cols="30" rows="10"></textarea>
      </p>
      <p v-if="$validator.isDanger('about')" class="help is-danger">
        <span v-if="$validator.hasError('about', 'minLength')" v-t="$validator.showError('about', 'minLength')"></span>
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
  import moment from 'moment'
  import { minLength, maxLength, email } from 'vuelidate/lib/validators'
  import { regex } from 'vuelidate/lib/validators/common'
  const validDate = regex('alpha', /\d{4}-\d{2}-\d{2}/)

  export default {
    props: ['username'],
    data() {
      return {
        submitStatus: '',
        id: 0,
        first_name: '',
        last_name: '',
        birth_date: '',
        about: '',
        public_email: ''
      }
    },
    validations: {
      first_name: {
        minLength: minLength(2),
        maxLength: maxLength(50),
      },
      last_name: {
        minLength: minLength(2),
        maxLength: maxLength(50),
      },
      birth_date: {
        minLength: minLength(10),
        validDate
      },
      public_email: { email },
      about: { minLength: minLength(0) }
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
        this.$http.post('/users/' + this.id, {
          profile: {
            first_name: this.first_name,
            last_name: this.last_name,
            birth_date: this.birth_date ? moment(this.birth_date).format('YYYY-MM-DD') : '',
            about: this.about,
            public_email: this.public_email,
          }
        }).then(response => {
          this.$validator.clearErrors();
          this.$v.$touch()
          this.submitStatus = 'OK'
          setTimeout(() => {
            this.submitStatus = null;
          }, 3000)
        }).catch(error => {
          this.submitStatus = 'ERROR'
          if (error.response.status === 500) {
            //todo
          }
          // todo return this.showErrors(error.response.data);
        })
      },
      loadData(username) {
        if (username !== this.$store.state.user.username && this.$store.state.user.roles.indexOf('ROLE_ADMIN') === -1) {
          this.$router.push('/404');
        }

          this.$http.get('/users/byUsername/' + username)
            .then(response => {
              let profile = response.data.profile;
              this.id = response.data.id;
              this.first_name = profile.first_name;
              this.last_name = profile.last_name;
              this.birth_date = profile.birth_date ? moment(profile.birth_date).format('YYYY-MM-DD') : '';
              this.public_email = profile.public_email;
              this.about = profile.about;
            })
      },
    },
    created() {
      this.loadData(this.username)
    },
    watch: {
      '$route'() {
        this.loadData(this.username)
      }
    }
  }
</script>

<style lang="scss">

</style>
