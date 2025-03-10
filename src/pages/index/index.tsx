import React, { useState } from "react";
import { Menu, Button, Input } from "antd";
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
    },
    {
      label: 'hooks',
      key: 'hooks',
      path: '/hooks',
    }
  ];
  const navigate = useNavigate();
  const [current, setCurrent] = useState('index');
  const [count, setCount] = useState(0);

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

    <div className="flex-row mt-5 mb-5">
      <Button onClick={() => setCount(count - 1)}>-</Button>
      <Input style={{ display: 'inline-block', width: '100px' }} value={count} onChange={e => setCount(Number(e.target.value))} />
      <Button onClick={() => setCount(count + 1)}>+</Button>
    </div>

    <Button onClick={handleLoginOut}>退出登录</Button>
  </div>)
}

export default Index;