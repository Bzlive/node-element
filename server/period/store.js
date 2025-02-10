const fs = require('fs');
const companyStore = require('../../data/store.json')
const companyPeriodList = require('../../data/period/companyPeriodList.json')
const crmMilkStore = require('../../data/period/crmMilkStore.json')

const getCompanyStore = () => {
  const storeArr = companyStore['企业关联客户导出'];
  const crmMilkStoreArr = crmMilkStore['Sheet1'];
  const companyPeriodArr = companyPeriodList['Sheet2'].filter(v => v.billing_period_type === 'MONTH').map(v => +v.ep_company_id);
  const effectiveStoreArr = storeArr.filter(item => companyPeriodArr.includes(item['企业ID']) && item['状态'] === '有效');
  console.log('%c [ effectiveStoreArr ]-9', 'font-size:13px; background:pink; color:#bf2c9f;', effectiveStoreArr.length);
  // fs.writeFile('data/period/resRealPeriodStore.json', JSON.stringify(effectiveStoreArr), 'utf8', (err) => {
  //   if (err) throw err;
  //   console.log('JSON 文件合并成功，已保存到', outputPath);
  // });

  const effectiveStoreIds = effectiveStoreArr.map(v => v['关联店铺ID']);

  const notCheckoutFrequencyStore = crmMilkStoreArr.filter(v => effectiveStoreIds.includes(v.store_id));
  console.log('%c [ notCheckoutFrequencyStore ]-15', 'font-size:13px; background:pink; color:#bf2c9f;', notCheckoutFrequencyStore.length);
  // fs.writeFile('data/period/resRealNotPeriodStore.json', JSON.stringify(effectiveStoreArr), 'utf8', (err) => {
  //   if (err) throw err;
  //   console.log('JSON 文件合并成功，已保存到', outputPath);
  // });

  const ids = notCheckoutFrequencyStore.map(v => v.store_id);
  console.log('%c [ ids ]-22', 'font-size:13px; background:pink; color:#bf2c9f;', ids.length)
  fs.writeFile('data/period/resRealNotPeriodStoreIds.json', JSON.stringify(ids), 'utf8', (err) => {
    if (err) throw err;
    console.log('JSON 文件合并成功，已保存到', outputPath);
  });
}

getCompanyStore();
