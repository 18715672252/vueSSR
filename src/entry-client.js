// 客户端入口
// 挂载 激活app
import createApp from './app'

let {app , router} = createApp()
router.onReady(() =>{
    app.$mount('#app')
})