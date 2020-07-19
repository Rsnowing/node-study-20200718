const Koa = require('koa')
const Router = require('koa-router')
let app = new Koa()
let router = new Router()
router.get('/', (ctx, next) => {
    ctx.redirect('/index')
}).get('/index',  (ctx, next) => {
    ctx.body = '首页'
}).get('/detail',  (ctx, next) => {
    ctx.body = '详情页'
}).get('/data',  (ctx, next) => {
    ctx.body = {
        name: 'llhe',
        age: 20
    }
})
app.use(router.routes())
app.listen(3000)