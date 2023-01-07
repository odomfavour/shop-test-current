import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state: {
    products: [],
    cart: [],
    Error: null,
    cartActive: null,
    totalAmount: 0,
    isLoading: false,
    isModalActive: false,
    itemInCart: false,
    currentItem: null, 
    itemRemoved: false
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
      return state.cart.some((prod) => prod.id === productId);
    },
  },
  mutations: {
    setProducts(state, products) {
      state.products = products;
    },
    addToCart(state, productId) {
      state.currentItem = productId;
      let currentProducts = state.products;
      let addedItem = currentProducts.find((prod) => prod.id === productId);
      if (state.cart.some((prod) => prod.id === addedItem.id)) {
        state.itemInCart = true;
        state.isModalActive = true
        state.itemRemoved = false
        return state.cart;
      } else {
        state.itemInCart = false
        state.itemRemoved = false
        state.cart.push({ ...addedItem, quantity: 1 });
        state.isModalActive = true
      }
    },
    TOGGLE_CART(state) {
      state.cartActive = !state.cartActive;
    },
    TOGGLE_MODAL(state) {
      state.isModalActive = !state.isModalActive;
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
        .filter((cartItem) => {cartItem.quantity !== 0});
      state.cart = tempCart;
    },
    REMOVE_ITEM(state, productId) {
      let newCart = state.cart.filter((item) => item.id !== productId);
      state.itemRemoved = true
      state.cart = newCart;
      state.itemInCart = false
      state.itemRemoved = true
    },
  },
  actions: {
    async fetchAllProducts({ commit, state }) {
      try {
        state.isLoading = true;
        const data = await axios.get("https://fakestoreapi.com/products", {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
        });
        data.data.map((element) => {
          element.price = ((2.2 * element.price) / 100 + element.price).toFixed(
            2
          );
          return element.price;
        });
        commit("setProducts", data.data);
        state.isLoading = false;
      } catch (error) {
        console.error(error);
      }
    },
  },
  modules: {},
});
