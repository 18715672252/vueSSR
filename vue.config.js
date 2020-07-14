
let VueSSRServerPlugin = require('vue-server-renderer/server-plugin')
let VueSSRCilentPlugin = require('vue-server-renderer/client-plugin')
let nodeExternals = require('webpack-node-externals')
let merge = require('lodash.merge')

// 环境变量，决定入口是客户端还是服务端
let TARGET_NODE = process.env.WEBPACK_TARGET === 'node'
let target = TARGET_NODE ? 'server' : 'client';

module.exports = {
    css: {
        extract: false
    },
    outputDir: './dist/' + target,
    configureWebpack: () => ({ 
        // 将entry指向应用程序的server或者client文件
        entry: `./src/entry-${target}.js`,
        // 对bundle进行sourceMap支持
        devtool:'source-map',
        // 这允许webpack以node适用方式处理动态导入（dynamic import）
        // 并且还会在编译 vue组件时，告知vue-loader输送面向服务器代码（server-oriented code）
        target: TARGET_NODE ? 'node' : 'web',
        node: TARGET_NODE ? undefined : false,
        output:{
            // 此处告知 server bundel使用node风格导出模块
            libraryTarget: TARGET_NODE ? 'commonjs2' : undefined
        },
        // 外置化应用程序，可以是服务器构建速度更快，并生成较小的bundle文件
        externals: TARGET_NODE
            ? nodeExternals({
                // 不要外置化webpack需要处理的依赖模块
                // 可以再这里添加更多的文件类型，例如*.vue文件
                // 你还应该将修改global（例如polyfill）的依赖模块加入白名单
                allowlist:[/\.css$/]
            })
        : undefined,
        optimization: {
            splitChunks: undefined
        },
        // 这是将服务器的整个输出构建为单个json文件插件
        // 服务端默认文件名为vue-ssr-server-bundle.js
        plugins:[ TARGET_NODE ? new VueSSRServerPlugin() : new VueSSRCilentPlugin]
    }),
    chainWebpack: config => {
        config.module
            .rule('vue')
            .use('vue-loader')
            .tap(options=>{
                merge(options,{
                    optimizeSSR: false
                })
            })
    }
};