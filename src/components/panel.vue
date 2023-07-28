<template>
  <div class="g2-chart">
    <div class="g2-header">
      <slot name="header"></slot>
    </div>
    <div class="g2-content">
      <div style="padding: 30px">
        <slot name="content"></slot>
      </div>
    </div>
  </div>
</template>

<script setup>

</script>

<style scoped>
.g2-header {
  width: 100%;
  height: 41px;
  background: url('../assets/newHeader.png');
  background-size: 88% 100%;
  background-position: 20%;
  background-repeat: no-repeat;
  margin-bottom: 17px;
  text-align: center;
  color: #00e5ff;
  font-size: 20px;
  font-weight: bolder;
  line-height: 40px;
}

/*.g2-chart{*/
/*  padding: 0 10px;*/
/*}*/

.g2-content {
  position: relative;
  width: 100%;
  min-height: 80px;
  background: #53697670;
  border-radius: 10px;
  color: #fff;
  /*max-height: 25vh;*/
  /*display: flex;*/
  max-height: 400px;

}
/*.g2-content> canvas{*/
/*  height: 20px;*/
/*}*/
.g2-content img{
  width: 20px;
}
.g2-content {
  background-image: url("../assets/newContent.png");
  background-size: cover;
}
/*.g2-content::after {*/
/*  !*  !*伪元素第一步 给content*!*!*/
/*  content: '';*/
/*  position: absolute;*/
/*  left: 0;*/
/*  top: -7px;*/
/*  width: 111px;*/
/*  height: 35px;*/
/*  transform: rotate(180deg);*/
/*  background-image: url('../assets/border.png');*/
/*}*/

/*.g2-content::before {*/
/*  content: '';*/
/*  position: absolute;*/
/*  right: 0;*/
/*  bottom: -6px;*/
/*  width: 111px;*/
/*  height: 35px;*/
/*  background-image: url('../assets/border.png');*/
/*}*/
</style>