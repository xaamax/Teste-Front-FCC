<template>
  <nav>
    <a href="/">Home</a>
    <a href="/cliente/incluir">Incluir Cliente</a>
    <a v-on:click="$store.dispatch('logout')" href="/">Sair</a>
  </nav>
</template>

<script>
export default {
    name: 'Navbar',
}
</script>

<style>
nav {
    background-color: #AA3150;
    overflow: hidden;
} 

nav a {
    float: left;
    color: #F2F2F2F2;
    padding: 14px 16px;
    text-align: center;
    font-size: 17px;
    text-decoration: none;
    margin-right: 5px;
}
</style>