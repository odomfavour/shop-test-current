<template>
  <div>
    !-- This example requires Tailwind CSS v2.0+ -->
    <div
      class="fixed z-50 inset-0 overflow-y-auto bg-[#000000c9]"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        class="
          flex
          items-center
          justify-center
          min-h-screen
          pt-4
          px-4
          pb-20
          text-center
          sm:p-0
          font-poppins
        "
      >
        <!--
      Background overlay, show/hide based on modal state.
      Entering: "ease-out duration-300"
        From: "opacity-0"
        To: "opacity-100"
      Leaving: "ease-in duration-200"
        From: "opacity-100"
        To: "opacity-0"
    -->
        <div
          class="fixed inset-0 bg-primary bg-opacity-75 transition-opacity"
          aria-hidden="true"
        ></div>

        <!-- This element is to trick the browser into centering the modal contents. -->
        <span
          class="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
          >&#8203;</span
        >

        <!--
      Modal panel, show/hide based on modal state.
      Entering: "ease-out duration-300"
        From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        To: "opacity-100 translate-y-0 sm:scale-100"
      Leaving: "ease-in duration-200"
        From: "opacity-100 translate-y-0 sm:scale-100"
        To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
    -->
        <div
          class="
            inline-block
            align-bottom
            bg-white
            rounded-lg
            text-left
            overflow-hidden
            shadow-xl
            transform
            transition-all
            sm:my-8 sm:align-middle sm:max-w-lg sm:w-1/2
            w-11/12
            mx-auto
          "
        >
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div v-if="itemInCart">
              <p>Item Already in cart. Do you want to remove it from the cart?</p>

              <div class="flex">
                <button
                  className="p-2 border-2 border-solid rounded-lg bg-gray-50 border-red-900 text-red-800 mt-3"
                  @click="removeItem(productId)"
                >
                  Remove Item
                </button>
              </div>
            </div>
            <p v-else-if="itemRemoved">Item removed Successfully</p>
            <p v-else>Product added to the cart</p>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              @click="closeModal"
              class="
                mt-3
                w-full
                inline-flex
                justify-center
                rounded-md
                border border-gray-300
                shadow-sm
                px-4
                py-2
                bg-white
                text-base
                font-medium
                text-gray-700
                hover:bg-gray-50
                focus:outline-none
                focus:ring-2
                focus:ring-offset-2
                focus:ring-indigo-500
                sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm
              "
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
export default {
  props: {
    productId: Number,
  },
  computed: {
    ...mapState(["itemInCart", "itemRemoved"]),
  },
  methods: {
    ...mapMutations(["TOGGLE_MODAL"]),
    closeModal() {
      this.TOGGLE_MODAL();
    },
    removeItem(id) {
      this.$store.commit("REMOVE_ITEM", id);
    //   this.TOGGLE_MODAL();
    },
  },
};
</script>

<style>
</style>