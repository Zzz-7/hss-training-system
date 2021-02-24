import Vue from 'vue'
import Router from 'vue-router'
import Hmoe from '@/components/Home'
import Login from '@/components/Login'
import TestModel from '@/components/TestModel'
import Wrongbook from '@/components/Wrongbook'
import Coursereport from '@/components/Coursereport'
import UserInfo from '@/components/UserInfo'
import VideoAnalysis from '@/components/VideoAnalysis'

Vue.use(Router)
export default new Router({
    mode: 'hash',
    routes: [{
        path: '/',
        name: 'Login',
        component: Login
    }, {
        path: '/home',
        name: 'Home',
        component: Hmoe,
        // meta: {
        //     requireAuth: true, //路由拦截
        // }
    }, {
        path: '/home/TestModel',
        name: 'TestModel',
        component: TestModel,
        // meta: {
        //     requireAuth: true, //路由拦截
        // }
    }, {
        path: '/home/wrongbook',
        name: 'Wrongbook',
        component: Wrongbook,
        // meta: {
        //     requireAuth: true, //路由拦截
        // }
    }, {
        path: '/home/coursereport',
        name: 'Coursereport',
        component: Coursereport,
        // meta: {
        //     requireAuth: true, //路由拦截
        // }
    },{
        path:'/home/userInfo',
        name:'UserInfo',
        component:UserInfo
    },{
        path:'/home/videoAnalysis',
        name:'VideoAnalysis',
        component:VideoAnalysis
    }]
})