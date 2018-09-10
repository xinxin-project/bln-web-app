
import axios from 'axios'
import { getToken } from "../utils/auth"
import router from '../router/index'
const instance = axios.create({
  headers: {'Content-Type': 'application/json;charset=UTF-8'},
  validateStatus: function (status) {
    return status >= 200 && status < 500; // 默认的
  },
});

instance.interceptors.request.use(
  config => {
    if (getToken()) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
     config.headers['token'] = getToken();
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  });

// http response 拦截器
instance.interceptors.response.use(
  response => {
    if(response){
      switch (response.status) {
        case 401:
          // 返回 401 清除token信息并跳转到登录页面
          this.$Message.warning("token已失效，请重新登录！");
          router.push({path:"/login"})

      }
    }
    return response;
  },
  error => {
    return Promise.reject(error)   // 返回接口返回的错误信息
  });



/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function fetch(url,params={}){
  return new Promise((resolve,reject) => {
    instance.get(url,{
      params:params
    })
      .then(response => {
        resolve(response.data);
      })
      .catch(err => {
        this.$Loading.error();
        this.$Message.warning("连接服务器失败!");
        reject(err)
      })
  })
}


/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(url,data = {}){
  return new Promise((resolve,reject) => {
    this.$Loading.start();
    instance.post(url,data)
      .then(response => {
        resolve(response);
      },err => {
        this.$Loading.error();
        this.$Message.warning("连接服务器失败!");
        reject(err)
      })
  })
}
