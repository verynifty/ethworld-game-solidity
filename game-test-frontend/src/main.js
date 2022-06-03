import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './index.css'



let app = createApp(App)


app.config.globalProperties.ressources = [
    {
        name: "Wood",
        symbol: "🪵",
        tip: ""
    },
    {
        name: "Metal",
        symbol: "🪨",
        tip: ""
    },
    {
        name: "Crystal",
        symbol: "💎",
        tip: ""
    },
]

app.config.globalProperties.buildings = [
    {
        name: "Solar panle",
        symbol: "☀️",
    },
    {
        name: "energy laboratory",
        symbol: "⚗️",
    }
]


app.use(store).use(router).mount('#app')
