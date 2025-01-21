const Koa = require('koa')
const Router = require('koa-router')
const http = require('http')

// 新建 Koa 实例
const app = new Koa()

// 新建 Koa 路由实例
const router = new Router()

// Hello World
router.get('/hello', async (ctx, next) => {
    ctx.body = 'Hello Koa'
})

// 添加路由
app.use(router.routes()).use(router.allowedMethods())

// 启动服务
http.createServer(app.callback()).listen(18096)

console.log('Server listen on 127.0.0.1:18096')
