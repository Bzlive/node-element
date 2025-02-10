const companyList = require('../../data/period/companyList.json')
const companyPeriodList = require('../../data/period/companyPeriodList.json')
const fs = require('fs');
const allCompanyPeriodList = require('../../data/period/allCompanyPeriodList.json')
const exitCompanyList = require('../../data/period/exitCompanyList.json')
const resRealCompanyPeriod = require('../../data/period/resRealCompanyPeriod.json')
const companyStore = require('../../data/store.json')
const statementAccount = require('../../data/period/statementAccount.json')


/***************  店铺及对账单  *************/
const effectiveStore = () => {
  const storeArr = companyStore['企业关联客户导出'];
  const statementAccountStoreArr = statementAccount['sheet1'].map(v => v['门店ID']);
  const resRealCompanyPeriodArr = resRealCompanyPeriod.filter(v => v.billing_period_type !== 'MONTH').map(v => +v.ep_company_id);
  const effectiveStoreArr = storeArr.filter(item => resRealCompanyPeriodArr.includes(item['企业ID']) && item['状态'] === '有效');
  console.log('%c [ effectiveStoreArr ]-17', 'font-size:13px; background:pink; color:#bf2c9f;', effectiveStoreArr.length, effectiveStoreArr.map(v => v['关联店铺ID']))
  const noArr = effectiveStoreArr.filter(item => !statementAccountStoreArr.includes(item['关联店铺ID']));
  console.log('%c [ noArr ]-18', 'font-size:13px; background:pink; color:#bf2c9f;', noArr.length, noArr.map(v => v['关联店铺ID']))

  const outputPath = 'data/period/noStatementAccountStoreArr.json';
  fs.writeFile(outputPath, JSON.stringify(noArr), 'utf8', (err) => {
    if (err) throw err;
    console.log('JSON 文件合并成功，已保存到', outputPath);
  });
}

effectiveStore();

/***************  new  *************/
const newAllCompanyPeriodList = () => {
  const allArr = allCompanyPeriodList['导出结果']
  const extArr = exitCompanyList['Sheet1'].map(v => v['企业ID']);
  const newAllArr = allArr.filter(item => +item.status);

  const realAllArr = newAllArr.filter(item => !extArr.includes(+item.ep_company_id) && +item.status);

  const okArr = realAllArr.filter(item => item.period_point_day && item.credit_amount && item.credit_days);

  const outputPath = 'data/period/resRealCompanyPeriod.json';
  fs.writeFile(outputPath, JSON.stringify(okArr), 'utf8', (err) => {
    if (err) throw err;
    console.log('JSON 文件合并成功，已保存到', outputPath);
  });
}

// 执行
// newAllCompanyPeriodList()


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

// getNoPeriodAllCompanys();
// getNoSetPeriodCompanys();