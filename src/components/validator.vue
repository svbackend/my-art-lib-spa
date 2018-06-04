<script>
  export default {
    name: 'validator',
    data: () => ({
      validatorErrors: {},
    }),
    methods: {
      isSuccess(field) {
        return this.isDirty(field) && !this.hasAnyError(field);
      },
      isDanger(field) {
        return this.isDirty(field) && this.hasAnyError(field);
      },
      isDirty(field) {
        return this.$v[field].$dirty;
      },
      getErrorMessage(field, errorName) {
        let path = 'validation.' + errorName
        let params = this.$v[field].$params[errorName] || {}
        params.fieldName = this.$t('fields.' + field);
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
      removeAllErrors(field = null) {
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

        this.validatorErrors[field][errorName] = this._createErrorObject(errorName, customMessage)
      },
      removeError(field, errorName) {
        if (typeof this.validatorErrors[field] === 'undefined') {
          this.validatorErrors[field] = {};
        }

        if (typeof this.validatorErrors[field][errorName] !== 'undefined') {
          delete this.validatorErrors[field][errorName];
        }
      },
      _createErrorObject(errorName, message) {
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
            this._addServerError(error);
          }
        }
      },
      _addServerError(error) {
        // todo server error processing (mapping to the actual data fields)
      }
    },
    created() {
      let fields = Object.keys(this.$v.$params);
      let field;
      for (field of fields) {
        this.validatorErrors[field] = {};
      }
    }
  }
</script>