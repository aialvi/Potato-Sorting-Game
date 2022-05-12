<template>
  <TransitionRoot appear :show="showCertificate" as="template">
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
              class="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
            >
              <DialogTitle
                as="h3"
                class="text-lg font-medium leading-6 text-gray-900"
              >
              </DialogTitle>
              <div class="flex flex-col items-center">
                <img
                  width="600"
                  src="/images/certificate.png"
                  alt="Certificate of Completion"
                  class="mb-3"
                />
                <div>
                  <ShareNetwork
                    network="facebook"
                    url="https://potato-sotato.vercel.app"
                    title="Potato Sotato! Sort the Potatoes!"
                    description="Sort the potatoes and save the world!"
                    quote="Thanks for saving us - A random potato"
                    hashtags="potatosotato"
                  >
                    <span
                      class="text-cyan-700 m-5 text-center font-serif font-semibold no-underline"
                      >Share</span
                    ></ShareNetwork
                  >
                  <a
                    class="text-yellow-700 m-5 text-center font-serif font-semibold no-underline"
                    href="/images/certificate.png"
                    download
                    >Download</a
                  >
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script>
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
  props: {
    showCertificate: Boolean,
  },
  methods: {
    closeModal() {
      this.$emit("update:showCertificate", false);
    },
  },
});
</script>
