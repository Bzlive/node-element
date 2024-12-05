import React, { useState } from "react";
import { useEffect } from "react";
import { Table, Flex, message, Button, Divider, Modal, Form, Input, Radio, InputNumber, Row, Col} from 'antd';
import type { TableProps } from 'antd';
import API from '@/utils/api';

interface DataType {
  id: string;
  name: string;
  age: number;
  gender: number;
  phone_number: string;
  password: string;
}

type FieldType = {
  name?: string;
  age?: number;
  gender?: number;
  phone_number?: string;
  password?: string;
};

type dataParmas = {
  current?: number,
  pageSize?: number
}

const UserList = () => {
  const [list, setList] = useState<DataType[]>([])
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const [detail, setDetail] = useState<DataType>();
  const [searchForm] = Form.useForm()
  const [pagination, setPagination] = useState<any>({ current: 1, pageSize: 10, total: 0 })

  const getData = (param?: dataParmas) => {
    const { current, pageSize } = param || pagination
    setLoading(true)
    const params = searchForm.getFieldsValue()
    API.get('/user/list', { params: {
      ...params,
      current: current,
      pageSize: pageSize
    }}).then((res: any) => {
      setList(res.records)
      setPagination({
        current: res.current,
        pageSize: res.pageSize,
        total: res.total,
      })
    }).finally(() => setLoading(false))
  }

  useEffect(()=> {
    getData()
  }, [])

  const handleOk = async () => {
    form.validateFields().then(res => {
      setLoading(true);
      const params = { ...res }
      if (detail?.id) {
        params.id = detail.id
      }
      const apiurl = detail?.id ? API.put('/user/edit', params) : API.post('/user/add', params)
      apiurl.then(() => {
        message.success(`${detail?.id ? '修改' : '新增'}成功`);
        setOpen(false);
        getData();
      }).finally(() => setLoading(false))
    })
  }

  const handleDel = (record: DataType) => {
    Modal.confirm({
      title: '删除',
      content: '是否确认删除',
      onOk: () => {
        API.delete(`/user/del?id=${record.id}`).then((res) => {
          message.success('删除成功');
          getData();
        })
      }
    })
  }

  const onFinish = () => {
    getData()
  }

  const columns: TableProps<DataType>['columns'] = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },{
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '性别',
      dataIndex: 'gender',
      key: 'gender',
      render: (txt) => txt === 2 ? '女' : '男'
    },
    {
      title: '手机号',
      dataIndex: 'phone_number',
      key: 'phone_number',
    },
    {
      title: '密码',
      dataIndex: 'password',
      key: 'password',
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <div>
          <Button type="link" onClick={() => {
            setDetail(record)
            form.setFieldsValue({ ...record })
            setOpen(true)
          }}>编辑</Button>
          <Divider type="vertical" />
          <Button type="link" onClick={() => handleDel(record)}>删除</Button>
        </div>
      ),
    }
  ];

  return (
    <div style={{padding: '20px'}}>
      <Flex gap="middle" justify="space-between">
        <h3>用户列表</h3>
        <Button type="primary" onClick={() => setOpen(true)}>新增用户</Button>
      </Flex>
      <Divider />

      <div className="flex justify-between">
      <Form
          form={searchForm}
          name="form"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          style={{width: '100%'}}
          autoComplete="off"
          onFinish={onFinish}
        >
          <Row>
            <Col span={6}>
              <Form.Item<FieldType>
                label="姓名"
                name="name"
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item<FieldType>
                label="性别"
                name="gender"
              >
                <Radio.Group>
                  <Radio value={1}> 男 </Radio>
                  <Radio value={2}> 女 </Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item<FieldType>
                label="手机号码"
                name="phone_number"
              >
                <Input type="tel" />
              </Form.Item>
            </Col>
            <Col span={2}>
             <Form.Item  labelCol={{ span: 0 }} wrapperCol={{ span: 24 }} style={{textAlign: 'right'}}>
                <Button onClick={() => {
                  searchForm.resetFields()
                }}>
                  重置
                </Button>
                <Button type="primary" style={{marginLeft: '10px'}} htmlType="submit">
                  查询
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>

      <Table
        loading={loading}
        columns={columns}
        dataSource={list}
        rowKey="id"
        pagination={{
          ...pagination,
          pageSizeOptions: [10, 20, 50, 100],
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total, range) => `共 ${total} 条数据`,
          onChange: (page, pageSize) => {
            setPagination({ ...pagination, current: page, pageSize })
            getData({  current: page, pageSize })
          }
        }}
      ></Table>

      <Modal title="新增用户" open={open} onOk={handleOk} onCancel={() => setOpen(false)}>
        <Form
          form={form}
          name="form"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          style={{ maxWidth: 600 }}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="姓名"
            name="name"
            rules={[{ required: true, message: '请输入姓名' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item<FieldType>
            label="年龄"
            name="age"
            rules={[{ required: true, message: '请输入年龄' }]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item<FieldType>
            label="性别"
            name="gender"
            rules={[{ required: true, message: '请选择性别' }]}
          >
            <Radio.Group>
              <Radio value={1}> 男 </Radio>
              <Radio value={2}> 女 </Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item<FieldType>
            label="手机号码"
            name="phone_number"
            rules={[{ required: true, message: '请输入手机号码' }]}
          >
            <Input type="tel" />
          </Form.Item>
          <Form.Item<FieldType>
            label="密码"
            name="password"
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default UserList;
