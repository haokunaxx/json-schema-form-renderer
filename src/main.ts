import { createApp } from 'vue'
// iconfont引入
import '@/assets/iconfont/iconfont'
import '@/assets/iconfont/iconfont.css'

import App from './App.vue'

import '@/styles/reset.scss'
import '@/styles/index.scss'

const app = createApp(App)
app.mount('#app')
