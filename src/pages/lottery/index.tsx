import React, { useState } from "react";
import { useEffect } from 'react';
import dltData from '../../../static/dlt.json';
import ssqData from '../../../static/ssq.json';
import { Table, Tabs, Button } from "antd";
// import axios from 'axios'

const { TabPane } = Tabs

const columns = [
  {
    title: 'No',
    dataIndex: 'no',
    key: 'no',
  },
  {
    title: 'Result',
    dataIndex: 'nums',
    key: 'nums',
    render: (text: []) => {
      return text.join(' ');
    }
  },
]

const Lottery = () => {

  const [type, setType] = useState<string>('ssq')
  const [dataSource, setDataSource] = useState<any>([])

  const getData = async () => {
    // const res = await axios.get(`../static/${type}.json`)
    // setDataSource(res);
    if (type === 'ssq') {
      setDataSource(ssqData)
    } else {
      setDataSource(dltData)
    }
  }

  const handleData = () => {
    const resData = dataSource.map(v => v.nums.join(' ')).slice(0, 500)
    console.log('%c [ resData ]-43', 'font-size:13px; background:pink; color:#bf2c9f;', resData)
  }

  useEffect(() => {
    getData();
  }, [])

  useEffect(() => {
    getData();
  }, [type])

  return (
    <div style={{ padding: '20px' }}>
      <div className="flex justify-between">
        <Tabs 
          defaultActiveKey={type} 
          onChange={(key) => {
            setType(key)
          }}
        >
          <TabPane tab="dlt" key="dlt"></TabPane>
          <TabPane tab="ssq" key="ssq"></TabPane>
        </Tabs>
        <div>
          <Button onClick={handleData}>生成数据</Button>
        </div>
      </div>


      <Table dataSource={dataSource} columns={columns} />;
    </div>
  );
};

export default Lottery;
