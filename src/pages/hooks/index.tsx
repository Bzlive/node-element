import React from "react";
import { Button, Input } from "antd";
import Hooks from "@/hooks/useState";
const { useState } = Hooks;

const Index = () => {
  const [count, setCount] = useState(0)

  return (
    <div>
      <div>about</div>

      <div className="flex-row mt-5 mb-5">
          <Button onClick={() => setCount(count - 1)}>-</Button>
          <Input style={{ display: 'inline-block', width: '100px' }} value={count} onChange={e => setCount(Number(e.target.value))} />
          <Button onClick={() => setCount(count + 1)}>+</Button>
        </div>
    </div>
  )
}

export default Index
