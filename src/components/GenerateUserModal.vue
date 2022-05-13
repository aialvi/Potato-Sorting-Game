<template>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @close="closeModal" class="relative z-10">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black bg-opacity-25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="flex min-h-full items-center justify-center p-4 text-center"
        >
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
            >
              <DialogTitle
                as="h3"
                class="text-lg font-medium leading-6 text-gray-900"
              >
                How many people?
              </DialogTitle>
              <div class="mt-2">
                <input
                  type="number"
                  min="0"
                  class="focus:ring-orange-500 border-2 block w-full p-3 sm:text-sm border-gray-300 rounded-md"
                  v-model="numberOfUsers"
                  @keyup.enter="generateUsers"
                />
              </div>
              <div class="errorMessage text-red-600">
                <span>{{ error }}</span>
              </div>
              <div class="mt-4 flex justify-end">
                <button
                  type="button"
                  class="inline-flex mx-2 justify-center rounded-md border border-transparent bg-gray-400 px-4 py-2 text-sm font-medium hover:bg-gray-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 text-gray-50"
                  @click="closeModal"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  class="inline-flex justify-center rounded-md border border-transparent bg-orange-500 px-4 py-2 text-sm font-medium text-gray-50 hover:bg-orange-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2"
                  @click.prevent="generateUsers"
                >
                  Start
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script>
import { useStore } from "vuex";
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/vue";
import { defineComponent } from "vue";
export default defineComponent({
  components: {
    TransitionRoot,
    TransitionChild,
    Dialog,
    DialogPanel,
    DialogTitle,
  },
  data() {
    return {
      numberOfUsers: "",
      error: "",
    };
  },
  props: {
    isOpen: Boolean,
  },
  methods: {
    closeModal() {
      this.$emit("update:isOpen", false);
    },
  },
  setup() {
    const store = useStore();

    return {
      generateUsers() {
        if (this.numberOfUsers >= 5 && this.numberOfUsers <= 100) {
          store.commit("setUsers", Number(this.numberOfUsers));
          store.commit("setIsTimerRunning", true);
          this.$emit("update:isOpen", false);
          this.numberOfUsers = "";
        } else {
          this.error = "Please enter a number from 5 to 100";
        }
      },
    };
  },
});
</script>
