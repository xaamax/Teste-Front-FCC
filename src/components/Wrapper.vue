<template>
  <div>
    <Navbar />
    <router-view />
  </div>
</template>

<script>
import Navbar from './Navbar.vue';
export default {
name: 'Wrapper',
components: { Navbar }
}
</script>

<style>

</style>