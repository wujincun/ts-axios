import axios from '../src/index'
import { getAjaxRequest } from './helper'
describe('progress', () => {
  beforeEach(() => {
    //每个测试用例运行前的钩子函数
    jasmine.Ajax.install()
  })
  afterEach(() => {
    //每个测试用例运行后的钩子函数
    jasmine.Ajax.uninstall()
  })
  test('should add a download progress handler', () => {
    const progressSpy = jest.fn()
    axios('/foo', { onDownLoadProgress: progressSpy })
    return getAjaxRequest().then(request => {
      request.respondWith({
        status: 200,
        responseText: '{"foo":"bar"}'
      })
      expect(progressSpy).toHaveBeenCalled()
    })
  })
  test('should add a upload progress handler', () => {
    const progressSpy = jest.fn()
    axios('/foo', { onUpProgress: progressSpy })
    return getAjaxRequest().then(request => {})
  })
})
