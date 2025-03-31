<template>
  <footer class="main-footer">
    <div><strong>Versão</strong> 1.0.0 | <strong>Copyright © 2025</strong></div>
  </footer>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style scoped>
.main-footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: #f5f5f5;
  border-top: 1px solid #c3c3c3;
  color: #869099;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>