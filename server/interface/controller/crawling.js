const cheerio = require('cheerio');
const fs = require('fs');
const schedule = require("node-schedule");

class Crawling {
  constructor() {
    this.scheduleTask = this.scheduleTask.bind(this)
    this.spiderDouban = this.spiderDouban.bind(this)
    this.writeFiel = this.writeFiel.bind(this)
  }

  scheduleTask () {
    schedule.scheduleJob("0 23 17 * * *", () => {
      const tasks = [
        { name: 'ssq', url: 'https://datachart.500.com/ssq/history/newinc/history.php?start=1', filePath: './static/ssq.json' },
        { name: 'dlt', url: 'https://datachart.500.com/dlt/history/newinc/history.php?start=1', filePath: './static/dlt.json' },
      ]
      tasks.forEach(item => {
        this.spiderDouban(item)
      })
    });
  }

  async spiderDouban ({ url, filePath }) {
    const list = [];
    const res = await fetch(url).then((res) => res.text());
    const $ = cheerio.load(res);
    const trs = $('#tdata').find('tr')
    $(trs).each((index, el) => {
      const nums = []
      let no = ''
      const tds = $(el).find('td');
      tds.each((i, tdEl) => {
        if (i === 0) no = $(tdEl).text()
        if (i > 0 && i <= 7) nums.push($(tdEl).text())
      })
      list.push({ no, nums  })
    });

    if(list.length) this.writeFiel(JSON.stringify(list), filePath);
  }

  writeFiel (data, filePath = './static/ssq.json') {
    try {
      fs.writeFileSync(filePath, data);
      console.log('文件写入成功');
    } catch (err) {
      console.error('写入文件时出错:', err);
    }
  }
}

module.exports = new Crawling();
