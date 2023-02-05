import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './i18n'
import axios from 'axios'
import VueAxios from 'vue-axios'

import '@/assets/style/reset.css'

axios.defaults.baseURL = 'http://127.0.0.1:8081' + "/api/v1";

createApp(App).use(i18n).use(store).use(router).use(VueAxios, axios).mount('#app')
