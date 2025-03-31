<template>
    <Navbar />
    <router-view />
    <Footer />
</template>

<script>
import Navbar from "./Navbar.vue";
import Footer from "./Footer.vue";

export default {
  name: "Wrapper",
  components: { Navbar, Footer },
};
</script>