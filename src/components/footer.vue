<template>
  <div class="footer">
    <slot/>
  </div>
</template>

<script setup>

</script>

<style scoped>
.footer{
  width: 100%;
  height: 5vh;
  position: fixed;
  left: 0;
  bottom: 0;
  background: url("src/assets/xzd-header.png");
  background-size: cover;
  transform: rotate(180deg);
  z-index: 3;
  /*display: flex;*/
}
</style>