import React, { useEffect } from "react";
import { custInstanceof } from '@/utils/utils'

function Preson (year: number) {
  this.year = year;
}

const Index = () => {

  const testInstanceof = () => {
    const a = {}
    console.log('a === Object', custInstanceof(a, Object))
    const c = 'is instanceof'
    console.log('c === b', custInstanceof(c, Object))
    const p = new Preson(12);
    console.log('p === Preson', custInstanceof(p, Preson))
  }

  useEffect(() => {
    testInstanceof()
  }, [])

  return (
    <div>
      <div>Hello World</div>
    </div>
  );
}

export default Index;