<template>
  <div>
    <div
      class="fixed z-50 inset-0 overflow-y-auto bg-[#000000c9]"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
      ref="modal"
      @click.stop="closeModal"
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
        <div
          class="fixed inset-0 bg-primary bg-opacity-75 transition-opacity"
          aria-hidden="true"
        ></div>

        <span
          class="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
          >&#8203;</span
        >
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
          <div class="bg-white px-4 pt-5 pb-6 sm:p-6 sm:pb-4" id="main-modal">
            <div class="flex justify-end mb-5">
              <button
                className="rounded-full p-3 bg-[#f6f7fbd3]"
                role="button"
                ref="closeBtn"
                @click="closeMain"
              >
                <BIconXLg class="text-red-900 font-extrabold" />
              </button>
            </div>
            <div v-if="itemInCart">
              <p>
                Item Already in cart. Do you want to remove it from the cart?
              </p>

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
            <p v-else-if="Error">An Error occured</p>
            <p v-else>Product added to the cart</p>
            <p>{{ message }}</p>
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
    message: String
  },
  computed: {
    ...mapState(["itemInCart", "itemRemoved", "Error"]),
  },
  methods: {
    ...mapMutations(["TOGGLE_MODAL"]),
    closeModal(event) {
      if (event.target === this.$refs.modal) {
        this.TOGGLE_MODAL();
      } else if (event.target.closest("#main-modal") === null) {
        this.TOGGLE_MODAL();
      }
    },
    closeMain() {
      this.TOGGLE_MODAL();
    },
    removeItem(id) {
      this.$store.commit("REMOVE_ITEM", id);
      this.TOGGLE_MODAL();
    },
  },
};
</script>

<style>
</style>
