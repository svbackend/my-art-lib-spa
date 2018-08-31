import Vue from 'vue'

Vue.mixin({
  created() {
    // todo idk what is going on here but this method called multiple times
    // and the problem here is that sometimes this.$v or $t are not defined
    // so I need to check these params in setters in order to not overwrite property by undefined value
    console.log('created called');
    Validator.setVuelidate(this.$v)
    Validator.setI18n(this.$t)
  }
});

const Validator = {
  $v: null,
  $t: function (path) { return path; },
  setVuelidate(Vuelidate) {
    if (Vuelidate) {
      this.$v = Vuelidate;
    }
  },
  setI18n(I18n) {
    // todo I hope I will find the way to remove this
    try {
      I18n('path')
    } catch (e) {
      return;
    }

    this.$t = I18n;
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
    return this.getVuelidateObject(field).$dirty;
  },
  isInvalid(field) {
    return this.getVuelidateObject(field).$invalid;
  },
  getVuelidateObject(field) {
    if (field.indexOf('.') === -1) {
      return this.$v[field];
    }

    let path = field.split('.');
    let result = null;

    // add $each as 2nd array value (https://monterail.github.io/vuelidate/#sub-collections-validation)
    path.unshift('');
    path[0] = path[1];
    path[1] = '$each';

    for (let part of path) {
      if (result === null) {
        result = this.$v[part]
        continue;
      }
      result = result[part]
    }

    return result
  },
  showError(field, errorName) {
    let path = 'validation.' + errorName
    let params = this.getVuelidateObject(field).$params[errorName] || {}
    params.fieldName = this.$t('fields.' + field);
    return { 'path': path, args: params }
  },
  hasError(field, errorName) {
    if (this.isDirty(field) && !this.getVuelidateObject(field)[errorName]) {
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

    if (!this.isDirty(field)) {
      return false;
    }

    if (this.isInvalid(field)) {
      return true;
    }

    return typeof this.validatorErrors[field] !== 'undefined' && Object.keys(this.validatorErrors[field]).length > 0;
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
        this.addServerError(error);
      }
    }
  },
  addServerError(error) {
    // todo server error processing (mapping to the actual data fields)
  }
}

export default Validator