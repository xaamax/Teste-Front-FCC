<template>
  <div>
    <Navbar />
    <router-view />
    <Footer />
  </div>
    <Loading v-if="isLoading" />
</template>

<script>
import { mapState } from "vuex";
import Navbar from "./Navbar.vue";
import Footer from "./Footer.vue";
import Loading from "./Loading.vue";
export default {
  name: "Wrapper",
  components: { Navbar, Footer, Loading },
  computed: mapState(["isLoading"]),
};
</script>