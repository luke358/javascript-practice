// 浅比较数组的每一项是否相等

/**
 * 浅比较数组的每一项是否相等
 * @param {Array} a 比较数组
 * @param {Array} b 比较数组
 * @param {String} compareKey 比较的key值，可不传
 * @returns Boolean
 */
export function shallowEqual (a, b, compareKey) {
  if(a.length !== b.length) return false

  let compareA ,compareB
  for (let i = 0; i < a.length; i++) {
    compareA = a[i]
    compareB = b[i]
    if(compareKey) {
      compareA = compareA[compareKey]
      compareB = compareB[compareKey]
    }
    if(!Object.is(compareA,compareB)){
      return false
    }
  }
  return true
} 

