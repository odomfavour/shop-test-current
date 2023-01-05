<template>
  <section class="fixed top-0 z-40 w-full bg-white shadow-lg shadow-gray-500/30" >
    <div class="w-11/12 mx-auto">
      <div class="flex justify-between py-3 items-center">
        <h3 class="text-blue-500 font-semibold text-3xl">Shop</h3>
        <ul class="flex">
          <li class="mr-4 relative">
            <button @click="openCart">
              <BIconCart4 class="text-2xl" /><span
                v-if="cartCount.length > 0"
                class="
                  flex
                  items-center
                  justify-center
                  absolute
                  bg-red-400
                  text-xs text-white
                  -top-[13px]
                  -right-[13px]
                  rounded-full
                  py-[3px]
                  px-[6px]
                "
                >{{ cartCount.length }}</span
              >
            </button>
          </li>
          <!-- <li>
          <router-link to="#" class="rounded px-3 py-2 bg-blue-800 text-white">Signup</router-link>
        </li> -->
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
import { BIconCart4 } from "bootstrap-icons-vue";
import { mapActions, mapMutations } from "vuex";
export default {
  props: {
    cartCount: Array,
  },
  methods: {
    ...mapActions(["fetchAllProducts", "addToCart"]),
    ...mapMutations(["TOGGLE_CART"]),
    addToCart(productId) {
      console.log(productId);
      this.addToCart(productId);
    },
    openCart() {
      // this.$store.commit('TOGGLE_CART')
      this.TOGGLE_CART();
    },
  },
  components: { BIconCart4 },
};
</script>

<style>
</style>