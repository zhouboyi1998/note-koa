const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const Router = require('koa-router')
const http = require('http')

// 新建 Koa 实例
const app = new Koa()

// 添加中间件: Koa BodyParser 解析 JSON 格式的请求参数
app.use(bodyParser({ jsonLimit: '1mb' }))

// 添加中间件: 打印日志
app.use(async (ctx, next) => {
    console.log(new Date().toLocaleString() + ' --> ' + ctx.url)
    await next()
})

// 添加路由
const router = new Router()
router.use('/command', require('./src/router/command').routes())
app.use(router.routes()).use(router.allowedMethods())

// 启动服务
http.createServer(app.callback()).listen(18096)

console.log('Server listen on 127.0.0.1:18096')
