<template>
  <div class="star-rating">
    <label class="star-rating__star" v-for="rating in ratings"
           :class="{'is-selected': ((tempValue >= rating) && tempValue != null), 'is-disabled': disabled}"
           @click="set(rating)" @mouseover="star_over(rating)" @mouseout="star_out">
      <input class="star-rating star-rating__checkbox" type="radio" :value="rating" :name="name"
             v-model="actual_value" :disabled="disabled"/>★</label>
    <span style="vertical-align: middle;" v-if="tempValue">{{ tempValue }}</span>
  </div>

</template>

<script>
  export default {
    name: "stars",
    props: {
      'name': String,
      'value': null,
      'id': String,
      'disabled': Boolean,
      'required': Boolean
    },
    data() {
      return {
        temp_value: null,
        actual_value: null,
        ratings: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
      }
    },
    computed: {
      tempValue() {
        return this.temp_value;
      },
    },
    methods: {
      star_over: function(index) {
        if (!this.disabled) {
          this.temp_value = index;
        }
      },
      star_out: function() {
        if (!this.disabled) {
          return this.temp_value = this.actual_value;
        }
      },
      set: function(value) {
        if (!this.disabled) {
          this.$emit('updateValue', value)
          this.temp_value = value;
        }
      }
    },
    created() {
      this.actual_value = this.value;
      this.temp_value = this.value;
    }
  }
</script>

<style scoped>

</style>