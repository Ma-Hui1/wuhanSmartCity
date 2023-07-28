import { ref } from 'vue'
export const usePurpose = () => {
    const data = ref([
        { type: '上班', value: 10000 },
        { type: '生活', value: 15000 },
        { type: '学习', value: 20000 },
        { type: '娱乐', value: 25000 },
        { type: '社交', value: 30000 },
        { type: '挣钱', value: 35000 },
        { type: '运动', value: 40000 },
        { type: '随意', value: 45000 },
        { type: '出城', value: 50000 },
        { type: '其他', value: 55000 },
    ]);

    setInterval(() => {
        let res = data.value.map((d) => ({ ...d, value: d.value + 3 }))
        data.value = res;
    }, 1200);

    const blue = '#70DB93';
    const purple = '#9F5F9F';
    const red = '#FF7F00';
    const config = {
        xField: 'type',
        yField: 'value',
        seriesField: 'value',
        label: {
            // 可手动配置 label 数据标签位置
            position: 'top', // 'top', 'bottom', 'middle',
            // 配置样式
            style: {
                fill: '#FFFFFF',
                alignTo: 'center',
                opacity: 0.9,
            },
        },
        title: {
            visible: true,
            text: '图表标题及描述',
        },
        color: ({ value }) => {
            if (value > 45000) {
                return red;
            } else if (value > 40000 && value < 45000) {
                return purple;
            } else if (value > 35000 && value < 40000) {
                return blue
            } else if (value > 30000 && value < 35000) {
                return red
            } else if (value > 25000 && value < 30000) {
                return purple
            } else if (value > 20000 && value < 25000) {
                return blue
            } else if (value > 15000 && value < 20000) {
                return red
            } else {
                return purple;
            }
        },
        legend: {
            visible: true,
            position: 'top-right',
            offsetX: 5,
            offsetY: -5,
            flipPage: true
        },
        height: 260,
        conversionTag: {
            visible: true,
            spacing: 2
        },
    };
    return {
        config,
        data
    }
}