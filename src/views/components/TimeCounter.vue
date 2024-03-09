<template>
  <div class="card z-index-2">
    <div class="p-3 pb-0 card-header">
      <div class="d-flex justify-content-between">
        <h6 class="mb-2">Time to nearest Competition</h6>
      </div>
    </div>
    <div class="card-body">
      <h2>{{ countdown }}</h2>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      countdown: "00:00:00", // Initialize countdown time to 00:00:00
      targetDate: new Date("2024-03-23T00:00:00"), // Specific date to count down to
    };
  },
  mounted() {
    this.startCounter(); // Start the counter when the component is mounted
  },
  methods: {
    startCounter() {
      setInterval(() => {
        const now = new Date();
        const difference = this.targetDate.getTime() - now.getTime();

        if (difference > 0) {
          const days = Math.floor(difference / (1000 * 60 * 60 * 24));
          const hours = this.formatTime(Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
          const minutes = this.formatTime(Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)));
          const seconds = this.formatTime(Math.floor((difference % (1000 * 60)) / 1000));
          this.countdown = `${days}d ${hours}:${minutes}:${seconds}`;
        } else {
          this.countdown = "Countdown expired";
        }
      }, 1000); // Update countdown every second
    },
    formatTime(value) {
      return value < 10 ? `0${value}` : value; // Add leading zero if value is less than 10
    },
  },
};
</script>

<style scoped>
/* Add your component-specific styles here */
</style>
