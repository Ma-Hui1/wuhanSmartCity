<template>
  <div class="g2-left">
    <panel>
      <template v-slot:header>{{ leftData[0] }}</template>
      <template v-slot:content>
        <RadarChart v-bind="peoConfig" :data="peoData"></RadarChart>
      </template>
    </panel>
    <panel>
      <template v-slot:header>{{ leftData[1] }}</template>
      <template v-slot:content>
        <LineChart v-bind="pubConfig" :data="pubData"></LineChart>
      </template>
    </panel>
  </div>
  <div class="g2-right">
    <panel>
      <template v-slot:header>{{ rightData[0] }}</template>
      <template v-slot:content>
        <ColumnChart v-bind="purConfig" :data="purData"></ColumnChart>
      </template>
    </panel>
    <panel>
      <template v-slot:header>{{ rightData[1] }}</template>
      <template v-slot:content>
        <RoseChart v-bind="airConfig" :data="airData"></RoseChart>
      </template>
    </panel>
  </div>
</template>

<script setup>
import panel from "../components/panel.vue"
import {ref} from "vue";
//从g2plot中引入图表组件
import {RadarChart, LineChart, ColumnChart,RoseChart} from '@opd/g2plot-vue'
import {useBusOnline} from '../hooks/busOnline'
import {usePopulation} from '../hooks/population'
// import {usePeopleOutdoors} from '../hooks/peopleOutdoors'
import {usePeopleOutDoor} from '../hooks/peopleOutdoor'
import {usePublicTransport} from '../hooks/publicTransport'
import {usePurpose} from '../hooks/purpose'
import {useairQulity} from '../hooks/airQuality'

const leftData = ['武汉各区今日出行人口统计', '武汉公共交通月载客量']
const rightData = ['武汉人口出行目的', '武汉各区今日空气质量统计']
// const {config: peoConfig, data: peoData} = usePeopleOutdoors()
const {config: busConfig, data: busData} = useBusOnline()
const {config: popConfig, data: popData} = usePopulation()
const {config: peoConfig, data: peoData} = usePeopleOutDoor()
const {config: pubConfig, data: pubData} = usePublicTransport()
const {config: purConfig, data: purData} = usePurpose()
const {config: airConfig, data: airData} = useairQulity()

const hospital = [{
  title: '医院',
  num: 30,
  unit: '家',
  iconName: 'hospital'
}, {
  title: '门诊部',
  num: 300,
  unit: '个',
  iconName: 'outpatient'
}, {
  title: '病床',
  num: 3000,
  unit: '家',
  iconName: 'bed'
},]
const school = [{
  title: '高校',
  num: 130,
  unit: '家',
  iconName: 'school'

}, {
  title: '在校大学生',
  num: 100,
  unit: '万',
  iconName: 'student'

}]
</script>

<style scoped>
.g2-left, .g2-right {
  /*border: 1px solid #ccc;*/
  position: absolute;
  z-index: 3;
  width: 27vw;
  top: 120px;
  height: 86vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  /*display: flex;*/
  /*flex-direction: column;*/
  /*overflow: hidden;*/
}

.g2-left {
  left: 20px;
}

.g2-right {
  right: 20px;
}

.hospital, .school {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.item img {
  width: 50px;
  height: 35px;
}
</style>