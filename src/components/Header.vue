<template>
  <div class="flex items-center justify-between pb-6">
    <div>
      <h2 class="text-gray-600 font-semibold">Sorting Training System</h2>
    </div>
    <div class="flex items-center justify-between">
      <div class="lg:ml-40 ml-10 space-x-8">
        <button
          @click="openModal"
          class="bg-orange-500 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer"
        >
          Start Sorting
        </button>
      </div>
    </div>
  </div>
  <generate-user-modal v-model:isOpen="isOpen"></generate-user-modal>
</template>

<script>
import { defineComponent } from "vue";
import { mapState } from "vuex";
import GenerateUserModal from "./GenerateUserModal.vue";
import Timer from "./Timer.vue";

export default defineComponent({
  components: {
    GenerateUserModal,
    Timer,
  },
  data() {
    return {
      isOpen: false,
    };
  },
  methods: {
    closeModal() {
      this.isOpen = false;
    },
    openModal() {
      this.isOpen = true;
    },
  },
});
</script>
