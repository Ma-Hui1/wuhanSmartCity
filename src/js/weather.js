import {ref} from 'vue'
export const useWeather = () => {
  const weatherData = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: {
          w: "01",
        },
        geometry: {
          type: "Point",
          coordinates: [114.319191,30.615104],
        },
      },
      {
        type: "Feature",
        properties: {
          w: "01",
        },
        geometry: {
          type: "Point",
          coordinates: [114.350673, 29.841509],
        },
      },
      {
        type: "Feature",
        properties: {
          w: "02",
        },
        geometry: {
          type: "Point",
          coordinates: [114.909957, 30.371419],
        },
      },
      {
        type: "Feature",
        properties: {
          w: "07",
        },
        geometry: {
          type: "Point",
          coordinates: [113.991133, 30.921322],
        },
      },
      {
        type: "Feature",
        properties: {
          w: "04",
        },
        geometry: {
          type: "Point",
          coordinates: [112.273333, 30.313958],
        },
      },
      {
        type: "Feature",
        properties: {
          w: "00",
        },
        geometry: {
          type: "Point",
          coordinates: [111.314561, 30.704027],
        },
      },
      {
        type: "Feature",
        properties: {
          w: "07",
        },
        geometry: {
          type: "Point",
          coordinates: [112.220068, 31.058308],
        },
      },
      {
        type: "Feature",
        properties: {
          w: "00",
        },
        geometry: {
          type: "Point",
          coordinates: [113.381015, 31.640631],
        },
      },
      {
        type: "Feature",
        properties: {
          w: "01",
        },
        geometry: {
          type: "Point",
          coordinates: [112.116391, 32.017632],
        },
      },
      {
        type: "Feature",
        properties: {
          w: 11,
        },
        geometry: {
          type: "Point",
          coordinates: [110.807393, 32.626959],
        },
      },
      {
        type: "Feature",
        properties: {
          w: 15,
        },
        geometry: {
          type: "Point",
          coordinates: [109.536906, 30.325263],
        },
      },
      {
        type: "Feature",
        properties: {
          w: 16,
        },
        geometry: {
          type: "Point",
          coordinates: [114.964084, 30.465653],
        },
      },
      {
        type: "Feature",
        properties: {
          w: 17,
        },
        geometry: {
          type: "Point",
          coordinates: [115.04282, 30.197818],
        },
      },
    ],
  };
// const image=ref([
//     {
//         id:'00',
//         img:'https://gw.alipayobjects.com/mdn/antv_site/afts/img/A*kzTMQqS2QdUAAAAAAAAAAABkARQnAQ',
//     },
//     {
//         id:'01',
//         img:'https://gw.alipayobjects.com/mdn/antv_site/afts/img/A*jH1XRb7F7hMAAAAAAAAAAABkARQnAQ',
//     },
//     {
//         id:'02',
//         img:'https://gw.alipayobjects.com/mdn/antv_site/afts/img/A*YaKSTr3L5i8AAAAAAAAAAABkARQnAQ',
//     },
//     {
//         id:'04',
//         img:'https://gw.alipayobjects.com/mdn/antv_site/afts/img/A*dmniQrDpCYwAAAAAAAAAAABkARQnAQ',
//     },
//     {
//         id:'11',
//         img:'https://gw.alipayobjects.com/mdn/antv_site/afts/img/A*YaKSTr3L5i8AAAAAAAAAAABkARQnAQ',
//     },
//     {
//         id:'15',
//         img:'https://gw.alipayobjects.com/mdn/antv_site/afts/img/A*YNlXQYCIzroAAAAAAAAAAABkARQnAQ',
//     },
//     {
//         id:'07',
//         img:'https://gw.alipayobjects.com/mdn/antv_site/afts/img/A*iQKoS6I-rO8AAAAAAAAAAABkARQnAQ',
//     },
//     {
//         id:'16',
//         img:'https://gw.alipayobjects.com/mdn/antv_site/afts/img/A*iQKoS6I-rO8AAAAAAAAAAABkARQnAQ',
//     },
//     {
//         id:'06',
//         img:'https://gw.alipayobjects.com/mdn/antv_site/afts/img/A*f-wyS7ad5p0AAAAAAAAAAABkARQnAQ',
//     },
//     {
//         id:'08',
//         img:'https://gw.alipayobjects.com/mdn/antv_site/afts/img/A*lHhzQrOW4AQAAAAAAAAAAABkARQnAQ',
//     },
//     {
//         id:'17',
//         img:'https://gw.alipayobjects.com/mdn/antv_site/afts/img/A*9Q0QS4GdaYcAAAAAAAAAAABkARQnAQ',
//     },
//     {
//         id:'05',
//         img:'https://gw.alipayobjects.com/mdn/antv_site/afts/img/A*LyuVRowl6nAAAAAAAAAAAABkARQnAQ',
//     }])
    return{
         weatherData,

    }
}