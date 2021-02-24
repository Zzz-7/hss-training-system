// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

import router from './router'
/*键盘的引入*/
// import MathKeyboard from 'math-keyboard';
// Vue.use(MathKeyboard);


import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
import axios from 'axios'
// import Api from './request/http.js';
// console.log(process.env.API_ROOT)
axios.defaults.timeout = 5000
axios.defaults.baseURL = process.env.API_ROOT
    // axios.defaults.headers.common['Content-Type'] = 'application/json;charset=UTF-8'
Vue.prototype.$api = axios;

// import 'lib-flexible/flexible'
// import 'amfe-flexible'


function watchWidth() {
    var docEl = window.document
    var doc = docEl.documentElement.getBoundingClientRect().width
        // console.log(doc)
    if (doc > 1000) {
        window.document.documentElement.style.fontSize = 37.5 + 'px'
    }
}
watchWidth()
window.onresize = function() {
    watchWidth()
}

// 引入jquery
import 'jquery'


import qs from "qs"
Vue.prototype.$qs = qs


//使用cookie
import VueCookies from 'vue-cookies'
Vue.prototype.VueCookies = VueCookies
Vue.use(VueCookies)

var responseflage = true
    // 添加响应拦截器
axios.interceptors.response.use(function(response) {
    // 对响应数据做点什么
    // console.log(response)
    return response;
}, function(error) {
    // 对响应错误做点什么
    if (error.response.status == 403) {
        if (responseflage) {
            responseflage = false
            ElementUI.MessageBox.alert('您还未登录或您已经超过30分钟没有进行操作，登录信息已经失效，请重新登录。！', '系统提示', {
                confirmButtonText: '重新登录',
                callback: action => {
                    router.push('/')
                    responseflage = true
                }
            });
        }
    } else if (error.response.status == 504 || 502 || 500 || 501 || 503 || 505) {
        // ElementUI.MessageBox.alert(error + '<br/>' + '服务器错误，Sorry!!点击确定从新加载页面', '系统提示', {
        //     confirmButtonText: '确定',
        //     dangerouslyUseHTMLString: true,
        //     callback: action => {
        //         router.go(0)
        //     }
        // });
    } else if (error.response.status == 404) {
        ElementUI.MessageBox.alert(error + '<br/>' + '接口请求错误', '系统提示', {
            confirmButtonText: '确定',
            dangerouslyUseHTMLString: true,
            callback: action => {
                router.go(0)
            }
        });
    } else {
        console.log(error)
    }
    return Promise.reject(error);
});

//添加请求拦截器
axios.interceptors.request.use((request) => {
    // request.data = qs.stringify(request.data);
    // console.log(request)
    return request;
}, function(error) {
    ElementUI.MessageBox.alert(error + '<br/>' + '页面请求超时，点解确定重新请求页面吧！', '系统提示', {
        confirmButtonText: '确定',
        // dangerouslyUseHTMLString: true,
        callback: action => {
            router.go(0)
        }
    });
    return Promise.reject(error);
});

//路由拦截器
// console.log(VueCookies.get('HSS_MATH_SSID'))
// router.beforeEach((to, from, next) => {
//         if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
//             if (VueCookies.get('token')) {
//                 next();
//             } else {
//                 // 将跳转的路由path作为参数，登录成功后跳转到该路由
//                 next({
//                     path: '/'
//                 })
//             }
//         } else {
//             next();
//         }
//     })
//MathJax
import globalVariable from './components/globalVariable/globalVariable'
Vue.prototype.commonsVariable = globalVariable;

//mathquill
import "../node_modules/mathquill/build/mathquill.css";
import Mathquill from "../node_modules/mathquill/build/mathquill.js";
Vue.use(Mathquill)

//echarts
import echarts from 'echarts'
Vue.prototype.$echarts = echarts


//禁止鼠标右键
document.oncontextmenu = function(e) {
    e.returnValue = false;
}

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App  },
    template: '<App/>'
})
