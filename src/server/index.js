let express = require('express')
let fs = require('fs')
// 创建express实例,vue实例
let app = express();
// 创建渲染器
let serverBundle = require('../../dist/server/vue-ssr-server-bundle.json')
let clientManifest = require('../../dist/client/vue-ssr-client-manifest.json')
let render = require('vue-server-renderer').createBundleRenderer(serverBundle,{
    runInNewContext: false,
    template: fs.readFileSync('../../public/index.temp.html','utf-8'), // 模板文件
    clientManifest
});
// 中间件静态文件请求
// app.use(express.static('../../dist/client',{index:false}))
app.use(express.static('../../dist/client',{index:false}))

 // 设置服务器
app.get('*', async (req, res)=>{
    try {
        let context = {
            url: req.url,
            title: 'ssr test'
        }
        let html = await render.renderToString(context)
        res.send(html)
    } catch (error) {
        res.status(500).send('服务器内部错误')
    }
})
// 监听服务器端口
app.listen(3000, ()=>{
    console.log('服务器启动成果');
})