import { createApp } from 'vue'
import MainApp from './MainApp.vue'
import router from './router'
import store from './store'

createApp(MainApp)
    .use(store)
    .use(router)
    .mount('#app')
