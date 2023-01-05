import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state: {
    products: [],
    cart: [],
    Error: null,
    cartActive: null,
    totalAmount: 0,
    isLoading: false
  },
  getters: {
    products(state) {
      return state.products;
    },
    getCart(state) {
      return state.cart;
    },
    GET_TOTALS(state) {
      let { total } = state.cart.reduce(
        (cartTotal, cartItem) => {
          const { price, quantity } = cartItem;
          const itemTotal = price * quantity;
          cartTotal.total += itemTotal;
          cartTotal.quantity += quantity;
          return cartTotal;
        },
        { total: 0, quantity: 0 }
      );
      total = parseFloat(total.toFixed(2));
      state.totalAmount = total;
      return state.totalAmount;
    },
    showAddBtn(state, productId) {
      return state.cart.some((prod) => prod.id === productId)
    }
  },
  mutations: {
    setProducts(state, products) {
      state.products = products;
    },
    addToCart(state, productId) {
      let currentProducts = state.products;
      let addedItem = currentProducts.find((prod) => prod.id === productId);
      if (state.cart.some((prod) => prod.id === addedItem.id)) {
        return state.cart;
      } else {
        state.cart.push({ ...addedItem, quantity: 1 });
      }
    },
    TOGGLE_CART(state) {
      state.cartActive = !state.cartActive;
    },
    INCREASE_ITEM(state, productId) {
      let tempCart = state.cart.map((cartItem) => {
        if (cartItem.id === productId) {
          return { ...cartItem, quantity: cartItem.quantity + 1 };
        } else {
          return cartItem;
        }
      });
      state.cart = tempCart;
    },
    DECREASE_ITEM(state, productId) {
      let tempCart = state.cart
        .map((cartItem) => {
          if (cartItem.id === productId) {
            return { ...cartItem, quantity: cartItem.quantity - 1 };
          } else {
            return cartItem;
          }
        })
        .filter((cartItem) => cartItem.quantity !== 0);
      state.cart = tempCart;
    },
    REMOVE_ITEM(state, productId) {
       let newCart = state.cart.filter((item) => item.id !== productId);
       state.cart = newCart
    },
  },
  actions: {
    async fetchAllProducts({ commit, state }) {
      try {
        state.isLoading = true
        const data = await axios.get("https://fakestoreapi.com/products", {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
        });
        commit("setProducts", data.data);
        state.isLoading = false
      } catch (error) {
        console.error(error);
      }
    },
  },
  modules: {},
});
