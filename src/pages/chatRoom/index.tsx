import React, { useEffect, useRef, useState } from "react";
import cls from "classnames"
// import styles from './index.module.less';
const styles = require('./index.module.less')

import { Input, Button, Card, List } from 'antd'

const Room = () => {
  const [list, setList] = useState<any[]>([])
  const [message, setMessage] = useState('')
  const websocket  = useRef<any>(null)

  const initWS = () => {
    websocket.current = new WebSocket('ws://127.0.0.1:4001');
    websocket.current.onopen = () => {
      console.log('%c [ 连接成功 ]-17', 'font-size:13px; background:pink; color:#bf2c9f;')
    }
    websocket.current.onmessage = ({ data }: any) => {
      if(data instanceof Blob) {
        // 将Blob转换为字符串
        data.text().then((txt: any) => {
          const msg = JSON.parse(txt);
          setList([...list, msg])
        });
      } else {
        const msg = JSON.parse(data);
        setList([...list, msg])
      }
    }
    websocket.current.onclose = () => {
      console.log('%c [ 连接关闭 ]-17', 'font-size:13px; background:pink; color:#bf2c9f;')
    }
    websocket.current.onerror = (err: any) => {
      console.log('%c [ 连接失败 ]-17', 'font-size:13px; background:pink; color:#bf2c9f;', err)
    }
  }


  const sendMessage = () => {
    const msg = {
      id: Date.now(),
      text: message,
    };
    websocket.current.send(JSON.stringify(msg));
    setMessage('')
  }

  useEffect(() => {
    initWS()
  }, [])

  return(
    <div className={styles.room}>
      <div className={cls(styles.warrap, styles.chat)}>
        <h3 className={styles.title}>chat room</h3>
        <Card style={{ height: '100%' }}>
        <List
          itemLayout="horizontal"
          dataSource={list}
          renderItem={(item, index) => (
            <List.Item>
              <List.Item.Meta
                title={<a href="https://ant.design">{item.title}</a>}
                description={item.text}
              />
            </List.Item>
          )}
        />
        </Card>
      </div>
      <div className={cls(styles.warrap, styles.action)}>
        <h3 className={styles.title}>action</h3>
        <div className={styles['warrap-box']}>
          <Input 
            value={message} 
            placeholder="请输入" 
            onChange={e => setMessage(e.target.value)}
            size="large"
            style={{
              width: '90%',
              marginRight: '20px'
            }}
          />
          <Button size="large" type="primary" onClick={sendMessage}>发送</Button>
        </div>
      </div>
    </div>
  )
}

export default Room;