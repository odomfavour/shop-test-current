<template>
  <div
    class="
      fixed
      top-0
      right-0
      h-full
      bg-white
      z-50
      md:w-1/3
      w-full
      transition-all
      ease-out
      delay-50
      duration-100
      px-6
      overflow-y-auto
      border-l-red-500
    "
  >
    <div className="flex items-center justify-between mt-8 mb-3">
      <h4 className="text-3xl font-bold">Cart review</h4>
      <div
        className="rounded-full p-3 bg-[#f6f7fb]"
        role="button"
        @click="closeCart"
      >
        <BIconXLg />
      </div>
    </div>
    <hr />
    <div className="cart-parent">
      <div v-if="cart.length > 0">
        <section>
        <div className="cart-holder" v-for="item in cart" :key="item.id">
          <div className="flex justify-between items-center gap-3 mb-3">
            <div className="w-[25%]">
              <div className="flex mt-2 gap-3 items-center">
                <div
                  className="image-box w-full p-4 border rounded-md shadow bg-white"
                >
                  <img
                    :src="item.image"
                    alt="{description}"
                    className="w-full object-scale-down"
                  />
                </div>
              </div>
            </div>
            <div className="w-[73%]">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-2/3 w-full">
                  <p className="text-sm">{{item.rating.rate}}</p>
                  <h4 className="md:text-xl text-base font-semibold">
                    {{item.title}}
                  </h4>
                  <p className="text-base">${{item.price}}</p>
                  <button @click="removeItem(item.id)" class="rounded-md bg-red-400 p-2">Remove</button>
                </div>
                <div
                  className="flex items-center justify-between md:w-1/3 w-2/3 pr-3"
                >
                  <div className="rounded-full p-1 bg-[#f6f7fb]" role="button" @click="decreaseItem(item.id)">
                    <BIconDashLg />
                  </div>
                  <p>{{item.quantity}}</p>
                  <div className="rounded-full p-1 bg-[#f6f7fb]" role="button" @click="increaseItem(item.id)">
                    <BIconPlusLg />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr />
        </div>
      </section>
      <section className="mt-8">
        <div className="flex justify-between items-center mb-8">
          <h3 className="font-bold text-3xl">Subtotal:</h3>
          <h3 className="text-2xl font-semibold">${{cartTotal}}</h3>
        </div>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <div>
            <button
              to="#"
              className="md:px-10 px-5 py-3 bg-blue-900 text-white rounded-md flex items-center justify-center font-semibold"
            >
              View Cart
            </button>
          </div>
          <div>
            <button
              to="#"
              className="md:px-10 px-5 py-3 bg-red-900 text-white rounded-md flex items-center justify-center font-semibold"
            >
              Checkout
            </button>
          </div>
        </div>
      </section>
      </div>
      <div className="h-[60vh] px-4" v-else>
        <img src="../assets/images/empty.png" alt="" className="object-scale-down" />
        <p className="text-xl my-3 text-red-500 text-center">
          Your cart is empty
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'cartContainer',
  props: {
    cart: Array,
    cartTotal: Number
  },
  methods:{
    closeCart() {
      this.$store.commit('TOGGLE_CART')
    },
    increaseItem(productId) {
      this.$store.commit('INCREASE_ITEM', productId)
    },
    decreaseItem(productId) {
      this.$store.commit('DECREASE_ITEM', productId)
    },
    removeItem(productId) {
      this.$store.commit('REMOVE_ITEM', productId)
    }
  }
};
</script>

<style>
</style>