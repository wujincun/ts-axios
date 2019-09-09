import { axiosRequestConfig, axiosResponse } from '../types'
export class AxiosError extends Error {
  isAxiosError: boolean
  config: axiosRequestConfig
  code?: string | null
  request?: any
  response?: axiosResponse

  constructor(
    message: string,
    config: axiosRequestConfig,
    code?: string | null,
    request?: any,
    response?: axiosResponse
  ) {
    super(message)
    this.config = config
    this.code = code
    this.request = request
    this.response = response
    this.isAxiosError = true

    Object.setPrototypeOf(this, AxiosError.prototype)
  }
}
export function creatError(
  message: string,
  config: axiosRequestConfig,
  code?: string | null,
  request?: any,
  response?: axiosResponse
) {
  const error = new AxiosError(message, config, code, request, response)
  return error
}
