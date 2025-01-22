const storeJson = require('../data/store.json')
const zqJson = require('../data/zq.json')
const checkStoreJson = require('../data/checkStore.json')
const ncStore = require('../data/ncStore.json')
const noPeriodPointDay = require('../data/no_period_point_day.json')
const allPeriodPointDay = require('../data/all_period_point_day.json')
const companys = require('../data/companys.json')
const fs = require('fs');
const path = require('path');

const upNoCompanys = () => {
  const noCompanysList = companys['企业客户导出'];
  const noPeriodPointDayList = noPeriodPointDay['所有未设置结账日企业'].map(v => +v.ep_company_id);
  const zqJsonList = zqJson[0]?.map(v => +v['企业客户ID']);
  const notDayList = [...noPeriodPointDayList, ...zqJsonList]

  const newList = noCompanysList.filter(item => !notDayList.includes(+item['企业id']) && item['企业账户状态'] === 1);
  console.log('%c [ newList ]-36', 'font-size:13px; background:pink; color:#bf2c9f;', noCompanysList.length, notDayList.length, newList.length)
  const outputPath = 'data/resNoCompanyDays.json';
  fs.writeFile(outputPath, JSON.stringify(newList), 'utf8', (err) => {
    if (err) throw err;
    console.log('JSON 文件合并成功，已保存到', outputPath);
  });
}

const upNoPeriodPointDay = () => {
  const noPeriodPointDayList = noPeriodPointDay['所有未设置结账日企业'];
  const allPeriodPointDayList = allPeriodPointDay['Sheet1']?.map(v => v['企业客户ID']);

  const newList = noPeriodPointDayList.filter(item => !allPeriodPointDayList.includes(+item?.ep_company_id));
  console.log('%c [ newList ]-36', 'font-size:13px; background:pink; color:#bf2c9f;', noPeriodPointDayList.length , allPeriodPointDayList.length, newList.length)
  const outputPath = 'data/resNotCompany.json';
  fs.writeFile(outputPath, JSON.stringify(newList), 'utf8', (err) => {
    if (err) throw err;
    console.log('JSON 文件合并成功，已保存到', outputPath);
  });
}

const updateNCStore = () => {
  const sList = storeJson['企业关联客户导出'];
  const zList = zqJson[0];
  const nzList = ncStore['Sheet1'];
  const newList = nzList.map(item => {
    const resItem = sList.find(v => v['关联店铺ID'] == item['店铺ID']) || {};
    const resZ = zList.find(v => v['企业客户ID'] == resItem['企业ID']) || {};
    return {
      ['商家ID']: resZ['商家ID'] || '',
      ['商家名称']: resZ['商家名称'] || '',
      ['企业ID']: resItem['企业ID'] || '',
      ['企业名称']: resItem['企业名称'] || '',
      ['店铺ID']: item['店铺ID'] || '',
      ['店铺名称']: item['店铺名称'] || '',
      ['账期类型']: resZ['账期类型'] || '',
      ['账期授信天数']: resZ['账期授信天数'] || '',
      ['账期授信额度']: resZ['账期授信额度'] || '',
      ['结账日']: item['结账日'] || '',
      ['对账日']: item['对账日'] || '',
    };
  })

  console.log('%c [ newList ]-36', 'font-size:13px; background:pink; color:#bf2c9f;', newList.length)
  const outputPath = 'data/resNCStore.json';
  fs.writeFile(outputPath, JSON.stringify(newList), 'utf8', (err) => {
    if (err) throw err;
    console.log('JSON 文件合并成功，已保存到', outputPath);
  });
}

const updateStore = () => {
  const sList = storeJson['企业关联客户导出'];
  const zList = zqJson[0];
  const types = {
    MONTH: '月结',
    PERIODIC: '月结-实销实结',
  };
  const newList = sList.reduce((acc, curr) => {
    const res = zList.find(item => item['企业客户ID'] === curr['企业ID']) || {};
    const typeStr = types[res['账期类型']] || ''
    const newRes = {
      ['商家ID']: res['商家ID'] || '',
      ['商家名称']: res['商家名称'] || '',
      ['企业ID']: curr['企业ID'] || '',
      ['企业名称']: curr['企业名称'] || '',
      ['法人']: curr['法人'] || '',
      ['法人电话']: curr['法人电话'] || '',
      ['关联店铺ID']: curr['关联店铺ID'],
      ['店铺名称']: curr['店铺名称'],
      ['店铺地址']: curr['店铺地址'],
      ['店铺联系人']: curr['店铺联系人'],
      ['账期类型']: typeStr,
      ['账期授信额度']: res['账期授信额度'] || '',
      ['账期授信天数']: res['账期授信天数'] || '',
      ['结账日']: res['结账日'] || '',
      ['对账日']: res['对账日'] || '',
    };
    acc.push(newRes);
    return acc;
  }, []);
  console.log('%c [ newList ]-36', 'font-size:13px; background:pink; color:#bf2c9f;', newList.length)
  const outputPath = 'data/resStore.json';
  fs.writeFile(outputPath, JSON.stringify(newList), 'utf8', (err) => {
    if (err) throw err;
    console.log('JSON 文件合并成功，已保存到', outputPath);
  });
}

const checkStoreFun = () => {
  const sList = storeJson['企业关联客户导出'];
  const checkStoreList = checkStoreJson['Sheet1'];
  const newList = checkStoreList.filter(item => !sList.some(v => item['店铺ID'] === v['关联店铺ID']));
  console.log('%c [ newList ]-48', 'font-size:13px; background:pink; color:#bf2c9f;', newList.length)
  // 输出
  const outputPath = 'data/noSotre.json';
  fs.writeFile(outputPath, JSON.stringify(newList), 'utf8', (err) => {
    if (err) throw err;
    console.log('JSON 文件合并成功，已保存到', outputPath);
  });
}

upNoCompanys();
// upNoPeriodPointDay();
// updateNCStore();
// updateStore();
// checkStoreFun();

// 读取 JSON 文件内容
// fs.readFile(filePath1, 'utf8', (err, data1) => {
//   if (err) throw err;
 
//   fs.readFile(filePath2, 'utf8', (err, data2) => {
//     if (err) throw err;
 
//     // 将字符串转换为 JavaScript 对象
//     const json1 = JSON.parse(data1);
//     const json2 = JSON.parse(data2);
 
//     // 合并对象（这里简单地将 json2 的内容合并到 json1 中，如果有键冲突会覆盖）
//     const mergedJson = { ...json1, ...json2 };
 
//     // 将合并后的对象转换回字符串
//     const mergedData = JSON.stringify(mergedJson, null, 2); // 格式化输出，缩进为2个空格
 
//     // 将字符串写入到新的 JSON 文件中
//     fs.writeFile(outputPath, mergedData, 'utf8', (err) => {
//       if (err) throw err;
//       console.log('JSON 文件合并成功，已保存到', outputPath);
//     });
//   });
// });