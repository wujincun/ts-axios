import { axiosRequestConfig } from '../types'
import { isPlainObject, deepMerge } from '../helpers/utils'
function defaultStrat(val1: any, val2: any): any {
  return typeof val2 !== undefined ? val2 : val1
}
function fromVal2Strat(val1: any, val2: any): any {
  return typeof val2 !== undefined && val2
}
function deepMergeStrat(val1: any, val2: any): any {
  if (isPlainObject(val2)) {
    return deepMerge(val1, val2)
  } else if (val2 !== undefined) {
    return val2
  } else if (isPlainObject(val1)) {
    return deepMerge(val1)
  } else if (typeof val1 !== undefined) {
    return val1
  }
}
const strats = Object.create(null)
const stratsKeysFromVal2 = ['url', 'params', 'data']
const stratsKeysDeepMerge = ['headers']

stratsKeysFromVal2.forEach(key => {
  strats[key] = fromVal2Strat
})
stratsKeysDeepMerge.forEach(key => {
  strats[key] = deepMergeStrat
})

export default function mergeConfig(
  config1: axiosRequestConfig,
  config2?: axiosRequestConfig
): axiosRequestConfig {
  const config = Object.create(null)
  if (!config2) {
    config2 = {}
  }
  for (let key in config2) {
    mergeField(key)
  }
  for (let key in config1) {
    if (!config2[key]) {
      mergeField(key)
    }
  }
  function mergeField(key: string): void {
    const strat = strats[key] || defaultStrat
    config[key] = strat(config1[key], config2![key])
  }
  return config
}
