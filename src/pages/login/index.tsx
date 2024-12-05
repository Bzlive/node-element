import React from "react";
import { useNavigate } from 'react-router-dom'
import { message, Button, Form, Input, Checkbox } from 'antd';
import type { FormProps } from 'antd';
import API from '@/utils/api';

type FieldType = {
  phone_number?: string;
  password?: string;
  remember?: string;
};

const Login = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    console.log('Success:', values);
    const data: {[key: string]: any} = await API.post('/login/user', values)
    console.log('%c [ data ]-20', 'font-size:13px; background:pink; color:#bf2c9f;', data)
    localStorage.setItem('token', data.token);
    message.success('登录成功');
    navigate('/')
  };

  return (
    <div style={{height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f0f2f5' }}>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="手机号"
          name="phone_number"
          rules={[{ required: true, message: 'Please input your phone_number!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="密码"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item<FieldType>
          name="remember"
          valuePropName="checked"
          wrapperCol={{ offset: 8, span: 16 }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Login;