import React, { useState } from "react";
import { Menu, Button } from "antd";
import { useNavigate } from 'react-router-dom'

interface MenuProps {
  label: string,
  key: string,
  path: string,
}

const Index = () => {
  const items: MenuProps[] = [
    {
      label: 'index',
      key: 'index',
      path: '',
    },
    {
      label: 'about',
      key: 'about',
      path: '/about',
    },
    {
      label: 'chatRoom',
      key: 'chatRoom',
      path: '/chatRoom',
    },
    {
      label: 'user',
      key: 'user',
      path: '/user',
    },
    {
      label: 'flow',
      key: 'flow',
      path: '/flow',
    },
    {
      label: 'lottery',
      key: 'lottery',
      path: '/lottery',
    }
  ];
  const navigate = useNavigate();
  const [current, setCurrent] = useState('index');
  const onClick = ({item: { props }, key }: any) => {
    setCurrent(key);
    navigate(props.path)
  };

  const handleLoginOut = () => {
    localStorage.removeItem('token');
    navigate('/login', { replace: true })
  }

  return (<div>
    {/* <ul>
      <li>  <Link to="/about">about</Link></li>
      <li>  <Link to="/chatRoom">chatRoom</Link></li>
      <li>  <Link to="/user">user</Link></li>
    </ul> */}
    <Menu mode="horizontal" selectedKeys={[current]} onClick={onClick} items={items} />

    <Button onClick={handleLoginOut}>退出登录</Button>
  </div>)
}

export default Index;