<template>
  <div class="container">
    <slot />
  </div>
</template>

<script>
export default {
    name: 'Content'
}
</script>

<style>
.container {
  margin: auto;
  padding: 0 40px;
  max-width: 1000px;
  margin-bottom: 100px;
}
</style>