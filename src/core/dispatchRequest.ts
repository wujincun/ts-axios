import { axiosRequestConfig, axiosPromise, axiosResponse } from '../types'
import { buildUrl } from '../helpers/url'
import { flattenHeaders } from '../helpers/headers'
import transform from './transform'
import xhr from './xhr'
export default function dispatchRequest(config: axiosRequestConfig): axiosPromise {
  processConfig(config)
  return xhr(config).then(res => {
    return transformResponseData(res)
  })
}
function processConfig(config: axiosRequestConfig): void {
  config.url = transformUrl(config)
  config.data = transform(config.data, config.headers, config.transformRequest)
  config.headers = flattenHeaders(config.headers, config.method!)
}
function transformUrl(config: axiosRequestConfig): string {
  const { url, params } = config
  return buildUrl(url!, params)
}

function transformResponseData(res: axiosResponse): axiosResponse {
  res.data = transform(res.data, res.headers, res.config.transformResponse)
  return res
}
