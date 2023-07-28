<template>

</template>

<script setup>
import {inject, onMounted} from "vue";
import {Zoom, Logo, Scale, Fullscreen, GeoLocate, ExportImage, LayerSwitch, MouseLocation, MapTheme} from "@antv/l7";
const data= inject('$scene_map')
const {scene, map} = data
import styleOptions from "../js/styleOptions";

onMounted(()=>{
  //logo
  const logo = new Logo({
    //dog
    // img:'https://img1.baidu.com/it/u=1861241475,4148899974&fm=253&fmt=auto&app=138&f=PNG?w=503&h=500',
    //minion
    img:'https://ppt.chnlib.com/FileUpload/2019-02/PNGTou_Ming_Bei_Jing-151450_111.png',
    // 跳转地址
    href: 'https://l7.antv.antgroup.com',
    position: 'topleft',
    style:'width:50px;margin-top:70px'
  })
  scene.addControl(logo)
  //scale
  const scale = new Scale({
    // name: 'z1', // 用户传入的控件名称（也可以不传入，该控件默认名称为 zoom）
    zoomInTitle: '放大',
    zoomOutTitle: '缩小',
    position: 'bottomright',
    style:"background-color:transparent;color:transparent",
  });
  scene.addControl(scale);
  scale.hide()
  //zoom
  const zoom = new Zoom({
    // position: 'leftbottom',
    // position: 'bottomleft',
    zoomInTitle:'放大',
    zoomOutTitle:'缩小',
    className: 'my-test-class',
    style:"border-radius: 15px;"
  });
  // 将实例化的控件添加至 L7 中
  scene.addControl(zoom);
  //fullScreen
  const fullscreen = new Fullscreen({
    btnText: '全屏',
    exitBtnText: '退出全屏',
  });
  scene.addControl(fullscreen);
  //mouse
  const mouseLocation = new MouseLocation({
    style:'min-width:78px;border-radius: 10px;',
    transform: (position) => {
      return position.map(i=>{return i.toFixed(2)});
    },
  });
  scene.addControl(mouseLocation);
  //mapStyle
  const mapTheme = new MapTheme({
    options:styleOptions
  });
  scene.addControl(mapTheme);
  //locate
  const geoLocate = new GeoLocate({
    transform: (position) => {
      // 将获取到基于 WGS84 地理坐标系 的坐标转成 GCJ02 坐标系
      return gcoord.transform(position, gcoord.WGS84, gcoord.GCJ02);
    },
  });
  scene.addControl(geoLocate)

  const zoomDeal=()=>{
    let zoom = scene.getZoom();
    // const zoomControl = scene.getControlByName('zoom');
    zoom < 4 ? scale.hide():scale.show()
  }
  setInterval(zoomDeal, 500);


})
</script>


<style scoped>

</style>