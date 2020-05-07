import { checkValue } from '../../../../src/utils/helpers'

describe('checkValue()', () => {
  it('should return an object', () => {
    const objSchema = {
      type: 'object',
      properties: {
        a: {
          title: 'A',
          type: 'string'
        }
      }
    }

    expect(checkValue(objSchema, '')).toMatchObject({})
    expect(checkValue(objSchema, true)).toMatchObject({})
    expect(checkValue(objSchema, [])).toMatchObject({})
    expect(checkValue(objSchema, 123)).toMatchObject({})
    expect(checkValue(objSchema, { b: 3 })).toMatchObject({ b: 3 })
    expect(checkValue(objSchema, undefined)).toBeUndefined()
    expect(checkValue(objSchema, null)).toBeNull()
  })

  it('should return an array', () => {
    const arrSchema = {
      type: 'array',
      items: {
        type: 'number'
      }
    }
    expect(checkValue(arrSchema, '')).toMatchObject([])
    expect(checkValue(arrSchema, true)).toMatchObject([])
    expect(checkValue(arrSchema, { b: 3 })).toMatchObject([])
    expect(checkValue(arrSchema, [1, 2, 3])).toMatchObject([1, 2, 3])
    expect(checkValue(arrSchema, 123)).toMatchObject([])
    expect(checkValue(arrSchema, undefined)).toBeUndefined()
    expect(checkValue(arrSchema, null)).toBeNull()
  })

  it('should return a number', () => {
    const numSchema = {
      type: 'number'
    }

    expect(checkValue(numSchema, '')).toBeUndefined()
    expect(checkValue(numSchema, '123')).toBe(123)
    expect(checkValue(numSchema, true)).toBeUndefined()
    expect(checkValue(numSchema, { b: 3 })).toBeUndefined()
    expect(checkValue(numSchema, [])).toBeUndefined()
    expect(checkValue(numSchema, [1, 2, 3])).toBe(1)
    expect(checkValue(numSchema, 123.3)).toBe(123.3)
    expect(checkValue(numSchema, 123)).toBe(123)
    expect(checkValue(numSchema, undefined)).toBeUndefined()
    expect(checkValue(numSchema, null)).toBeNull()
  })

  it('should return an integer', () => {
    const intSchema = {
      type: 'integer'
    }
    expect(checkValue(intSchema, '123')).toBe(123)
    expect(checkValue(intSchema, 123.5)).toBe(123)
    expect(checkValue(intSchema, 123)).toBe(123)
  })

  it('should return a string', () => {
    const strSchema = {
      type: 'string'
    }
    expect(checkValue(strSchema, '')).toBe('')
    expect(checkValue(strSchema, '123')).toBe('123')
    expect(checkValue(strSchema, true)).toBe('true')
    expect(checkValue(strSchema, { b: 3 })).toBe('[object Object]')
    expect(checkValue(strSchema, [])).toBe('')
    expect(checkValue(strSchema, [1, 2, 3])).toBe('1,2,3')
    expect(checkValue(strSchema, 123.3)).toBe('123.3')
    expect(checkValue(strSchema, 123)).toBe('123')
    expect(checkValue(strSchema, undefined)).toBeUndefined()
    expect(checkValue(strSchema, null)).toBeNull()
  })

  it('should return a boolean', () => {
    const boolSchema = {
      type: 'boolean'
    }
    expect(checkValue(boolSchema, '')).toBeUndefined()
    expect(checkValue(boolSchema, '123')).toBeUndefined()
    expect(checkValue(boolSchema, true)).toBe(true)
    expect(checkValue(boolSchema, false)).toBe(false)
    expect(checkValue(boolSchema, { b: 3 })).toBeUndefined()
    expect(checkValue(boolSchema, [])).toBeUndefined()
    expect(checkValue(boolSchema, [1, 2, 3])).toBeUndefined()
    expect(checkValue(boolSchema, 123.3)).toBeUndefined()
    expect(checkValue(boolSchema, 123)).toBeUndefined()
    expect(checkValue(boolSchema, undefined)).toBeUndefined()
    expect(checkValue(boolSchema, null)).toBeNull()
  })
})
