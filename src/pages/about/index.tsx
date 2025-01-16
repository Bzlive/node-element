import React, { useEffect, useState } from "react";
import axios from 'axios'
import store from '../../data/store.json';
import zq from '../../data/zq.json';
import { writeFile, utils } from 'xlsx';
import { saveAs } from 'file-saver';

const About = () => {
  const [desc, setDesc] = useState('')
  const getList = () => {
    axios.post('api/data', {name: '1111'}).then(({ data }) => {
      setDesc(data?.desc)
      console.log('%c [ res ]-6', 'font-size:13px; background:pink; color:#bf2c9f;', data)
    }).catch(err => {
      console.log('%c [ err ]-9', 'font-size:13px; background:pink; color:#bf2c9f;', err)
    })
  }

  const update = () => {
    const sList = store['企业关联客户导出'];
    const zList = zq[0];
    const newList = zList.reduce((acc, curr) => {
      const res = sList.filter(item => item['企业名称'] === curr['企业客户名称']);
      if (res.length) {
        const ll = res.map( v=> ({
          ...curr,
          ['关联店铺ID']: v['关联店铺ID'],
          ['店铺名称']: v['店铺名称'],
          ['店铺地址']: v['店铺地址'],
          ['店铺联系人']: v['店铺联系人'],
        }))
        acc.push(...ll);
      }
      return acc;
    }, []);
    console.log('%c [ newList ]-36', 'font-size:13px; background:pink; color:#bf2c9f;', newList)
    newList.length && exportToExcel(newList)
  }

  const exportToExcel = (data) => {
    // 创建一个新的工作簿
    const wb = utils.book_new();
 
    // 将 JSON 数据转换为工作表
    const ws = utils.json_to_sheet(data);
 
    // 将工作表添加到工作簿中
    utils.book_append_sheet(wb, ws, 'Sheet1');
 
    // 生成 Excel 文件并触发下载
    const wbout = writeFile(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([wbout], { type: 'application/octet-stream' });
    saveAs(blob, 'data.xlsx');
  };

  useEffect(() => {
    getList()
  }, [])

  return (
    <div>
      <h1>About</h1>
      <div>{desc}</div>
      <button onClick={update}>开始</button>
    </div>
  )
}

export default About;