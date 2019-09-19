import { resolvedFn, rejectFn } from '../types'

interface Interceptor<T> {
  resolved: resolvedFn<T>
  rejected?: rejectFn
}

export default class InterceptorManager<T> {
  private interceptors: Array<Interceptor<T> | null>
  constructor() {
    this.interceptors = []
  }
  use(resolved: resolvedFn<T>, rejected?: rejectFn): number {
    this.interceptors.push({
      resolved,
      rejected
    })
    return this.interceptors.length + 1
  }
  forEach(fn: (interceptor: Interceptor<T>) => void): void {
    this.interceptors.forEach(interceptor => {
      if (interceptor !== null) {
        fn(interceptor)
      }
    })
  }
  eject(id: number): void {
    if (this.interceptors[id]) {
      this.interceptors[id] = null
    }
  }
}
