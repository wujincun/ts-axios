import { buildURL, isAbsoluteUrl, combineUrl, isUrlSameOrigin } from '../../src/helpers/url'
describe('helper:url', () => {
  describe('buildURL', () => {
    test('should support null params', () => {
      expect(buildURL('/foo')).toBe('/foo')
    })
    test('should support params', () => {
      expect(buildURL('/foo', { foo: 'bar' })).toBe('/foo?foo=bar')
    })
    test('should ignore if some params value is null', () => {
      expect(buildURL('/foo', { foo: 'bar', baz: null })).toBe('/foo?foo=bar')
    })
    test('should ignore if only params value is null', () => {
      expect(buildURL('/foo', { foo: null })).toBe('/foo')
    })
    test('should support object params', () => {
      expect(buildURL('/foo', { foo: { baz: 'bar' } })).toBe(
        '/foo?foo=' + encodeURI('{"baz":"bar"}')
      )
    })
    test('should support date params', () => {
      const date = new Date()
      expect(buildURL('/foo', { date: date })).toBe('/foo?date=' + date.toISOString())
    })
    test('should support array params', () => {
      expect(buildURL('/foo', { foo: ['bar', 'baz'] })).toBe('/foo?foo[]=bar&foo[]=baz')
    })
    test('should support scpecial char params', () => {
      expect(buildURL('/foo', { foo: '@:$, ' })).toBe('/foo?foo=@:$,+')
    })
    test('should support existing params', () => {
      expect(buildURL('/foo?foo=bar', { bar: 'baz' })).toBe('/foo?foo=bar&bar=baz')
    })
    test('should correct discard url hash mark', () => {
      expect(buildURL('/foo?foo=bar#hash', { bar: 'baz' })).toBe('/foo?foo=bar&bar=baz')
    })
    test('should use serializer if provided', () => {
      const serializer = jest.fn(() => {
        return 'foo=bar'
      })
      const params = { foo: 'bar' }
      expect(buildURL('/foo', params, serializer)).toBe('/foo?foo=bar')
      expect(serializer).toHaveBeenCalled()
      expect(serializer).toHaveBeenCalledWith(params)
    })
    test('should support URLSearchParams', () => {
      expect(buildURL('/foo', new URLSearchParams('bar=baz'))).toBe('/foo?bar=baz')
    })
  })
  describe('isAbsoluteUrl', () => {
    test('should return ture if url begins with valid scheme name', () => {
      expect(isAbsoluteUrl('https://api.github.com/users')).toBeTruthy()
      expect(isAbsoluteUrl('custom-scheme-v1.0://examples.com/')).toBeTruthy()
      expect(isAbsoluteUrl('HTTP://examples.com')).toBeTruthy()
    })
    test('should return false if url begins with invalid scheme name', () => {
      expect(isAbsoluteUrl('123://examples.com')).toBeFalsy()
      expect(isAbsoluteUrl('!valid://examples.com')).toBeFalsy()
    })
    test('should return true if url is protocal-relative', () => {
      expect(isAbsoluteUrl('//examples.com')).toBeTruthy()
    })
    test('should return false if url is relative', () => {
      expect(isAbsoluteUrl('/foo')).toBeFalsy()
      expect(isAbsoluteUrl('foo')).toBeFalsy()
    })
  })
  describe('combineUrl', () => {
    test('should combineUrl', () => {
      expect(combineUrl('https://api.github.com', '/users')).toBe('https://api.github.com/users')
    })
    test('should insert missing slash', () => {
      expect(combineUrl('https://api.github.com', 'users')).toBe('https://api.github.com/users')
    })
    test('should remove duplicate slash', () => {
      expect(combineUrl('https://api.github.com/', '/users')).toBe('https://api.github.com/users')
    })
    test('should not insert slash when relative url is missing/empty', () => {
      expect(combineUrl('https://api.github.com/users', '')).toBe('https://api.github.com/users')
    })
    test('should allow a single slash for relative url', () => {
      expect(combineUrl('https://api.github.com/users', '/')).toBe('https://api.github.com/users/')
    })
  })
  describe('isUrlSameOrigin', () => {
    test('should detect same origin', () => {
      expect(isUrlSameOrigin(document.location.href)).toBeTruthy()
    })
    test('should detect different origin', () => {
      expect(isUrlSameOrigin('https://api.github.com/axios/axios')).toBeFalsy()
    })
  })
})
