<template>
  <div class="font-poppins">
    <div class="flex">
      <div
        class="md:w-2/5 md:block hidden bg-reg-pattern h-screen bg-cover p-10"
      >
        <h3 class="text-3xl mb-4 font-extrabold text-white">GusFun</h3>
      </div>
      <div
        class="md:w-3/5 w-full flex justify-center items-center min-h-screen"
      >
        <div class="md:w-2/3 w-11/12">
          <div
            class="
              p-3
              bg-slate-500
              rounded-full
              w-12
              h-12
              flex
              justify-center
              items-center
              cursor-pointer
              mb-10
            "
          >
            <router-link to="/">
              <BIconChevronBarLeft class="text-white" />
            </router-link>
          </div>
          <h3 class="text-3xl mb-4 font-extrabold">Register</h3>
          <form @submit.prevent="onSignUp">
            <div class="flex gap-4">
              <div class="mb-6 w-full">
                <label
                  for="fname"
                  class="block mb-2 text-sm font-medium text-gray-900"
                  >Your FirstName</label
                >
                <input
                  type="text"
                  id="fname"
                  class="
                    shadow-sm
                    bg-gray-50
                    border border-gray-300
                    text-gray-900 text-sm
                    rounded-lg
                    focus:ring-blue-500 focus:border-blue-500
                    block
                    w-full
                    p-2.5
                    dark:border-gray-600
                    dark:placeholder-gray-400
                    dark:focus:ring-blue-500
                    dark:focus:border-blue-500
                    dark:shadow-sm-light
                  "
                  placeholder="john"
                  required
                  v-model="fName"
                />
              </div>
              <div class="mb-6 w-full">
                <label
                  for="lname"
                  class="block mb-2 text-sm font-medium text-gray-900"
                  >Your LastName</label
                >
                <input
                  type="text"
                  id="lname"
                  class="
                    shadow-sm
                    bg-gray-50
                    border border-gray-300
                    text-gray-900 text-sm
                    rounded-lg
                    focus:ring-blue-500 focus:border-blue-500
                    block
                    w-full
                    p-2.5
                    dark:border-gray-600
                    dark:placeholder-gray-400
                    dark:focus:ring-blue-500
                    dark:focus:border-blue-500
                    dark:shadow-sm-light
                  "
                  placeholder="doe"
                  v-model="lName"
                  required
                />
              </div>
            </div>
            <div class="mb-6">
              <label
                for="email"
                class="block mb-2 text-sm font-medium text-gray-900"
                >Your email</label
              >
              <input
                type="email"
                id="email"
                class="
                  shadow-sm
                  bg-gray-50
                  border border-gray-300
                  text-gray-900 text-sm
                  rounded-lg
                  focus:ring-blue-500 focus:border-blue-500
                  block
                  w-full
                  p-2.5
                  dark:border-gray-600
                  dark:placeholder-gray-400
                  dark:focus:ring-blue-500
                  dark:focus:border-blue-500
                  dark:shadow-sm-light
                "
                placeholder="name@flowbite.com"
                v-model="email"
                required
              />
            </div>
            <div class="mb-6">
              <label
                for="password"
                class="block mb-2 text-sm font-medium text-gray-900"
                >Your password</label
              >
              <input
                type="password"
                id="password"
                class="
                  shadow-sm
                  bg-gray-50
                  border border-gray-300
                  text-gray-900 text-sm
                  rounded-lg
                  focus:ring-blue-500 focus:border-blue-500
                  block
                  w-full
                  p-2.5
                  dark:border-gray-600
                  dark:placeholder-gray-400
                  dark:focus:ring-blue-500
                  dark:focus:border-blue-500
                  dark:shadow-sm-light
                "
                v-model="password"
                required
              />
            </div>
            <p>{{ comparePassword }}</p>
            <div class="mb-6">
              <label
                for="repeat-password"
                class="block mb-2 text-sm font-medium text-gray-900"
                >Repeat password</label
              >
              <input
                type="password"
                id="repeat-password"
                class="
                  shadow-sm
                  bg-gray-50
                  border border-gray-300
                  text-gray-900 text-sm
                  rounded-lg
                  focus:ring-blue-500 focus:border-blue-500
                  block
                  w-full
                  p-2.5
                  dark:border-gray-600
                  dark:placeholder-gray-400
                  dark:focus:ring-blue-500
                  dark:focus:border-blue-500
                  dark:shadow-sm-light
                "
                v-model="confirmPassword"
                required
              />
            </div>
            <div class="flex items-start mb-6">
              <div class="flex items-center h-5">
                <input
                  id="terms"
                  type="checkbox"
                  value=""
                  class="
                    w-4
                    h-4
                    border border-gray-300
                    rounded
                    bg-gray-50
                    focus:ring-3 focus:ring-blue-300
                    dark:border-gray-600
                    dark:focus:ring-blue-600
                    dark:ring-offset-gray-800
                    dark:focus:ring-offset-gray-800
                  "
                  required
                />
              </div>
              <label for="terms" class="ml-2 text-sm font-medium text-gray-900"
                >I agree with the
                <a
                  href="#"
                  class="text-blue-600 hover:underline dark:text-blue-500"
                  >terms and conditions</a
                ></label
              >
            </div>
            <button
              type="submit"
              class="
                text-white
                bg-blue-700
                hover:bg-blue-800
                focus:ring-4 focus:outline-none focus:ring-blue-300
                font-medium
                rounded-lg
                text-sm
                px-5
                py-2.5
                text-center
                dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800
                flex
                items-center
              "
              :disabled="isLoading"
            >
              <span v-if="isLoading">
                <svg
                  aria-hidden="true"
                  class="w-5 h-5 mr-2 text-gray-200 animate-spin fill-white"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
              </span>
              Login
            </button>
            <p class="mt-3 text-sm font-medium text-gray-900">
              Already have an account?
              <router-link
                to="/login"
                class="text-blue-600 hover:underline dark:text-blue-500"
                >Login</router-link
              >
              instead
            </p>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script>
import { BIconChevronBarLeft } from "bootstrap-icons-vue";
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      fName: "",
      lName: "",
      password: "",
      confirmPassword: "",
      email: "",
    };
  },
  components: { BIconChevronBarLeft },
  methods: {
    ...mapActions("auth", ["signIn"]),
    onSignUp() {
      //   console.log({
      //     email: this.email,
      //     firstName: this.fName,
      //     lastName: this.lName,
      //     password: this.password,
      //     confirmPassword: this.confirmPassword,
      //   });

      this.$store.dispatch("signUpUser", {
        email: this.email,
        password: this.password,
        firstName: this.fName,
        lastName: this.lName,
      });
    },
  },
  computed: {
    comparePassword() {
      return this.password !== this.confirmPassword
        ? "Passwords do not match"
        : "";
    },
    
    ...mapState(["cartActive", "isLoading", "isModalActive", "currentItem"]),
  },
};
</script>
  
  <style>
</style>