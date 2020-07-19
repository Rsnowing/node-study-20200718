const Koa = require('koa')
// 路由处理
const Router = require('koa-router')
// 页面处理
const views = require('koa-views')
// 静态文件
const static = require('koa-static')
const newsList = require('./newsList.json')

let app = new Koa()
let router = new Router()

app.use(views(__dirname + '/views', {
    extension: 'pug'
}))
// static <===> localhost:3000
.use(static(__dirname + '/static'))
.use(router.routes())    
    

router.get('/', (ctx, next) => {
    ctx.redirect('/index')
}).get('/index',  async(ctx, next) => {
    const total = JSON.parse(JSON.stringify(newsList)).length
    const size = 5
    const page = Math.ceil(total / size)
    const current = parseInt(ctx.query.page) || 1
    const data = JSON.parse(JSON.stringify(newsList)).splice((current - 1) * size, size)
    await ctx.render('index.pug', {
        newsList: data,
        page,
        prev: current === 1 ? 1 : current - 1,
        next: current === page ? current : current + 1
    })
}).get('/detail',  (ctx, next) => {
    ctx.body = '详情页'
}).get('/data',  (ctx, next) => {
    ctx.body = {
        name: 'llhe',
        age: 20
    }
})

app.listen(3000)