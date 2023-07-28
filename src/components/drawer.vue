<template>
  <el-drawer v-model=drawer :with-header="false" size="20%">
    <div>
      <b>武汉国际航班</b>
      <el-switch
          v-loading="loading"
          v-model="valueFlight"
          inline-prompt
          active-text="显示"
          inactive-text="隐藏"
      />

    </div>
    <div>
      <span>前往其他城市</span>
      <el-select v-model="selectedCity" placeholder="选择跳转的城市">
        <el-option
            v-for="item in cityList"
            :key="item.city"
            :label="item.city"
            :value="item.coordinates"
        />
      </el-select>
    </div>
    <div>
      <el-dropdown @command="handleCommand">
    <span class="el-dropdown-link">
      修改投影方式<el-icon class="el-icon--right"><arrow-down/></el-icon>
    </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item v-for="item in projectionStyles" :command="item">{{ item }}</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
    <div>
      <b>全国热力图</b>
      <el-switch
          v-model="valueHeat"
          inline-prompt
          active-text="显示"
          inactive-text="隐藏"
      />
    </div>
    <el-divider>3D模型</el-divider>
    <div>
      <b>天河机场</b>
      <el-switch
          v-model="valueThree"
          inline-prompt
          active-text="显示"
          inactive-text="隐藏"
      />
    </div>
    <div>
      <b>欢乐谷</b>
      <el-switch
          v-model="valueCastle"
          inline-prompt
          active-text="显示"
          inactive-text="隐藏"
      />
    </div>
    <div>
      <b>起义街清真寺</b>
      <el-switch
          v-model="value1"
          inline-prompt
          active-text="显示"
          inactive-text="隐藏"
      />
    </div>
    <div>
      <b style="margin-right: 10px">光源</b>
      <el-color-picker color-format="rgb" v-model="color1"/>
    </div>
    <div class="slider-demo-block">
      <span class="demonstration">X:</span>
      <el-slider v-model="valueLight"/>
    </div>
    <div class="slider-demo-block">
      <span class="demonstration">Y:</span>
      <el-slider v-model="valueLight1"/>
    </div>
    <div class="slider-demo-block">
      <span class="demonstration">Z:</span>
      <el-slider v-model="valueLight2"/>
    </div>
    <el-divider>
      <el-icon>
        <star-filled/>
      </el-icon>
    </el-divider>
    <div class="demo-collapse">
      <el-collapse v-model="activeName" accordion>
        <el-collapse-item title="项目介绍" name="1">

          <div>
            武汉智慧城市是一款强大的Web端GIS产品，基于Vue前端框架和开源项目Mapbox与AntV-L7开发，支持海量的交互功能和丰富的可视化界面。
          </div>

        </el-collapse-item>
        <el-collapse-item name="2">
          <template #title>
            关于我们
            <el-icon class="header-icon">
              <info-filled/>
            </el-icon>
          </template>
          <div class="aboutUs">
            <span>马辉</span>
            <span>孙谢廖沙</span>
            <span>刘斐凡 </span>
            <span>刘文萍</span>
            <span>钟江平</span>
            <span>朱自豪</span>
            <span>王泓瑞</span>
            <span>尼玛桑珠</span>
            <span>易子铖</span>
            <span>王俊茏</span>
          </div>
        </el-collapse-item>
        <el-collapse-item title="指导老师" name="3">
          <div>
            王诗阳
          </div>
          <div>
            程超
          </div>
        </el-collapse-item>
      </el-collapse>
      <div class="down">
        <span>中地数码</span>
        <span>中国地质大学（武汉）</span>
      </div>
    </div>
  </el-drawer>
</template>

<script setup>
import {ref, onMounted, watch, inject, h} from 'vue'
import axios from "axios";
import {LineLayer, Popup, PointLayer, HeatmapLayer} from "@antv/l7";
import colors from "../js/colors";
import cityList from "../js/city";
import {StarFilled} from '@element-plus/icons-vue'

const {scene, map} = inject("$scene_map")
const selectedCity = ref()
const drawer = ref(true)
const valueFlight = ref(false)
const valueHeat = ref(false)
const valueThree = ref(false)
const valueCastle = ref(false)
const activeName = ref('1')
const valueLight = ref(0)
const valueLight1 = ref(0)
const valueLight2 = ref(0)
import projectionStyles from "../js/projectionStyles";
import {ElMessage,ElNotification} from 'element-plus'
import {ArrowDown, InfoFilled} from '@element-plus/icons-vue'
import modelLoadHelper from '../js/loadObjModels'

const color1 = ref()
const value1 = ref(false)
const handleCommand = (command) => {
  ElMessage(`click on item ${command}`)
  map.setProjection(command)
}

async function addFlightLines() {
  /* eslint-disable no-eval */
  const flightData = await axios('http://localhost:8080/wuhan_flight')
  scene.addImage(
      'plane',
      'https://gw.alipayobjects.com/zos/bmw-prod/0ca1668e-38c2-4010-8568-b57cb33839b9.svg'
  );
  /* 2、加载飞行轨迹数据 */
  const flyLineLayer = new LineLayer({
    name: "飞行轨迹",
    minZoom: 3
  })
      .source(flightData.data)
      .color('#15c7aa')
      .shape('arc')
      .size(1)
  flyLineLayer.hide()
  scene.addLayer(flyLineLayer);
  /* 3、飞机 */
  const planeLineLayer = new LineLayer({
    blend: 'normal',
    name: "飞机",
    minZoom: 3
  })
      .source(flightData.data)
      .color('rgba(12,134,255,0.6)')
      .texture('plane')
      .shape('arc')
      .size(15)
      .animate({
        duration: 1,
        interval: 0.2,
        trailLength: 0.05
      })
      .style({
        textureBlend: 'replace',
        lineTexture: true, // 开启线的贴图功能
        iconStep: 10, // 设置贴图纹理的间距
      })
      .select(true);
  planeLineLayer.on('click', e => {
    const popup = new Popup({
      // html: `前往<b>${e.feature.properties.destAirportName}</b><br/>${e.feature.properties.status}`,
      html: `<table border="true">
  <thead>
    <tr>
      <th>目的地</th>
      <th>${e.feature.properties.destAirportName}</th>
    </tr>
  </thead>
  <tbody>
  <tr>
      <td>航班号</td>
      <td>${e.feature.properties.lineName}</td>
    </tr>
    <tr>
      <td>起飞时间</td>
      <td>${e.feature.properties.beginTime}</td>
    </tr>
    <tr>
      <td>全程用时</td>
      <td>${e.feature.properties.useTime}</td>
    </tr>
    <tr>
      <td>落地时间</td>
      <td>${e.feature.properties.endTime}</td>
    </tr>
    <tr>
      <td>登机口</td>
      <td>${e.feature.properties.park}</td>
    </tr>
    <tr>
      <td>航站楼</td>
      <td>${e.feature.properties.terminal}</td>
    </tr>
    <tr>
      <td>航班状态</td>
      <td>${e.feature.properties.status}</td>
    </tr>
  </tbody>
</table>`,
      lngLat: e.lngLat,
      closeOnClick: true,
      closeButton: false
    });
    scene.addPopup(popup)
  });
  planeLineLayer.hide()
  scene.addLayer(planeLineLayer);


  const detailData = flightData.data.features
  const cities = detailData.map(item => {
    const {geometry: {coordinates}} = item
    return {
      lng: coordinates[1][0],
      lat: coordinates[1][1]
    }
  });
  /* 4、终点数据 */
  const endLayer = new PointLayer({
    name: "航线终点"
  })
      .source(cities, {
        parser: {
          type: 'json',
          x: 'lng',
          y: 'lat',
        }
      })
      .shape('circle')
      .color('#739DFF')
      .animate(true)
      .size(20);
  scene.addLayer(endLayer)
  endLayer.hide()
  // return [dotPointLayer, flyLineLayer,worldLine]
}

onMounted(async () => {
  await addFlightLines();
  //热力学图
  fetch(
      'http://localhost:8080/china_heat'
  )
      .then(res => res.json())
      .then(data => {
        const heatLayer = new HeatmapLayer({
          name: "全国热力图",

        })
            .source(data)
            .shape('heatmap')
            .size('mag', [0, 1.0,]) // weight映射通道
            .style({
              intensity: 2,
              radius: 10,
              rampColors: {
                colors: [
                  '#FF4818',
                  '#F7B74A',
                  '#FFF598',
                  '#91EABC',
                  '#2EA9A1',
                  '#206C7C'
                ].reverse(),
                positions: [0, 0.2, 0.4, 0.6, 0.8, 1.0]
              }
            });
        scene.addLayer(heatLayer);
        heatLayer.hide()
      })

})

// 模型
let modelLayer
const modelLoadOpt = {
  // 添加模型的坐标点
  center: [114.2139, 30.7755],
  // 模型朝向的角度
  angle: 83,
  // x,y,z三轴上的缩放比例
  scale: {
    x: 1000,
    y: 1000,
    z: 1000
  },

  // obj模型的路径
  objUrl: '/src/assets/Mod/airport/机场航站楼.obj',
  // obj模型的材质贴图
  mtlUrl: '/src/assets/Mod/airport/机场航站楼.mtl'
}
const loader = new modelLoadHelper(map, modelLoadOpt)
// 添加模型
const addModel = () => {
  if (loader) {
    modelLayer = loader.addModel()
  }
}
const removeModel = () => {
  modelLayer && loader && loader.removeModel(modelLayer.id)
}

// 模型
let castleLayer
const castleModel = {
  // 添加模型的坐标点
  center: [114.393051, 30.591404],
  modelId: "castle",
  // 模型朝向的角度
  angle: 65,
  // x,y,z三轴上的缩放比例
  scale: {
    x: 1000,
    y: 1000,
    z: 1000
  },

  // obj模型的路径
  objUrl: '/src/assets/Mod/castle/castle.obj',
  // obj模型的材质贴图
  mtlUrl: '/src/assets/Mod/castle/castle.mtl'
}
const castleLoader = new modelLoadHelper(map, castleModel)
// 添加模型
const addCastle = () => {
  if (loader) {
    castleLayer = castleLoader.addModel()
  }
}
const removeCastle = () => {
  castleLayer && castleLoader && castleLoader.removeModel(castleLayer.id)
}

// 模型
let mosque1Layer
const mosque1Model = {
  // 添加模型的坐标点
  center: [114.306698, 30.524779],
  modelId: "mosque",
  // 模型朝向的角度
  angle: 0,
  // x,y,z三轴上的缩放比例
  scale: {
    x: 1000,
    y: 1000,
    z: 1000,
  },

  // obj模型的路径
  objUrl: '/src/assets/Mod/mosque3/Mosque Tower/Mosque Tower.obj',
  // obj模型的材质贴图
  mtlUrl: '/src/assets/Mod/mosque3/Mosque Tower/Mosque Tower.mtl'
}
const mosque1Loader = new modelLoadHelper(map, mosque1Model)
// 添加模型
const addMosque1 = () => {
  if (mosque1Loader) {
    mosque1Layer = mosque1Loader.addModel()
  }
}
const removeMosque1 = () => {
  mosque1Layer && mosque1Loader && mosque1Loader.removeModel(mosque1Layer.id)
}
watch(valueFlight, (v) => {
  const planeLayer = scene.getLayerByName("飞机");
  const pathLayer = scene.getLayerByName("飞行轨迹");
  const endLayer = scene.getLayerByName("航线终点");
  if (v) {
    planeLayer.show()
    pathLayer.show()
    endLayer.show()
  } else {
    planeLayer.hide()
    pathLayer.hide()
    endLayer.hide()
  }
})
watch(valueHeat, (v) => {
  const heatLayer = scene.getLayerByName("全国热力图");
  if (v) {
    heatLayer.show()
    heatLayer.show()
    heatLayer.show()
  } else {
    heatLayer.hide()
    heatLayer.hide()
    heatLayer.hide()
  }
})
watch(selectedCity, (v) => {
  map.flyTo({
    center: v,
    zoom: 13,
    pitch: 0,
    bearing: 0

  })
})
watch(valueThree, (v) => {
  v ? addModel() : removeModel()
  map.flyTo({
    center: [114.2139, 30.7755],
    zoom: 14,
    pitch: 0,
    bearing: 0

  })
})
watch(valueCastle, (v) => {
  v ? addCastle() : removeCastle()
  map.flyTo({
    center: [114.393051, 30.591404],
    zoom: 15,
    pitch: 30,
    bearing: 0

  })
})
watch(value1, (v) => {
  v ? addMosque1() : removeMosque1()
  map.flyTo({
    center: [114.306698, 30.524779],
    zoom: 18,
    pitch: 65,
    bearing: 0
  })
})

function addLight(v, loader) {
  loader.changeLight(v[0], v[1], v[2], v[3])
}

let t=0
watch([color1, valueLight, valueLight1, valueLight2], (v) => {
  if (valueThree.value) addLight(v, loader)
  if (valueCastle.value) addLight(v, castleLoader)
  if (value1.value) addLight(v, mosque1Loader)
  if (!value1.value && !valueCastle.value && !valueThree.value) {
    if (t===0) {
      ElNotification({
        title: 'WARN!',
        message: h('i', {style: 'color: teal'}, '请至少打开一个模型！(此消息只弹出一次)'),
      })
      t++
    }
    color1.value = ''
    valueLight.value = 0
    valueLight1.value = 0
    valueLight2.value = 0
  }
})

</script>

<style scoped>
.example-showcase .el-dropdown + .el-dropdown {
  margin-left: 15px;
}

.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}

.down {
  width: 300px;
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: space-around;
}

.down span {
  font-size: 12px;
}

.aboutUs {
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-around;
}

.aboutUs span {
  line-height: 20px;
  font-weight: bolder;
  width: 10px;
}

.slider-demo-block {
  display: flex;
  align-items: center;
}

.slider-demo-block .el-slider {
  margin-top: 0;
  margin-left: 12px;
}

.slider-demo-block .demonstration {
  font-size: 14px;
  color: var(--el-text-color-secondary);
  line-height: 30px;
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 0;
}

.slider-demo-block .demonstration + .el-slider {
  flex: 0 0 70%;
}
</style>