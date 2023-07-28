<template>
  <Footer>
    <div class="btn-groups">
      <div class="item">
        <button class="btn-toggle" @click="controlRotate">
          <i class="iconfont icon-fuwudiqiu"></i>
        </button>
        <p>{{ mark }}</p>
      </div>
      <div class="item">
        <button class="btn-toggle" @click="toggleControl">
          <i class="iconfont icon-supervision-full"></i>
        </button>
        <p>控制中心</p>
      </div>
      <div class="item">
        <button class="btn-toggle" @click="fly">
          <i class="iconfont icon-icon-test"></i>
        </button>
        <p>{{ position }}</p>
      </div>
      <div class="item">
        <draw-tools ref="drawRef" @start-draw="startDraw">
          <div>
            <button class="btn-toggle">
<!--              <i class="iconfont icon-paint"></i>-->
              <img src="src/assets/icons/metro.png">

            </button>
          </div>
        </draw-tools>
        <p>地铁站点</p>
      </div>
      <div class="item">
        <MeasureTool ref="measureRef" @start-measure="startMeasure">
          <button class="btn-toggle">
            <i class="iconfont icon-ruler"></i>
          </button>
        </MeasureTool>
        <p>地图测量</p>
      </div>
      <div class="item">
          <div>
            <button class="btn-toggle" @click="showDrawer">
              <img src="src/assets/icons/more.png">

            </button>
          </div>
        <p>更多功能</p>
      </div>

    </div>
  </Footer>
</template>

<script setup>
import Footer from '../components/footer.vue'
import drawTools from '../components/drawTools.vue'
import MeasureTool from '../components/MeasureTool.vue'
// import
import {ref, computed, inject, onMounted} from "vue";

const {scene, map} = inject('$scene_map')
const emit = defineEmits(['changeChart','showDrawer'])
const props = defineProps({
  chartDisplay: {
    type: Boolean
  }
})
let mark = computed(() => {
  return isRotate.value ? "停止自转" : "开始自转"
})

const isRotate = ref(true)

function rotateEarth() {
  const zoom = map.getZoom()
  if (zoom < 5) {
    let center = map.getCenter()
    center.lng += 10
    map.easeTo({center, duration: 1000, easing: n => n})
  }
}

const controlRotate = () => {
  isRotate.value = !isRotate.value
  if (!isRotate.value) {
    map.stop()
  } else {
    rotateEarth()
  }
}
const toggleControl = () => {
  emit('changeChart', !props.chartDisplay)
}
const showDrawer=()=>{
  emit('showDrawer')
}
onMounted(() => {
  rotateEarth()
  //只要转了就继续执行该函数
  map.on('moveend', () => {
    isRotate.value && rotateEarth()
  })
})
const inWuHan = ref(false)
const position = computed(() => {
  return inWuHan.value ? "飞行武汉" : "地图复位"
})
const fly = () => {
  inWuHan.value = !inWuHan.value
  if (inWuHan.value) {
    map.flyTo({
      center: [114.30, 30.50],
      zoom: 1,
      pitch: 0,
      bearing: 0

    })
  } else {
    map.flyTo({
      center: [114.30, 30.50],
      zoom: 13,
      pitch: 70,
      bearing: 40

    })
  }

}
const drawRef = ref(null)
const measureRef = ref(null)
// 开始测量，需要关闭绘制功能
const startMeasure = () => {
  drawRef.value.closeAll()
}

// 开始查询，需要关闭测量功能
const startDraw = () => {
  measureRef.value.closeAll()
}
</script>

<style scoped>
.btn-groups {
  /*max-width: 500px;*/
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: rotate(180deg);
  color: #fff;
}

.item {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 10px;
}

.item > p {
  font-size: 12px;
}

.btn-toggle {
  width: 36px;
  height: 38.4px;
  border-radius: 50%;
  margin-bottom: 4px;
  /*border: 1px solid #000;*/
  background: #FFEE6666;
  background: linear-gradient(to bottom, #FFEE6686 0%, #F9932C6F 55%, #F35000A9 100%);
  padding: 10px;
  color: #fff;
  border: none;
  outline: none;
  box-shadow: 0 0 5px 3px #333;
  cursor: pointer;
}

.btn-toggle:hover {
  /*background-color: #536976c4;*/
  background: #F35000C8;
}
.btn-groups img{
  width: 16px;
  height: 16.8px;
}
</style>