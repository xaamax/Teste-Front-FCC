<template>
  <nav>
    <a href="/">Home</a>
    <a href="/clientes">Clientes</a>
    <a v-on:click="$store.dispatch('logout')" href="/">Sair</a>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
};
</script>

<style>
nav {
  background-color: #aa3150;
  overflow: hidden;
  width: 100%;
}

nav a {
  float: left;
  color: #f2f2f2f2;
  padding: 14px 16px;
  text-align: center;
  font-size: 17px;
  text-decoration: none;
  margin-right: 5px;
}

nav a:hover {
  background-color: #8c2740;}
</style>