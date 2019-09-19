import { AxiosStatic, axiosRequestConfig } from './types'
import Axios from './core/Axios'
import { extend } from './helpers/utils'
import defaults from './defaults'
import mergeConfig from './core/mergeConfig'

function createInstance(config: axiosRequestConfig): AxiosStatic {
  const contex = new Axios(config)
  const instance = Axios.prototype.request.bind(contex)
  extend(instance, contex)
  return instance as AxiosStatic
}
const axios = createInstance(defaults)
axios.create = function create(config) {
  return createInstance(mergeConfig(defaults, config))
}
export default axios
