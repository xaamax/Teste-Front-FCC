<template>
    <div class="loading">        
      <img src="@/assets/loading.gif" alt="Loading" />
    </div>
  </template>
  
  <script>
  export default {
    name: "Loading",
  };
  </script>
  
  <style>
  .loading {
    overflow: hidden;
    grid-area: content;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(255, 255, 255, 0.8);
    position: fixed;
    height: 100%;
    width: 100%;
    left: 0;
    top: 0;
    z-index: 9000;
  }
  
  .loading img {
    height: 10vh;
    width: 10vh;
  }
  </style>