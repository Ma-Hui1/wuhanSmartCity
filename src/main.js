import { createApp } from 'vue'
import './style.css'
//element-ui
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
//use vue-router
import router from './router'
//init the style
import './main.css'

import App from './App.vue'

export const app = createApp(App);
app.use(ElementPlus)
app.use(router)
app.mount('#app')
