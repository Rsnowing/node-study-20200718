// 目录操作
const fs = require('fs')

// 创建
// fs.mkdir('new', err => {
//     if (err) throw err
//     console.log('创建成功')
// })

// 修改
// fs.rename('new', 'old', err => {
//     if (err) throw err
//     console.log('修改成功')
// })

// 读取=》 res: 目录下的文件放到数组
// fs.readdir('old', (err, res) => {
//     if (err) throw err
//     console.log('读取成功', res)
// })

// 删除目录 =》 空目录才能删除
// fs.rmdir('old', err => {
//     if (err) throw err
//     console.log('删除成功')
// })

// 判断文件或者目录是否存在 
// fs.exists('old', res => {
//     console.log(res)
// })
// fs.exists('1.txt', res => {
//     console.log(res)
// })

// 获取文件/目录的详细信息
// fs.stat('old', (err, res) => {
//     if (err) throw err
//     console.log('获取成功', res)
//     // 判读是否为文件/目录
//     console.log(res.isFile(), res.isDirectory())
// })

// 删除非空目录 =》 先删除目录中的文件 -》 删除目录
function removeDir(path) {
    let data = fs.readdirSync(path)
    // data 格式 ['1.txt', 'dir', '2.md']
    data.forEach(fileName => {
        const url = `${path}/${fileName}`
        const res = fs.statSync(url)
        if(res.isDirectory()) {
            console.log(data)
        }
        res.isDirectory() ? removeDir(url) : fs.unlinkSync(url)
    })
    fs.rmdirSync(path)
}

removeDir('old')