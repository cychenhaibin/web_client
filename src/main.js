import { createApp } from 'vue';
import App from './App.vue';
import axios from './http';
import router from './router';
import store from './store';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

const app = createApp(App);

// 使用 ElementPlus 并设置全局 axios
app.use(ElementPlus);
app.config.globalProperties.$axios = axios;

// 使用 store 和 router
app.use(store);
app.use(router);

// 挂载 Vue 应用
app.mount('#app');
