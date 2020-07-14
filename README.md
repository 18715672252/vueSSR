# ssr

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

完整的实现流程如下图所示分为【模板页】（HTML）、【客户端】（Client Bundle）、【服务器端】（Server Bundle）三个模块。三个模块功能如下：

模板页：提供给客户端和服务器端渲染的html框架，令客户端和服务器端在该框架中进行页面的渲染

客户端：仅在浏览器端执行，向模板页中注入js、css等静态资源

服务器端：仅在服务器端执行，将Vue实例渲染为html字符串，注入到模板页的对应位置中

整个服务的构建流程分为以下几步：

1.通过webpack将Vue应用打包为浏览器端可执行的客户端Bundle；

2.通过webpack将Vue应用打包为Node端可执行的服务器端Bundle；

3.Node端调用服务器端Bundle渲染Vue应用，并将渲染好的html字符串以及客户端Bundle发送至浏览器；

4.浏览器端接收到后，调用客户端Bundle向页面注入静态资源，并与服务器端渲染好的页面进行匹配。

需要注意的是，客户端与服务器端渲染的内容需要匹配才能进行正常的页面加载，一些页面加载异常问题将在下文进行具体描述。

总结：
ssr渲染步揍
1.server文件下index.js（启动ssr服务端服务器）
2.修改路由配置router下的index.js
3.在src下创建app.js入口文件（总的服务端渲染的入口文件，entry-server.js和entry-client.js都要用到）
4.新建src/entry-server.js文件（服务端入口文件）
5.新建src/entry-client.js文件（客户端端入口文件）
6.重新配置webpack打包文件vue.config.js
7.需要一个模板文件（pubilc/index.temp.html必须一样）
8.修改package.json中script
9.启动服务端运行src/server.index.js
