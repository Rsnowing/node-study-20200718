const Koa = require('koa')
const app = new Koa()
// app.use((ctx, next) => {
//     // ctx context 上下文
//     console.log(ctx)
//     ctx.body = '你好呀'
// })

let middleware1 = function (ctx, next) {
    ctx.body = '111'
    next()
}
let middleware2 = function (ctx, next) {
    ctx.body = '222 '
}
app.use(middleware1)
app.use(middleware2)

app.listen(3000)