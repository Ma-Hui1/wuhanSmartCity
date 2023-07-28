<template>
  <!--  这里还是使用element的popover实现，使用插槽的方式 -->
  <el-popover placement="top" :width="100" trigger="click" popper-style="background-color: #53697670;color:#fff">
    <template #reference>
      <slot></slot>
    </template>
    <div class="popover-w">
      <i v-for="item in tools" :class="computeClass(item)" @click="activeTool(item)"></i>
    </div>
  </el-popover>
</template>

<script setup>
import {ref, computed, inject, onMounted, defineEmits, defineExpose} from 'vue'
import {DrawPolygon, DrawRect, DrawCircle, DrawLine} from '@antv/l7-draw'
const emit = defineEmits(['startMeasure'])
const {scene, map} = inject("$scene_map");
const tools = ref(['drawPolygonTool', 'drawRectTool', 'drawCircleTool', 'line', 'delete'])
//和之前查询功能的实现逻辑一样，我们遍历数组，并使用计算属性，指定每个图标
const computeClass = computed(() => (item) => {
  const res = {
    'iconfont': true,
    'query-item': true
  }
  res[`icon-${item}`] = true
  return res
})

const drawTools = {}
onMounted(() => {
  initTool()
})
const closeAll = () => {
  stopDrawing()
}
// 我们将closeAll方法暴露出去，这样父组件就可以调用这个方法来清除子组件的绘制工具了
defineExpose({
  closeAll
})
// 初始化工具
const initTool = () => {
  tools.value.forEach(tool => {
    switch (tool) {
      case 'drawPolygonTool':
        drawTools[tool] = new DrawPolygon(scene, {
          //展示面积
          areaOptions: {},
        });
        break;
      case 'drawRectTool':
        drawTools[tool] = new DrawRect(scene, {
          //展示面积
          areaOptions: {},
        });
        break;
      case 'drawCircleTool':
        drawTools[tool] = new DrawCircle(scene, {
          //展示面积
          areaOptions: {},
        });
        break;
      case 'line':
        // 需要注意的是这里需要指定距离测量的参数
        drawTools[tool] = new DrawLine(scene, {
          distanceOptions: {
            // 是否展示总距离
            showTotalDistance: false,
            // 是否展示一段的距离
            showDashDistance: true,
            // 展示的格式
            format: (meters) => {
              if (meters >= 1000) {
                return +(meters / 1000).toFixed(2) + 'km';
              } else {
                return +meters.toFixed(2) + 'm';
              }
            },
          }
        });
        break;
      default:
        break;
    }
  })
}

const stopDrawing = (destroy) => {
  // 清除所有绘制工具
  for (let key in drawTools) {
    const tool = drawTools[key]
    tool.clear()
    tool.disable()
    tool.removeActiveFeature()
    destroy && tool.destroy()

  }
}

const activeTool = (type) => {
  // 先清除
  stopDrawing()
  if (type === 'delete') {
    return
  }
  const activeTool = drawTools[type]
  if (activeTool) {
    emit('startMeasure')
    activeTool.enable();
  }
}
</script>

<style scoped>
.popover-w {
  display: flex;
  justify-content: space-around;
}

.popover-w i {
  cursor: pointer;
  padding: 4px;
}

.popover-w i:hover {
  background-color: #536976e0;
}
</style>