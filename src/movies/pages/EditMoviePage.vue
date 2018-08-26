<template lang="html">
  <div class="form-movie-edit">

    <div class="field">
      <label class="label has-text-left" v-t="'fields.movie.originalTitle'"></label>
      <p class="control">
        <input autofocus="autofocus" class="input" :class="{ 'is-success': $validator.isSuccess('originalTitle'), 'is-danger': $validator.isDanger('originalTitle') }" type="text" placeholder="Title" v-model.trim="originalTitle" @blur="$v.originalTitle.$touch()">
      </p>
      <p v-if="$validator.isDanger('originalTitle')" class="help is-danger">
        <span v-if="$validator.hasError('originalTitle', 'required')" v-t="$validator.showError('originalTitle', 'required')"></span>
      </p>
    </div>

    <div class="field">
      <label class="label has-text-left" v-t="'fields.movie.imdbId'"></label>
      <p class="control">
        <input class="input" :class="{ 'is-success': $validator.isSuccess('imdbId'), 'is-danger': $validator.isDanger('imdbId') }" type="text" placeholder="Title" v-model.trim="imdbId" @blur="$v.imdbId.$touch()">
      </p>
      <p v-if="$validator.isDanger('imdbId')" class="help is-danger">
        <span v-if="$validator.hasError('imdbId', 'required')" v-t="$validator.showError('imdbId', 'required')"></span>
      </p>
    </div>

    <div class="field">
      <label class="label has-text-left" v-t="'fields.movie.runtime'"></label>
      <p class="control">
        <input class="input" :class="{ 'is-success': $validator.isSuccess('runtime'), 'is-danger': $validator.isDanger('runtime') }" type="text" placeholder="Title" v-model.trim="runtime" @blur="$v.runtime.$touch()">
      </p>
      <p v-if="$validator.isDanger('runtime')" class="help is-danger">
        <span v-if="$validator.hasError('runtime', 'required')" v-t="$validator.showError('runtime', 'required')"></span>
      </p>
    </div>

    <div class="field">
      <label class="label has-text-left" v-t="'fields.movie.budget'"></label>
      <p class="control">
        <input class="input" :class="{ 'is-success': $validator.isSuccess('budget'), 'is-danger': $validator.isDanger('budget') }" type="text" placeholder="Title" v-model.trim="budget" @blur="$v.budget.$touch()">
      </p>
      <p v-if="$validator.isDanger('budget')" class="help is-danger">
        <span v-if="$validator.hasError('budget', 'required')" v-t="$validator.showError('budget', 'required')"></span>
      </p>
    </div>

    <div class="field">
      <label class="label has-text-left" v-t="'fields.movie.releaseDate'"></label>
      <p class="control">
        <input class="input" :class="{ 'is-success': $validator.isSuccess('releaseDate'), 'is-danger': $validator.isDanger('releaseDate') }" type="text" placeholder="Title" v-model.trim="releaseDate" @blur="$v.releaseDate.$touch()">
      </p>
      <p v-if="$validator.isDanger('releaseDate')" class="help is-danger">
        <span v-if="$validator.hasError('releaseDate', 'required')" v-t="$validator.showError('releaseDate', 'required')"></span>
      </p>
    </div>

    <div class="columns">
      <div class="column" v-for="locale in locales">

        Locale: <b>{{ locale }}</b>
        <div class="field">
          <label class="label has-text-left" v-t="'fields.movie.title'"></label>
          <p class="control">
            <input class="input" :class="{ 'is-success': $validator.isSuccess('translations.' + locale + '.title'), 'is-danger': $validator.isDanger('translations.' + locale + '.title') }" type="text" placeholder="Title" v-model="translations[locale].title" @blur="$v.translations[locale].title.$touch()">
          </p>
          <p v-if="$validator.isDanger('translations.' + locale + '.title')" class="help is-danger">
            <span v-if="$validator.hasError('translations.' + locale + '.title', 'required')" v-t="$validator.showError('translations.' + locale + '.title', 'required')"></span>
          </p>
        </div>

      </div>
    </div>

    <p class="control">
      <button @click="validateAndSubmit" class="button is-primary" type="submit">
        <span v-t="'common.save'"></span>
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
  import { locales } from '@/translations/index'
  import { required, minLength, maxLength, numeric } from 'vuelidate/lib/validators'
  export default {
    props: ['id'],
    data() {
      return {
        locales: locales,
        payload: {},
        originalTitle: '',
        imdbId: '',
        runtime: 0,
        budget: 0,
        releaseDate: '',
        translations: [],
        submitStatus: null,
      }
    },
    validations: {
      originalTitle: {
        required,
        minLength: minLength(2),
        maxLength: maxLength(100),
      },
      imdbId: {
        minLength: minLength(5),
        maxLength: maxLength(20),
      },
      runtime: {
        numeric,
      },
      budget: {
        numeric,
      },
      releaseDate: {

      },
      translations: {
        $each: {
          title: {
            required,
            minLength: minLength(2),
            maxLength: maxLength(100),
          },
          overview: {
            minLength: minLength(0),
          },
        }
      }
    },
    methods: {
      validateAndSubmit() {
        // todo
      },
      loadData(id) {
        let locale;
        for (locale of locales) {
          this.$http.get('/movies/' + id + '?language=' + locale)
            .then(response => {
              let data = response.data;
              this.payload[locale] = response;

              this.originalTitle = data.originalTitle;
              this.imdbId = data.imdbId;
              this.runtime = data.runtime;
              this.budget = data.budget;
              this.releaseDate = data.releaseDate;

              this.translations[locale] = {};
              this.translations[locale].locale = data.locale;
              this.translations[locale].title = data.title;
              this.translations[locale].overview = data.overview;

              console.log('TRANSLATED TITLE');
              console.log(this.translations[locale].title);
            })
        }
      },
    },
    created() {
      console.log('Locales ------------------');
      console.log(locales);
      this.loadData(this.id)
    },
    watch: {
      '$route'() {
        this.loadData(this.id)
      }
    }
  }
</script>

<style lang="scss">

</style>
