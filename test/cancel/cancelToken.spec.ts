import CancelToken from '../../src/cancel/CancelToken'
import Cancel from '../../src/cancel/Cancel'
import { Canceler } from '../../src/types'
describe('cancel:cancelToken', () => {
  describe('reason', () => {
    test('should returns a Cancel if cancellation has been requested', () => {
      let cancel: Canceler
      let token = new CancelToken(c => {
        cancel = c
      })
      cancel!('Opration has been canceled.')
      expect(token.reason).toEqual(expect.any(Cancel)) // token.reason是Cancel类的实例
      expect(token.reason!.message).toBe('Opration has been canceled.')
    })
    test('should has no side effect if call cancellation for multi times', () => {
      let cancel: Canceler
      let token = new CancelToken(c => {
        cancel = c
      })
      cancel!('Opration has been canceled.')
      cancel!('Opration has been canceled.')
      expect(token.reason).toEqual(expect.any(Cancel)) // token.reason是Cancel类的实例
      expect(token.reason!.message).toBe('Opration has been canceled.')
    })
    test('should returns undefined if cancellation has not been requested', () => {
      let token = new CancelToken(c => {})
      expect(token.reason).toBeUndefined()
    })
  })
  describe('promise', () => {
    test('should returns a Promise that resolves when cancellation is requested', done => {
      let cancel: Canceler
      let token = new CancelToken(c => {
        cancel = c
      })
      token.promise.then(value => {
        expect(value).toEqual(expect.any(Cancel)) // value是Cancel类的实例
        expect(value!.message).toBe('Opration has been canceled.')
        done()
      })
      cancel!('Opration has been canceled.') // 调用进入上面promise的方法中
    })
  })
  describe('throwIfRequest', () => {
    test('should throws if cancellation has been requested', () => {
      let cancel: Canceler
      let token = new CancelToken(c => {
        cancel = c
      })
      cancel!('Opration has been canceled.') // 调用进入上面promise的方法中
      try {
        token.throwIfRequested() // 实例已经执行，这里就会报错，走到catch中
        fail('Excected throwIfRequest to throw')
      } catch (thrown) {
        if (!(thrown instanceof Cancel)) {
          fail('Excected throwIfRequest to throw a cancel, but test threw' + thrown + ',')
        }
        expect(thrown.message).toBe('Opration has been canceled.')
      }
    })
    test('should does not throw cancellation has not been requested', () => {
      let token = new CancelToken(() => {})
      token.throwIfRequested()
    })
  })
  describe('source', () => {
    test('should returns an object cantaining token and cancel function', () => {
      const source = CancelToken.source()
      expect(source.token).toEqual(expect.any(CancelToken))
      expect(source.cancel).toEqual(expect.any(Function))
      expect(source.token.reason).toBeUndefined()
      source.cancel('Opration has been canceled.')
      expect(source.token.reason).toEqual(expect.any(Cancel))
      expect(source.token.reason!.message).toEqual('Opration has been canceled.')
    })
  })
})
