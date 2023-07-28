export const useairQulity= () => {
    const data = [
          { type: "东西湖区", value: 47 },
          { type: "武昌区", value: 40 },
          { type: "硚口区", value: 40 },
          { type: "江夏区", value: 48 },
          { type: "洪山区", value: 38 },
          { type: "汉口区", value: 48 },
          { type: "汉阳区", value: 43 },
    ];
    const config = {
          appendPadding: 10,
          xField: "type",
          yField: "value",
          seriesField: "type",
          radius: 0.9,
          label: {
                offset: -15
          },
          interactions: [{ type: "element-active" }],
          height: 300
    };
    return {
          data,
          config
    }
}