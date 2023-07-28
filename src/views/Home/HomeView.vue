<template>
<div>
  <bottom-control :chartDisplay="chartDisplay" @changeChart="changeChart" :drawerDisplay="drawerDisplay" @showDrawer="showDrawer"/>
  <smartCity/>
  <MapControl/>
  <g2-chart v-if="chartDisplay"/>
  <drawer :drawerDisplay="drawerDisplay" v-if="drawerDisplay"/>
</div>
</template>

<script setup>
import {inject, ref} from "vue";
import SmartCity from '../SmartCity.vue'
import MapControl from '../mapControl.vue'
import G2Chart from '../G2Chart.vue'
import BottomControl from "../bottomControl.vue";
import Drawer from "../../components/drawer.vue";
const {scene,map} = inject('$scene_map')
const chartDisplay=ref(true)
const drawerDisplay=ref(false)
const showDrawer=()=>{
  drawerDisplay.value=true
}
const changeChart=(status)=>{
  chartDisplay.value=status
}
scene.on("click",()=>{
  drawerDisplay.value=false
})
</script>

<style scoped>

</style>