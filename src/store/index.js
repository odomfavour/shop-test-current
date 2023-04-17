import { createStore } from "vuex";
import axios from "axios";
// import authGuard from "@/router/auth-guard";
// import * as firebase from 'firebase/app'
import { addDoc, collection, setDoc, doc } from "firebase/firestore";
import { db } from "@/main";

// import router from "@/router";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  setPersistence,
  browserSessionPersistence,
  onAuthStateChanged,
} from "firebase/auth";

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
    itemRemoved: false,
    user: null,
    message: "",
    auth: null
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
    user(state) {
      return state.user;
    },
    isAuthenticated(state) {
      return state.auth !== null && state.auth !== undefined
    }
  },
  mutations: {
    setAuth(state, auth) {
      state.auth = auth
    },
    setProducts(state, products) {
      state.products = products;
    },
    addToCart(state, product) {
      const existingItem = state.cart.find((item) => item.id === product.id);
    
      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.cart.push({ ...product, quantity: 1 });
      }
    },
    
    clearCart(state) {
      state.cartItems = [];
    },
    

    TOGGLE_CART(state) {
      state.cartActive = !state.cartActive;
    },
    TOGGLE_MODAL(state) {
      state.isModalActive = !state.isModalActive;
    },
    INCREASE_ITEM(state, productId) {
      console.log(state.user);

      const userCollectionRef = db
        .collection("users")
        .doc(state.user.id)
        .collection("cart");
      let tempCart = state.cart.map((cartItem) => {
        if (cartItem.id === productId) {
          // Update quantity of existing item in cart
          userCollectionRef.doc(productId).update({
            quantity: cartItem.quantity + 1,
          });
          return { ...cartItem, quantity: cartItem.quantity + 1 };
        } else {
          return cartItem;
        }
      });
      state.cart = tempCart;

      // Add new item to cart
      userCollectionRef.doc(productId).set({
        id: productId,
        quantity: 1,
      });
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
        .filter((cartItem) => {
          return cartItem.quantity !== 0; // add return statement here
        });
      state.cart = tempCart;
    },
    
    REMOVE_ITEM(state, productId) {
      let newCart = state.cart.filter((item) => item.id !== productId);
      state.itemRemoved = true;
      state.cart = newCart;
      state.itemInCart = false;
      state.itemRemoved = true;
    },
    setUser(state, payload) {
      state.user = payload;
    },
    CHECKOUT_ITEMS(state) {
      console.log(state);
      // authGuard();
      console.log("here");
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
    async signUpUser({ commit, state }, payload) {
      state.isLoading = true;
      try {
        const auth = getAuth();
        await setPersistence(auth, browserSessionPersistence);
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          payload.email,
          payload.password
        );

        const user = userCredential.user;
        let newUser = {
          id: user.uid,
          email: payload.email,
          password: payload.password,
          firstName: payload.firstName,
          lastName: payload.lastName,
          cart: [],
        };

        await addDoc(collection(db, "users"), newUser);
        commit("setUser", newUser);
        localStorage.setItem("user", JSON.stringify(newUser));
        alert("User signed up successful");
        state.isLoading = false;
      } catch (error) {
        console.error(error);
        alert(error.message);
      }
    },

    async loginUser({ commit, state }, payload) {
      state.isLoading = true;
      try {
        const auth = getAuth();
        await setPersistence(auth, browserSessionPersistence);
        const userCredential = await signInWithEmailAndPassword(
          auth,
          payload.email,
          payload.password
        );
        // Signed in
        const user = userCredential.user;
        console.log(user);
        let newUser = {
          id: user.uid,
          email: payload.email,
          cart: [],
        };
        commit("setUser", newUser);
        // Store the user information in local storage
        localStorage.setItem("user", JSON.stringify(newUser));
        // state.isModalActive = true;
        // state.message = "User logged in successfully"
        alert("User logged in successfully");
        state.isLoading = false;
        // router.push("/");
      } catch (error) {
        state.Error = true;
        state.isModalActive = true;
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        state.isLoading = false;
        state.Error = false;
      }
    },
    async LOG_OUT({ commit, state }) {
      try {
        state.isLoading = true;
        const auth = getAuth();
        await auth.signOut();
        console.log("User signed out successfully");
        localStorage.removeItem("user");
        let user = null;
        commit("setUser", user);
        state.isLoading = false;
      } catch (error) {
        console.error("Error signing out user:", error);
        state.isLoading = false;
      }
    },
    handleAuthStateChanges({ commit }) {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          const newUser = JSON.parse(localStorage.getItem("user"));
          commit("setUser", newUser);
        } else {
          // handle user sign out
        }
      });
    },
    async addToCart({ commit, rootState }, product) {
     
      const { id } = rootState.user;
      console.log(product.id, id)
  
      const cartRef = collection(db, "users", id, "cart");
      console.log(cartRef)
      const cartItemRef = doc(cartRef, product.id);
  console.log(cartItemRef)
      try {
        const cartItemDoc = await cartItemRef.get();
  
        if (cartItemDoc.exists()) {
          await setDoc(cartItemRef, { quantity: cartItemDoc.data().quantity + 1 }, { merge: true });
        } else {
          await addDoc(cartRef, { ...product, quantity: 1 });
        }
  
        commit("addToCart", product);
      } catch (error) {
        console.error(error);
      }
    },
    clearCart({ commit }) {
      commit("clearCart");
    },
  },
  modules: {},
});
