<template>

</template>

<script setup>
import {inject, onMounted} from "vue";
//引入cityBulidLayer
import {LineLayer, LayerSwitch, Popup, PointLayer, CityBuildingLayer, HeatmapLayer} from "@antv/l7";
import colors from '../js/colors'
import colorsOfPoli from '../js/colorsOfPoli'
import weatherIcon from "../js/weather-icon";
// 3D模型的
import modelLoadHelper from '../js/loadObjModels'
const data = inject('$scene_map')
const {scene, map} = data
import axios from 'axios'
const addCityBuildings = async () => {
  const buildData = await axios("http://localhost:8080/wuhan_building");
  const cityLayer = new CityBuildingLayer({
    name: "武汉市建筑",
  })
      .source(buildData.data)
      .size("Elevation", (h) => h)
      .color("rgb(242,246,250)")
      .animate(true)
      .animate({
        enable: true,
      })
      .active({
        color: "#0ff",
        mix: 0.5,
      })
      .style({
        opacity: 0.7,
        baseColor: "rgb(16,16,16)",
        windowColor: "rgb(30,60,89)",
        brightColor: "rgb(255,176,38)",
        sweep: {
          enable: true,
          sweepRadius: 2,
          sweepColor: "#1990fF",
          sweepSpeed: 0.3,
          //泛光中心点
          sweepCenter: [114.3, 30.5],
        },
        //
      })
      .filter("Elevation", (h) => h > 40);
  cityLayer.hide()
  scene.addLayer(cityLayer);
  return cityLayer;
};
const addFlowLines = async () => {
  const roadsData = await axios("http://localhost:8080/wuhan_roads");
  const lineLayerRoads = new LineLayer({
    name: "武汉市道路",
  })
      .source(roadsData.data)
      .size(1)
      .shape("line")
      .color("name", colors)
      .animate({
        interop: 1,
        duration: 2,
        trailLength: 2,
      })
      .filter("coordinates", (evt) => {
        return evt.length > 20;
      });
  scene.addLayer(lineLayerRoads);
  lineLayerRoads.hide()
  return lineLayerRoads;
};
const addMetroLines = async () => {
  const lines = ['轨道交通1号线', '轨道交通2号线', '轨道交通3号线', '轨道交通4号线', '轨道交通5号线', '轨道交通6号线', '轨道交通7号线',
    '轨道交通8号线', '轨道交通11号线', '轨道交通16号线', '轨道交通21号线']
  const metroData = await axios('http://localhost:8080/wuhan_mlines')
  const lineLayerMetro = new LineLayer({
    name: "武汉市地铁",
    pickingBuffer: 3
  }).source(metroData.data)
      .size(2)
      .shape('line')
      .scale('name', {
        type: 'cat',
        domain: ['轨道交通1号线', '轨道交通2号线', '轨道交通3号线', '轨道交通4号线', '轨道交通5号线', '轨道交通6号线', '轨道交通7号线',
          '轨道交通8号线', '轨道交通11号线', '轨道交通16号线', '轨道交通21号线'],
        // domain:['轨道交通1号线(汉口北--径河)','轨道交通2号线(天河机场--佛祖岭)','轨道交通3号线(沌阳大道--宏图大道)',
        //   '轨道交通4号线(武汉火车站--柏林)','轨道交通5号线(武汉站东广场--中医药大学)','轨道交通6号线(新城十一路--东风公司)',
        //   '轨道交通7号线(青龙山地铁小镇--横店)', '轨道交通8号线(军运村--金潭路)','轨道交通11号线(葛店南站--武汉东站)',
        //   '轨道交通16号线(国博中心南--通航机场)','轨道交通21号线(阳逻线)(金台--后湖大道)']
      })
      .color('name', colorsOfPoli)
      // .color('name',(v)=>{
      //   switch (v) {
      //     case lines[0]:
      //       return colorsOfPoli[0]
      //     case lines[1]:
      //       return colorsOfPoli[1]
      //     case lines[2]:
      //       return colorsOfPoli[2]
      //     case lines[3]:
      //       return colorsOfPoli[3]
      //     case lines[4]:
      //       return colorsOfPoli[4]
      //     case lines[5]:
      //       return colorsOfPoli[5]
      //     case lines[6]:
      //       return colorsOfPoli[6]
      //     case lines[7]:
      //       return colorsOfPoli[7]
      //     case lines[8]:
      //       return colorsOfPoli[8]
      //     case lines[9]:
      //       return colorsOfPoli[9]
      //     case lines[10]:
      //       return colorsOfPoli[10]
      //     default:
      //       return '#fff'
      //   }
      // })
      .select({
        color: 'black',
        mix: .6
      })

  lineLayerMetro.on('mousemove', e => {
    const popup = new Popup({
      offsets: [0, 0],
      closeButton: false,
      closeOnClick: true
    })
        .setLnglat(e.lngLat)
        .setHTML(`<span><b>${e.feature.properties.name}</b>(${e.feature.properties.front_name}-${e.feature.properties.terminal_name})</span>`);
    scene.addPopup(popup);
  });
  scene.addLayer(lineLayerMetro)
  return lineLayerMetro
}
onMounted(async () => {
  const buildLayer = await addCityBuildings();
  const roadsLayer = await addFlowLines();
  const metroLayer = await addMetroLines();
  metroLayer.hide()
  /* 设置天气图片 */
  weatherIcon.forEach(item => {
    scene.addImage(item.type.split("-")[0], item.url)
  })
  await fetch(
      'http://localhost:8080/hubei_weather'
  )
      .then(res => res.json())
      .then(data => {
        const imageLayer = new PointLayer({
          name: "湖北省天气",
          minZoom: 5
        })
            .source(data)
            .shape('w', w => Number(w))
            .size(15);
        imageLayer.hide()
        scene.addLayer(imageLayer);
      });
  const weatherLayer = scene.getLayerByName("湖北省天气");

  //全国航线
  const { data } = await axios('http://localhost:8080/china_wind')
  const flightChinaLayer = new LineLayer({
    name:"全国航线",
    zIndex: 1,
    blend: 'normal'
})
    .source(data)
    .size(1)
    .shape('greatcircle')
    .animate({
      enable: true,
      interval: 0.1,
      trailLength: 0.5,
      duration: 2
    })
    .color('#8C1EB2')
    .style({
      opacity: 0.5
    });
  scene.addLayer(flightChinaLayer)
  flightChinaLayer.hide()

  const layerSwitch = new LayerSwitch({
    title: '图层目录',
    layers: [metroLayer, weatherLayer,buildLayer, roadsLayer,flightChinaLayer],
  })
  scene.addControl(layerSwitch);


});
</script>

<style scoped>
</style>