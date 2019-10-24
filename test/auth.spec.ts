import axios from '../src/index'
import { getAjaxRequest } from './helper'
describe('auth', () => {
  beforeEach(() => {
    //每个测试用例运行前的钩子函数
    jasmine.Ajax.install()
  })
  afterEach(() => {
    //每个测试用例运行后的钩子函数
    jasmine.Ajax.uninstall()
  })
  test('should accept HTTP Basic auth with username/password', () => {
    axios('/foo', {
      auth: {
        username: 'Aladdin',
        password: 'open sesame'
      }
    })
    return getAjaxRequest().then(request => {
      expect(request.requestHeaders['Authorization']).toBe('Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ==')
    })
  })
  test('should fail to encode HTTP Basic auth credentials with non-Latin1 charactors', () => {
    axios('/foo', {
      auth: {
        username: 'Alad&*∆din',
        password: 'open sesame'
      }
    })
      .then(() => {
        throw new Error(
          'should not succeed to make a HTTP Basic auth request with non-Latin1 charactors'
        )
      })
      .catch(error => {
        expect(/charactor/i.test(error.message)).toBeTruthy() // 控制台btoa('Alad&*∆din')会报错，错误信息包含charactor字符串
      })
  })
})
