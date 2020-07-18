// 流
const fs = require('fs')
// 普通读取文件
let res = fs.readFileSync('test/65kb')
console.log(res)

// 流会把数据分成64kb的小文件传输
// 通过流读取文件 性能更好
let res1 = fs.createReadStream('test/65kb')
res1.on('data', chunk => {
    console.log(1, chunk)
})
res1.on('end', err => {
    console.log('读取文件结束')
})

// 创建一个65kb的文件
// let buffer = Buffer.alloc(65 * 1024)
// fs.writeFile('test/65kb', buffer, err => {
//     if (err) throw err
//     console.log('创建成功')
// })

// 创建写入流
let ws = fs.createWriteStream('test/1.txt')
let rs = fs.createReadStream('test/65kb')
rs.pipe(ws)
