<template>
  <div>
    <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
      <div
        class="flex justify-center min-w-full shadow rounded-lg overflow-hidden"
      >
        <div class="w-full h-100 leading-normal" v-if="!isSort">
          <div class="flex flex-row h-15">
            <div
              class="w-1/3 px-5 py-5 border-b-2 border-gray-200 bg-gray-100 text-xs font-semibold text-gray-600 uppercase tracking-wider"
            >
              Email
            </div>
            <div
              class="w-1/3 px-5 py-5 border-b-2 border-gray-200 bg-gray-100 text-xs font-semibold text-gray-600 uppercase tracking-wider"
            >
              Potatoes
            </div>

            <div
              class="w-1/3 px-5 py-5 border-b-2 border-gray-200 bg-gray-100 text-xs font-semibold text-gray-600 uppercase tracking-wider"
            >
              Full Name
            </div>
          </div>
          <div class="block h-auto">
            <draggable
              class="block h-full"
              v-bind="$attrs"
              :list="users"
              @end="isArraySorted"
            >
              <div
                class="flex flex-row h-20"
                v-for="user in users || []"
                :key="user.id"
              >
                <div
                  class="w-1/3 px-5 py-5 border-b border-gray-200 bg-white text-sm"
                >
                  {{ user.email }}
                </div>
                <div
                  class="w-1/3 px-5 py-5 border-b border-gray-200 bg-white text-sm"
                >
                  {{ user.potatoQuantity }}
                </div>
                <div
                  class="w-1/3 px-5 py-5 border-b border-gray-200 bg-white text-sm"
                >
                  {{ user.name }}
                </div>
              </div>
            </draggable>
          </div>
        </div>
      </div>
      <div class="m-8 flex flex-col justify-center" v-if="isSort">
        <p class="text-orange-600 mb-5 text-2xl font-semibold">
          Congratulation!!
        </p>
        <p class="mb-5 text-2xl">You've done it!! You've sorted the array.</p>
        <p class="mb-5 text-2xl">
          People: <span class="text-orange-600">{{ users.length }}</span>
        </p>
        <p class="mb-5 text-2xl">
          Time: <span class="text-orange-600"> {{ getTime }}</span>
        </p>
        <p class="mb-8 text-2xl">
          Score:
          <span class="text-orange-600"> {{ getScore.toFixed(0) }} / 100</span>
        </p>
      </div>
      <div v-if="isSort" class="m-5">
        <button
          @click="viewCertificate"
          class="w-1/3 bg-orange-500 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer"
        >
          View Certificate
        </button>
      </div>
    </div>
    <CertificateModal v-model:showCertificate="showCertificate" />
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { mapMutations, mapState } from "vuex";
import GenerateUserModalVue from "./GenerateUserModal.vue";
import { VueDraggableNext } from "vue-draggable-next";
import moment from "moment";
import CertificateModal from "./CertificateModal.vue";

export default defineComponent({
  components: {
    GenerateUserModalVue,
    draggable: VueDraggableNext,
    CertificateModal,
  },
  data() {
    return {
      users: [],
      isSort: false,
      potatoQuantityArray: [],
      showCertificate: false,
    };
  },
  methods: {
    ...mapMutations(["setIsTimerRunning"]),
    arraySortedOrNot(arr, n) {
      // Array has one or no element or the
      // rest are already checked and approved.
      if (n == 1 || n == 0) return 1;

      // Unsorted pair found (Equal values allowed)
      if (arr[n - 1] > arr[n - 2]) return 0;

      // Last pair was sorted
      // Keep on checking
      return this.arraySortedOrNot(arr, n - 1);
    },
    isArraySorted() {
      this.potatoQuantityArr = this.users.map((user) => user.potatoQuantity);
      let n = this.potatoQuantityArr.length;
      if (this.arraySortedOrNot(this.potatoQuantityArr, n) != 0) {
        this.isSort = true;
        this.setIsTimerRunning(false);
      } else {
        this.isSort = false;
      }
    },
    viewCertificate() {
      this.showCertificate = true;
    },
  },
  watch: {
    getUsers(newValue) {
      this.users = newValue;
    },
    users(newValue) {
      this.isArraySorted();
    },
  },
  computed: mapState({
    getUsers: (state) => state.users,
    getTime: (state) => state.time,
    getScore: (state) => {
      const timeInSeconds = moment(state.time, "HH:mm:ss").diff(
        moment("00:00:00", "HH:mm:ss"),
        "seconds"
      );
      const score = (state.users.length / timeInSeconds) * 100;
      return score > 100 ? 100 : score;
    },
  }),
});
</script>

<style lang="scss" scoped></style>
