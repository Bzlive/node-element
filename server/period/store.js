const fs = require('fs');
const companyStore = require('../../data/store.json')
const companyPeriodList = require('../../data/period/companyPeriodList.json')
const crmMilkStore = require('../../data/period/crmMilkStore.json')
const associationStoreCompany = require('../../data/period/associationStoreCompany.json')
const newCompanyPeriod = require('../../data/period/newCompanyPeriod.json')
const allPeriodPointDay = require('../../data/all_period_point_day.json')

// 获取门店信息
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
    console.log('JSON 文件合并成功，已保存到', 'data/period/resRealNotPeriodStoreIds.json');
  });
}

// 获取启用账期的门店 - new
const getEnableStoreNew = () => {
  const list = newCompanyPeriod['导出结果'];
  // 去重
  const newList = [];
  for (let i = 0; i < list.length; i++) {
    const item = list[i];
    const index = newList.findIndex(v => v.ep_company_id === item.ep_company_id);
    if (index === -1) {
      if (item.billing_period_type && item.period_point_day && item.credit_days && item.credit_amount) {
        newList.push(item);
      }
    } else {
      if (newList[index].status !== '1') {
        newList[index] = item;
      }
    }
  }

  console.log('%c [ newList ]-56', 'font-size:13px; background:pink; color:#bf2c9f;', newList.length);

  // 生成最新完善账期且启用的企业。
  //  fs.writeFile('data/period/newRealCompanyPeriod.json', JSON.stringify(newList), 'utf8', (err) => {
  //   if (err) throw err;
  //   console.log('JSON 文件合并成功，已保存到', 'data/period/newRealCompanyPeriod.json');
  // });

  // 获取使用账期企业下的店铺
  const associationStoreCompanyArr = associationStoreCompany['Sheet1'];
  // const newIdList = newList.map(v => +v.ep_company_id);
  const newStoreList = associationStoreCompanyArr.filter(v => {
    const data = newList.find(item => +item.ep_company_id === v.company_id);
    // newIdList.includes(v.company_id)
    v['billing_period_type'] = data?.billing_period_type;
    v['period_point_day'] = data?.period_point_day;
    return !!data;
  });
  // const newStoreIds = newStoreList.map(v => v.store_id);
  // console.log('%c [ newStoreIds ]-68', 'font-size:13px; background:pink; color:#bf2c9f;', newStoreIds.length);
  // fs.writeFile('data/period/resRealAssociationStoreIds.json', JSON.stringify(newStoreIds), 'utf8', (err) => {
  //   if (err) throw err;
  //   console.log('JSON 文件合并成功，已保存到', 'data/period/resRealAssociationStoreIds.json');
  // });
  fs.writeFile('data/period/resRealAssociationStore.json', JSON.stringify(newStoreList), 'utf8', (err) => {
    if (err) throw err;
    console.log('JSON 文件合并成功，已保存到', 'data/period/resRealAssociationStore.json');
  });


  // 结账日和账期类型
  // const notIds = [
  //   22388,107516,170718,245601,278241,281934,282705,282802,283913,291272,297450,304000,305091,306909,309863,311904,331330,337567,338940,339555,341436,361646,372365,388375,393996,394571,400286,403640,407641,409860,409885,417934,424813,429481,431110,432019,433367,435212,435406,435453,435800,436597,436975,437880,438261,439512,439593,442349,443049,448140,449135,450954,452957,456753,458158,458163,458167,458934,459215,459956,460034,460568,460689,463634,463652,463691,463693,464515,464524,464538,465331,465362,466027,466129,467794,467800,467848,468169,468172,469451,469721,470352,470421,470445,471559,474120,482652,486854,490519,491967,496188,499021,503348,508314,509482,510026,510754,511765,511954,512902,513424,513834,514300,515943,519635,522535,524222,525372,526111,528535,530380,531669,539990,540296,541444,541469,542065,543545,544043,544085,544403,545334,546304,547986,556168,557704,576697,578888,584260,584904,586746,588659,589924,601355,605347,607401,610866,614046,615962,616735,623576,627341,631272,632798,648241,648246,648
  // ]
  // const allPeriodPointDayArr = allPeriodPointDay['Sheet1'];
  // const newStoreInfo = newStoreList.filter(v => notIds.includes(v.store_id)).map(v => {
  //   const company = newList.find(item => +item.ep_company_id === +v.company_id);
  //   const company2 = allPeriodPointDayArr.find(item => +item['企业客户ID'] === +v.company_id);
  //   return {
  //     store_id: v.store_id,
  //     company_id: v.company_id,
  //     checkout_frequency: company?.billing_period_type,
  //     checkout_day: company?.period_point_day,
  //     // reconciliation_day: company2?.['对账日'],
  //   }
  // })
  // console.log('%c [ newStoreInfo ]-91', 'font-size:13px; background:pink; color:#bf2c9f;', newStoreInfo.length)

  // fs.writeFile('data/period/resRealUpdateStoreInfo.json', JSON.stringify(newStoreInfo), 'utf8', (err) => {
  //   if (err) throw err;
  //   console.log('JSON 文件合并成功，已保存到', 'data/period/resRealUpdateStoreInfo.json');
  // });


  // 对账日
  const allPeriodPointDayArr = allPeriodPointDay['Sheet1'];
  const newStoreReconciliation = newStoreList.reduce((acc, current) => {
    const company2 = allPeriodPointDayArr.find(v => +v['企业客户ID'] === +current.company_id);
    if (company2?.['对账日']) {
      const res = {
        store_id: current.store_id,
        company_id: current.company_id,
        reconciliation_day: company2?.['对账日'],
      }
      acc.push(res);
    }
    return acc;
  }, [])
  console.log('%c [ newStoreReconciliation ]-91', 'font-size:13px; background:pink; color:#bf2c9f;', newStoreReconciliation.length)

  fs.writeFile('data/period/updateStoreInfoReconciliationDay.json', JSON.stringify(newStoreReconciliation), 'utf8', (err) => {
    if (err) throw err;
    console.log('JSON 文件合并成功，已保存到', 'data/period/updateStoreInfoReconciliationDay.json');
  });
}

// getCompanyStore();
getEnableStoreNew();
