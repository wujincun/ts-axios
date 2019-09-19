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
  url?: string
  method?: Method
  data?: any
  params?: any
  headers?: any
  responseType?: XMLHttpRequestResponseType
  timeout?: number
  transformRequest?: AxiosTransformer | AxiosTransformer[]
  transformResponse?: AxiosTransformer | AxiosTransformer[]

  [propName: string]: any
}

export interface axiosResponse<T = any> {
  data: T
  status: number
  statusText: string
  headers: any
  config: axiosRequestConfig
  request: any
}
export interface axiosPromise<T = any> extends Promise<axiosResponse<T>> {}

export interface axiosError extends Error {
  isAxiosError: boolean
  config: axiosRequestConfig
  code?: string | null
  request?: any
  response?: axiosResponse
}
export interface Axios {
  defaults: axiosRequestConfig
  interceptors: {
    request: AxiosInterceptorManager<axiosRequestConfig>
    response: AxiosInterceptorManager<axiosResponse>
  }
  request<T = any>(config: axiosRequestConfig): axiosPromise<T>
  get<T = any>(url: string, config?: axiosRequestConfig): axiosPromise<T>
  delete<T = any>(url: string, config?: axiosRequestConfig): axiosPromise<T>
  head<T = any>(url: string, config?: axiosRequestConfig): axiosPromise<T>
  options<T = any>(url: string, config?: axiosRequestConfig): axiosPromise<T>
  post<T = any>(url: string, data?: any, config?: axiosRequestConfig): axiosPromise<T>
  put<T = any>(url: string, data?: any, config?: axiosRequestConfig): axiosPromise<T>
  patch<T = any>(url: string, data?: any, config?: axiosRequestConfig): axiosPromise<T>
}

export interface AxiosInstance extends Axios {
  <T = any>(config: axiosRequestConfig): axiosPromise<T>
  <T = any>(url: string, config?: axiosRequestConfig): axiosPromise<T>
}

export interface AxiosInterceptorManager<T> {
  use(resolved: resolvedFn<T>, reject?: rejectFn): number
  eject(id: number): void
}
export interface resolvedFn<T> {
  (val: T): T | Promise<T>
}
export interface rejectFn {
  (error: any): any
}
export interface AxiosTransformer {
  (data: any, headers?: any): any
}
