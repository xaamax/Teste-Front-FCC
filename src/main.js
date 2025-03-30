import { createApp } from 'vue'
import App from './App.vue'
import './style.css'


import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

import axios from '@/plugins/axios'
import store from '@/store'
import router from '@/router';



const app = createApp(App);

app.config.globalProperties.$axios = axios;
app.config.globalProperties.$router = router;
app.config.globalProperties.$toast = toast;

app.use(store);
app.use(router);

app.mount('#app')
