import axios, { AxiosResponse, AxiosTransformer } from '../src/index'
import { getAjaxRequest } from './helper'
describe('transfom', () => {
  beforeEach(() => {
    //每个测试用例运行前的钩子函数
    jasmine.Ajax.install()
  })
  afterEach(() => {
    //每个测试用例运行后的钩子函数
    jasmine.Ajax.uninstall()
  })
  test('should transfom to string', () => {
    const data = {
      foo: 'bar'
    }
    axios.post('/foo', data)
    return getAjaxRequest().then(request => {
      expect(request.params).toBe('{"foo":"bar"}')
    })
  })
  test('should transfom to json', done => {
    let response: AxiosResponse
    axios('/foo').then(res => {
      response = res
    })
    getAjaxRequest().then(request => {
      request.respondWith({
        status: 200,
        responseText: '{"foo":"bar"}'
      })
      setTimeout(() => {
        expect(typeof response.data).toBe('object')
        expect(response.data.foo).toBe('bar')
        done()
      }, 100)
    })
  })
  test('should override default transform', () => {
    const data = {
      foo: 'bar'
    }
    axios.post('/foo', data, {
      transformRequest(data) {
        return data
      }
    })
    return getAjaxRequest().then(request => {
      expect(request.params).toEqual({ foo: 'bar' })
    })
  })
  test('should allow an Array of transforms', () => {
    const data = {
      foo: 'bar'
    }
    axios.post('/foo', data, {
      transformRequest: (axios.defaults.transformRequest as AxiosTransformer[]).concat(function(
        data
      ) {
        return data.replace('bar', 'baz')
      })
    })
    return getAjaxRequest().then(request => {
      expect(request.params).toBe('{"foo":"baz"}')
    })
  })
  test('should allowing mutating headers', () => {
    const token = Math.floor(Math.random() * Math.pow(2, 64)).toString(36)
    axios.post('/foo', {
      transformRequest: (data: any, headers: { [x: string]: string }) => {
        headers['X-Authorization'] = token
        return data
      }
    })
    return getAjaxRequest().then(request => {
      expect(request.requestHeaders['X-Authorization']).toBe(token)
    })
  })
})
