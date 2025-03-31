<template>
  <div class="wrapper">
    <slot />
  </div>
</template>

<script>
export default {
    name: 'Content'
}
</script>

<style>
.wrapper {
  margin: 0 auto;
  padding: 0 40px;
  max-width: 1000px;
}
</style>