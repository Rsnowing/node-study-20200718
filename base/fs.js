const fs = require('fs') // 文件操作
// 增删改查
// 目录操作 文件操作
// a 追加写入， w 写入， r 读取
fs.writeFile('1.txt', "hel222lo....", { flag: 'a' }, err => {
    if (err) {
        throw err
    }
    console.log('操作成功')
})

// 读取
// 不传字符编码数据会以 Buffer 对象返回， 需要res.toString() 转换
fs.readFile('1.txt', 'utf8', (err, res) => {
    if (err) throw err
    console.log(res)
})

// 所有的文件操作，没有加sync都是异步，否则是同步

// 修改
// fs.rename('1.txt', 'rname.txt', err => {
//     if (err) throw err
//     console.log('修改成功')
// })

// 删除
// fs.unlink('rname.txt', err => {
//     if (err) throw err
//     console.log('删除成功')
// })

// 复制
fs.copyFile('rname.txt', 'copy.txt', err => {
    if (err) throw err
    console.log('复制成功')
})

// 以上操作都是异步，代码顺序不代表操作顺序