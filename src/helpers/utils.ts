function valType(val: any): string {
  return Object.prototype.toString.call(val).slice(8, -1)
}
export function isDate(val: any): val is Date {
  return valType(val) === 'Date'
}
export function isObject(val: any): val is Object {
  return val !== null && typeof val === 'object'
}
export function isPlainObject(val: any): val is Object {
  return valType(val) === 'Object'
}
export function extend<T, U>(to: T, from: U): T & U {
  for (const key in from) {
    ;(to as T & U)[key] = from[key] as any
  }
  return to as T & U
}
