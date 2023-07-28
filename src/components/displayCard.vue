<template>
  <div class="displayCard">
    <el-table
        :data="tableData"
        style="width: 100%"
        size="small"
        :max-height="400"
        @row-click="clickRow">
      <el-table-column
          prop="line_num"
          label="地铁线路"
          width="120">
      </el-table-column>
      <el-table-column
          prop="station_name"
          label="站点名称"
          width="90">
      </el-table-column>
      <el-table-column
          label="操作"
          width="50">
        <template #default="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">详情</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--    :before-close="handleClose"-->
    <el-dialog
        v-model="dialogVisible"
        title="地铁线路"
        width="50%"
        append-to-body
    >
      <el-table
          :data="detailData"
          style="width: 100%"
          size="small"
          :max-height="400">
        <el-table-column
            fixed
            prop="line_num"
            label="地铁线路"
            width="120">
        </el-table-column>
        <el-table-column
            fixed
            prop="station_name"
            label="站点名称"
            width="90">
        </el-table-column>
        <el-table-column
            prop="start_name"
            label="线路起点">
        </el-table-column>
        <el-table-column
            prop="end_name"
            label="线路终点">
        </el-table-column>
        <el-table-column
            prop="longitude"
            label="经度">
        </el-table-column>
        <el-table-column
            prop="latitude"
            label="纬度">
        </el-table-column>
        <el-table-column
            prop="station_num"
            label="站点序号">
        </el-table-column>
      </el-table>
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">关闭</el-button>
      </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import {onMounted, onUnmounted, ref, watch, inject} from "vue";
import {PointLayer} from '@antv/l7'
// // 子组件注入父组件的数据
const {scene, map} = inject('$scene_map')
//control dialog
let markerLayer
const dialogVisible = ref(false)
const tableData = ref([])
const props = defineProps({
  dataSource: Array
});
let pointLayer
onMounted(() => {
  // console.log(props.dataSource)
  scene.addImage('crash', 'src/assets/metroWuhan.png')

})
const detailData = ref([])

function reRenderCard() {
  const data = []
  // {
  //   lng:
  //   lat:
  //   type:
  // }
  //1.change data
  //2.render data in map
  if (pointLayer) {
    //  everytime  delete the data before rerender
    scene.removeLayer(pointLayer)
    pointLayer = null
  }
  if (markerLayer) {
    //  everytime  delete the data before rerender
    scene.removeLayer(markerLayer)
    markerLayer = null
  }
  //data process
  tableData.value = props.dataSource.map(item => {
    const {geometry, properties: {line_name, station_name, station_num}} = item
    // console.log(line_num)
    data.push({
      lng: geometry.coordinates[0],
      lat: geometry.coordinates[1],
      line_name,
      station_name,
    })
    return {
      geometry,
      line_name,
      line_num :line_name.split('(')[0],
      station_name,
      station_num
    }
  })
  // console.log(tableData.value)
  pointLayer = new PointLayer()
      .source(data, {
        parser: {
          type: 'json',
          x: 'lng',
          y: 'lat'
        }
      })
      .shape('crash')
      .size(16)
  scene.addLayer(pointLayer)
}

watch(() => props.dataSource, () => {
  //reRender
  reRenderCard()
}, {
  immediate: true
})
const handleClick = (data) => {
  // detailData.value=data
  // console.log(data)
  dialogVisible.value = true
//  data process
  const {geometry: {coordinates},line_num,station_name,line_name,station_num} = data
  const split = line_name.split('(')[1].split('--');
  console.log(split)
  detailData.value = [{
    line_num,
    station_name,
    start_name:split[0],
    end_name:split[1].slice(0,-1),
    longitude: coordinates[0],
    latitude: coordinates[0],
    line_name,
    station_num,
  }]
}
const clickRow = (row) => {
  if (markerLayer) {
    scene.removeLayer(markerLayer)
    markerLayer = null
  }
  // console.log(row)
//  to the point
  map.flyTo({
    center: row.geometry.coordinates,
    zoom: 15,
    speed: 0.4
  })
  const data = [{
    lng: row.geometry.coordinates[0],
    lat: row.geometry.coordinates[1]
  }]
  //put raider
  markerLayer = new PointLayer()
      .source(data, {
        parser: {
          type: 'json',
          x: 'lng',
          y: 'lat'
        }
      })
      .shape('circle')
      .size(60)
      .color('#fff')
      .animate(true)
  scene.addLayer(markerLayer)
}
onUnmounted(() => {
  pointLayer && scene.removeLayer(pointLayer)
  markerLayer && scene.removeLayer(markerLayer)
})
</script>

<style scoped>
.displayCard {
  width: 270px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: 425px;
  bottom: 70px;
  outline: none;
  color: #fff;
  background: #53697670;
  border-radius: 4px;
  box-shadow: 0 0 5px 3px #333;
}

.eleCeil {
  background: transparent;
  text-overflow: ellipsis;
  white-space: nowrap;
}

:deep(.el-table) {
  background-color: transparent;
}

:deep(.el-table tr) {
  background-color: transparent;
  color: #fff;
  cursor: pointer;
}

:deep(.el-table tr:hover) {
  background-color: #333;
}

:deep(.el-table--enable-row-transition .el-table__body td.el-table__cell) {
  background-color: transparent;
}

:deep(.el-table th.el-table__cell) {
  background-color: transparent;
}

:deep(.el-table td.el-table__cell) {
  border-bottom: none;
}

:deep(.el-table__inner-wrapper::before) {
  height: 0;
}

:deep(.cell) {
  white-space: nowrap;
}
</style>
