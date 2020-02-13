import { guessType } from '../../../../src/utils/helpers'

describe('guessType()', () => {
  it('should guess the type of array values', () => {
    expect(guessType([1, 2, 3])).toBe('array')
  })

  it('should guess the type of string values', () => {
    expect(guessType('foobar')).toBe('string')
  })

  it('should guess the type of null values', () => {
    expect(guessType(null)).toBe('null')
  })

  it('should treat undefined values as null values', () => {
    expect(guessType()).toBe('null')
  })

  it('should guess the type of boolean values', () => {
    expect(guessType(true)).toBe('boolean')
  })

  it('should guess the type of object values', () => {
    expect(guessType({})).toBe('object')
  })
})
