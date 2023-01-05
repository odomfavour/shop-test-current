<!-- <template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template> -->
<template>
  <div>
    <main-header :cartCount="getCart" />
    <div class="w-11/12 mx-auto mt-[100px]">
      <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4">
        <div
          className="border rounded-md drop-shadow-lg px-4 pt-4 pb-20 text-center gap-3 bg-white relative"
          v-for="product in products"
          :key="product.id"
        >
          <img
            :src="product.image"
            :alt="product.description"
            className="h-40  w-full object-scale-down"
          />
          <p className="mt-5 text-base text-center">
            {{ product.title.substring(0, 30) }}
          </p>
          <p>${{ product.price }}</p>
          <p>{{ product.rating.rate }}</p>
          <div className="flex justify-end mt-3 absolute bottom-3 right-3">
            <button
              v-if="showAddBtn(product.id)"
              className="p-3 border-2 border-solid rounded-lg bg-gray-50 border-gray-300"
              @click="removeItem(product.id)"
            >
              <BIconCartX />
            </button>
            <button
              v-else
              className="p-3 border-2 border-solid rounded-lg bg-gray-50 border-red-900 text-red-800"
              @click="addToCart(product.id)"
            >
              <BIconCart4 />
            </button>
          </div>
        </div>
      </div>
    </div>
    <cart-container :cart="getCart" :cartTotal="GET_TOTALS" v-if="cartActive" />
  </div>
</template>

<script>
import MainHeader from "@/components/MainHeader.vue";
import { mapActions, mapGetters, mapState } from "vuex";
import CartContainer from "@/components/CartContainer.vue";
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: "HomeView",
  components: {
    MainHeader,
    CartContainer,
    // HelloWorld
  },
  computed: {
    ...mapGetters(["products", "getCart", "GET_TOTALS"]),
    ...mapState(["cartActive"]),
  },
  methods: {
    ...mapActions(["fetchAllProducts", "addToCart"]),
    addToCart(productId) {
      this.$store.commit("addToCart", productId);
    },
    removeItem(productId) {
      this.$store.commit('REMOVE_ITEM', productId)
    },
    showAddBtn(id) {
      return this.getCart.some((prod) => prod.id === id);
    },
  },
  created() {
    this.fetchAllProducts();
  },
};
</script>
