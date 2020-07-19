const Koa = require('koa')
const Router = require('koa-router')
const views = require('koa-views')
const static = require('koa-static')

let app = new Koa()
let router = new Router()

app.use(static(__dirname + "/static"));
app.use(views(__dirname + '/views', {
    map:  {
        html: 'pug'
    }
}))

router.get('/', async ctx => {
    let users = [
        { name: 'llhe', age: 20 },
        { name: 'cgm', age: 22 },
        { name: 'xxx', age: 25 }
    ]
    await ctx.render('index.pug', {
        data: '我是传递的数据',
        users
    })
})

app.use(router.routes());
app.listen(3000);
