// vue-server-renderer的SSR配置
/*
node aa.js 运行aa.js
nodemon aa.js 重启并运行aa.js
1.依赖
    npm i express vue-server-renderer -D
2.创建express实例 ， vue实例
*/
let express = require('express')
let Vue = require('vue')
let routers = require('../router/index')
// 创建express实例,vue实例
let app = express();
// 创建渲染器
let render = require('vue-server-renderer').createRenderer()

// 用渲染器渲染vue页面可以得到html页面
let page = new Vue({
    data: {
        title:'222'
    },
    template:'<div>111{{title}}</div>'
})

app.get('/', async (req, res)=>{ // 设置服务器
    try {
        let html = await render.renderToString(page)
        console.log(html);
        res.send(html)
    } catch (error) {
        res.status(500).send('服务器内部错误')
    }
})
app.listen(3000, ()=>{ // 监听服务器端口
    console.log('服务器启动成果');
})