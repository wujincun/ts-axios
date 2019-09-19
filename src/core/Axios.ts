import {
  axiosRequestConfig,
  axiosPromise,
  Method,
  axiosResponse,
  resolvedFn,
  rejectFn
} from '../types'
import dispatchRequest from './dispatchRequest'
import InterceptorManager from './intercepterManager'
interface interceptors {
  request: InterceptorManager<axiosRequestConfig>
  response: InterceptorManager<axiosResponse>
}
interface PromiseChain<T> {
  resolved: resolvedFn<T> | ((config: axiosRequestConfig) => axiosPromise)
  rejected?: rejectFn
}
export default class Axios {
  interceptors: interceptors
  constructor() {
    this.interceptors = {
      request: new InterceptorManager<axiosRequestConfig>(),
      response: new InterceptorManager<axiosResponse>()
    }
  }

  request(url: any, config?: any): axiosPromise {
    if (typeof url === 'string') {
      if (!config) {
        config = {}
      }
      config.url = url
    } else {
      config = url
    }
    const chain: PromiseChain<any>[] = [
      {
        resolved: dispatchRequest,
        rejected: undefined
      }
    ]
    this.interceptors.request.forEach(interceptor => {
      chain.unshift(interceptor)
    })
    this.interceptors.response.forEach(interceptor => {
      chain.push(interceptor)
    })

    let promise = Promise.resolve(config)

    while (chain.length) {
      const { resolved, rejected } = chain.shift()!
      promise = promise.then(resolved, rejected)
    }

    return promise
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
