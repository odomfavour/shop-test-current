import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { BootstrapIconsPlugin } from "bootstrap-icons-vue";
// import './assets/tailwind.css'
import "./index.css";
import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBfgBL1YDpzJAYppnUtKMtGuScrbdHpgrU",
  authDomain: "gusfun-shop-app.firebaseapp.com",
  projectId: "gusfun-shop-app",
  storageBucket: "gusfun-shop-app.appspot.com",
  messagingSenderId: "477795180758",
  appId: "1:477795180758:web:0bf86bb5b96fde7da3a977",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export {db, app}
// getAuth();

createApp(App).use(BootstrapIconsPlugin).use(store).use(router).mount("#app");
