import axios from 'axios';
import { ElMessage, ElLoading } from 'element-plus'
import router from './router'

let loading;
function startLoading() {
    loading = ElLoading.service({
        lock: true,
        text: 'Loading...',
        background: 'rgba(0, 0, 0, 0.7)'
    })
}

function endLoading() {
    loading.close();
}
// 请求拦截
axios.interceptors.request.use(config => {
    // 加载动画
    startLoading();
    if(localStorage.getItem('eleToken')){
        // 设置统一的请求头
        config.headers.Authorization = localStorage.getItem('eleToken');
    }
    return config;
    },
    error => {
        return Promise.reject(error);
    })

// 响应拦截
axios.interceptors.response.use(response => {
    // 结束加载动画
    endLoading();
    return response;
    },
    error => {
        endLoading();
        ElMessage.error(error.response.data);
        // 获取错误状态吗
        const { status } = error.response;
        if(status === 401){
            ElMessage.error('token失效，请重新登陆')
            // 清除token
            localStorage.removeItem('eleToken');
            // 跳转到登陆页
            router.push('/login');
        }
        return Promise.reject(error);
    })
export default axios;