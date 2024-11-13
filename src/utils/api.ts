import axios from 'axios'
import { message } from 'antd';

// 创建一个 Axios 实例
const axiosInstance = axios.create({
  baseURL: 'api', // API 基础 URL
  timeout: 1000 * 10, // 请求超时时间
  headers: {
    'Content-Type': 'application/json',
    // 可以在这里添加全局的请求头，例如身份验证令牌
    // 'Authorization': `Bearer ${token}`,
  },
});
 
// 请求拦截器
axiosInstance.interceptors.request.use(
  config => {
    // 在发送请求之前做些什么，例如添加身份验证令牌
    // config.headers['Authorization'] = `Bearer ${token}`;
    return config;
  },
  error => {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);
 
// 响应拦截器
axiosInstance.interceptors.response.use(
  response => {
    // 对响应数据做点什么，例如统一处理错误码
    const { data, status } = response;
    if (status === 200) {
      // 可以根据后端 API 的设计，统一处理响应数据格式
      // 例如：如果后端返回的数据格式为 { code, message, data }
      if (data.code !== 0) {
        message.error(data.message)
        // 自定义错误处理
        return Promise.reject(data);
      }
      return data.data;
    } else {
      message.error(data.message)
      // 处理其他 HTTP 状态码
      return Promise.reject(`Error ${status}: ${data.message || 'Unknown Error'}`);
    }
  },
  error => {
    // 对响应错误做点什么
    // 例如，可以在这里统一处理网络错误、超时等
    const { response } = error;
    if (response) {
      // 服务器返回了状态码，且状态码触发了错误拦截器
      switch (response.status) {
        case 401:
          message.error('未授权，请登录');
          // 未授权，可以跳转到登录页面
          break;
        case 403:
          message.error('403');
          // 禁止访问，可以给用户一个友好的提示
          break;
        case 404:
          message.error('请求的资源不存在');
          // 请求的资源不存在
          break;
          // 其他错误处理...
        default:
          message.error(response.message)
          break;
      }
      return Promise.reject(error);
    } else if (!response && error.message.includes('Network Error')) {
      // 网络错误
      return Promise.reject('Network Error. Please check your connection.');
    } else {
      // 其他错误
      return Promise.reject(error);
    }
  }
);
 
export default axiosInstance;