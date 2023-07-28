<template>
  <!--  地图基座-->
  <Header/>
  <!--  路由视图-->
  <router-view v-slot="{Component}">
    <!--    缓存，提高地图性能-->
    <keep-alive>
      <component :is="Component"></component>
    </keep-alive>
  </router-view>
  <div id="map"></div>
</template>

<script setup>
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import {onMounted} from "vue";
import {Scene, Mapbox} from "@antv/l7";
import {app} from './main.js'
import Header from './components/header.vue'
import {RouterView} from 'vue-router'
import mapStyles from './js/styles'

onMounted(() => {
//  init the Map
  const homeLoc = [114.30, 30.50];
  const token = import.meta.env.VITE_TOKEN
  mapboxgl.accessToken = token
  const map = new mapboxgl.Map({
    container: 'map',
    style: mapStyles.dark,
    center: homeLoc,
    zoom: 1,
    projection: 'globe',
    attributionControl: false,
  })

  const scene = new Scene({
    id: 'map',
    map: new Mapbox({
      mapInstance: map,
    }),
    logoVisible: false
  })

  map.on("style.load", () => {
    map.setFog({
      'color': '#dc9f9f',
      'high-color': '#245bde',
      'space-color': '#000'
    })
    // 消除边界
    map.setFilter("admin-0-boundary-disputed", [
      "all",
      ["==", ["get", "disputed"], "true"],
      ["==", ["get", "admin_level"], 0],
      ["==", ["get", "maritime"], "false"],
      ["match", ["get", "worldview"], ["all", "CN"], true, false],
    ]);
    map.setFilter("admin-0-boundary", [
      "all",
      ["==", ["get", "admin_level"], 0],
      ["==", ["get", "disputed"], "false"],
      ["==", ["get", "maritime"], "false"],
      ["match", ["get", "worldview"], ["all", "CN"], true, false],
    ]);
    map.setFilter("admin-0-boundary-bg", [
      "all",
      ["==", ["get", "admin_level"], 0],
      ["==", ["get", "maritime"], "false"],
      ["match", ["get", "worldview"], ["all", "CN"], true, false],
    ]);

  })
  scene.on('click', () => {
    map.flyTo({
      bearing: 0,
      pitch: 0,
    })
  })
  //根组件提供数据给子组件
  app.provide('$scene_map', {scene, map})


})
</script>

<style scoped>
#map {
  left: 0;
  top: 0;
  position: absolute;
  width: 100vw;
  height: 100vh;
}

/*#nav {*/
/*  position: fixed;*/
/*  z-index: 1000;*/
/*  top: 10px;*/
/*  left: 50px*/
/*}*/

html,
body {
  overflow: hidden;
}

/*.v-enter,*/
/*.v-leave-to {*/
/*  opacity: 0;*/
/*}*/

/*.v-enter-active,*/
/*.v-leave-active {*/
/*  transition: opacity .7s;*/
/*}*/
</style>