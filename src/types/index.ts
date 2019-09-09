export type Method =
  | 'get'
  | 'GET'
  | 'post'
  | 'POST'
  | 'delete'
  | 'DELETE'
  | 'put'
  | 'PUT'
  | 'patch'
  | 'PATCH'
  | 'options'
  | 'OPTIONS'
  | 'head'
  | 'HEAD'

export interface axiosRequestConfig {
  url: string
  method?: Method
  data?: any
  params?: any
  headers?: any
  responseType?: XMLHttpRequestResponseType
  timeout?: number
}

export interface axiosResponse {
  data: any
  status: number
  statusText: string
  headers: any
  config: axiosRequestConfig
  request: any
}
export interface axiosPromise extends Promise<axiosResponse> {}

export interface axiosError extends Error {
  isAxiosError: boolean
  config: axiosRequestConfig
  code?: string | null
  request?: any
  response?: axiosResponse
}
