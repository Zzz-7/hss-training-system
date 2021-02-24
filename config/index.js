'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

module.exports = {
    dev: {

        // Paths
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        proxyTable: {
            '/api': {
                target: 'http://127.0.0.1:9110', // 你请求的第三方接口192.168.1.159
                changeOrigin: true, // 在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
                pathRewrite: { // 路径重写，
                    '^/api': '' // 替换target中的请求地址
                }
            },
            // '/img': { //代理请求图片的接口
            //     changeOrigin: true,
            //     secure: false, //https请求需设置此项
            //     target: 'https://jsonplaceholder.typicode.com',
            //     pathRewrite: {
            //         '^/img': ''
            //     }
            // }
            // '/socket': {// 设置websocket代理
            //     target: 'http://192.168.1.167',
            //     ws: true, // 开启websocket代理  注意
            //     changeOrigin: true,
            //     pathRewrite: {
            //       '^/socket': ''
            //     }
            // }
        },

        // Various Dev Server settings
        host: 'localhost', // can be overwritten by process.env.HOST
        // host: '192.168.1.108', //本机地址可以用于连接测试
        // port: 8081, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
        // host: '192.168.1.159', //本机地址可以用于连接测试
        port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
        autoOpenBrowser: false,
        errorOverlay: true,
        notifyOnErrors: true,
        poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-


        /**
         * Source Maps
         */

        // https://webpack.js.org/configuration/devtool/#development
        devtool: 'cheap-module-eval-source-map',

        // If you have problems debugging vue-files in devtools,
        // set this to false - it *may* help
        // https://vue-loader.vuejs.org/en/options.html#cachebusting
        cacheBusting: true,

        cssSourceMap: true
    },

    build: {
        // Template for index.html
        index: path.resolve(__dirname, '../dist/index.html'),

        // Paths
        assetsRoot: path.resolve(__dirname, '../dist'),
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',

        /**
         * Source Maps
         */

        productionSourceMap: false,//项目打包后，代码都是经过压缩加密的，如果运行时报错，输出的错误信息无法准确得知是哪里的代码报错。
        // https://webpack.js.org/configuration/devtool/#production
        devtool: '#source-map',

        // Gzip off by default as many popular static hosts such as
        // Surge or Netlify already gzip all static assets for you.
        // Before setting to `true`, make sure to:
        // npm install --save-dev compression-webpack-plugin
        productionGzip: false,
        productionGzipExtensions: ['js', 'css'],

        // Run the build command with an extra argument to
        // View the bundle analyzer report after build finishes:
        // `npm run build --report`
        // Set to `true` or `false` to always turn it on or off
        bundleAnalyzerReport: process.env.npm_config_report
    }
}
