// 服务端入口
/*
router.onReady(() => {})
在路由完成初始导航时调用，
这意味着它可以解析所有的异步进入钩子和路由初始化相关联的异步组件
渲染首屏*/
import createApp from './app'
export default context => {
    return new Promise((resolve, reject) => {
        let { app , router } = createApp()
        // 进入首屏
        router.push(context.url)
        // 等到 router 将可能的异步组件和钩子函数解析完
        router.onReady(() => { // 监听router是否初始化完成
            resolve(app)
        }, reject)
    })
}