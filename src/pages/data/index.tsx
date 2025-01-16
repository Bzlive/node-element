import { useEffect } from 'react';
import store from '../../data/store.json';
import zq from '../../data/zq.json';
const Data = () => {

  const update = () => {

  }


  useEffect(() => {
    update()
  }, []);


  return (
    <div>
      <h1>Data</h1>
    </div>
  );
};

export default Data;