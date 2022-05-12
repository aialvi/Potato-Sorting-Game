<template>
  <div class="flex items-center justify-center">
    <div>
      <span
        class="text-blue-900 pt-3 m-8 font-bold text-5xl"
        v-if="getIsTimerRunning"
      >
        {{ time }}
      </span>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      time: "00:00:00",
      timeBegan: null,
      timeStopped: null,
      stoppedDuration: 0,
      started: null,
      running: false,
    };
  },
  computed: mapState({
    getIsTimerRunning: (state) => state.isTimerRunning,
  }),
  watch: {
    getIsTimerRunning(newValue) {
      if (newValue) {
        this.startTimer();
      } else {
        this.stopTimer();
      }
    },
  },
  methods: {
    ...mapMutations(["setTime"]),
    startTimer() {
      this.resetTimer();
      this.timeBegan = new Date();

      this.started = setInterval(this.clockRunning, 10);
      this.running = true;
    },
    stopTimer() {
      this.running = false;
      this.timeStopped = new Date();
      clearInterval(this.started);
      this.setTime(this.time);
    },
    resetTimer() {
      this.elapsedTime = 0;
      this.stoppedDuration = 0;
      this.running = false;
      clearInterval(this.timeBegan);
    },
    clockRunning() {
      var currentTime = new Date(),
        timeElapsed = new Date(
          currentTime - this.timeBegan - this.stoppedDuration
        ),
        hour = timeElapsed.getUTCHours(),
        min = timeElapsed.getUTCMinutes(),
        sec = timeElapsed.getUTCSeconds();

      this.time =
        this.zeroPrefix(hour, 2) +
        ":" +
        this.zeroPrefix(min, 2) +
        ":" +
        this.zeroPrefix(sec, 2);
    },

    zeroPrefix(num, digit) {
      var zero = "";
      for (var i = 0; i < digit; i++) {
        zero += "0";
      }
      return (zero + num).slice(-digit);
    },
  },
});
</script>
