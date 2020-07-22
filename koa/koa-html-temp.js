const Koa = require('koa')
// 路由处理
const Router = require('koa-router')
// 页面处理
const views = require('koa-views')
// 静态文件
const static = require('koa-static')
const mysql = require('mysql2/promise');
// const newsList = require('./newsList.json')

const SIZE = 5

let total = 0
let connection
let rows = []

connect()
async function connect() {
    connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'llhe'
      });
    //   insert()
    total = await getTotal()
    rows = await getRows(0)
}

async function getTotal() {
    const [rows] = await connection.query('SELECT count(0) count from llhe.news')
    return rows[0].count
}

async function getRows(start) {
    const [rows] = await connection.query(`SELECT * FROM news LIMIT ${start},${SIZE}`)
    console.log(rows.length)
    return rows
}

// async function insert() {
//     newsList.forEach(async v=> {
//         let res = await connection.query(`INSERT INTO news (title, imgUrl, \`from\`, time)  VALUES (?,?,?,?)`, [v.title, v.imgUrl, v.from, v.time])
//         console.log(res)
//     })
// }

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
    const page = Math.ceil(total / SIZE)
    const current = parseInt(ctx.query.page) || 1

    const data = await getRows((current - 1) * SIZE)
    console.log(data)
    // JSON.parse(JSON.stringify(newsList)).splice((current - 1) * SIZE, SIZE)
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