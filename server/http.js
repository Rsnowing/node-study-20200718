const http = require('http')
const url = require('url')
const fs = require('fs')
const path = require('path')
const mime = require('../mime.json')

const server = http.createServer((req, res) => {
    // 不设置会乱码
    res.setHeader('content-type', 'text/html;charset=utf-8')
    // res.write('hello sssnode哈')
    let urlObj = url.parse(req.url)
    // console.log(urlObj)
    if (urlObj.pathname === '/' || urlObj.pathname === '/index') {
        // res.end('主页啦')
        // 文件读取
        // let index = fs.readFileSync('./views/index.html')
        // res.end(index)
        // 流读取
        let indexStream = fs.createReadStream('./views/index.html')
        indexStream.pipe(res)
    } else if (urlObj.pathname === '/product') {
        // res.end('product 产品')
        // 文件读取
        // let product = fs.readFileSync('views/product.html')
        // res.end(product)
        // 流读取
        let productStream = fs.createReadStream('./views/product.html')
        productStream.pipe(res)
    } else {
        if (!urlObj.pathname.includes('.ico')) {
            // 获取拓展名
            let ext = path.extname(urlObj.pathname)
            // 设置contenttype
            console.log(ext, '----------------')
            res.setHeader('content-type', mime[ext])
            // 流读取
            let fileStream = fs.createReadStream(`./views${urlObj.pathname}`)
            fileStream.pipe(res)
        }
    }
})
server.listen(3000)