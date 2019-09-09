import { axiosRequestConfig, axiosPromise, Method } from '../types'
import dispatchRequest from './dispatchRequest'
export default class Axios {
  request(url: any, config?: any): axiosPromise {
    if (typeof url === 'string') {
      if (!config) {
        config = {}
      }
      config.url = url
    } else {
      config = url
    }
    return dispatchRequest(config)
  }
  get(url: string, config?: axiosRequestConfig) {
    return this._requestWithoutData('get', url, config)
  }
  delete(url: string, config?: axiosRequestConfig) {
    return this._requestWithoutData('delete', url, config)
  }
  head(url: string, config?: axiosRequestConfig) {
    return this._requestWithoutData('head', url, config)
  }
  options(url: string, config?: axiosRequestConfig) {
    return this._requestWithoutData('options', url, config)
  }
  post(url: string, data?: any, config?: axiosRequestConfig) {
    return this._requestWithData('post', url, data, config)
  }
  put(url: string, data?: any, config?: axiosRequestConfig) {
    return this._requestWithData('put', url, data, config)
  }
  patch(url: string, data?: any, config?: axiosRequestConfig) {
    return this._requestWithData('patch', url, data, config)
  }
  _requestWithoutData(method: Method, url: string, config?: axiosRequestConfig) {
    return this.request(
      Object.assign(config || {}, {
        method,
        url
      })
    )
  }
  _requestWithData(method: Method, url: string, data?: any, config?: axiosRequestConfig) {
    return this.request(
      Object.assign(config || {}, {
        method,
        url,
        data
      })
    )
  }
}
