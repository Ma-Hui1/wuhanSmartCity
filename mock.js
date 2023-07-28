const mockjs = require('mockjs')
const wuhan_building = require('./GIS_DATA/Wuhan_Buildings.json')
const wuhan_roads = require('./GIS_DATA/Wuhan_roads.json')
const wuhan_events = require('./GIS_DATA/Wuhan_events.json')
const wuhan_mlines = require('./GIS_DATA/Wuhan_metroLines.json')
const wuhan_mpoints = require('./GIS_DATA/Wuhan_metroPoints.json')
const wuhan_flight = require('./GIS_DATA/Wuhan_flight.json')
const hubei_weather=require('./GIS_DATA/hubei_weather.json')
const china_wind = require('./GIS_DATA/china_wind.json')
const china_heat = require('./GIS_DATA/china_heat.json')
module.exports=()=>{
    return mockjs.mock({
        wuhan_building,
        wuhan_roads,
        wuhan_events,
        wuhan_mlines,
        wuhan_mpoints,
        wuhan_flight,
        hubei_weather,
        china_wind,
        china_heat
    })
}