<template>
  <el-popover
      placement="top"
      :width="200"
      trigger="click"
      popper-style="width: 100px;background-color: #53697670;color:#fff"
  >
    <div class="popover-content">
      <i v-for="item in toolsIcon" :class="['iconfont',`icon-${item}`]" @click="query(item)"></i>
    </div>
    <template #reference>
      <!--      <el-button class="m-2">Hover to activate</el-button>-->
      <slot></slot>
    </template>
  </el-popover>
  <display-card :dataSource="eventData" v-if="showCard"/>
</template>

<script setup>
import {ref, inject, onMounted, computed} from "vue";
import axios from 'axios'

const eventData = ref([])
//注册emit事件，然后在开始绘制的时候，调用它
const emit = defineEmits(['startDraw'])
const closeAll = () => {
  showCard.value = false
  stopDrawing()
}
const showCard = computed(() => {
  return eventData.value.length
})
const {scene, map} = inject('$scene_map')
let dataSource = []
const toolsIcon = ['drawPolygonTool', 'drawRectTool', 'drawCircleTool', 'delete']
//引入l7Draw
import {DrawPolygon, DrawRect, DrawCircle, DrawEvent} from '@antv/l7-draw'
import {feature, point, polygon, booleanPointInPolygon} from "@turf/turf";
import DisplayCard from "./displayCard.vue";
import {ElMessage} from "element-plus";
//init draw tools
const drawTools = {}
const initDrawTools = () => {
  toolsIcon.forEach(tool => {
    switch (tool) {
      case toolsIcon[0]:
        drawTools[tool] = new DrawPolygon(scene, {
          editable: true
        })
        break
      case toolsIcon[1]:
        drawTools[tool] = new DrawRect(scene, {
          editable: true
        })
        break
      case toolsIcon[2]:
        drawTools[tool] = new DrawCircle(scene, {
          editable: true
        })
        break
      case toolsIcon[3]:
        //delete
        break

    }
  })
}

const stopDrawing = (destroy) => {
  for (let key in drawTools) {
    const tool = drawTools[key]
    tool.clear()
    tool.disable()
    tool.removeActiveFeature()
    destroy && tool.destroy()
  }
  eventData.value = []
}
// 我们将closeAll方法暴露出去，这样父组件就可以调用这个方法来清除子组件的绘制工具了
defineExpose({
  closeAll
})
//save the result we draw
const features = []
const query = (type) => {
  emit('startDraw')
  // console.log(type)
  //First delete the last selected
  stopDrawing()
  if (type === 'delete')
    return
  //find the selected tool
  const drawTool = drawTools[type]
  if (drawTool) {
    drawTool.enable()
    //  listen the changes
    drawTool.on(DrawEvent.Change, (allFeatures) => {
      // console.log(allFeatures)
      allFeatures.forEach((feature, index) => {
        if (index !== (allFeatures.length - 1)) {
          drawTool.removeFeature(feature)
        } else {
          // console.log(feature.geometry.coordinates);
          const polygonArea = polygon(
              feature.geometry.coordinates
          )
          const resData = dataSource.value.features.filter(item => {
            const {geometry: {coordinates}} = item
            const pointTurf = point(coordinates)
            const isInArea = booleanPointInPolygon(pointTurf, polygonArea)
            return isInArea
          })
          eventData.value = resData
          const filter = resData.map(item=>{
            const {properties:{station_name}} = item
            return station_name
          });
          const set = new Set(filter);
          if (set.size>0) {
            ElMessage({
              message: '查询成功！该区域内共有' + set.size + '个地铁站，其中中转站' + (resData.length - set.size) + '个',
              type: 'success',
            })
          }
          else {
            ElMessage({
              message: '该区域内暂无已通行地铁站！',
              type: 'warning',
            })
          }
        }
      })
    })

  }
}

//get Event in Wuhan
const getData = async () => {
  const {data} = await axios.get('http://localhost:8080/wuhan_mpoints')
  dataSource.value = data
}

onMounted(() => {
  getData()
  initDrawTools()
})
</script>

<style scoped>
.popover-content {
  display: flex;
  justify-content: space-around;
}

.popover-content i {
  cursor: pointer;
  padding: 4px;
}

.popover-content i:hover {
  background-color: #536976e0;
}
</style>