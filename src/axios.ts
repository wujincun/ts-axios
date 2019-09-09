import { AxiosInstance } from './types'
import Axios from './core/Axios'
import { extend } from './helpers/utils'
function createInstance(): AxiosInstance {
  const contex = new Axios()
  const instance = Axios.prototype.request.bind(contex)
  extend(instance, contex)
  return instance as AxiosInstance
}
const axios = createInstance()
export default axios
