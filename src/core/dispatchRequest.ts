import { axiosRequestConfig, axiosPromise, axiosResponse } from '../types'
import { buildUrl } from '../helpers/url'
import { transformRequest, transformResponse } from '../helpers/data'
import { processHeaders } from '../helpers/headers'
import xhr from './xhr'
export default function dispatchRequest(config: axiosRequestConfig): axiosPromise {
  processConfig(config)
  return xhr(config).then(res => {
    return transformResponseData(res)
  })
}
function processConfig(config: axiosRequestConfig): void {
  config.url = transformUrl(config)
  config.headers = transformHeaders(config) // 先处理headers后处理data
  config.data = transformRequestData(config)
}
function transformUrl(config: axiosRequestConfig): string {
  const { url, params } = config
  return buildUrl(url!, params)
}
function transformRequestData(config: axiosRequestConfig): any {
  return transformRequest(config.data)
}
function transformHeaders(config: axiosRequestConfig): any {
  const { headers = {}, data } = config
  return processHeaders(headers, data)
}
function transformResponseData(res: axiosResponse): axiosResponse {
  res.data = transformResponse(res.data)
  return res
}
