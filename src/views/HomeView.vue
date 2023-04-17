<!-- <template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template> -->
<template>
  <div>
    <main-header :cartCount="getCart" />
    <div v-if="isLoading" class="h-[80vh] flex justify-center items-center">
      <div class="text-center">
        <img src="../assets/loading.gif" alt="" />
        <p class="mt-4 text-blue-700">Loading</p>
      </div>
    </div>
    <div class="w-11/12 mx-auto my-[100px] font-poppins" v-else>
      <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4">
        <div
          className="border rounded-md drop-shadow-lg px-4 pt-4 pb-20 gap-3 bg-white relative"
          v-for="product in products"
          :key="product.id"
        >
          <img
            :src="product.image"
            :alt="product.description"
            className="h-40  w-full object-scale-down"
          />
          <p className="mt-5 text-base font-semibold">
            {{ product.title.substring(0, 30) }}
          </p>
          <p>Price: ${{ product.price }}</p>
          <p>Rating: {{ roundRating(product.rating.rate) }}</p>
          <div class="flex mt-3">
            <BIconStarFill
              v-for="(star, index) in roundRating(product.rating.rate)"
              :key="index"
              class="text-amber-500"
            />
            <BIconStar
              v-for="(star, index) in 5 - roundRating(product.rating.rate)"
              :key="index"
            />
          </div>
          <div className="flex justify-end mt-3 absolute bottom-3 right-3">
            <!-- <button
              v-if="showAddBtn(product.id)"
              className="p-3 border-2 border-solid rounded-lg bg-gray-50 border-gray-300"
              @click="removeItem(product.id)"
            >
              <BIconCartX />
            </button> -->
            <button
              className="p-3 border-2 border-solid rounded-lg bg-gray-50 border-red-900 text-red-800"
              @click="addToCart(product)"
            >
              <BIconCart4 />
            </button>
          </div>
        </div>
      </div>
    </div>
    <cart-container :cart="getCart" :cartTotal="GET_TOTALS" v-if="cartActive" />
    <modal-panel v-if="isModalActive" :productId="currentItem" />
  </div>
</template>

<script>
import MainHeader from "@/components/MainHeader.vue";
import { mapActions, mapGetters, mapState } from "vuex";
import CartContainer from "@/components/CartContainer.vue";
import ModalPanel from "@/components/ModalPanel.vue";
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: "HomeView",
  components: {
    MainHeader,
    CartContainer,
    ModalPanel,
  },
  computed: {
    ...mapGetters(["products", "getCart", "GET_TOTALS", "user"]),
    ...mapState(["cartActive", "isLoading", "isModalActive", "currentItem"]),
  },
  methods: {
    ...mapActions(["fetchAllProducts", "addToCart"]),
    addToCart(productId) {
      this.$store.dispatch("addToCart", productId);
    },
    removeItem(productId) {
      this.$store.commit("REMOVE_ITEM", productId);
    },
    showAddBtn(id) {
      return this.getCart.some((prod) => prod.id === id);
    },
    roundRating(rate) {
      return Math.round(rate);
    },
  },
  watch: {
    user(value) {
      if (value !== null && value !== undefined) {
        console.log(value);
      }
    },
  },
  created() {
    this.fetchAllProducts();
  },
};
</script>
