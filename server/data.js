const storeJson = require('../data/store.json')
const zqJson = require('../data/zq.json')
const checkStoreJson = require('../data/checkStore.json')
const fs = require('fs');
const path = require('path');
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


updateStore();
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