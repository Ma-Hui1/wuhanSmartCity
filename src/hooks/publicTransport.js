export const usePublicTransport = () => {
  const data = [
    {
      date: '2023/4/7',
      type: 'metro',
      value: 211,
    },
    {
      date: '2023/4/8',
      type: 'metro',
      value: 352,
    },
    {
      date: '2023/4/9',
      type: 'metro',
      value: 323,
    },
    {
      date: '2023/4/10',
      type: 'metro',
      value: 255,
    },
    {
      date: '2023/4/11',
      type: 'metro',
      value: 232,
    },
    {
      date: '2023/4/12',
      type: 'metro',
      value: 225,
    },
    {
      date: '2023/4/13',
      type: 'metro',
      value: 198,
    },
    {
      date: '2023/4/14',
      type: 'metro',
      value: 236,
    },
    {
      date: '2023/4/15',
      type: 'metro',
      value: 328,
    },
    {
      date: '2023/4/16',
      type: 'metro',
      value: 310,
    },
    {
      date: '2023/4/17',
      type: 'metro',
      value: 267,
    },
    {
      date: '2023/4/18',
      type: 'metro',
      value: 230,
    },
    {
      date: '2023/4/19',
      type: 'metro',
      value: 208,
    },
    {
      date: '2023/4/20',
      type: 'metro',
      value: 187,
    },
    {
      date: '2023/4/21',
      type: 'metro',
      value: 265,
    },
    {
      date: '2023/4/22',
      type: 'metro',
      value: 287,
    },
    {
      date: '2023/4/23',
      type: 'metro',
      value: 200,
    },
    {
      date: '2023/4/24',
      type: 'metro',
      value: 215,
    },
    {
      date: '2023/4/25',
      type: 'metro',
      value: 198,
    },
    {
      date: '2023/4/26',
      type: 'metro',
      value: 183,
    },
    {
      date: '2023/4/27',
      type: 'metro',
      value: 200,
    },
    {
      date: '2023/4/28',
      type: 'metro',
      value: 235,
    },
    {
      date: '2023/4/29',
      type: 'metro',
      value: 389,
    },
    {
      date: '2023/4/30',
      type: 'metro',
      value: 476,
    },
    {
      date: '2023/5/1',
      type: 'metro',
      value: 418,
    },
    {
      date: '2023/5/2',
      type: 'metro',
      value: 423,
    },
    {
      date: '2023/5/3',
      type: 'metro',
      value: 379,
    },
    {
      date: '2023/5/4',
      type: 'metro',
      value: 298,
    },
    {
      date: '2023/5/5',
      type: 'metro',
      value: 212,
    },
    {
      date: '2023/5/6',
      type: 'metro',
      value: 203,
    },
    {
      date: '2023/5/7',
      type: 'metro',
      value: 198,
    },

    {
      date: '2023/4/7',
      type: 'bus',
      value: 94,
    },
    {
      date: '2023/4/8',
      type: 'bus',
      value: 144,
    },
    {
      date: '2023/4/9',
      type: 'bus',
      value: 156,
    },
    {
      date: '2023/4/10',
      type: 'bus',
      value: 111,
    },
    {
      date: '2023/4/11',
      type: 'bus',
      value: 108,
    },
    {
      date: '2023/4/12',
      type: 'bus',
      value: 106,
    },
    {
      date: '2023/4/13',
      type: 'bus',
      value: 110,
    },
    {
      date: '2023/4/14',
      type: 'bus',
      value: 121,
    },
    {
      date: '2023/4/15',
      type: 'bus',
      value: 143,
    },
    {
      date: '2023/4/16',
      type: 'bus',
      value: 138,
    },
    {
      date: '2023/4/17',
      type: 'bus',
      value: 110,
    },
    {
      date: '2023/4/18',
      type: 'bus',
      value: 103,
    },
    {
      date: '2023/4/19',
      type: 'bus',
      value: 99,
    },
    {
      date: '2023/4/20',
      type: 'bus',
      value: 101,
    },
    {
      date: '2023/4/21',
      type: 'bus',
      value: 115,
    },
    {
      date: '2023/4/22',
      type: 'bus',
      value: 132,
    },
    {
      date: '2023/4/23',
      type: 'bus',
      value: 113,
    },
    {
      date: '2023/4/24',
      type: 'bus',
      value: 117,
    },
    {
      date: '2023/4/25',
      type: 'bus',
      value: 106,
    },
    {
      date: '2023/4/26',
      type: 'bus',
      value: 114,
    },
    {
      date: '2023/4/27',
      type: 'bus',
      value: 112,
    },
    {
      date: '2023/4/28',
      type: 'bus',
      value: 120,
    },
    {
      date: '2023/4/29',
      type: 'bus',
      value: 180,
    },
    {
      date: '2023/4/30',
      type: 'bus',
      value: 176,
    },
    {
      date: '2023/5/1',
      type: 'bus',
      value: 179,
    },
    {
      date: '2023/5/2',
      type: 'bus',
      value: 166,
    },
    {
      date: '2023/5/3',
      type: 'bus',
      value: 150,
    },
    {
      date: '2023/5/4',
      type: 'bus',
      value: 130,
    },
    {
      date: '2023/5/5',
      type: 'bus',
      value: 125,
    },
    {
      date: '2023/5/6',
      type: 'bus',
      value: 116,
    },
    {
      date: '2023/5/7',
      type: 'bus',
      value: 118,
    },
   
  ];

  const config = {
    padding: 'auto',
    data,
    xField: 'date',
    yField: 'value',
    yAxis: {
      label: {
        // 数值格式化为千分位
        formatter: (v) => `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`),
      },
    },
    legend: {
      position: 'right-top',
    },
    seriesField: 'type',
    responsive: true,
    smooth: true,
    height: 260,
  };
  return {
    config,
    data
  }
}