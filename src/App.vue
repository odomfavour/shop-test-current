<template>
  <!-- <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav> -->
  <router-view/>
</template>
<script>
import { mapMutations } from 'vuex';
export default {
  methods: {
    ...mapMutations(["setUser"]),
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
  },
  watch: {
    user(value) {
      if (value !== null && value !== undefined) {
        this.$router.push("/");
      }
    },
  },
  created() {
  // Retrieve the user information from local storage
  let storedUser = localStorage.getItem("user");
  if (storedUser) {
    this.setUser(JSON.parse(storedUser));
  }
},


}
</script>
<style>


</style>
