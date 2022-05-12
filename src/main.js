import { createApp } from 'vue'
import store from './store'
import App from './App.vue'
import './index.css'
import VueSocialSharing from 'vue-social-sharing'


createApp(App).use(store).use(VueSocialSharing).mount('#app')
