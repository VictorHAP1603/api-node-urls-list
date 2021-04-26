const http = require("http");
const data = require('./urls.json');
const fs = require('fs');
const path = require('path');
const URL = require('url')

function writeFile(cb) {
    fs.writeFile(
        path.join(__dirname, "urls.json"), 
        JSON.stringify(data, null, 2),
        err => {
            if (err) throw err

            cb(JSON.stringify({message: 'OK'}))
        } )
}

http.createServer((req, res) => {
    const { name, url, del } = URL.parse(req.url, true).query
    res.writeHead(200, {
        'Access-Control-Allow-Origin': '*'
    })
    // all resources
    if (!name || !url) return res.end(JSON.stringify(data))

    if (del) {
        data.urls = data.urls.filter(item => String(item.url) !== String(url))
        return writeFile((message) => res.end(message))
    }


    data.urls.push({
        name, url
    })

    return writeFile((message) => res.end(message))
})
.listen(5000, () => console.log('api running'));
