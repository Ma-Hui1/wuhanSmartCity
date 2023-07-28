/* 出行人口hook */
import { ref } from 'vue'
export const usePeopleOutDoor = () => {
      const data = ref([
            { type: '汉阳区', value: 10148, sex: '男' },
            { type: '汉阳区', value: 9852, sex: '女' },
            { type: '武昌区', value: 10042, sex: '男' },
            { type: '洪山区', value: 18920, sex: '男' },
            { type: '江夏区', value: 15834, sex: '男' },
            { type: '江岸区', value: 19800, sex: '男' },
            { type: '武昌区', value: 9958, sex: '女' },
            { type: '洪山区', value: 17080, sex: '女' },
            { type: '江夏区', value: 14166, sex: '女' },
            { type: '江岸区', value: 20000, sex: '女' },
            // { type: '江汉区', value: 35000 },
            // { type: '硚口区', value: 35000 },
            // { type: '青山区', value: 35000 },
      ]);

      setInterval(() => {
            let res = data.value.map((d) => ({ ...d, value: d.value + 2 }))
            data.value = res;
      }, 1200);
      const green = '#00B96B';
      const yellow = '#fd7e14';
      const red = '#dc3545';
      const config = {
            xField: 'type',
            yField: 'value',
            seriesField: 'sex',
            devicePixelRatio: 2,
            visible: true,
            style: {
                  fill: '#000'
            },
            title: {
                  visible: false
            },
            label: {
                  visible: false,
                  type: 'point',
                  offsetX: 6,
                  offsetY: 6,
                  style: {
                        fill: 'rgba(0, 0, 0, 0.65)',
                        stroke: '#ffffff',
                        lineWidth: 2,
                  }
            },
            color: ({ sex }) => {
                  if (sex === '男') {
                        return yellow;
                  } else {
                        return green;
                  }
            },
            legend: {
                  visible: true,
                  position: 'top-left',
                  flipPage: true,
                  offsetY:0
            },
            height: 300,
            // angleField: 'type',
            // radiusField: 'value',
            // seriesField: 'sex',
            // radiusAxis: {
            //       min:5000,
            //       grid: {
            //             line: {
            //                   type: 'line',
            //             },
            //       },
            // },
            // line: {
            //       visible: true,
            // },
            // point: {
            //       visible: true,
            //       shape: 'circle',
            // },
            // legend: {
            //       visible: true,
            //       position: 'bottom-center',
            // },
            // xField: 'type',
            // yField: 'value',
            // // seriesField: 'value',
            // //forceFit:true,

            // label: {
            //       // 可手动配置 label 数据标签位置
            //       position: 'top', // 'top', 'bottom', 'middle',
            //       // 配置样式
            //       style: {
            //             fill: '#FFFFFF',
            //             opacity: 0.6,
            //       },
            // },
            // groupField:'sex',
            // // color: ({ sex }) => {
            // //       if (sex ==='男') {
            // //             return red;
            // //       } 
            // //       else {
            // //             return green;
            // //       }
            // // },
            // legend: true,
            // height: 260,
      };
      return {
            config,
            data
      }
}