const http = require('http')
// 为服务器专门设计的核心jQuery的快速、灵活和精益实现。
const cheerio = require('cheerio')
const fs = require('fs')
const webUrl = 'http://news.ifeng.com/'

http.get(webUrl, res => {
    let str = ''
    res.on('data', chunk => {
        str += chunk
    })
    res.on('end', () => {
        formatData(str)
    })
})

function formatData(html) {
    let $ = cheerio.load(html)
    let arr = []
    $('.news-stream-basic-news-list li').each((key, value) => {
        let obj = {
            id: key + 1,
            title: $(value).find('a').text(),
            imgUrl: `http:${$(value).find('img').attr('src')}`,
            from: $(value).find('.news-stream-newsStream-mr10').text(),
            time: $(value).find('time').text()
        }
        arr.push(obj)
    })
    fs.writeFileSync('./data.json', JSON.stringify(arr))
}