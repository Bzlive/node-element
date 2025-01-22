const companyList = require('../../data/period/companyList.json')
const companyPeriodList = require('../../data/period/companyPeriodList.json')
const fs = require('fs');


const getNoPeriodAllCompanys = () => {
  const companyArr = companyList['企业客户导出'];
  const noCompanysArr = companyPeriodList['Sheet2'].map(v => +v['ep_company_id']);

  const newList = companyArr.filter(item => !noCompanysArr.includes(+item['企业id']));
  console.log('%c [ newList ]-36', 'font-size:13px; background:pink; color:#bf2c9f;', companyArr.length, noCompanysArr.length, newList.length)
  const outputPath = 'data/period/resNoPeriodAllCompanys.json';
  fs.writeFile(outputPath, JSON.stringify(newList), 'utf8', (err) => {
    if (err) throw err;
    console.log('JSON 文件合并成功，已保存到', outputPath);
  });
}

const getNoSetPeriodCompanys = () => {
  const noCompanysArr = companyPeriodList['Sheet2'];

  const noPeriodPointDay = noCompanysArr.filter(v => !v.period_point_day);
  const notPeriodList = noPeriodPointDay.reduce((acc, curr) => {
    const resItem = noCompanysArr.find(v => v.ep_company_id === curr.ep_company_id && v.period_point_day)
    if (!resItem && !acc.some(v => v.ep_company_id === curr.ep_company_id)) {
      acc.push(curr)
    }
    return acc;
  }, []);
  console.log('%c [ notPeriodList ]-36', 'font-size:13px; background:pink; color:#bf2c9f;', notPeriodList.length)
  const outputPath = 'data/period/resNoSetPeriodCompanys.json';
  fs.writeFile(outputPath, JSON.stringify(notPeriodList), 'utf8', (err) => {
    if (err) throw err;
    console.log('JSON 文件合并成功，已保存到', outputPath);
  });
}

getNoPeriodAllCompanys();
getNoSetPeriodCompanys();