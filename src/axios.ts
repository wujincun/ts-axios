import { AxiosInstance, axiosRequestConfig } from './types'
import Axios from './core/Axios'
import { extend } from './helpers/utils'
import defaults from './defaults'

function createInstance(config: axiosRequestConfig): AxiosInstance {
  const contex = new Axios(config)
  const instance = Axios.prototype.request.bind(contex)
  extend(instance, contex)
  return instance as AxiosInstance
}
const axios = createInstance(defaults)
export default axios
