import React from 'react';
import { ReactFlow, Controls, Background } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

const Flow = () => {

  const nodes = [
    {
      id: '1',
      position: { x: 500, y: 50 },
      data: { label: 'Hello' },
      type: 'input',
    },
    {
      id: '2',
      data: { label: 'World' },
      position: { x: 500, y: 100 },
    },
  ];

  const edges = [{ id: '1-2', source: '1', target: '2' }];

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <ReactFlow nodes={nodes} edges={edges}>
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  )
}

export default Flow;
