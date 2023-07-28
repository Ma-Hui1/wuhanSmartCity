<template>
  <header class="header">
    <div class="timer">
      <p>{{ nowDateref }}</p>
      <p>{{ nowTimeref }}</p>
    </div>
    <span>智慧城市-武汉</span>
  </header>
</template>

<script setup>
// // 子组件注入父组件的数据
import {inject, defineProps} from 'vue'
// const {scene, map} = inject('$scene_map')
// let props = defineProps({
//   scene:{
//     type:Object
//   }
// });
// console.log(props.scene)
// console.log(map)
import {ref, onMounted} from "vue";

const nowDateref = ref("")
const nowTimeref = ref("")
const nowWeekref = ref("")

// time=new Date()

function getDate1() {

  //顺便处理一下zoom的bug
  // let zoom = scene.getZoom();
  // const zoomControl = scene.getControlByName('zoom');
  // zoom < 6 ? zoomControl.hide():zoomControl.show()

  var _this = this;
  let yy = new Date().getFullYear();
  let mm = new Date().getMonth() + 1;
  let dd = new Date().getDate();
  let week = new Date().getDay();
  let hh = new Date().getHours();
  let ms =
      new Date().getSeconds() < 10 ?
          "0" + new Date().getSeconds() :
          new Date().getSeconds();
  let mf =
      new Date().getMinutes() < 10 ?
          "0" + new Date().getMinutes() :
          new Date().getMinutes();
  if (week == 1) {
    nowWeekref.value = "周一";
  } else if (week == 2) {
    nowWeekref.value = "周二";
  } else if (week == 3) {
    nowWeekref.value = "周三";
  } else if (week == 4) {
    nowWeekref.value = "周四";
  } else if (week == 5) {
    nowWeekref.value = "周五";
  } else if (week == 6) {
    nowWeekref.value = "周六";
  } else {
    nowWeekref.value = "周日";
  }
  // nowTimeref.value = hh + ":" + mf + ":" + ms;
  //ms是秒，这里可以根据自己需要调整格式
  nowTimeref.value = hh + ":" + mf + ":" + ms;
  // nowDateref.value = yy + "年" + mm + "月" + dd + "日";
  nowDateref.value = yy + "-" + mm + "-" + dd;
  return {
    nowDate: nowDateref,
    nowTime: nowTimeref,
    nowWeek: nowWeekref,
  }
}

onMounted(() => {
  setInterval(getDate1, 500);

})


</script>

<style scoped>
.header {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  /*高度的10%*/
  height: 10vh;
  background: url("../assets/header3.png");
  background-size: cover;
  z-index: 3;
  display: flex;
  align-items: center;
  color: white;
}

.header span {
  font-weight: bolder;
  font-size: 30px;
}

.timer {
  font-size: 24px;
  margin-left: 20px;
  text-align: center;
}

.timer p {
  /*font-family: “Courier New”, Courier, monospace;*/
  font-family: clockicons, sans-serif, Georgia, Times, 'Times New Roman', serif;
  font-weight: bold;
}

.header span {
  position: absolute;
  top: 39%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>