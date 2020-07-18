// Buffer 对象用于以字节序列的形式来表示二进制数据。
// buffer 创建
let buffer1 = Buffer.alloc(10)
let buffer2 = Buffer.from('大姐啊')
console.log(buffer1, buffer2)

// Buffer.concat