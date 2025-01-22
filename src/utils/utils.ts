

/**
 * 实现 instanceof 方法
 * @param obj 判断对象
 * @param target 目标对象
 * @returns true | false
 */
export function custInstanceof (obj: Function | object, target: Function | object) {
  // 判断 obj 是否是 object 且不为nll， target 是否是 function
  if (typeof obj !== 'object' || obj === null || typeof target !== 'function') return false;
  // 取出 obj 的原型链
  let proto = Object.getPrototypeOf(obj);
  // 循环判断， proto 原型链的最终端都是 null
  while (proto !== null) {
    if(proto === target.prototype) return true;
    proto = Object.getPrototypeOf(proto);
  }
  return false;
}