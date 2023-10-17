import axios from 'axios';
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';


const service = axios.create({
    baseURL: "http://192.168.40.180:9517",
    timeout: 10000
});


service.interceptors.request.use(
    config => {
        if (localStorage.getItem('token')) {
            config.headers['Authorization'] = localStorage.getItem('token');
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    });
service.interceptors.response.use(
    res => {
        if (res.data.msg === '身份信息已过期，请重新登录') {
            ElMessage({
                message: res.data.msg,
                type: 'error'
            })
            const router = useRouter();
            console.log(router);
            
            router.push('/UserLogin')
        }
        return res
    },
    error => {
        if (error.request.status === 403) {
            ElMessage({
                message: '您没有足够的权限.',
                type: 'error'
            });
        }else {
            ElMessage({
                message: error.response.msg,
                type: 'error'
            })
        }
    }
)
export default service;



