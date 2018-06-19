const axios = require('axios');
const source = require('./source');
const { Source } = require('./enum');
const fs = require('fs');
const Mustache = require('mustache');

const templateXimalaya = fs.readFileSync('./templates/ximalaya.xml', 'utf-8');

const instance = axios.create({
    timeout: 2000,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.87 Safari/537.36',
        'Host': 'www.ximalaya.com',
        'Accept': '*/*',
        'Accept-Encoding': 'gzip, deflate',
        'Accept-Language': 'en,zh-CN;q=0.9,zh;q=0.8,zh-TW;q=0.7',
    }
})

function generateXimalaya() {
    const sources = source[Source.Ximalaya];
    for (let source of sources) {
        const url = Source.getUrl(Source.Ximalaya, source.id);
        instance.get(url).then(response => {
            let items = response.data.data.tracksAudioPlay;
            for (let item of items) {
                item.title = item.trackName;
                item.author = source.author;
                item.summary = source.trackName;
                item.image = source.image;
                item.audio = item.src;
                this.duration = item.duration;
                this.date = new Date().toString();
            }

            source.date = new Date().toString();
            source.items = items;

            const output = Mustache.render(templateXimalaya, source);
            fs.writeFileSync('./dist/ximalaya.xml', output);

        }).catch(err => {
            console.log(err.message)
        });
    }
}

function main() {
    generateXimalaya();
}

main();
