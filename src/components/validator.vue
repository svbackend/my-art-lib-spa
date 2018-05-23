<script>
  export default {
    data: () => ({
      validatorErrors: {},
    }),
    methods: {
      validatorHasError(field, errorName) {
        console.log('validatorHasError');
        console.log(field);
        console.log(errorName);

        if (this.$v[field].$dirty && !this.$v[field][errorName]) {
          return true;
        }

        let fieldExists = typeof this.validatorErrors[field] !== 'undefined';
        if (fieldExists && typeof this.validatorErrors[field][errorName] !== 'undefined') {
          return true;
        }

        return false;
      },
      validatorHasAnyError(field = null) {
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
      validatorClearErrors(field = null) {
        if (field === null) {
          this.validatorErrors = {};
          return;
        }

        this.validatorErrors[field] = {};
      },
      validatorAddError(field, errorName, customMessage = null) {
        if (typeof this.validatorErrors[field] === 'undefined') {
          this.validatorErrors[field] = {};
        }

        if (typeof this.validatorErrors[field][errorName] !== 'undefined') {
          // this error already exists
          return;
        }

        this.validatorErrors[field][errorName] = this.createErrorObject(errorName, customMessage)
      },
      createErrorObject(errorName, message) {
        if (message === null) {
          message = 'This value is invalid'
        }

        return {
          'message': message
        };
      }
    },
    created() {
      let fields = Object.keys(this.$v.$params);
      let field;
      for (field of fields) {
        console.log(field);
        this.validatorErrors[field] = {};
      }
    }
  }
</script>