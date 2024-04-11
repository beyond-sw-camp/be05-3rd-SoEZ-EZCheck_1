<template>
  <div class="datepicker">
    <label for="check-in">Check-in:</label>
    <input type="date" id="check-in" v-model="checkInDate" @change="updateDates">

    <label for="check-out">Check-out:</label>
    <input type="date" id="check-out" v-model="checkOutDate" @change="updateDates">
  </div>
</template>

<script>
export default {
    name : "DatepickerComponent",
 data() {
    return {
      checkInDate: '',
      checkOutDate: ''
    };
  },
  methods: {
    updateDates() {
      this.$emit('update-dates', { checkInDate: this.checkInDate, checkOutDate: this.checkOutDate });
    }
  }
}
</script>

<style>

</style>