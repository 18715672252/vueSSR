// 创建vue实例 （入口）
import Vue from 'vue'
import App from './App.vue'
// 有store和rtouer一样
import createRouter from './router'
export default function createApp () {
    let router = createRouter()
    let app = new Vue({
        router,
        render: h => h(App)
    })
    return { app, router }
}