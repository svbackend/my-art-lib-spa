import Vue from 'vue'

Vue.mixin({
  created() {
    console.log('set vuelidate')
    console.log(this.$v)
    Validator.setVuelidate(this.$v)
    Validator.setI18n(this.$t)
  }
});

const Validator = {
  $v: null,
  $t: null,
  setVuelidate(Vuelidate) {
    if (Vuelidate) {
      this.$v = Vuelidate;
    }
  },
  setI18n(I18n) {
    if (I18n) {
      this.$t = I18n;
    }
  },
  // Properties
  validatorErrors: {},
  // Methods
  isSuccess(field) {
    return this.isDirty(field) && !this.hasAnyError(field);
  },
  isDanger(field) {
    return this.isDirty(field) && this.hasAnyError(field);
  },
  isDirty(field) {
    return this.$v[field].$dirty;
  },
  showError(field, errorName) {
    let path = 'validation.' + errorName
    let params = this.$v[field].$params[errorName] || {}
    params.fieldName = this.$t('fields.' + field);
    //console.log(params);
    return { 'path': path, args: params }
  },
  hasError(field, errorName) {
    if (this.$v[field].$dirty && !this.$v[field][errorName]) {
      return true;
    }

    let fieldExists = typeof this.validatorErrors[field] !== 'undefined';
    if (fieldExists && typeof this.validatorErrors[field][errorName] !== 'undefined') {
      return true;
    }

    return false;
  },
  hasAnyError(field = null) {
    if (field === null) {

      if (this.$v.$invalid) {
        return true;
      }

      return Object.keys(this.validatorErrors).length > 0;
    }

    if (!this.$v[field].$dirty) {
      return false;
    }

    if (this.$v[field].$invalid) {
      return true;
    }

    return Object.keys(this.validatorErrors[field]).length > 0;
  },
  clearErrors(field = null) {
    if (field === null) {
      this.validatorErrors = {};
      return;
    }

    this.validatorErrors[field] = {};
  },
  addError(field, errorName, customMessage = null) {
    if (typeof this.validatorErrors[field] === 'undefined') {
      this.validatorErrors[field] = {};
    }

    if (typeof this.validatorErrors[field][errorName] !== 'undefined') {
      // this error already exists
      return;
    }

    this.validatorErrors[field][errorName] = this.createErrorObject(errorName, customMessage)
  },
  removeError(field, errorName) {
    if (typeof this.validatorErrors[field] === 'undefined') {
      this.validatorErrors[field] = {};
    }

    if (typeof this.validatorErrors[field][errorName] !== 'undefined') {
      delete this.validatorErrors[field][errorName];
    }
  },
  createErrorObject(errorName, message) {
    if (message === null) {
      message = 'This value is invalid'
    }

    return {
      'message': message
    };
  },
  loadServerErrors(errors) {
    if (!errors.length) return;

    let error;
    for (error of errors) {
      if (error.path.contains('[') === true) {
        this.validatorAddServerError(error);
      }
    }
  },
  addServerError(error) {
    // todo server error processing (mapping to the actual data fields)
  }
}

export default Validator