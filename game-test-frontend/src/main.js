import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './index.css'



  let app = createApp(App)


  app.config.globalProperties.ressources = {
    0: {
      name: "Wood",
      symbol: "🪵",
    },
    1: {
      name: "Metal",
      symbol: "🪨",
    },
    2: {
      name: "Crystal",
      symbol: "💎",
    },
  }



app.use(store).use(router).mount('#app')
